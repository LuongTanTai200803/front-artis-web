import React, { useState, useEffect } from 'react';
import { orderApi } from '../../api/orderApi';

const formatPrice = (price) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

const statusColor = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  COMPLETED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
};

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderApi.history({ page: 1, size: 20 })
      .then((res) => setOrders(res.data?.orders || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-rose-700 mb-8">Lịch sử mua hàng</h1>

      {loading && <p className="text-gray-400">Đang tải...</p>}

      {!loading && orders.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <span className="text-4xl block mb-4">📦</span>
          <p>Chưa có đơn hàng nào.</p>
        </div>
      )}

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.orderId} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-bold text-rose-900">{order.orderId}</p>
                <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleString('vi-VN')}</p>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusColor[order.orderStatus] || 'bg-gray-100 text-gray-600'}`}>
                {order.orderStatus}
              </span>
            </div>
            <div className="space-y-3 mb-4">
              {order.items?.map((item) => (
                <div key={item.productId} className="flex items-center gap-4">
                  <img src={item.imageUrl} alt="" className="w-14 h-14 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{item.name}</p>
                    <p className="text-xs text-gray-400">{formatPrice(item.unitPrice)}</p>
                  </div>
                  {item.fileUrl && (
                    <a href={item.fileUrl} target="_blank" rel="noreferrer" className="text-xs text-rose-700 font-bold hover:underline">
                      Tải file gốc
                    </a>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between border-t pt-4 text-sm">
              <span className="text-gray-500">{order.paymentMethod}</span>
              <span className="font-extrabold text-rose-700">{formatPrice(order.totalAmount)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
