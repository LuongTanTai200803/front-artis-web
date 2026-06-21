import React from 'react';
import { useNavigate } from 'react-router-dom';

const formatPrice = (price) => {
  if (!price) return 'Liên hệ';
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const tags = product?.category ? [product.category.name] : product?.tags || ['Art'];

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col group"
    >
      <div className="relative h-52 w-full bg-gray-50 overflow-hidden">
        <img
          src={product?.imageUrl || product?.image || 'https://placehold.co/600x400'}
          alt={product?.name || product?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-md text-rose-700 text-[11px] px-2 py-0.5 rounded-full flex items-center gap-1 font-bold shadow-sm">
          👁 {product?.viewCount || 0}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1 text-left items-start">
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {tags.map((tag, idx) => (
            <span key={idx} className="bg-rose-50 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-bold text-rose-900 text-sm mb-4 line-clamp-2 min-h-[40px] group-hover:text-rose-700 transition-colors">
          {product?.name || product?.title}
        </h3>

        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between w-full">
          <div className="flex items-center gap-2 max-w-[55%]">
            <img
              src={product?.seller?.avatarUrl || product?.artistAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
              alt={product?.seller?.fullName}
              className="w-6 h-6 rounded-full object-cover border border-gray-100 flex-shrink-0"
            />
            <span className="text-xs text-gray-500 font-medium truncate">
              {product?.seller?.fullName || product?.artist || 'Họa sĩ'}
            </span>
          </div>

          <div className="text-right flex-shrink-0">
            <span className="block text-[9px] text-gray-400 uppercase font-bold tracking-tight">Giá từ</span>
            <span className="text-sm font-extrabold text-rose-700">
              {formatPrice(product?.price)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
