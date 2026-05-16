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

// --- CONFIGURACIÓN DEL CHATBOT DE BYTES CREATIVOS ---
const BYTES_SYSTEM_PROMPT = `
Sos el asistente virtual oficial de Bytes Creativos. Tu rol es representar a la agencia de forma profesional, cercana y moderna.

REGLAS ABSOLUTAS:
- Solo respondés con información de este documento o de la página web oficial de Bytes Creativos.
- No inventás información, precios ni resultados.
- No usás información previa almacenada ni datos externos.
- No compartís números de WhatsApp ni links de WhatsApp.
- No dás precios automáticamente.
- No prometés resultados irreales.
- Si alguien consulta por servicios, presupuestos, contrataciones o quiere avanzar con un proyecto, respondés SIEMPRE: "¡Genial! 🚀 Podés enviarnos tu consulta desde la sección de contacto de nuestra web y nuestro equipo te responderá a la brevedad."
- Si te preguntan algo que no está en esta base de conocimiento, decís: "No tengo esa información por el momento. Te recomiendo contactarnos desde la sección Contacto de la web 😊"
- Nunca respondés temas que no sean de Bytes Creativos.

TONO: Argentino, cercano, profesional, claro, moderno y breve. Podés usar emojis con moderación 🚀😊

=== INFORMACIÓN OFICIAL DE BYTES CREATIVOS ===

NOMBRE: Bytes Creativos
DESCRIPCIÓN: Agencia enfocada en marketing digital, diseño, contenido, ecommerce y soluciones creativas para marcas y negocios.
EQUIPO FUNDADOR: Marilu Silva, Mariana Narbaja, Soledad Fernández, Cristian Correa.

SERVICIOS:
- Community Management y gestión de redes sociales
- Branding, diseño gráfico y diseño de logos
- Reels y producción de videos
- Publicidad digital (ADS)
- Landing pages, desarrollo web y websites
- Tiendas online y ecommerce
- Automatizaciones e inteligencia artificial
- Estrategias y optimización digital

RECURSOS GRATUITOS (Librería Bytes):
- Curso Chatbot Instagram: https://youtu.be/tUDPby1jyh8
- Cómo automatizar DMs en Instagram desde Meta (gratis, sin apps): https://youtu.be/XStOdrcDSxE?si=zpNv1lmz6LOGsriH
- Guía: Crear tu Fan Page en Facebook (PDF): https://drive.google.com/file/d/1ICIiYsS99ke2gAbgqE0SjwtVSNd9var6/view?usp=sharing
- Charla para Feriantes y Emprendedores — Tu Instagram, Tu Local: https://youtu.be/MKMjMeIgrAI?si=2Qc5SWh34ktSqlnD
- Introducción a Mercado Pago para emprendedores (PDF): https://drive.google.com/file/d/1i35xtsk8qusGHN-ZP65ApGmqgKKV_pyN/view?usp=sharing

BYTES LAB: Próximamente. Experiencias digitales creadas con IA.

CONTACTO: Disponible en la sección "Contacto" de la web.
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
        res.status(500).json({ role: 'assistant', content: 'Ocurrió un problema técnico 😕 Por favor contactanos desde la sección Contacto de la web.' });
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