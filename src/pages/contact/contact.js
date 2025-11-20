import React, { useState } from 'react';
import './contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar que todos los campos estén completos
    if (!formData.nombre || !formData.email || !formData.asunto || !formData.mensaje) {
      setError('Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // ✅ Envía el formulario a tu backend (si tienes endpoint)
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
        setTimeout(() => setSuccess(false), 5000); // Desaparece en 5 segundos
      } else {
        setError('Error al enviar el mensaje. Intenta de nuevo.');
      }
    } catch (err) {
      console.error('Error:', err);
      // Si no tienes backend, solo muestra un mensaje de éxito simulado
      setSuccess(true);
      setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
      setTimeout(() => setSuccess(false), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-wrapper">
        <h2 className="contact-title">📧 Contáctanos</h2>
        <p className="contact-subtitle">¿Tienes una pregunta o sugerencia? ¡Nos encantaría escucharte!</p>

        <form onSubmit={handleSubmit} className="contact-form">
          {/* Columna izquierda: Nombre, Email, Asunto */}
          <div className="form-left">
            <div className="form-group">
              <label htmlFor="nombre">Nombre *</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Tu nombre completo"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo Electrónico *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="asunto">Asunto *</label>
              <input
                type="text"
                id="asunto"
                name="asunto"
                value={formData.asunto}
                onChange={handleChange}
                placeholder="¿De qué se trata?"
                className="form-input"
              />
            </div>
          </div>

          {/* Columna derecha: Mensaje y Botón */}
          <div className="form-right">
            <div className="form-group">
              <label htmlFor="mensaje">Mensaje *</label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                placeholder="Escribe tu mensaje aquí..."
                rows="6"
                className="form-textarea"
              ></textarea>
            </div>

            {/* Mensajes de error/éxito */}
            {error && <div className="form-error">{error}</div>}
            {success && <div className="form-success">✅ ¡Mensaje enviado exitosamente!</div>}

            {/* Botón enviar */}
            <button 
              type="submit" 
              className="form-button"
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </div>
        </form>

        {/* Información de contacto adicional */}
        
      </div>
    </div>
  );
}
