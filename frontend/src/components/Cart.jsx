import React, { useState } from 'react';

const Cart = ({ isOpen, onClose, cartItems, promoCode, setPromoCode, onCheckout, onRemove }) => {
  // Estado local para capturar el correo del cliente en José C. Paz
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Fondo oscuro para cerrar al tocar fuera */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md">
          <div className="h-full flex flex-col bg-[#0F0F0F] border-l-2 border-[#C8F000] text-white shadow-2xl">
            
            {/* Encabezado en Español */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#161616]">
              <div>
                <h2 className="text-xl font-black italic tracking-tighter uppercase">Tu Pedido</h2>
                <p className="text-[10px] text-[#C8F000] uppercase tracking-widest font-mono">Estado: Validación Requerida</p>
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-[#C8F000] text-2xl transition-colors">✕</button>
            </div>

            {/* Lista de Servicios con opción de Quitar */}
            <div className="flex-1 py-6 overflow-y-auto px-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-20 text-gray-600 italic">No hay servicios seleccionados aún.</div>
              ) : (
                cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center bg-[#161616] p-4 rounded-xl border border-white/5 group">
                    <div>
                      <h3 className="font-bold text-sm uppercase">{item.name}</h3>
                      <p className="text-[#C8F000] font-mono text-xs">
                        {/* REGLA: Solo muestra "GRATUITO" si el precio es exactamente 0 */}
                        {item.price > 0 ? `$${item.price.toLocaleString()}` : "GRATUITO"}
                      </p>
                    </div>
                    <button 
                      onClick={() => onRemove(index)}
                      className="text-[9px] border border-red-500/50 text-red-500 px-2 py-1 rounded hover:bg-red-500 hover:text-white transition-all uppercase font-bold"
                    >
                      Quitar
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Panel de Validación y Captura de Correo */}
            <div className="p-8 border-t border-white/10 bg-[#0F0F0F]">
              
              {/* Campo de Correo Electrónico - Obligatorio para todos los casos */}
              <div className="mb-4">
                <label className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-widest">
                  ¿A qué correo enviamos el acceso?
                </label>
                <input 
                  type="email" 
                  placeholder="tu@email.com" 
                  className="w-full bg-[#161616] border border-white/10 p-4 rounded text-white focus:border-[#C8F000] outline-none text-sm transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Campo de Cupón - Genérico sin mencionar el código fijo */}
              <div className="mb-6">
                <label className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-widest">
                  Código de Autorización
                </label>
                <input 
                  type="text" 
                  placeholder="Ingresá tu código..." 
                  className="w-full bg-[#161616] border border-white/10 p-4 rounded text-[#C8F000] focus:border-[#C8F000] outline-none font-mono text-sm uppercase"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
              </div>

              <button 
                onClick={() => onCheckout(email)}
                className="w-full bg-[#C8F000] text-black py-4 rounded-full font-black hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(200,240,0,0.2)]"
              >
                {/* El botón cambia de texto según el contenido del carrito */}
                {cartItems.some(i => i.price > 0) ? "Proceder al Pago" : "Obtener Acceso Gratis"}
              </button>

              <p className="mt-6 text-[8px] text-gray-600 text-center leading-relaxed uppercase tracking-[0.2em]">
                Soporte Técnico: <span className="text-gray-400 font-bold">bytescreativoss@gmail.com</span>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;