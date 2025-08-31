import { useState } from 'react';
import { Bell, Check, Info, Heart, TrendingUp, Users, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState({
    name: '',
    dob: '',
    email: '',
    goal: ''
  });

  const openOnboarding = () => {
    setIsOnboardingOpen(true);
    setCurrentStep(1);
  };

  const closeOnboarding = () => {
    setIsOnboardingOpen(false);
    setCurrentStep(1);
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOnboardingData({
      ...onboardingData,
      [e.target.name]: e.target.value
    });
  };

  const handleGoalSelect = (goal: string) => {
    setOnboardingData({
      ...onboardingData,
      goal
    });
  };

  const getProgressWidth = (step: number) => {
    switch (step) {
      case 1: return '33%';
      case 2: return '66%';
      case 3: return '100%';
      default: return '33%';
    }
  };

  return (
    <div 
      className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50"
      style={{
        fontFamily: 'Inter, system-ui, sans-serif',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale'
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-500 font-bold">N</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative">
              <Bell className="text-gray-500" size={24} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <img 
              src="https://placehold.co/40x40/E2E8F0/4A5568?text=AV" 
              alt="Avatar người dùng" 
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        </header>

        {/* Welcome Message */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Chào mừng trở lại, An!</h1>
          <p className="text-gray-500 mt-2">Hôm nay là một ngày tuyệt vời để phát triển bản thân.</p>
          <Button 
            onClick={openOnboarding}
            className="mt-4 bg-blue-600 text-white font-semibold rounded-full px-6 py-3 hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-lg"
          >
            Hôm nay tôi muốn ...
          </Button>
        </div>

        {/* Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Today's Message */}
          <div 
            className="p-6 rounded-2xl md:col-span-2 shadow-sm border border-white/30"
            style={{
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
          >
            <h2 className="font-bold text-xl text-gray-900 mb-2">Thông Điệp Cho Hôm Nay</h2>
            <p className="text-gray-600">"Chào An, hôm nay năng lượng vũ trụ khuyến khích bạn kết nối sâu sắc. Một cuộc trò chuyện chân thành có thể mang lại bước ngoặt bất ngờ. Hãy mở lòng nhé."</p>
          </div>

          {/* Personal Roadmap */}
          <div 
            className="p-6 rounded-2xl shadow-sm border border-white/30"
            style={{
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
          >
            <h2 className="font-bold text-xl text-gray-900 mb-4">Lộ Trình Dành Riêng Cho Bạn</h2>
            <ul className="space-y-4">
              <li className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-4">
                  <Check size={20} />
                </div>
                <span className="text-gray-700">Video: Khám phá điểm mạnh qua Thần số học</span>
              </li>
              <li className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-4">
                  <Info size={20} />
                </div>
                <span className="text-gray-700">Bài viết: 5 Lỗi Giao Tiếp Cần Tránh</span>
              </li>
              <li className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center mr-4">
                  <TrendingUp size={20} />
                </div>
                <span className="text-gray-700">Gợi ý: Khóa học Xây Dựng Thương Hiệu</span>
              </li>
            </ul>
          </div>

          {/* Community Connections */}
          <div 
            className="p-6 rounded-2xl shadow-sm border border-white/30"
            style={{
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
          >
            <h2 className="font-bold text-xl text-gray-900 mb-4">Kết Nối Đồng Điệu</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/50 transition-colors">
                <div className="flex items-center">
                  <img 
                    src="https://placehold.co/40x40/A78BFA/FFFFFF?text=T" 
                    alt="Avatar" 
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">Minh Thư</p>
                    <p className="text-sm text-gray-500">Cùng có con số chủ đạo 9</p>
                  </div>
                </div>
                <a 
                  href="https://t.me/minhthu_username" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 font-semibold text-sm px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                >
                  Kết nối
                </a>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/50 transition-colors">
                <div className="flex items-center">
                  <img 
                    src="https://placehold.co/40x40/FBBF24/FFFFFF?text=Q" 
                    alt="Avatar" 
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">Bảo Quyên</p>
                    <p className="text-sm text-gray-500">Cùng mục tiêu sự nghiệp</p>
                  </div>
                </div>
                <a 
                  href="https://t.me/baoquyen_username" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 font-semibold text-sm px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                >
                  Kết nối
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Onboarding Modal */}
      {isOnboardingOpen && (
        <div 
          className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50 transition-opacity duration-300"
          onClick={(e) => e.target === e.currentTarget && closeOnboarding()}
        >
          <div 
            className="w-full max-w-md rounded-2xl shadow-2xl p-6 sm:p-8 transform transition-all duration-300 border border-white/30"
            style={{
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
          >
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-in-out" 
                    style={{ width: getProgressWidth(1) }}
                  ></div>
                </div>
                <h2 className="text-2xl font-bold text-center mb-2">Bản Đồ Năng Lượng</h2>
                <p className="text-center text-gray-600 mb-6">Hãy cho chúng tôi biết vài điều để vẽ nên tấm bản đồ độc nhất dành cho bạn.</p>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">Họ và Tên</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      value={onboardingData.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full bg-white/50 border-gray-300/50 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition px-3 py-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="dob" className="text-sm font-medium text-gray-700">Ngày Sinh</label>
                    <input 
                      type="date" 
                      id="dob" 
                      name="dob"
                      value={onboardingData.dob}
                      onChange={handleInputChange}
                      className="mt-1 block w-full bg-white/50 border-gray-300/50 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition px-3 py-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      value={onboardingData.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full bg-white/50 border-gray-300/50 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition px-3 py-2"
                    />
                  </div>
                </div>

                <Button 
                  onClick={() => goToStep(2)} 
                  className="w-full mt-8 bg-blue-600 text-white font-semibold rounded-full py-3 hover:bg-blue-700 transition-colors"
                >
                  Tiếp Tục
                </Button>
              </div>
            )}

            {/* Step 2: Goal Selection */}
            {currentStep === 2 && (
              <div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-in-out" 
                    style={{ width: getProgressWidth(2) }}
                  ></div>
                </div>
                <h2 className="text-2xl font-bold text-center mb-2">La Bàn Định Hướng</h2>
                <p className="text-center text-gray-600 mb-6">Lĩnh vực nào bạn muốn tập trung phát triển nhất?</p>

                <div className="grid grid-cols-2 gap-4">
                  <button 
                    className="goal-card border-2 border-transparent p-4 rounded-xl text-center hover:bg-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
                    onClick={() => handleGoalSelect('healing')}
                  >
                    <Heart size={32} className="mx-auto mb-2 text-red-500" />
                    <p className="font-semibold">Thấu hiểu & Chữa lành</p>
                  </button>
                  <button 
                    className="goal-card border-2 border-transparent p-4 rounded-xl text-center hover:bg-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
                    onClick={() => handleGoalSelect('career')}
                  >
                    <TrendingUp size={32} className="mx-auto mb-2 text-blue-500" />
                    <p className="font-semibold">Sự nghiệp & Thịnh vượng</p>
                  </button>
                  <button 
                    className="goal-card border-2 border-transparent p-4 rounded-xl text-center hover:bg-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
                    onClick={() => handleGoalSelect('relationships')}
                  >
                    <Users size={32} className="mx-auto mb-2 text-green-500" />
                    <p className="font-semibold">Tình yêu & Mối quan hệ</p>
                  </button>
                  <button 
                    className="goal-card border-2 border-transparent p-4 rounded-xl text-center hover:bg-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
                    onClick={() => handleGoalSelect('mission')}
                  >
                    <Compass size={32} className="mx-auto mb-2 text-purple-500" />
                    <p className="font-semibold">Tìm kiếm Sứ mệnh</p>
                  </button>
                </div>
                <Button 
                  onClick={() => goToStep(3)} 
                  className="w-full mt-8 bg-blue-600 text-white font-semibold rounded-full py-3 hover:bg-blue-700 transition-colors"
                >
                  Hoàn Thành
                </Button>
              </div>
            )}

            {/* Step 3: Result */}
            {currentStep === 3 && (
              <div className="text-center">
                <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-in-out" 
                    style={{ width: getProgressWidth(3) }}
                  ></div>
                </div>
                <div className="mb-6 animate-pulse">
                  <p>Đang phân tích bản đồ năng lượng...</p>
                </div>
                <div className="bg-gradient-to-br from-blue-400 to-purple-500 p-6 rounded-2xl text-white shadow-lg">
                  <h3 className="font-bold text-lg">THẺ NĂNG LƯỢNG CÁ NHÂN</h3>
                  <p className="mt-4 text-lg">Chào mừng bạn, một <strong className="font-bold">Chiến Binh Số 1</strong> đầy nhiệt huyết với trái tim ấm áp của một <strong className="font-bold">Sư Tử</strong>.</p>
                  <div className="mt-4 flex justify-center space-x-2">
                    <span className="bg-white/20 text-xs font-semibold px-2 py-1 rounded-full">#MạnhMẽ</span>
                    <span className="bg-white/20 text-xs font-semibold px-2 py-1 rounded-full">#SángTạo</span>
                  </div>
                </div>
                <Button 
                  onClick={closeOnboarding} 
                  className="w-full mt-8 bg-white text-blue-600 font-semibold rounded-full py-3 hover:bg-gray-100 transition-colors"
                >
                  Khám Phá Bảng Điều Khiển
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;