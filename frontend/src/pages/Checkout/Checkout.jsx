import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { orderApi } from '../../api/orderApi';
import Swal from 'sweetalert2';

const formatPrice = (price) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { product, quantity = 1 } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState('VNPAY');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const total = product ? product.price * quantity : 0;

  const handlePayment = async () => {
    if (!product) {
      Swal.fire('Lỗi', 'Không có sản phẩm để thanh toán', 'error');
      return;
    }
    setLoading(true);
    try {
      const res = await orderApi.create({
        paymentMethod,
        items: [{ productId: product.id, quantity }],
      });
      const orderId = res.data.orderId;
      const payRes = await orderApi.pay(orderId);
      Swal.fire({
        title: 'Tạo đơn hàng thành công!',
        html: `<p>Mã đơn: <b>${orderId}</b></p><p>Chuyển hướng thanh toán...</p>`,
        icon: 'success',
      }).then(() => {
        if (payRes.data?.paymentUrl) {
          window.open(payRes.data.paymentUrl, '_blank');
        }
        navigate('/orders');
      });
    } catch (err) {
      Swal.fire('Lỗi', err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-pink-50 to-white font-sans text-rose-800 text-left">
      <nav className="w-full bg-white border-b border-gray-100 h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <span onClick={() => navigate('/')} className="font-bold text-2xl text-rose-700 tracking-tight cursor-pointer">PixelHub</span>
        <button onClick={() => navigate(-1)} className="text-sm font-semibold text-gray-500 hover:text-rose-700 cursor-pointer bg-transparent border-none">✕ Hủy thanh toán</button>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-rose-900">Thanh toán an toàn</h1>
          <p className="text-sm text-gray-400 mt-1.5">Hoàn tất quá trình mua để thêm tài sản vào thư viện của bạn.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
              <h2 className="text-lg font-bold text-rose-900 mb-6">💳 Phương thức thanh toán</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div onClick={() => setPaymentMethod('VNPAY')}
                  className={`border rounded-xl p-4 flex items-center gap-3 cursor-pointer ${paymentMethod === 'VNPAY' ? 'border-rose-700 bg-rose-50 text-rose-700 font-bold' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <span>💳</span><span className="text-sm">VNPay</span>
                </div>
                <div onClick={() => setPaymentMethod('MOMO')}
                  className={`border rounded-xl p-4 flex items-center gap-3 cursor-pointer ${paymentMethod === 'MOMO' ? 'border-rose-700 bg-rose-50 text-rose-700 font-bold' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <span>🪪</span><span className="text-sm">MoMo</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
              <h2 className="text-lg font-bold text-rose-900 mb-4">📋 Thông tin biên lai</h2>
              <input type="email" placeholder="email@pixelhub.com" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-rose-700" />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs sticky top-28">
              <h2 className="text-lg font-bold text-rose-900 mb-4">Tóm tắt đơn hàng</h2>
              {product ? (
                <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl mb-4">
                  <img src={product.imageUrl} alt="" className="w-16 h-16 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-bold text-sm">{product.name}</h4>
                    <p className="text-xs text-gray-400">SL: {quantity}</p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-400 text-sm mb-4">Chưa chọn sản phẩm. Quay lại trang chi tiết.</p>
              )}
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-gray-400">Giá sản phẩm</span>
                <span className="font-bold">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between mb-4 text-sm">
                <span className="text-gray-400">Phí giao dịch</span>
                <span className="text-green-600 font-bold">Miễn phí</span>
              </div>
              <div className="flex justify-between mb-6">
                <span className="text-lg font-extrabold">Tổng cộng</span>
                <span className="text-xl font-black text-rose-900">{formatPrice(total)}</span>
              </div>
              <button onClick={handlePayment} disabled={loading || !product}
                className="w-full bg-rose-700 hover:bg-rose-800 disabled:opacity-50 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer border-none">
                🔒 {loading ? 'Đang xử lý...' : 'Thanh toán an toàn'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
