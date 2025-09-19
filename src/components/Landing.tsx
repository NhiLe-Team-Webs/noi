import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Target, Shield, Check, Calendar, BookOpen, Users, Menu, X, Bell, Facebook, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from "react-scroll";
import { motion } from "framer-motion";

const Landing = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: 'general'
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openJoinModal = () => {
    setIsJoinModalOpen(true);
    setIsFormSubmitted(false);
  };

  const closeJoinModal = () => {
    setIsJoinModalOpen(false);
    setIsFormSubmitted(false);
    setFormData({ name: '', email: '', interest: 'general' });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    setIsFormSubmitted(true);
  };

  const handleSuccessClose = () => {
    closeJoinModal();
    // Navigate to dashboard after successful registration
    setTimeout(() => {
      navigate('/dashboard');
    }, 500);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-gray-50 text-gray-800 scroll-smooth">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-gray-900">
            N ơi<span className="text-primary">!</span>
          </a>
          <nav className="hidden md:flex space-x-6 lg:space-x-8 items-center">
            <Link to="mission" smooth duration={600} offset={-80} className="text-gray-600 hover:text-primary transition-colors cursor-pointer">Sứ Mệnh</Link>
            <Link to="community" smooth duration={600} offset={-80} className="text-gray-600 hover:text-primary transition-colors cursor-pointer">Cộng Đồng</Link>
            <Link to="nam" smooth duration={600} offset={-80} className="text-gray-600 hover:text-primary transition-colors cursor-pointer">NAM</Link>
            <Link to="events" smooth duration={600} offset={-80} className="text-gray-600 hover:text-primary transition-colors cursor-pointer">Hoạt Động</Link>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={openJoinModal} 
                className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary/90 transition-transform hover:scale-105 shadow-md"
              >
                Gia Nhập Ngay
              </Button>
            </motion.div>
          </nav>
          <button className="md:hidden text-gray-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2">
            <Link to="mission" smooth duration={600} offset={-80} className="block py-2 text-gray-600 hover:text-primary cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>Sứ Mệnh</Link>
            <Link to="community" smooth duration={600} offset={-80} className="block py-2 text-gray-600 hover:text-primary cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>Cộng Đồng</Link>
            <Link to="nam" smooth duration={600} offset={-80} className="block py-2 text-gray-600 hover:text-primary cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>NAM</Link>
            <Link to="events" smooth duration={600} offset={-80} className="block py-2 text-gray-600 hover:text-primary cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>Hoạt Động</Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={openJoinModal} 
                className="block mt-4 w-full bg-primary text-white text-center px-5 py-2 rounded-lg text-base font-semibold hover:bg-primary/90 shadow-md"
              >
                Gia Nhập Ngay
              </Button>
            </motion.div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
          className="relative pt-16 pb-20 md:pt-32 md:pb-36 text-center bg-white">
          <div className="absolute inset-0 bottom-1/4 bg-hero-gradient"></div>
          <div className="container mx-auto px-4 sm:px-6 relative">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Hành trình đến <span className="text-primary">Vô Cực</span>.
              <br className="hidden md:block" />
              Bắt đầu từ đây.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Chào mừng bạn đến với N ơi! - Cộng đồng mở dành cho những người khao khát phát triển bản thân, kết nối và cống hiến dựa trên giá trị cốt lõi: Tâm - Tầm - Đức.
            </p>
            <div className="mt-10 flex justify-center gap-4 flex-wrap">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={openJoinModal}
                  className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-transform hover:scale-105 shadow-lg"
                >
                  Tham Gia Cộng Đồng
                </Button>
              </motion.div>

              <Link to="mission" smooth duration={600} offset={-80} className="cursor-pointer">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="bg-white text-gray-700 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-transform hover:scale-105 shadow-lg border border-gray-300"
                  >
                    Tìm Hiểu Thêm
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Mission Section */}
        <motion.section 
          id="mission" 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
          className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">Giá Trị Cốt Lõi</h2>
            <p className="mt-4 text-lg text-gray-600 text-center max-w-3xl mx-auto">
              Chúng tôi tin rằng sự phát triển bền vững bắt nguồn từ ba yếu tố không thể tách rời. Đây là kim chỉ nam cho mọi hoạt động của cộng đồng N.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
              {/* Tâm */}
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="bg-red-100 text-red-600 rounded-full h-16 w-16 mx-auto flex items-center justify-center">
                  <Heart size={32} />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-gray-800">Tâm</h3>
                <p className="mt-4 text-gray-600">Phát triển một trái tim biết yêu thương, thấu cảm và sẻ chia. Học cách lắng nghe và kết nối chân thành với bản thân và mọi người xung quanh.</p>
              </div>
              
              {/* Tầm */}
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="bg-blue-100 text-blue-600 rounded-full h-16 w-16 mx-auto flex items-center justify-center">
                  <Target size={32} />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-gray-800">Tầm</h3>
                <p className="mt-4 text-gray-600">Mở rộng tầm nhìn, không ngừng học hỏi để nâng cao tri thức và giá trị bản thân. Dám nghĩ lớn, dám dấn thân và kiến tạo tương lai.</p>
              </div>
              
              {/* Đức */}
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="bg-green-100 text-green-600 rounded-full h-16 w-16 mx-auto flex items-center justify-center">
                  <Shield size={32} />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-gray-800">Đức</h3>
                <p className="mt-4 text-gray-600">Rèn luyện đức hạnh, sống chính trực, trách nhiệm và kỷ luật. Xây dựng uy tín cá nhân và lan tỏa những giá trị tốt đẹp đến cộng đồng.</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Community Section */}
        <motion.section 
          id="community"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
          className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Một Cộng Đồng, Nhiều Hành Trình</h2>
                <p className="mt-6 text-lg text-gray-600">
                  N là mái nhà chung cho tất cả những ai đang trên con đường tìm kiếm và hoàn thiện chính mình. Dù bạn là ai, bạn đều được chào đón.
                </p>
                <ul className="mt-8 space-y-4">
                  <li className="flex items-start">
                    <Check className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-1" />
                    <span><strong className="font-semibold">Người xem kênh NhiLe:</strong> Nơi biến kiến thức thành hành động cùng những người đồng điệu.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-1" />
                    <span><strong className="font-semibold">TNV & Team NhiLe:</strong> Không gian kết nối sâu sắc, chia sẻ và lan tỏa giá trị cốt lõi.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-1" />
                    <span><strong className="font-semibold">Cộng đồng NAM:</strong> Nơi đàn ông Việt Nam rèn luyện bản lĩnh, trách nhiệm và sự tử tế.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-1" />
                    <span><strong className="font-semibold">Và tất cả bạn:</strong> Bất kỳ ai có khao khát sống một cuộc đời ý nghĩa hơn.</span>
                  </li>
                </ul>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <img src="https://placehold.co/400x500/a78bfa/ffffff?text=Cộng+Đồng" alt="Hoạt động cộng đồng 1" className="rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 object-cover w-full h-auto max-w-full" />
                <img src="https://placehold.co/400x500/c4b5fd/ffffff?text=Gắn+Kết" alt="Hoạt động cộng đồng 2" className="rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 mt-4 sm:mt-8 object-cover w-full h-auto max-w-full" />
              </div>
            </div>
          </div>
        </motion.section>

        {/* NAM Section */}
        <motion.section 
          id="nam"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
          className="py-16 md:py-20 bg-gray-800 text-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <img src="https://placehold.co/600x450/374151/ffffff?text=NAM+Community" alt="Cộng đồng NAM" className="rounded-xl shadow-2xl object-cover w-full h-auto max-w-full" />
              </div>
              <div className="order-1 lg:order-2">
                <span className="text-blue-400 font-semibold">DÀNH CHO PHÁI MẠNH</span>
                <h2 className="mt-2 text-3xl md:text-4xl font-bold text-white">Cộng Đồng NAM</h2>
                <p className="mt-6 text-lg text-gray-300">
                  Một không gian riêng, mạnh mẽ và hỗ trợ dành cho đàn ông Việt Nam trên hành trình khẳng định bản lĩnh, sống có trách nhiệm và trở thành trụ cột vững chắc cho gia đình và xã hội.
                </p>
                <div className="mt-8">
                  <a 
                 href="https://www.facebook.com/nam.nhileteam?locale=vi_VN" 
                 target="_blank" 
                 rel="noopener noreferrer"
               >
                 <Button className="bg-white text-gray-800 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-transform hover:scale-105 shadow-lg">
                   Khám Phá NAM
                 </Button>
               </a>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Events Section */}
        <motion.section 
          id="events"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
          className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">Hoạt Động & Sự Kiện</h2>
            <p className="mt-4 text-lg text-gray-600 text-center max-w-3xl mx-auto">
              Chúng tôi tin vào sức mạnh của hành động. Cộng đồng N thường xuyên tổ chức các hoạt động đa dạng để cùng nhau học hỏi, kết nối và phụng sự.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Workshop */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden group">
                <img src="https://placehold.co/600x400/818cf8/ffffff?text=Workshop" alt="Workshop" className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300 max-w-full" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800">Workshop Phát Triển Bản Thân</h3>
                  <p className="mt-3 text-gray-600">Các buổi chia sẻ chuyên sâu hàng tháng về kỹ năng, tư duy và trí tuệ cảm xúc.</p>
                  <a href="#" className="mt-4 inline-block text-primary font-semibold hover:text-primary/80">Xem chi tiết →</a>
                </div>
              </div>
              
              {/* Offline Meetup */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden group">
                <img src="https://placehold.co/600x400/a5b4fc/ffffff?text=Offline" alt="Offline" className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300 max-w-full" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800">Buổi Gặp Gỡ Offline</h3>
                  <p className="mt-3 text-gray-600">Cơ hội để các thành viên gặp gỡ, giao lưu và xây dựng mối quan hệ chân thành ngoài đời thực.</p>
                  <a href="#" className="mt-4 inline-block text-primary font-semibold hover:text-primary/80">Xem chi tiết →</a>
                </div>
              </div>
              
              {/* Charity */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden group">
                <img src="https://placehold.co/600x400/c7d2fe/ffffff?text=Thiện+Nguyện" alt="Thiện nguyện" className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300 max-w-full" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800">Dự Án Thiện Nguyện</h3>
                  <p className="mt-3 text-gray-600">Cùng nhau lan tỏa lòng tốt, thực hiện các dự án ý nghĩa để giúp đỡ những hoàn cảnh khó khăn.</p>
                  <a href="#" className="mt-4 inline-block text-primary font-semibold hover:text-primary/80">Xem chi tiết →</a>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Final CTA */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
          className="bg-primary">
          <div className="container mx-auto px-4 sm:px-6 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Sẵn sàng để bắt đầu hành trình của bạn?</h2>
            <p className="mt-4 text-lg text-blue-200 max-w-2xl mx-auto">
              Hãy trở thành một phần của cộng đồng N, nơi bạn được là chính mình, được học hỏi và được cống hiến.
            </p>
            <div className="mt-8">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={openJoinModal}
                  className="bg-white text-primary px-10 py-4 rounded-lg text-xl font-bold hover:bg-blue-50 transition-transform hover:scale-105 shadow-2xl"
                >
                  Gia Nhập N Ngay!
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Connect Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
          className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">Kết Nối & Đồng Hành</h2>
            <p className="mt-4 text-lg text-gray-600 text-center max-w-3xl mx-auto">
              Chọn con đường phù hợp với bạn để gắn kết sâu hơn với cộng đồng và tiếp tục hành trình phát triển không ngừng.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Update Events */}
              <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col">
                <div className="flex-shrink-0">
                  <Calendar className="h-10 w-10 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-gray-800">Cập nhật sự kiện của N ơi!</h3>
                <p className="mt-2 text-gray-600 flex-grow">Tham gia nhóm chung để nhận thông báo mới nhất về các workshop, buổi offline và hoạt động cộng đồng.</p>
                <a href="https://nlt.nhi.sg/home#register-form" className="mt-6 inline-block text-primary font-semibold group">
                  Tham gia ngay
                  <span className="inline-block transform group-hover:translate-x-1 transition-transform"> →</span>
                </a>
              </div>
              
              {/* N-edu */}
              <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col">
                <div className="flex-shrink-0">
                  <BookOpen className="h-10 w-10 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-gray-800">Tham gia các lớp học N-edu</h3>
                <p className="mt-2 text-gray-600 flex-grow">Khám phá các khóa học độc quyền được thiết kế để giúp bạn phát triển toàn diện về tư duy, kỹ năng và nội tâm.</p>
                <a href="https://nedu.nhi.sg/program/" className="mt-6 inline-block text-primary font-semibold group">
                  Khám phá khóa học
                  <span className="inline-block transform group-hover:translate-x-1 transition-transform"> →</span>
                </a>
              </div>
              
              {/* NhiLe Team */}
              <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col">
                <div className="flex-shrink-0">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-gray-800">Gia nhập NhiLe Team</h3>
                <p className="mt-2 text-gray-600 flex-grow">Cùng chúng tôi xây dựng và lan tỏa những giá trị tích cực. Khám phá các cơ hội để cống hiến tài năng của bạn.</p>
                <a href="https://nlt.nhi.sg/" className="mt-6 inline-block text-primary font-semibold group">
                  Xem vị trí tuyển dụng
                  <span className="inline-block transform group-hover:translate-x-1 transition-transform"> →</span>
                </a>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* About */}
            <div>
              <h3 className="text-2xl font-bold">N ơi<span className="text-blue-400">!</span></h3>
              <p className="mt-4 text-gray-400">Cộng đồng Tâm - Tầm - Đức. <br /> Cùng nhau học hỏi, phát triển và phụng sự.</p>
            </div>
            
            {/* Links */}
            <div>
              <h4 className="text-lg font-semibold text-gray-200">Khám Phá</h4>
              <ul className="mt-4 space-y-2">
                <li><Link to="mission" smooth duration={600} offset={-80} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Sứ Mệnh</Link></li>
                <li><Link to="community" smooth duration={600} offset={-80} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Về Cộng Đồng</Link></li>
                <li><Link to="nam" smooth duration={600} offset={-80} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Cộng Đồng NAM</Link></li>
                <li><Link to="events" smooth duration={600} offset={-80} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Sự Kiện</Link></li>
              </ul>
            </div>
            
            {/* Social */}
            <div>
              <h4 className="text-lg font-semibold text-gray-200">Kết Nối Với Chúng Tôi</h4>
              <div className="mt-4 flex space-x-4">
                <a href="https://www.facebook.com/NhiLeTeam?locale=vi_VN" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                  <Facebook size={24} />
                </a>
                <a href="https://www.linkedin.com/company/nhile-team/" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">

                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-700 pt-8 text-center text-gray-500">
            <p>&copy; 2024 N ơi! Community. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Join Modal */}
      {isJoinModalOpen && (
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300 p-4"
          onClick={(e) => e.target === e.currentTarget && closeJoinModal()}
        >
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full transform transition-transform duration-300 scale-100">
            {!isFormSubmitted ? (
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">Gia nhập Cộng đồng N ơi!</h2>
                  <button onClick={closeJoinModal} className="text-gray-400 hover:text-gray-800 transition-colors">
                    <X size={24} />
                  </button>
                </div>
                <p className="text-gray-600 mb-6">Để lại thông tin để chúng tôi có thể kết nối và gửi bạn những cập nhật mới nhất từ cộng đồng.</p>
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Tên của bạn</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                      placeholder="Nguyễn Văn A" 
                      required 
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                      placeholder="bancuatui@email.com" 
                      required 
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="interest" className="block text-gray-700 font-semibold mb-2">Bạn quan tâm đến</label>
                    <select 
                      id="interest" 
                      name="interest" 
                      value={formData.interest}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                    >
                      <option value="general">Cập nhật chung từ N ơi!</option>
                      <option value="nam">Cộng đồng NAM</option>
                      <option value="n-edu">Các lớp học N-edu</option>
                      <option value="team">Gia nhập NhiLe Team</option>
                    </select>
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-md">
                      Gửi thông tin
                    </Button>
                  </motion.div>
                </form>
              </div>
            ) : (
              <div className="text-center">
                <div className="mx-auto h-16 w-16 text-green-500 mb-4">
                  <Check size={64} className="mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Đăng ký thành công!</h3>
                <p className="mt-2 text-gray-600">Cảm ơn bạn đã quan tâm. Chúng tôi sẽ sớm liên hệ với bạn qua email.</p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    onClick={handleSuccessClose}
                    className="mt-6 w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Đóng
                  </Button>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;