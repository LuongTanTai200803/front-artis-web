import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard';
import { productApi } from '../../api/productApi';
import { categoryApi } from '../../api/categoryApi';

function Home() {
  const [activeFilter, setActiveFilter] = useState('Tất cả');
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoryApi.list().then((res) => setCategories(res.data || [])).catch(console.error);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = activeCategoryId ? { categoryId: activeCategoryId } : {};
        const res = await productApi.list(params);
        setProducts(res.data?.products || []);
      } catch (err) {
        console.error(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [activeCategoryId]);

  const handleFilter = (label, categoryId) => {
    setActiveFilter(label);
    setActiveCategoryId(categoryId);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-pink-50 to-white px-4 md:px-8 py-10">
      <div className="mx-auto flex flex-col flex-1 w-full max-w-7xl">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-rose-700 mb-2">Khám phá Tác phẩm</h1>
          <p className="text-gray-500 text-lg">Tìm kiếm phong cách phù hợp cho dự án tiếp theo của bạn.</p>
        </div>

        <div className="flex flex-wrap gap-2.5 mb-10 justify-start select-none">
          <button
            onClick={() => handleFilter('Tất cả', null)}
            className={`px-5 py-1.5 rounded-full text-xs font-semibold tracking-wide border cursor-pointer transition-all duration-200 ${
              activeFilter === 'Tất cả'
                ? '!bg-rose-700 !text-white !border-rose-700 shadow-sm'
                : '!bg-gray-50 !text-gray-500 !border-gray-200 hover:!text-rose-700 hover:!bg-rose-50 hover:!border-rose-100'
            }`}
          >
            Tất cả
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleFilter(cat.name, cat.id)}
              className={`px-5 py-1.5 rounded-full text-xs font-semibold tracking-wide border cursor-pointer transition-all duration-200 ${
                activeFilter === cat.name
                  ? '!bg-rose-700 !text-white !border-rose-700 shadow-sm'
                  : '!bg-gray-50 !text-gray-500 !border-gray-200 hover:!text-rose-700 hover:!bg-rose-50 hover:!border-rose-100'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {loading && (
          <div className="py-20 text-center text-gray-400">Đang tải tác phẩm...</div>
        )}

        {!loading && products.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-gray-400">
            <span className="text-4xl mb-4">📭</span>
            <p>Không tìm thấy tác phẩm nào phù hợp với bộ lọc này.</p>
          </div>
        )}

        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
