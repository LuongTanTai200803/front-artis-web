import React, { useState } from 'react';

export default function Workspace() {
  const [message, setMessage] = useState('');

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-pink-50 via-rose-50/40 to-white font-sans text-rose-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* BỐ CỤC CHÍNH: LƯỚI 2 CỘT (Cột trái 4 phần, Cột phải 8 phần trên màn hình lớn) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ======================= CỘT TRÁI (THÔNG TIN HỢP ĐỒNG & TIẾN ĐỘ) ======================= */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Khối Tiến độ Hợp đồng */}
            <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100 text-left">
              <h2 className="text-xl font-bold text-rose-900 mb-6">Tiến độ Hợp đồng</h2>
              
              {/* TIMELINE CONTAINER */}
              <div className="relative pl-6 border-l-2 border-gray-100 ml-3 flex flex-col gap-8">
                
                {/* Bước 1: Phác thảo (Đã duyệt) */}
                <div className="relative">
                  {/* Icon Check tròn màu Burgundy định vị tuyệt đối đè lên đường line */}
                  <div className="absolute -left-[33px] top-0.5 w-5 h-5 bg-pixel-burgundy rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                    ✓
                  </div>
                  <div className="bg-pixel-tag-bg border border-pixel-burgundy/20 rounded-xl p-3 flex justify-between items-start">
                    <div className="max-w-[70%]">
                      <h4 className="font-bold text-pixel-burgundy text-sm">Phác thảo</h4>
                      <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">Đã duyệt bản nháp đầu tiên.</p>
                    </div>
                    <div className="text-right text-[10px] text-gray-400 font-semibold leading-tight">
                      <p className="font-bold text-pixel-burgundy text-xs">12</p>
                      <p>Th05</p>
                    </div>
                  </div>
                </div>

                {/* Bước 2: Đi nét (Đang chờ duyệt) */}
                <div className="relative">
                  {/* Icon vòng tròn đồng tâm biểu thị trạng thái Đang chạy */}
                  <div className="absolute -left-[33px] top-4 w-5 h-5 bg-white border-2 border-pixel-burgundy rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-pixel-burgundy rounded-full"></div>
                  </div>
                  <div className="bg-white border-2 border-pixel-burgundy rounded-xl p-4 text-left shadow-xs">
                    <h4 className="font-bold text-rose-900 text-sm">
                      Đi nét (Lineart) <span className="text-xs font-medium text-gray-400 block sm:inline sm:ml-1">(Đang chờ)</span>
                    </h4>
                    <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">Họa sĩ đang tải lên bản đi nét.</p>
                  </div>
                </div>

                {/* Bước 3: Màu nền (Chưa đến) */}
                <div className="relative opacity-50">
                  <div className="absolute -left-[33px] top-2 w-5 h-5 bg-white border-2 border-gray-200 rounded-full"></div>
                  <div className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 inline-block text-xs font-bold text-gray-400">
                    Màu nền
                  </div>
                </div>

                {/* Bước 4: Hoàn thiện (Chưa đến) */}
                <div className="relative opacity-50">
                  <div className="absolute -left-[33px] top-2 w-5 h-5 bg-white border-2 border-gray-200 rounded-full"></div>
                  <div className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 inline-block text-xs font-bold text-gray-400">
                    Hoàn thiện
                  </div>
                </div>

              </div>
            </div>

            {/* Khối Thông tin Dự án */}
            <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100 text-left">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Thông tin dự án</h3>
              <div className="flex flex-col gap-3 text-sm font-medium">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Họa sĩ</span>
                  <span className="font-bold text-rose-800">@blueneko</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Giá trị</span>
                  <span className="font-bold text-pixel-burgundy text-base">1,500,000 VND</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Hạn chót</span>
                  <span className="font-bold text-rose-800">20/05/2026</span>
                </div>
              </div>
            </div>

          </div>

          {/* ======================= CỘT PHẢI (PREVIEW TÁC PHẨM & KHUNG CHAT) ======================= */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* KHỐI 1: DUYỆT BƯỚC TÁC PHẨM */}
            <div className="bg-white rounded-2xl shadow-xs border border-gray-100 overflow-hidden flex flex-col">
              {/* Vùng ảnh nghệ thuật mockup to */}
              <div className="w-full bg-[#FFF0E6] flex items-center justify-center p-4 min-h-[350px]">
                <img 
                  src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80" 
                  alt="Lineart Preview" 
                  className="max-w-full h-auto max-h-[400px] object-contain rounded-lg"
                />
              </div>
              
              {/* Vùng thao tác duyệt bên dưới ảnh */}
              <div className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-left border-t border-gray-50">
                <div>
                  <h3 className="font-bold text-rose-900 text-base">Duyệt bước: Đi nét</h3>
                  <p className="text-xs text-gray-400 mt-1">Vui lòng kiểm tra kỹ trước khi phê duyệt để họa sĩ chuyển sang bước tiếp theo.</p>
                </div>
                
                {/* Cụm nút hành động */}
                <div className="flex items-center gap-3 w-full sm:w-auto flex-shrink-0">
                  <button className="flex-1 sm:flex-initial border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold px-4 py-2 rounded-full cursor-pointer transition-colors">
                    Yêu cầu sửa
                  </button>
                  <button className="flex-1 sm:flex-initial bg-pixel-burgundy hover:bg-pixel-burgundy-hover text-white text-xs font-bold px-4 py-2 rounded-full cursor-pointer flex items-center justify-center gap-1.5 transition-colors shadow-xs">
                    👍 Phê duyệt
                  </button>
                </div>
              </div>
            </div>

            {/* KHỐI 2: KHUNG CHAT TRAO ĐỔI */}
            <div className="bg-white rounded-2xl shadow-xs border border-gray-100 flex flex-col overflow-hidden">
              
              {/* Header của Khung Chat */}
              <div className="p-4 border-b border-gray-100 flex items-center gap-3 text-left">
                <img 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" 
                  alt="Artist Avatar" 
                  className="w-10 h-10 rounded-full object-cover border border-gray-100"
                />
                <div>
                  <h4 className="text-sm font-bold text-rose-800">Trò chuyện với @blueneko</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[11px] text-gray-400 font-medium">Đang online</span>
                  </div>
                </div>
              </div>

              {/* Vùng chứa tin nhắn (Chat Log) */}
              <div className="p-5 flex flex-col gap-4 max-h-[400px] overflow-y-auto bg-gray-50/30">
                
                {/* Tin nhắn nhận từ Họa sĩ (Bên trái) */}
                <div className="flex gap-3 items-start max-w-[85%] text-left">
                  <img 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" 
                    alt="Artist" 
                    className="w-8 h-8 rounded-full object-cover mt-0.5"
                  />
                  <div className="flex flex-col gap-1">
                    <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-xs px-4 py-3 shadow-xs">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Chào bạn, mình đã cập nhật bản đi nét (lineart) ở khung bên trên. Bạn xem có cần chỉnh sửa thêm chi tiết nào ở phần trang phục không nhé!
                      </p>
                    </div>
                    <span className="text-[10px] text-gray-400 ml-1">10:45 AM</span>
                  </div>
                </div>

                {/* Tin nhắn gửi đi của Bạn (Bên phải) */}
                <div className="flex gap-3 items-start max-w-[85%] self-end flex-row-reverse text-left">
                  <div className="flex flex-col gap-1 items-end">
                    <div className="bg-pixel-burgundy text-white rounded-2xl rounded-tr-xs px-4 py-3 shadow-xs">
                      <p className="text-sm leading-relaxed">
                        Đẹp quá! Nhưng ở phần tà áo bên trái, bạn làm nếp gấp mềm mại hơn một chút giúp mình được không?
                      </p>
                    </div>
                    <span className="text-[10px] text-gray-400 mr-1">10:52 AM</span>
                  </div>
                </div>

              </div>

              {/* Thanh nhập nội dung tin nhắn dưới cùng */}
              <div className="p-4 border-t border-gray-100 bg-white flex items-center gap-3">
                <div className="w-full bg-gray-100 rounded-full py-2 px-4 flex items-center justify-between relative">
                  {/* Nút đính kèm tệp */}
                  <button className="text-gray-400 hover:text-pixel-burgundy text-lg cursor-pointer bg-transparent border-none">
                    📎
                  </button>
                  <input 
                    type="text" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Nhập tin nhắn..." 
                    className="w-full bg-transparent border-none outline-none pl-3 pr-10 text-sm text-rose-800 placeholder-gray-400"
                  />
                  {/* Nút gửi tin nhắn hình tròn nhỏ */}
                  <button className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 bg-pixel-burgundy hover:bg-pixel-burgundy-hover rounded-full flex items-center justify-center text-white text-xs cursor-pointer transition-colors shadow-xs">
                    ➤
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
        
      </div>
    </div>
  );
}