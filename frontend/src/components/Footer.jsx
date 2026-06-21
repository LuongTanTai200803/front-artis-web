import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-white/70 border-t border-pink-100 py-8 mt-auto select-none text-rose-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Khối bên trái: Bản quyền */}
        <div className="text-center sm:text-left">
          <span className="block font-bold text-lg text-rose-700 mb-1">
            PixelHub
          </span>
          <p className="text-xs text-gray-400 font-medium tracking-wide">
            © 2024 PixelHub. Bản quyền thuộc về đội ngũ sáng tạo.
          </p>
        </div>

        {/* Khối bên phải: Các liên kết điều khoản (Bỏ gạch chân mặc định, chỉ hiện khi hover) */}
        <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-gray-600">
          <a href="#support" className="hover:text-rose-700 no-underline hover:underline transition-all">
            Trung tâm hỗ trợ
          </a>
          <a href="#terms" className="hover:text-rose-700 no-underline hover:underline transition-all">
            Điều khoản dịch vụ
          </a>
          <a href="#privacy" className="hover:text-rose-700 no-underline hover:underline transition-all">
            Chính sách bảo mật
          </a>
          <a href="#contact" className="hover:text-rose-700 no-underline hover:underline transition-all">
            Liên hệ
          </a>
        </div>

      </div>
    </footer>
  );
}