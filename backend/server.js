const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    
    // Validamos que lleguen mensajes para evitar errores de lectura
    if (!messages || messages.length === 0) {
      return res.status(400).json({ error: "No hay mensajes en la solicitud" });
    }

    const userMessage = messages[messages.length - 1].content.toLowerCase();

    // 🔥 DETECTOR DE PRODUCTOS (RESPUESTA DIRECTA)
    // Mantenemos tu lógica de "vendedor estrella"

    if (userMessage.includes("brand") || userMessage.includes("identidad") || userMessage.includes("logo")) {
      return res.json({
        role: "assistant",
        content: "La identidad de marca es la base para posicionarte profesionalmente. Nuestro pack Brand Identity incluye Logo, Manual de marca y Paleta estratégica. ¿Te gustaría agendar una entrevista para ver tu caso?"
      });
    }

    if (userMessage.includes("web") || userMessage.includes("pagina") || userMessage.includes("tienda")) {
      return res.json({
        role: "assistant",
        content: "Una web es una herramienta real de ventas. Nuestro pack Web Development incluye React + Tailwind, Backend y Dominio .com.ar. ¿Qué tipo de negocio estás buscando digitalizar?"
      });
    }

    if (userMessage.includes("redes") || userMessage.includes("social") || userMessage.includes("reels")) {
      return res.json({
        role: "assistant",
        content: "Para crecer en redes necesitás estrategia. El pack Social Media Tech incluye Estrategia IA, 5 Reels y Dashboard en Looker Studio. ¿Querés que analicemos tu perfil actual?"
      });
    }

    // 🤖 SI NO ES PRODUCTO ESPECÍFICO → OPENAI
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Sos el asistente inteligente de Bytes Creativos. Tu objetivo es convertir conversaciones en oportunidades de venta. Respuestas cortas, profesionales y directas. Nunca uses palabras como 'empatía' o 'llamado a la acción'. Siempre terminá con una pregunta técnica sobre su negocio. Si preguntan precio, decí que depende del diagnóstico y ofrecé agendar una reunión en la solapa Contacto."
          },
          ...messages
        ],
        temperature: 0.7 // Agregamos un toque de creatividad controlada
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Enviamos solo el mensaje limpio
    res.json({
      role: "assistant",
      content: response.data.choices[0].message.content
    });

  } catch (error) {
    console.error("ERROR EN BYTES SERVER:", error.response?.data || error.message);
    res.status(500).json({ 
      role: "assistant",
      content: "Estoy teniendo un problema técnico para conectar con mi base de datos. Por favor, escribime directamente a bytescreativoss@gmail.com o probá de nuevo en un minuto." 
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor Bytes operando en puerto ${PORT}`));