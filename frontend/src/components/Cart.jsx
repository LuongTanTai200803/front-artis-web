import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { cartApi } from '../api/cartApi';

const formatPrice = (price) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await cartApi.getCart();
        if (res.data?.items) {
          const mappedItems = res.data.items.map(item => ({
            id: item.cartItemId,
            product: {
              id: item.productId,
              name: item.productName,
              imageUrl: item.imageUrl,
              price: item.price,
            },
            quantity: item.quantity,
          }));
          setCartItems(mappedItems);
        }
      } catch (error) {
        console.error('Lỗi tải giỏ hàng:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(cartItems.map(item => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectItem = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemove = (id) => {
    Swal.fire({
      title: 'Xóa sản phẩm?',
      text: "Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#be123c',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await cartApi.removeItem(id);
          setCartItems(prev => prev.filter(item => item.id !== id));
          setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
          Swal.fire('Đã xóa!', 'Sản phẩm đã được xóa.', 'success');
        } catch (error) {
          Swal.fire('Lỗi', 'Không thể xóa sản phẩm.', 'error');
        }
      }
    });
  };

  const totalAmount = cartItems
    .filter(item => selectedIds.includes(item.id))
    .reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = () => {
    if (selectedIds.length === 0) {
      Swal.fire('Chú ý', 'Vui lòng chọn ít nhất 1 sản phẩm để thanh toán', 'warning');
      return;
    }
    // Tạm thời truyền sản phẩm đầu tiên được chọn sang trang Checkout hiện tại
    const selectedItem = cartItems.find(item => item.id === selectedIds[0]);
    navigate('/checkout', { state: { product: selectedItem.product, quantity: selectedItem.quantity } });
  };

  if (loading) return <div className="py-20 text-center text-gray-400">Đang tải giỏ hàng...</div>;

  return (
    <div className="min-h-screen bg-transparent pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <h1 className="text-2xl font-bold text-rose-700 mb-6">Giỏ hàng của bạn</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-gray-500 mb-6">Giỏ hàng của bạn còn trống</p>
            <button onClick={() => navigate('/')} className="px-8 py-3 bg-rose-700 text-white rounded-full font-bold hover:bg-rose-800 transition cursor-pointer border-none shadow-md">
              Mua sắm ngay
            </button>
          </div>
        ) : (
          <>
            {/* Header Bảng (Phong cách Shopee) */}
            <div className="hidden md:grid grid-cols-12 gap-4 bg-white p-4 rounded-xl shadow-sm mb-4 text-sm font-bold text-gray-400 uppercase tracking-wider text-center items-center border border-gray-50">
              <div className="col-span-5 flex items-center gap-4 text-left pl-2">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 accent-rose-600 rounded cursor-pointer"
                  checked={selectedIds.length === cartItems.length && cartItems.length > 0}
                  onChange={handleSelectAll}
                />
                <span>Sản phẩm</span>
              </div>
              <div className="col-span-2">Đơn giá</div>
              <div className="col-span-2">Số lượng</div>
              <div className="col-span-2">Số tiền</div>
              <div className="col-span-1">Thao tác</div>
            </div>

            {/* Danh sách sản phẩm */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:grid md:grid-cols-12 gap-4 items-center text-sm hover:shadow-md transition-shadow">
                  
                  {/* Cột SP (Check + Ảnh + Tên) */}
                  <div className="col-span-12 md:col-span-5 flex items-start md:items-center gap-4 w-full pl-2">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 accent-rose-600 rounded cursor-pointer mt-1 md:mt-0 flex-shrink-0"
                      checked={selectedIds.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                    />
                    <img src={item.product.imageUrl} alt={item.product.name} className="w-20 h-20 object-cover rounded-lg border border-gray-100 flex-shrink-0" />
                    <div className="flex-1 flex flex-col text-left">
                      <span className="text-[11px] text-gray-400 font-medium mb-1 uppercase tracking-wider">{item.product.seller?.fullName || 'Họa sĩ'}</span>
                      <span className="font-bold text-gray-800 line-clamp-2 leading-tight">{item.product.name}</span>
                      {/* Hiển thị giá trên mobile */}
                      <span className="md:hidden font-bold text-rose-700 mt-2">{formatPrice(item.product.price)}</span>
                    </div>
                  </div>

                  {/* Cột Đơn giá */}
                  <div className="hidden md:block col-span-2 text-center font-medium text-gray-500">
                    {formatPrice(item.product.price)}
                  </div>

                  {/* Cột Số lượng */}
                  <div className="col-span-12 md:col-span-2 flex justify-start md:justify-center w-full ml-9 md:ml-0">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                      <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} className="px-3 py-1.5 hover:bg-gray-200 text-gray-600 font-bold cursor-pointer border-none transition">-</button>
                      <input type="number" value={item.quantity} readOnly className="w-10 text-center text-sm py-1 border-x border-gray-200 bg-white outline-none font-medium" />
                      <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)} className="px-3 py-1.5 hover:bg-gray-200 text-gray-600 font-bold cursor-pointer border-none transition">+</button>
                    </div>
                  </div>

                  {/* Cột Số tiền */}
                  <div className="hidden md:block col-span-2 text-center font-bold text-rose-700">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>

                  {/* Cột Thao tác */}
                  <div className="col-span-12 md:col-span-1 flex justify-end md:justify-center w-full">
                    <button onClick={() => handleRemove(item.id)} className="text-gray-400 hover:text-red-500 font-bold text-xs bg-gray-100 hover:bg-red-50 px-3 py-1.5 rounded-lg transition cursor-pointer border-none">
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thanh công cụ Sticky Bottom (Shopee style) */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)] z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
            
            {/* Bên Trái: Chọn tất cả */}
            <div className="flex items-center gap-4 pl-2">
              <input type="checkbox" id="selectAllBottom" className="w-5 h-5 accent-rose-600 rounded cursor-pointer" checked={selectedIds.length === cartItems.length && cartItems.length > 0} onChange={handleSelectAll} />
              <label htmlFor="selectAllBottom" className="text-sm font-bold text-gray-600 cursor-pointer select-none hidden sm:inline">
                Chọn tất cả ({cartItems.length})
              </label>
            </div>

            {/* Bên Phải: Tổng tiền + Nút Mua */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="text-right flex flex-col justify-center">
                <div className="text-xs text-gray-500 font-medium">Tổng thanh toán (<span className="text-rose-700 font-bold">{selectedIds.length}</span> Sản phẩm):</div>
                <div className="text-xl sm:text-2xl font-black text-rose-700 mt-0.5">{formatPrice(totalAmount)}</div>
              </div>
              <button onClick={handleCheckout} disabled={selectedIds.length === 0} className={`px-8 sm:px-10 py-3.5 rounded-xl font-bold text-white transition whitespace-nowrap border-none ${selectedIds.length > 0 ? 'bg-rose-700 hover:bg-rose-800 cursor-pointer shadow-lg shadow-rose-200' : 'bg-gray-300 cursor-not-allowed'}`}>
                Mua Hàng
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}