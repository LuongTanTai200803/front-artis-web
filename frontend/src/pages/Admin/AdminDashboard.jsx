import React, { useState, useEffect } from 'react';
import { adminApi } from '../../api/adminApi';
import Swal from 'sweetalert2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const formatPrice = (price) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

const statusLabel = {
  PENDING: 'Chờ duyệt',
  APPROVED: 'Đã duyệt',
  REJECTED: 'Từ chối',
};

export default function AdminDashboard() {
  const [tab, setTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('PENDING');
  const [orderStatusFilter, setOrderStatusFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(false);
  const [barData, setBarData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [barSummary, setBarSummary] = useState(null);
  const [pieSummary, setPieSummary] = useState(null);

  const tabs = [
    { id: 'users', label: 'Người dùng' },
    { id: 'products', label: 'Sản phẩm' },
    { id: 'orders', label: 'Đơn hàng' },
    { id: 'stats', label: 'Thống kê' },
  ];

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = roleFilter ? { role: roleFilter } : {};
      const res = await adminApi.getUsers(params);
      setUsers(res.data?.users || []);
    } catch (error) {
      console.error(error);
      setUsers([]);
      Swal.fire('Lỗi', 'Không tải được danh sách người dùng.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getProducts({ status: statusFilter });
      setProducts(res.data?.products || []);
    } catch (error) {
      console.error(error);
      setProducts([]);
      Swal.fire('Lỗi', 'Không tải được danh sách sản phẩm.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getOrders();
      setOrders(res.data?.orders || []);
    } catch (error) {
      console.error(error);
      setOrders([]);
      Swal.fire('Lỗi', 'Không tải được danh sách đơn hàng.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    setStatsLoading(true);
    try {
      const barRes = await adminApi.getRevenueBar({ type: 'WEEK', startDate: '2026-05-01', endDate: '2026-05-31' });
      if (barRes.data) {
        setBarSummary(barRes.data.summary);
        setBarData(barRes.data.chartData);
      }

      const pieRes = await adminApi.getRevenuePie({ month: 5, year: 2026 });
      if (pieRes.data) {
        setPieSummary(pieRes.data.summary);
        setPieData(pieRes.data.chartData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    if (tab === 'users') fetchUsers();
    else if (tab === 'products') fetchProducts();
    else if (tab === 'orders') fetchOrders();
    else if (tab === 'stats') fetchStats();
  }, [tab, roleFilter, statusFilter]);

  const handleUpdateProductStatus = async (id, status) => {
    setActionLoading(true);
    try {
      await adminApi.updateProductStatus(id, { status });
      Swal.fire('Cập nhật thành công', `Sản phẩm đã chuyển sang trạng thái ${statusLabel[status]}.`, 'success');
      
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error(error);
      Swal.fire('Lỗi', 'Không thể cập nhật trạng thái sản phẩm.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const filteredOrders = orderStatusFilter
    ? orders.filter((order) => order.orderStatus === orderStatusFilter)
    : orders;

  const orderStatuses = ['Tất cả', ...Array.from(new Set(orders.map((order) => order.orderStatus || ''))).filter(Boolean)];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-rose-700 mb-8">Quản trị hệ thống</h1>

      <div className="flex gap-2 mb-8 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-5 py-2 rounded-full text-sm font-bold border-none cursor-pointer ${tab === t.id ? 'bg-rose-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'users' && (
        <>
          <div className="flex flex-wrap gap-2 mb-4">
            {['', 'BUYER', 'SELLER', 'ADMIN'].map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-3 py-1 rounded-full text-xs font-bold border-none cursor-pointer ${roleFilter === role ? 'bg-rose-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {role || 'Tất cả'}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl border overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-bold">ID</th>
                  <th className="text-left p-4 font-bold">Email</th>
                  <th className="text-left p-4 font-bold">Tên</th>
                  <th className="text-left p-4 font-bold">Vai trò</th>
                  <th className="text-left p-4 font-bold">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-400">Đang tải danh sách người dùng...</td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-400">Không có người dùng phù hợp.</td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="border-t">
                      <td className="p-4">{user.id}</td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4">{user.fullName}</td>
                      <td className="p-4">
                        <span className="bg-rose-50 text-rose-700 text-xs font-bold px-2 py-1 rounded-full">{user.role}</span>
                      </td>
                      <td className="p-4">{user.status || 'Hoạt động'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === 'products' && (
        <>
          <div className="flex flex-wrap gap-2 mb-4">
            {['PENDING', 'APPROVED', 'REJECTED'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1 rounded-full text-xs font-bold border-none cursor-pointer ${statusFilter === status ? 'bg-rose-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {status}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="py-20 text-center text-gray-400">Đang tải danh sách sản phẩm...</div>
          ) : products.length === 0 ? (
            <div className="py-20 text-center text-gray-400">Không có sản phẩm trong trạng thái này.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl border p-4 shadow-sm flex flex-col">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-36 object-cover rounded-xl mb-3" />
                  <div className="flex-1">
                    <h3 className="font-bold text-sm mb-1">{product.name}</h3>
                    <p className="text-xs text-gray-400 mb-1">Họa sĩ: {product.seller?.fullName || 'Không xác định'}</p>
                    <p className="text-rose-700 font-bold text-sm mb-3">{formatPrice(product.price)}</p>
                    <span className={`inline-flex items-center text-xs font-bold px-2 py-1 rounded-full ${product.status === 'APPROVED' ? 'bg-green-100 text-green-700' : product.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {statusLabel[product.status] || product.status}
                    </span>
                  </div>

                  {product.status === 'PENDING' && (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        disabled={actionLoading}
                        onClick={() => handleUpdateProductStatus(product.id, 'APPROVED')}
                        className="px-4 py-2 text-xs font-bold rounded-xl bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        Duyệt
                      </button>
                      <button
                        type="button"
                        disabled={actionLoading}
                        onClick={() => handleUpdateProductStatus(product.id, 'REJECTED')}
                        className="px-4 py-2 text-xs font-bold rounded-xl bg-rose-100 text-rose-700 hover:bg-rose-200 transition-colors disabled:opacity-50"
                      >
                        Từ chối
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {tab === 'orders' && (
        <>
          <div className="flex flex-wrap gap-2 mb-4">
            {orderStatuses.map((status) => (
              <button
                key={status}
                onClick={() => setOrderStatusFilter(status === 'Tất cả' ? '' : status)}
                className={`px-3 py-1 rounded-full text-xs font-bold border-none cursor-pointer ${orderStatusFilter === status || (status === 'Tất cả' && !orderStatusFilter) ? 'bg-rose-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl border overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-bold">Mã đơn</th>
                  <th className="text-left p-4 font-bold">Người mua</th>
                  <th className="text-left p-4 font-bold">Tổng tiền</th>
                  <th className="text-left p-4 font-bold">PTTT</th>
                  <th className="text-left p-4 font-bold">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-400">Đang tải đơn hàng...</td>
                  </tr>
                ) : filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-400">Không có đơn hàng phù hợp.</td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.orderId} className="border-t">
                      <td className="p-4 font-mono text-xs">{order.orderId}</td>
                      <td className="p-4">{order.buyerName || order.buyer?.fullName || 'Khách'}</td>
                      <td className="p-4 font-bold text-rose-700">{formatPrice(order.totalAmount)}</td>
                      <td className="p-4">{order.paymentMethod || 'Chưa rõ'}</td>
                      <td className="p-4">{order.orderStatus || 'Chưa cập nhật'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === 'stats' && (
        <div className="space-y-8 mt-4">
          {statsLoading ? (
            <div className="py-20 text-center text-gray-400">Đang tải dữ liệu thống kê...</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Biểu đồ cột */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Doanh thu theo thời gian</h3>
                {barSummary && (
                  <div className="flex gap-6 mb-6">
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase">Tổng doanh thu</p>
                      <p className="text-xl font-black text-rose-700">{formatPrice(barSummary.totalRevenue)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase">Tăng trưởng</p>
                      <p className="text-xl font-black text-green-600">{barSummary.growthRate}</p>
                    </div>
                  </div>
                )}
                {barData ? <Bar data={barData} options={{ responsive: true }} /> : <p className="text-gray-400 text-sm">Chưa có dữ liệu.</p>}
              </div>

              {/* Biểu đồ tròn */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Doanh thu theo danh mục</h3>
                {pieSummary && (
                  <div className="mb-6">
                    <p className="text-xs text-gray-500 font-bold uppercase">Sản phẩm đã bán</p>
                    <p className="text-xl font-black text-rose-700">{pieSummary.totalProductsSold}</p>
                  </div>
                )}
                {pieData ? <div className="w-2/3 mx-auto"><Pie data={pieData} options={{ responsive: true }} /></div> : <p className="text-gray-400 text-sm">Chưa có dữ liệu.</p>}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
