import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaLinkedin, FaYoutube, FaTiktok } from 'react-icons/fa';
import logo from '../imagenes/logobytes.png';

const Footer = () => {
  return (
    <footer className="bg-[#0F0F0F] text-white border-t border-white/5">
      {/* Links Section */}
      <div className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-[#C8F000] font-black uppercase text-sm mb-4">EXPLORAR</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
                <li><Link to="/soluciones" className="text-gray-400 hover:text-white transition">Soluciones</Link></li>
                <li><Link to="/recursos" className="text-gray-400 hover:text-white transition">Recursos</Link></li>
                <li><Link to="/contacto" className="text-gray-400 hover:text-white transition">Contacto</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#C8F000] font-black uppercase text-sm mb-4">SERVICIOS</h3>
              <ul className="space-y-2">
                <li><span className="text-gray-400">Brand Identity</span></li>
                <li><span className="text-gray-400">Web Development</span></li>
                <li><span className="text-gray-400">Social Media Tech</span></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#C8F000] font-black uppercase text-sm mb-4">SEGUINOS</h3>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/bytescreativoss/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition text-2xl">
                  <FaInstagram />
                </a>
                <a href="https://ar.linkedin.com/in/bytes-creativos-1004bb379" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition text-2xl">
                  <FaLinkedin />
                </a>
                <a href="https://www.youtube.com/@bytescreativoss" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition text-2xl">
                  <FaYoutube />
                </a>
                <a href="https://www.tiktok.com/@bytescreativoss" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition text-2xl">
                  <FaTiktok />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-sm text-gray-500">
          <p>© 2026 Bytes Creativos. Todos los derechos reservados.</p>
          <p>Política de Privacidad</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;