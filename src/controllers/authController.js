const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const sendEmail = require('../utils/emails');

// Asegúrate de que coincida con tu .env
const JWT_SECRET = process.env.JWT_SECRET || 'una_clave_de_respaldo';

const registerUser = async (req, res) => {
    const { username, password, email, municipality_id } = req.body;

    if (!username || !password || !email || !municipality_id) {
        return res.status(400).json({ error: 'Faltan campos obligatorios.' });
    }

    try {
        const password_hash = await bcrypt.hash(password, 10);

        // 🚨 CORRECCIÓN AQUÍ: Cambiamos role_id de 2 a 4 (User)
        await User.create({
            username,
            email,
            password_hash,
            role_id: 4, // 4 = User en tu nueva jerarquía
            municipality_id
        });

        res.status(201).json({ message: 'Usuario registrado exitosamente.' });

    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'El usuario o email ya existe.' });
        }
        console.error(error);
        res.status(500).json({ error: 'Error interno.' });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Faltan datos.' });

    try {
        const user = await User.findByUsername(username);

        if (!user) return res.status(401).json({ error: 'Credenciales inválidas.' });

        const match = await bcrypt.compare(password, user.password_hash);

        if (match) {
            const token = jwt.sign(
                { userId: user.user_id, username: user.username, role: user.role },
                JWT_SECRET,
                { expiresIn: '1h' }
            );
            res.status(200).json({ message: 'Login exitoso', token, username: user.username, role: user.role });
        } else {
            res.status(401).json({ error: 'Credenciales inválidas.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno.' });
    }
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // 1. USAMOS EL MODELO (Ya no hay query directa aquí)
        const user = await User.findByEmail(email);

        if (!user) {
            // Por seguridad, es mejor no revelar si el correo existe o no, 
            // pero mantenemos tu lógica actual para que te sea familiar.
            return res.status(404).json({ error: 'No existe una cuenta con este correo.' });
        }

        // Generar token simple
        const token = crypto.randomBytes(20).toString('hex');

        // Guardar en DB
        await User.saveResetToken(user.user_id, token);

        // Crear enlace (Aseguramos que use el puerto correcto si estás en local)
        // Nota: Si usas otro puerto, ajusta localhost:3000
        const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
        const resetUrl = `${baseUrl}/reset.html?token=${token}`;

        // Enviar correo
        const message = `
            <h1>Recuperación de Contraseña</h1>
            <p>Has solicitado restablecer tu contraseña.</p>
            <p>Haz clic en el siguiente enlace para continuar:</p>
            <a href="${resetUrl}" style="background:#4FD1C5; color:black; padding:10px 20px; text-decoration:none; border-radius:5px;">Restablecer Contraseña</a>
            <p>Este enlace expira en 1 hora.</p>
        `;

        await sendEmail(user.email, 'Recuperación de Contraseña - Match Football', message);

        res.json({ message: 'Correo enviado. Revisa tu bandeja de entrada.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al procesar la solicitud.' });
    }
};

// 2. RESTABLECER CONTRASEÑA (Usa el token para cambiar la pass)
const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const user = await User.findByResetToken(token);

        if (!user) {
            return res.status(400).json({ error: 'Token inválido o expirado.' });
        }

        // Hashear nueva contraseña
        const hash = await bcrypt.hash(newPassword, 10);

        // Actualizar usuario
        await User.updatePassword(user.user_id, hash);
        await User.clearResetToken(user.user_id);

        res.json({ message: 'Contraseña actualizada correctamente. Ahora puedes iniciar sesión.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al restablecer contraseña.' });
    }
};

module.exports = { registerUser, loginUser, forgotPassword, resetPassword };

