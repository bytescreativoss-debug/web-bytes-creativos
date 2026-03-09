const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Servir el frontend buildeado
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || messages.length === 0) {
      return res.status(400).json({ error: 'No hay mensajes en la solicitud' });
    }
    const userMessage = messages[messages.length - 1].content.toLowerCase();
    if (userMessage.includes('brand') || userMessage.includes('identidad') || userMessage.includes('logo')) {
      return res.json({ role: 'assistant', content: 'La identidad de marca es la base para posicionarte profesionalmente. Nuestro pack Brand Identity incluye Logo, Manual de marca y Paleta estrategica. Te gustaria agendar una entrevista para ver tu caso?' });
    }
    if (userMessage.includes('web') || userMessage.includes('pagina') || userMessage.includes('tienda')) {
      return res.json({ role: 'assistant', content: 'Una web es una herramienta real de ventas. Nuestro pack Web Development incluye React + Tailwind, Backend y Dominio .com.ar. Que tipo de negocio estas buscando digitalizar?' });
    }
    if (userMessage.includes('redes') || userMessage.includes('social') || userMessage.includes('reels')) {
      return res.json({ role: 'assistant', content: 'Para crecer en redes necesitas estrategia. El pack Social Media Tech incluye Estrategia IA, 5 Reels y Dashboard en Looker Studio. Queres que analicemos tu perfil actual?' });
    }
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'Sos el asistente inteligente de Bytes Creativos. Tu objetivo es convertir conversaciones en oportunidades de venta. Respuestas cortas, profesionales y directas. Nunca uses palabras como empatia o llamado a la accion. Siempre termina con una pregunta tecnica sobre su negocio. Si preguntan precio, deci que depende del diagnostico y ofrece agendar una reunion en la solapa Contacto.' },
          ...messages
        ],
        temperature: 0.7
      },
      { headers: { 'Authorization': "Bearer " + process.env.OPENAI_API_KEY, 'Content-Type': 'application/json' } }
    );
    res.json({ role: 'assistant', content: response.data.choices[0].message.content });
  } catch (error) {
    console.error('ERROR EN BYTES SERVER:', error.response?.data || error.message);
    res.status(500).json({ role: 'assistant', content: 'Estoy teniendo un problema tecnico. Por favor, escribime directamente a bytescreativoss@gmail.com o proba de nuevo en un minuto.' });
  }
});

// Todas las rutas no-API van al frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Servidor Bytes operando en puerto " + PORT));
