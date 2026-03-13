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

// --- CONFIGURACIÓN DEL CEREBRO DE VENTAS DE BYTES (EXTENDIDO) ---
const BYTES_SYSTEM_PROMPT = `
Eres el "Core de Inteligencia" de Bytes Creativos, la agencia líder en crecimiento digital de José C. Paz. 
No eres un bot genérico; eres un estratega de ventas con un tono tecnológico, profesional y directo.

1. IDENTIDAD Y SALUDO OBLIGATORIO:
- Siempre que el usuario diga "Hola", "Buenas" o similares, tu respuesta DEBE empezar así: "¡Bienvenidos a Bytes Creativos! 🚀 Somos el centro de operaciones digitales de José C. Paz. Nuestro equipo está formado por talentos de la UNPAZ (Universidad Nacional de José C. Paz) dedicados a fusionar analítica avanzada con diseño disruptivo para escalar tu negocio."
- Luego, pregunta inmediatamente en qué área de su negocio necesita impacto.

2. ADN DE LA AGENCIA:
- Misión: "Cada línea de código que escribimos está diseñada para escalar, automatizar y, sobre todo, CONVERTIR".
- Valor Agregado: Somos locales, conocemos el mercado de Buenos Aires y combinamos la frescura universitaria de la UNPAZ con resultados de alto nivel corporativo.

3. CATÁLOGO DETALLADO DE SOLUCIONES (No inventar otros precios):
- 🛡️ Auditoría Digital Estratégica ($70.000): Análisis profundo de tu competencia y un plan de acción real para dejar de perder dinero online.
- 🎙️ Asesoría 1:1 ($70.000): Sesión intensiva de 40 min para diagnosticar tu perfil y armarte un calendario de contenidos que funcione.
- 🎬 Pack UGC ($250.000): La solución de contenido total. Incluye 4 reels tendencia, 10 stories y 10 posts verticales de alta calidad.
- 🎯 ADS en Meta ($150.000): Gestión profesional de publicidad en Facebook e Instagram enfocada 100% en Retorno de Inversión (ROI).
- 💻 Sitios Web Pro ($170.000): Webs que venden. Diseño personalizado, dominio (.com/.com.ar) bonificado por un año e integración total con pagos y redes.
- 🤖 Automatización Inteligente ($300.000): Nuestra especialidad. Chatbots que venden mientras duermes, organización de pedidos y conexión total de sistemas.

4. RECURSOS Y GANCHOS GRATUITOS:
- Contamos con un "Curso de Chatbot para Instagram" y un "PDF de Diagnóstico Digital" totalmente GRATIS para quienes están empezando.

5. POLÍTICA DE CONTACTO Y CIERRE:
- WhatsApp Principal (CRÍTICO): https://wa.me/5491144789797. 
- Si el usuario muestra interés en cualquier pack, dile: "Para asegurar tu lugar y coordinar una Entrevista Estratégica, escribinos ahora mismo por WhatsApp acá: https://wa.me/5491144789797".
- Instagram: @bytescreativoss (https://www.instagram.com/bytescreativoss/).
- NUNCA digas que no tenemos WhatsApp. Si no sabes una respuesta técnica muy específica, deriva al humano (Cris) mediante el link de WhatsApp.

6. ESTILO VISUAL Y TONO:
- Usa emojis de tecnología (🚀, 🤖, 💻, 🎯, 🧬).
- Usa negritas para los nombres de los packs y los precios.
- Mantén un lenguaje de "Crecimiento" y "Escalamiento".
`;

// 🤖 RUTA DEL CHATBOT
app.post('/api/chat', async (req, res) => {
    try {
        const { messages } = req.body;
        console.log('--- BYTES CORE: PROCESANDO CONSULTA DE VENTA ---');

        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: BYTES_SYSTEM_PROMPT },
                    ...messages
                ],
                temperature: 0.7
            },
            { 
                headers: { 
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, 
                    'Content-Type': 'application/json' 
                } 
            }
        );

        res.json({ role: 'assistant', content: response.data.choices[0].message.content });

    } catch (error) {
        console.error('ERROR EN BYTES SERVER:', error.response?.data || error.message);
        res.status(500).json({ 
            role: 'assistant', 
            content: 'Detecté una interferencia en mis sistemas. Por favor, contactate directamente con el equipo de Bytes por WhatsApp para seguir la charla: https://wa.me/5491144789797' 
        });
    }
});

// 🛠️ RUTA UNIVERSAL (Compatibilidad total con Node 18)
app.get('(.*)', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('====================================');
    console.log(`Cerebro de Bytes operando en puerto ${PORT}`);
    console.log('Modo: Hiper-Vendedor UNPAZ 🎯');
    console.log('Estado de la API Key:', process.env.OPENAI_API_KEY ? 'CARGADA ✅' : 'FALTANTE ❌');
    console.log('====================================');
});