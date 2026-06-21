import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productApi } from '../../api/productApi';
import { cartApi } from '../../api/cartApi';
import { useAuth } from '../../contexts/AuthContext';
import Swal from 'sweetalert2';

const formatPrice = (price) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    productApi.getById(id)
      .then((res) => setProduct(res.data))
      .catch(() => Swal.fire('Lỗi', 'Không tìm thấy sản phẩm', 'error'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      Swal.fire('Yêu cầu đăng nhập', 'Vui lòng đăng nhập tài khoản Buyer để mua hàng', 'warning');
      return;
    }
    if (user.role !== 'BUYER') {
      Swal.fire('Không có quyền', 'Chỉ tài khoản Người mua mới có thể thêm vào giỏ hàng', 'warning');
      return;
    }
    try {
      await cartApi.addItem({ productId: Number(id), quantity });
      Swal.fire('Thành công', 'Đã thêm vào giỏ hàng!', 'success');
    } catch (err) {
      Swal.fire('Lỗi', err.message, 'error');
    }
  };

  const handleCheckout = () => {
    if (!user) {
      Swal.fire('Yêu cầu đăng nhập', 'Vui lòng đăng nhập để thanh toán', 'warning');
      return;
    }
    navigate('/checkout', { state: { product, quantity } });
  };

  if (loading) return <div className="py-20 text-center text-gray-400">Đang tải...</div>;
  if (!product) return null;

  return (
    <div className="min-h-screen bg-transparent py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4">
            <img src={product.imageUrl} alt={product.name} className="w-full h-[500px] object-cover rounded-xl shadow-sm bg-gray-200" />
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <img src={product.seller?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'} alt="" className="w-16 h-16 rounded-full object-cover" />
              <div>
                <h2 className="text-xl font-bold text-rose-900">{product.seller?.fullName}</h2>
                <p className="text-sm text-gray-500">👁 {product.viewCount} lượt xem</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex border-b border-gray-200 px-6 pt-4 gap-6">
              <button className="pb-3 border-b-2 border-rose-700 text-rose-700 font-bold">Mô tả chi tiết</button>
            </div>
            <div className="p-6 text-gray-700 leading-relaxed">
              <p className="mb-4">{product.description || 'Chưa có mô tả chi tiết.'}</p>
              <h3 className="font-bold text-rose-900 mt-6 mb-2">Bạn sẽ nhận được gì?</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>File độ phân giải cao chất lượng gốc.</li>
                <li>Ảnh preview có watermark bảo vệ bản quyền.</li>
                <li>Quyền sử dụng theo gói đã chọn.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm sticky top-24">
            <h3 className="text-2xl font-bold text-rose-900 mb-2">{product.name}</h3>
            <p className="text-rose-700 font-extrabold text-3xl mb-6">{formatPrice(product.price)}</p>

            {product.category && (
              <span className="inline-block bg-rose-50 text-rose-700 text-xs font-bold px-3 py-1 rounded-full mb-6">
                {product.category.name}
              </span>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Số lượng</label>
              <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-rose-700" />
            </div>

            <button onClick={handleAddToCart} className="w-full bg-gray-100 text-rose-900 font-bold py-3 px-4 rounded-xl mb-3 hover:bg-gray-200 transition">
              Thêm vào giỏ hàng
            </button>
            <button onClick={handleCheckout} className="w-full bg-rose-700 text-white font-bold py-3 px-4 rounded-xl hover:bg-rose-800 transition">
              Tiến hành thanh toán ➡️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
