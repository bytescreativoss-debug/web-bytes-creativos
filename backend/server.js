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
Eres el asistente virtual de Bytes Creativos. Solo podés responder con información que esté en este documento. No inventes datos, precios ni servicios que no estén aquí. Si alguien pregunta algo que no está en esta información, decí que no tenés esa información y sugerí escribirnos al WhatsApp.

=== INFORMACIÓN DE BYTES CREATIVOS ===

IDENTIDAD: Somos un equipo de estudiantes y graduados de la UNPAZ, agencia de crecimiento digital en José C. Paz.
MISIÓN: Transformar bytes en negocios rentables con diseño disruptivo.

CONTACTO:
- WhatsApp: https://wa.me/5491144789797
- Email: bytescreativos@gmail.com

SERVICIOS Y PRECIOS:
- Auditoría Digital Estratégica: desde $70.000 (evaluación del negocio online, benchmark de competencia, plan de acción)
- Asesoría 1:1: desde $100.000 (videollamada 40 min, diagnóstico del perfil, calendario de contenido)
- UGC (Creación de contenido): desde $250.000 (4 reels, 10 fotos stories, 10 fotos post vertical)
- ADS en Meta: desde $150.000 (1 campaña activa, 1 objetivo publicitario, reporte de resultados)
- Sitios Web: desde $170.000 (diseño personalizado, dominio .com o .com.ar por un año, integración con medios de pago y envío, vinculación con redes sociales)
- Automatización Inteligente: desde $300.000 (responder consultas de clientes, procesar pedidos, conectar herramientas y sistemas)

RECURSOS GRATUITOS (Librería Bytes):
- Curso Chatbot Instagram: https://youtu.be/tUDPby1jyh8
- Cómo automatizar DMs en Instagram desde Meta (gratis y sin apps): https://youtu.be/XStOdrcDSxE?si=zpNv1lmz6LOGsriH
- Guía rápida para crear tu Fan Page en Facebook (PDF): https://drive.google.com/file/d/1ICIiYsS99ke2gAbgqE0SjwtVSNd9var6/view?usp=sharing
- Charla para Feriantes y Emprendedores — Tu Instagram, Tu Local: https://youtu.be/MKMjMeIgrAI?si=2Qc5SWh34ktSqlnD
- Introducción a Mercado Pago para emprendedores (PDF): https://drive.google.com/file/d/1i35xtsk8qusGHN-ZP65ApGmqgKKV_pyN/view?usp=sharing

BYTES LAB: Próximamente. Experiencias digitales creadas con IA. Muy pronto.
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