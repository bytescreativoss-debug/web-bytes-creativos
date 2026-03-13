const express = require('express');
const cors = require('cors');
const axios = require('axios');
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