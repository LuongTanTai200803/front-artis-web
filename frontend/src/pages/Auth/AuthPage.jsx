import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Swal from 'sweetalert2';

const initialFormData = {
  email: '',
  password: '',
  fullName: '',
  phoneNumber: '',
  role: 'BUYER',
  avatarUrl: '',
};

export default function AuthPage() {
  const { user, login, register } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await login({ email: formData.email, password: formData.password });
        Swal.fire('Đăng nhập thành công', 'Chào mừng bạn trở lại!', 'success');
        navigate('/');
      } else {
        await register({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          role: formData.role,
          avatarUrl: formData.avatarUrl || undefined,
        });
        Swal.fire('Đăng ký thành công', 'Tài khoản đã được tạo, vui lòng đăng nhập.', 'success');
        setIsLogin(true);
      }
    } catch (error) {
      Swal.fire('Lỗi', error?.response?.data?.message || error.message || 'Có lỗi xảy ra.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-pink-50 via-rose-100 to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl rounded-4xl bg-white/90 border border-pink-100 shadow-2xl overflow-hidden backdrop-blur-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8">
          <div className="p-10 lg:p-12 bg-rose-700 text-white">
            <div className="mb-10">
              <span className="inline-block rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.24em] font-bold text-white/90 mb-4">PixelHub</span>
              <h1 className="text-4xl font-extrabold leading-tight">{isLogin ? 'Đăng nhập' : 'Đăng ký'}</h1>
              <p className="mt-4 text-sm text-rose-100/85 leading-relaxed">
                {isLogin
                  ? 'Nhập thông tin để tiếp tục trải nghiệm mua bán tác phẩm độc đáo.'
                  : 'Tạo tài khoản mới để trở thành người mua hoặc họa sĩ trên PixelHub.'}
              </p>
            </div>

            <div className="space-y-5 text-sm text-rose-100/90">
              <div className="rounded-3xl bg-white/10 p-5">
                <p className="font-bold">Lợi ích khi sử dụng PixelHub</p>
                <ul className="mt-3 space-y-3 text-rose-100/85">
                  <li>• Mua bán tác phẩm minh họa chuyên nghiệp.</li>
                  <li>• Quản lý đơn hàng và công việc cá nhân.</li>
                  <li>• Giao diện gọn đẹp, thân thiện với người dùng.</li>
                </ul>
              </div>
              <div className="rounded-3xl bg-white/10 p-5">
                <p className="font-bold">Hỗ trợ</p>
                <p className="mt-2 leading-relaxed">Đăng ký và đăng nhập ngay hôm nay để tận hưởng hệ sinh thái sáng tạo đầy cảm hứng.</p>
              </div>
            </div>
          </div>

          <div className="p-10 lg:p-12">
            <div className="flex gap-3 mb-8">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`flex-1 rounded-2xl py-3 text-sm font-semibold transition ${isLogin ? 'bg-rose-700 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Đăng nhập
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`flex-1 rounded-2xl py-3 text-sm font-semibold transition ${!isLogin ? 'bg-rose-700 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Đăng ký
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="block text-sm text-gray-500">
                      <span className="block mb-2 uppercase tracking-[0.12em] font-bold text-gray-400">Họ và tên</span>
                      <input
                        type="text"
                        placeholder="Nguyễn Văn A"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-rose-500 focus:outline-none"
                        required
                      />
                    </label>

                    <label className="block text-sm text-gray-500">
                      <span className="block mb-2 uppercase tracking-[0.12em] font-bold text-gray-400">Số điện thoại</span>
                      <input
                        type="tel"
                        placeholder="0901234567"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        className="w-full rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-rose-500 focus:outline-none"
                        required
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="block text-sm text-gray-500">
                      <span className="block mb-2 uppercase tracking-[0.12em] font-bold text-gray-400">Vai trò</span>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-rose-500 focus:outline-none"
                      >
                        <option value="BUYER">Người mua</option>
                        <option value="SELLER">Họa sĩ</option>
                      </select>
                    </label>

                    <label className="block text-sm text-gray-500">
                      <span className="block mb-2 uppercase tracking-[0.12em] font-bold text-gray-400">Ảnh đại diện</span>
                      <input
                        type="url"
                        placeholder="https://..."
                        value={formData.avatarUrl}
                        onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                        className="w-full rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-rose-500 focus:outline-none"
                      />
                    </label>
                  </div>
                </>
              )}

              <label className="block text-sm text-gray-500">
                <span className="block mb-2 uppercase tracking-[0.12em] font-bold text-gray-400">Email</span>
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-rose-500 focus:outline-none"
                  required
                />
              </label>

              <label className="block text-sm text-gray-500">
                <span className="block mb-2 uppercase tracking-[0.12em] font-bold text-gray-400">Mật khẩu</span>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-rose-500 focus:outline-none"
                  required
                />
              </label>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setFormData(initialFormData);
                  }}
                  className="text-sm font-semibold text-gray-500 hover:text-rose-700 transition"
                >
                  {isLogin ? 'Chưa có tài khoản? Đăng ký' : 'Đã có tài khoản? Đăng nhập'}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-3xl bg-rose-700 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-rose-800 disabled:opacity-60"
                >
                  {loading ? 'Đang xử lý...' : isLogin ? 'Đăng nhập' : 'Đăng ký'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
