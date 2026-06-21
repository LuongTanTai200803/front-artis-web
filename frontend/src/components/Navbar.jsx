import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Swal from 'sweetalert2';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout, isRole } = useAuth();

  const handleLogout = async () => {
    await logout();
    Swal.fire('Đã đăng xuất', '', 'success');
  };

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-pink-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 grid grid-cols-3 items-center">
        <div className="flex items-center gap-8 justify-self-start">
          <span onClick={() => navigate('/')} className="font-bold text-2xl text-rose-700 tracking-tight cursor-pointer select-none">
            PixelHub
          </span>
          <div className="hidden md:flex items-center gap-6 font-medium text-rose-600 select-none">
            <span onClick={() => navigate('/')} className="hover:text-rose-700 cursor-pointer transition-colors">Khám phá</span>
            {isRole('SELLER') && (
              <span onClick={() => navigate('/seller')} className="hover:text-rose-700 cursor-pointer transition-colors">Họa sĩ</span>
            )}
            {isRole('ADMIN') && (
              <span onClick={() => navigate('/admin')} className="hover:text-rose-700 cursor-pointer transition-colors">Admin</span>
            )}
          </div>
        </div>

        <div className="w-full max-w-lg flex items-center gap-3 justify-self-center">
          <div className="relative w-full hidden sm:block">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 text-sm">🔍</div>
            <input type="text" placeholder="Tìm kiếm..." className="w-full bg-gray-100 border border-gray-200 rounded-full py-2 pl-10 pr-4 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:border-rose-700" />
          </div>
          <button onClick={() => navigate('/workspace')} className="shrink-0 px-5 py-2 bg-rose-700 text-white text-sm font-sans font-semibold rounded-full hover:bg-rose-800 transition-colors shadow-sm flex items-center gap-1.5">
            <span>💻</span> Workspace
          </button>
        </div>

        <div className="flex items-center gap-5 justify-self-end">
          {/* Nút Giỏ Hàng (Cart) */}
          {(!user || isRole('BUYER')) && (
            <div 
              onClick={() => navigate('/cart')} 
              className="relative cursor-pointer p-2 hover:bg-rose-50 rounded-full transition-colors group"
              title="Giỏ hàng"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 group-hover:text-rose-700 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {/* Badge số lượng (tạm thời mockup số 2) */}
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-rose-600 border-2 border-white rounded-full">
                2
              </span>
            </div>
          )}

          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2.5">
                <img src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'} alt="" className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-bold text-rose-800 leading-tight">{user.fullName}</p>
                  <p className="text-[10px] text-gray-400 font-medium mt-0.5">{user.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
                {isRole('BUYER') && (
                  <button onClick={() => navigate('/orders')} className="text-sm font-bold text-gray-500 hover:text-rose-700 hover:bg-transparent cursor-pointer bg-transparent border-none shadow-none outline-none focus:outline-none">
                    Đơn mua
                  </button>
                )}
                <button onClick={handleLogout} className="text-sm font-bold text-gray-500 hover:text-rose-700 hover:bg-transparent cursor-pointer bg-transparent border-none shadow-none outline-none focus:outline-none">
                  Đăng xuất
                </button>
              </div>
            </div>
          ) : (
        <button onClick={() => navigate('/auth')} className="px-6 py-2 bg-gray-100 text-gray-800 text-sm font-bold rounded-full hover:bg-gray-200 transition-colors cursor-pointer border-none">
          Vào hệ thống
        </button>
          )}
        </div>
      </div>
    </nav>
  );
}
