import React, { useState, useEffect } from 'react';
import { sellerApi } from '../../api/sellerApi';
import Swal from 'sweetalert2';

const formatPrice = (price) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

export default function SellerDashboard() {
  const [tab, setTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [revenueBar, setRevenueBar] = useState(null);
  const [revenuePie, setRevenuePie] = useState(null);
  const [form, setForm] = useState({ name: '', categoryId: 1, price: '', imageUrl: '', fileUrl: '' });

  useEffect(() => {
    if (tab === 'products') {
      sellerApi.getProducts().then((res) => setProducts(res.data?.products || []));
    } else if (tab === 'orders') {
      sellerApi.getOrders().then((res) => setOrders(res.data?.orders || []));
    } else if (tab === 'stats') {
      sellerApi.getRevenueBar().then((res) => setRevenueBar(res.data));
      sellerApi.getRevenuePie().then((res) => setRevenuePie(res.data));
    }
  }, [tab]);

  const handlePublish = async (e) => {
    e.preventDefault();
    try {
      await sellerApi.publishProduct({
        ...form,
        categoryId: Number(form.categoryId),
        price: Number(form.price),
      });
      Swal.fire('Thành công', 'Sản phẩm đã gửi chờ phê duyệt!', 'success');
      setForm({ name: '', categoryId: 1, price: '', imageUrl: '', fileUrl: '' });
      setTab('products');
    } catch (err) {
      Swal.fire('Lỗi', err.message, 'error');
    }
  };

  const tabs = [
    { id: 'products', label: 'Sản phẩm của tôi' },
    { id: 'publish', label: 'Đăng bán mới' },
    { id: 'orders', label: 'Đơn hàng' },
    { id: 'stats', label: 'Thống kê' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-rose-700 mb-8">Khu vực Họa sĩ</h1>

      <div className="flex gap-2 mb-8 flex-wrap">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-5 py-2 rounded-full text-sm font-bold border-none cursor-pointer ${tab === t.id ? 'bg-rose-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'products' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl border p-4 shadow-sm">
              <img src={p.imageUrl} alt="" className="w-full h-40 object-cover rounded-xl mb-3" />
              <h3 className="font-bold text-sm mb-1">{p.name}</h3>
              <p className="text-rose-700 font-bold text-sm mb-2">{formatPrice(p.price)}</p>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${p.status === 'APPROVED' ? 'bg-green-100 text-green-700' : p.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                {p.status}
              </span>
            </div>
          ))}
          {products.length === 0 && <p className="text-gray-400 col-span-3">Chưa có sản phẩm.</p>}
        </div>
      )}

      {tab === 'publish' && (
        <form onSubmit={handlePublish} className="bg-white rounded-2xl border p-6 max-w-lg space-y-4 shadow-sm">
          <input placeholder="Tên sản phẩm" className="w-full border rounded-xl p-3 text-sm" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input type="number" placeholder="Category ID" className="w-full border rounded-xl p-3 text-sm" value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} required />
          <input type="number" placeholder="Giá (VND)" className="w-full border rounded-xl p-3 text-sm" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
          <input placeholder="URL ảnh preview" className="w-full border rounded-xl p-3 text-sm" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} required />
          <input placeholder="URL file gốc" className="w-full border rounded-xl p-3 text-sm" value={form.fileUrl} onChange={(e) => setForm({ ...form, fileUrl: e.target.value })} required />
          <button type="submit" className="w-full bg-rose-700 text-white font-bold py-3 rounded-xl border-none cursor-pointer">Gửi phê duyệt</button>
        </form>
      )}

      {tab === 'orders' && (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.orderId} className="bg-white rounded-2xl border p-5 shadow-sm">
              <div className="flex justify-between mb-3">
                <span className="font-bold">{o.orderId}</span>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${o.paymentStatus === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{o.paymentStatus}</span>
              </div>
              <p className="text-sm text-gray-500 mb-2">Khách: {o.buyer?.fullName} ({o.buyer?.email})</p>
              {o.items?.map((item) => (
                <p key={item.productId} className="text-sm">{item.name} x{item.quantity} — {formatPrice(item.unitPrice)}</p>
              ))}
              <p className="font-bold text-rose-700 mt-2">Tổng: {formatPrice(o.subTotal)}</p>
            </div>
          ))}
          {orders.length === 0 && <p className="text-gray-400">Chưa có đơn hàng.</p>}
        </div>
      )}

      {tab === 'stats' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <h3 className="font-bold mb-4">Doanh thu (Biểu đồ cột)</h3>
            {revenueBar && (
              <>
                <p className="text-2xl font-extrabold text-rose-700 mb-1">{formatPrice(revenueBar.summary?.totalRevenue)}</p>
                <p className="text-sm text-green-600 mb-4">Tăng trưởng: {revenueBar.summary?.growthRate}</p>
                <div className="flex items-end gap-2 h-32">
                  {revenueBar.chartData?.datasets?.[0]?.data?.map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full bg-blue-400/50 rounded-t" style={{ height: `${Math.min(100, Number(val) / 200000)}%`, minHeight: '8px' }} />
                      <span className="text-[10px] text-gray-400">{revenueBar.chartData.labels[i]}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <h3 className="font-bold mb-4">Theo danh mục (Biểu đồ tròn)</h3>
            {revenuePie && (
              <>
                <p className="text-sm text-gray-500 mb-4">Tổng SP bán: {revenuePie.summary?.totalProductsSold}</p>
                <div className="space-y-2">
                  {revenuePie.chartData?.labels?.map((label, i) => (
                    <div key={label} className="flex justify-between text-sm">
                      <span>{label}</span>
                      <span className="font-bold">{revenuePie.chartData.datasets[0].data[i]}%</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
