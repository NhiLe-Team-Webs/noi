import { useEffect, useState } from 'react';

import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';

type JoinModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const initialFormState = {
  email: '',
  watch_duration: '',
  platform: '',
  community_need: '',
  profession: '',
  marital_status: '',
  gender: '',
  location: '',
  phone: '',
  telegram: '',
};

const watchDurationOptions = [
  { value: 'new', label: 'Mới gần đây' },
  { value: 'under_6m', label: 'Dưới 6 tháng' },
  { value: '6m_to_1y', label: 'Từ 6 tháng đến 1 năm' },
  { value: 'over_1y', label: 'Trên 1 năm' },
];

const platformOptions = [
  { value: 'youtube', label: 'YouTube' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'other', label: 'Nền tảng khác' },
];

const maritalStatusOptions = [
  { value: 'single', label: 'Độc thân' },
  { value: 'married', label: 'Đã kết hôn' },
];

const genderOptions = [
  { value: 'male', label: 'Nam' },
  { value: 'female', label: 'Nữ' },
];

const JoinModal = ({ isOpen, onClose, onSuccess }: JoinModalProps) => {
  const [formData, setFormData] = useState(initialFormState);
  const [emailError, setEmailError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setFormData(initialFormState);
      setEmailError('');
      setIsSubmitted(false);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setEmailError('Vui lòng nhập một địa chỉ email hợp lệ.');
      return;
    }

    setEmailError('');
    setIsSubmitted(true);

    // Prepare message for Telegram
    const message = `
<b>🚀 Đăng ký thành viên mới!</b>

<b>📧 Email:</b> ${formData.email}
<b>⏱️ Thời gian xem:</b> ${watchDurationOptions.find(o => o.value === formData.watch_duration)?.label || formData.watch_duration}
<b>📱 Nền tảng:</b> ${platformOptions.find(o => o.value === formData.platform)?.label || formData.platform}
<b>💼 Nghề nghiệp:</b> ${formData.profession}
<b>💍 Hôn nhân:</b> ${maritalStatusOptions.find(o => o.value === formData.marital_status)?.label || formData.marital_status}
<b>⚧ Giới tính:</b> ${genderOptions.find(o => o.value === formData.gender)?.label || formData.gender}
<b>📍 Địa điểm:</b> ${formData.location}
<b>📞 SĐT:</b> ${formData.phone || 'Không có'}
<b>✈️ Telegram:</b> ${formData.telegram || 'Không có'}

<b>💭 Nhu cầu:</b>
${formData.community_need}
    `;

    // Send to Telegram
    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML',
        }),
      }).catch(err => console.error('Telegram Error:', err));
    } else {
      console.warn('Telegram credentials missing in .env');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (name === 'email' && emailError && value.trim() && /^\S+@\S+\.\S+$/.test(value)) {
      setEmailError('');
    }
  };

  const handleSuccess = () => {
    onSuccess();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-gray-900/60 p-4 transition-opacity duration-300 md:items-center"
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className="relative flex w-full max-w-3xl max-h-[90vh] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-zinc-400 transition-colors hover:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          aria-label="Đóng"
        >
          <X size={20} />
        </button>

        <div className="flex-1 overflow-y-auto" style={{ scrollbarGutter: 'stable both-edges' }}>
          {!isSubmitted ? (
            <div className="bg-zinc-50 text-zinc-800 min-h-full pb-6">
              <div className="px-6 py-10 sm:px-10 sm:py-12">
                <header className="mb-10 text-center">
                  <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
                    Chào mừng bạn đến với Cộng đồng N ơi!
                  </h2>
                  <p className="mt-3 text-base text-zinc-600">
                    Vui lòng dành vài phút chia sẻ thông tin. Điều này sẽ giúp chúng mình hiểu và hỗ trợ bạn tốt hơn.
                  </p>
                </header>

                <form className="space-y-9" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-base font-medium text-zinc-700">
                      Email của bạn <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="vidu@email.com"
                      className="w-full rounded-lg border border-zinc-200 bg-zinc-100/80 px-4 py-2.5 text-base text-zinc-800 transition duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                    />
                    {emailError && <p className="mt-2 text-sm text-red-500">{emailError}</p>}
                  </div>

                  <div>
                    <span className="mb-3 block text-base font-medium text-zinc-700">
                      1. Bạn đã xem video của NhiLe được bao lâu rồi?
                    </span>
                    <div className="space-y-2.5">
                      {watchDurationOptions.map((option) => (
                        <label key={option.value} className="relative flex cursor-pointer">
                          <input
                            type="radio"
                            name="watch_duration"
                            value={option.value}
                            checked={formData.watch_duration === option.value}
                            onChange={handleInputChange}
                            className="peer sr-only"
                          />
                          <span className="flex w-full items-center rounded-lg border border-zinc-200 p-3.5 transition-colors hover:bg-zinc-50 peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:[&>span:first-child]:border-blue-600 peer-checked:[&>span:first-child>span]:scale-100 peer-focus-visible:outline-none peer-focus-visible:ring-4 peer-focus-visible:ring-blue-500/20">
                            <span className="mr-3 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 border-zinc-300 transition-all">
                              <span className="h-2.5 w-2.5 scale-0 transform rounded-full bg-blue-600 transition-transform duration-200" />
                            </span>
                            <span className="text-zinc-700">{option.label}</span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="mb-3 block text-base font-medium text-zinc-700">2. Bạn thường xem trên nền tảng nào nhất?</span>
                    <div className="grid gap-2.5 sm:grid-cols-2">
                      {platformOptions.map((option) => (
                        <label key={option.value} className="relative flex cursor-pointer">
                          <input
                            type="radio"
                            name="platform"
                            value={option.value}
                            checked={formData.platform === option.value}
                            onChange={handleInputChange}
                            className="peer sr-only"
                          />
                          <span className="flex w-full items-center rounded-lg border border-zinc-200 p-3.5 transition-colors hover:bg-zinc-50 peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:[&>span:first-child]:border-blue-600 peer-checked:[&>span:first-child>span]:scale-100 peer-focus-visible:outline-none peer-focus-visible:ring-4 peer-focus-visible:ring-blue-500/20">
                            <span className="mr-3 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 border-zinc-300 transition-all">
                              <span className="h-2.5 w-2.5 scale-0 transform rounded-full bg-blue-600 transition-transform duration-200" />
                            </span>
                            <span className="text-zinc-700">{option.label}</span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="community_need" className="mb-2 block text-base font-medium text-zinc-700">
                      3. Nhu cầu lớn nhất của bạn khi tham gia cộng đồng là gì?
                    </label>
                    <textarea
                      id="community_need"
                      name="community_need"
                      rows={4}
                      placeholder="Ví dụ: Học hỏi kiến thức, tìm kiếm sự hỗ trợ, kết nối bạn bè..."
                      value={formData.community_need}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-zinc-200 bg-zinc-100/80 px-4 py-2.5 text-base text-zinc-800 transition duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                    />
                  </div>

                  <div>
                    <label htmlFor="profession" className="mb-2 block text-base font-medium text-zinc-700">
                      4. Bạn đang làm việc trong ngành nghề/lĩnh vực nào?
                    </label>
                    <input
                      type="text"
                      id="profession"
                      name="profession"
                      placeholder="Ví dụ: Công nghệ thông tin, Marketing, Sinh viên..."
                      value={formData.profession}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-zinc-200 bg-zinc-100/80 px-4 py-2.5 text-base text-zinc-800 transition duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                    />
                  </div>

                  <div className="grid gap-x-6 gap-y-9 md:grid-cols-2">
                    <div>
                      <span className="mb-3 block text-base font-medium text-zinc-700">5. Tình trạng hôn nhân?</span>
                      <div className="flex flex-wrap gap-4">
                        {maritalStatusOptions.map((option) => (
                          <label key={option.value} className="relative flex cursor-pointer items-center">
                            <input
                              type="radio"
                              name="marital_status"
                              value={option.value}
                              checked={formData.marital_status === option.value}
                              onChange={handleInputChange}
                              className="peer sr-only"
                            />
                            <span className="flex items-center rounded-lg border border-zinc-200 px-3.5 py-2 transition-colors hover:bg-zinc-50 peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:[&>span:first-child]:border-blue-600 peer-checked:[&>span:first-child>span]:scale-100 peer-focus-visible:outline-none peer-focus-visible:ring-4 peer-focus-visible:ring-blue-500/20">
                              <span className="mr-2 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 border-zinc-300 transition-all">
                                <span className="h-2.5 w-2.5 scale-0 transform rounded-full bg-blue-600 transition-transform duration-200" />
                              </span>
                              <span className="text-zinc-700">{option.label}</span>
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="mb-3 block text-base font-medium text-zinc-700">6. Giới tính của bạn?</span>
                      <div className="flex flex-wrap gap-4">
                        {genderOptions.map((option) => (
                          <label key={option.value} className="relative flex cursor-pointer items-center">
                            <input
                              type="radio"
                              name="gender"
                              value={option.value}
                              checked={formData.gender === option.value}
                              onChange={handleInputChange}
                              className="peer sr-only"
                            />
                            <span className="flex items-center rounded-lg border border-zinc-200 px-3.5 py-2 transition-colors hover:bg-zinc-50 peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:[&>span:first-child]:border-blue-600 peer-checked:[&>span:first-child>span]:scale-100 peer-focus-visible:outline-none peer-focus-visible:ring-4 peer-focus-visible:ring-blue-500/20">
                              <span className="mr-2 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 border-zinc-300 transition-all">
                                <span className="h-2.5 w-2.5 scale-0 transform rounded-full bg-blue-600 transition-transform duration-200" />
                              </span>
                              <span className="text-zinc-700">{option.label}</span>
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="location" className="mb-2 block text-base font-medium text-zinc-700">
                      7. Bạn đang sinh sống ở đâu?
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      placeholder="Ví dụ: Hà Nội, Việt Nam hoặc Paris, Pháp"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-zinc-200 bg-zinc-100/80 px-4 py-2.5 text-base text-zinc-800 transition duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="mb-2 block text-base font-medium text-zinc-700">
                        8. Số điện thoại <span className="text-zinc-400">(Không bắt buộc)</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="09xxxxxxxx"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-zinc-200 bg-zinc-100/80 px-4 py-2.5 text-base text-zinc-800 transition duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="telegram" className="mb-2 block text-base font-medium text-zinc-700">
                        9. Username Telegram <span className="text-zinc-400">(Không bắt buộc)</span>
                      </label>
                      <input
                        type="text"
                        id="telegram"
                        name="telegram"
                        placeholder="@username_cua_ban"
                        value={formData.telegram}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-zinc-200 bg-zinc-100/80 px-4 py-2.5 text-base text-zinc-800 transition duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-600 px-6 py-3.5 font-semibold text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                      >
                        Hoàn tất & Gửi thông tin
                      </button>
                    </motion.div>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="flex min-h-full flex-col px-6 py-12 text-center sm:px-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-zinc-900">Cảm ơn bạn đã đăng ký!</h3>
              <p className="mt-2 text-zinc-600">Thông tin đã được gửi thành công. Chào mừng bạn đến với cộng đồng N ơi!</p>
              <motion.div className="mt-6" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleSuccess}
                  className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Tiếp tục
                </Button>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JoinModal;
