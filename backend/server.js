const express = require('express');
const cors = require('cors');
const axios = require('axios');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// --- CONFIGURACIÓN DEL CEREBRO DE VENTAS DE BYTES ---
const BYTES_SYSTEM_PROMPT = `
Eres el "Core de Inteligencia" de Bytes Creativos, la agencia líder en crecimiento digital de José C. Paz. 
1. IDENTIDAD: Responde siempre como parte de Bytes Creativos, equipo de estudiantes y graduados de la UNPAZ.
2. WHATSAPP: TENEMOS WHATSAPP ACTIVO. El link es https://wa.me/5491144789797. Nunca digas que no existe.
3. SERVICIOS: Auditoría ($70k), Asesoría ($70k), UGC ($250k), ADS ($150k), Web ($170k), Automatización ($300k).
4. MISIÓN: Transformar bytes en negocios rentables con diseño disruptivo.
`;

// 🤖 RUTA DEL CHATBOT
app.post('/api/chat', async (req, res) => {
    try {
        const { messages } = req.body;
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'system', content: BYTES_SYSTEM_PROMPT }, ...messages],
                temperature: 0.7
            },
            { headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` } }
        );
        res.json({ role: 'assistant', content: response.data.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ role: 'assistant', content: 'Interferencia detectada. Escribinos al WhatsApp: https://wa.me/5491144789797' });
    }
});

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error('SMTP config fallida:', error);
    } else {
        console.log('SMTP configurado correctamente. Puede enviar emails.');
    }
});

app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Faltan datos obligatorios' });
        }

        const mailOptions = {
            from: process.env.SMTP_USER,
            replyTo: `${name} <${email}>`,
            to: 'bytescreativoss@gmail.com',
            subject: `Nuevo contacto desde el sitio bytescreativos: ${name}`,
            text: `Nombre: ${name}\nEmail: ${email}\nTeléfono: ${phone || '-'}\nMensaje:\n${message}`,
            html: `<p><strong>Nombre:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Teléfono:</strong> ${phone || '-'}</p><p><strong>Mensaje:</strong></p><p>${message.replace(/\n/g, '<br/>')}</p>`,
        };

        await transporter.sendMail(mailOptions);

        return res.json({ success: true });
    } catch (error) {
        console.error('Error contact email:', error);
        const msg = (error.response && (error.response.body || error.response.text)) || error.message || 'No se pudo enviar el mensaje';
        return res.status(500).json({ error: `No se pudo enviar el mensaje. ${msg}` });
    }
});

// 🛠️ LA SOLUCIÓN DEFINITIVA (Expresión Regular Pura)
// Esto evita el error "Missing parameter name" de path-to-regexp en Koyeb
app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor Bytes operando en puerto ${PORT}`);
    console.log('Modo: Vendedor UNPAZ Online ✅');
});