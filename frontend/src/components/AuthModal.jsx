import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const AuthModal = ({ isOpen, onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phoneNumber: '',
    role: 'BUYER',
    avatarUrl: '',
  });
  const { login, register } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login({ email: formData.email, password: formData.password });
        if (onSuccess) onSuccess('Đăng nhập thành công!');
      } else {
        await register({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          role: formData.role,
          avatarUrl: formData.avatarUrl || undefined,
        });
        if (onSuccess) onSuccess('Đăng ký thành công! Vui lòng đăng nhập.');
        setIsLogin(true);
      }
      onClose();
    } catch (err) {
      if (onSuccess) onSuccess(err.message || 'Có lỗi xảy ra!');
    }
  };

  return (
    <div className="fixed inset-0 bg-pink-200/60 flex items-center justify-center z-[2000] p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col text-left">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-extrabold text-rose-900 text-lg">
            {isLogin ? 'ĐĂNG NHẬP HỆ THỐNG' : 'TẠO TÀI KHOẢN MỚI'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-rose-700 text-xl font-bold cursor-pointer bg-transparent border-none">✕</button>
        </div>

        <div className="flex px-6 pt-5 gap-4">
          <button type="button" className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-colors cursor-pointer border-none ${isLogin ? 'bg-rose-700 text-white shadow-sm' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`} onClick={() => setIsLogin(true)}>Đăng nhập</button>
          <button type="button" className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-colors cursor-pointer border-none ${!isLogin ? 'bg-rose-700 text-white shadow-sm' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`} onClick={() => setIsLogin(false)}>Đăng ký</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          {!isLogin && (
            <>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase">Họ và tên</label>
                <input type="text" placeholder="Nguyễn Văn A" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-rose-700" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} required />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase">Số điện thoại</label>
                <input type="tel" placeholder="0901234567" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-rose-700" value={formData.phoneNumber} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} required />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase">Vai trò</label>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-rose-700" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                  <option value="BUYER">Người mua</option>
                  <option value="SELLER">Họa sĩ</option>
                </select>
              </div>
            </>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-400 uppercase">Email</label>
            <input type="email" placeholder="email@example.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-rose-700" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          </div>

          <div className="flex flex-col gap-1.5 mb-2">
            <label className="text-xs font-bold text-gray-400 uppercase">Mật khẩu</label>
            <input type="password" placeholder="Nhập mật khẩu..." className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-rose-700" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl border-none cursor-pointer">Hủy bỏ</button>
            <button type="submit" className="px-5 py-2.5 text-sm font-bold text-white bg-rose-700 hover:bg-rose-800 rounded-xl border-none cursor-pointer">{isLogin ? 'Vào Hệ Thống' : 'Tạo Tài Khoản'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
