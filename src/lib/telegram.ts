export const sendTelegramNotification = async (formData: any) => {
  const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('Telegram Bot Token or Chat ID is missing');
    return;
  }

  const message = `
🔔 *Đăng ký mới từ Training Design Team*

👤 *Thông tin cá nhân:*
- **Email:** \`${formData.email}\`
- **Số điện thoại:** \`${formData.phone || 'Không có'}\`
- **Telegram:** \`${formData.telegram || 'Không có'}\`
- **Giới tính:** ${formData.gender === 'male' ? 'Nam' : formData.gender === 'female' ? 'Nữ' : 'Khác'}
- **Tình trạng hôn nhân:** ${formData.marital_status === 'single' ? 'Độc thân' : formData.marital_status === 'married' ? 'Đã kết hôn' : 'Không xác định'}
- **Nơi ở:** ${formData.location}
- **Nghề nghiệp:** ${formData.profession}

📋 *Khảo sát:*
- **Thời gian xem NhiLe:** ${getWatchDurationLabel(formData.watch_duration)}
- **Nền tảng chính:** ${getPlatformLabel(formData.platform)}
- **Nhu cầu:** ${formData.community_need}
  `.trim();

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Telegram API Error Detail:', errorData); // Xem lỗi chi tiết ở đây
      throw new Error(`Failed to send Telegram message: ${errorData.description || response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    throw error; // Re-throw to handle in UI if needed
  }
};

const getWatchDurationLabel = (value: string) => {
  const options: Record<string, string> = {
    new: 'Mới gần đây',
    under_6m: 'Dưới 6 tháng',
    '6m_to_1y': 'Từ 6 tháng đến 1 năm',
    over_1y: 'Trên 1 năm',
  };
  return options[value] || value;
};

const getPlatformLabel = (value: string) => {
  const options: Record<string, string> = {
    youtube: 'YouTube',
    facebook: 'Facebook',
    tiktok: 'TikTok',
    other: 'Nền tảng khác',
  };
  return options[value] || value;
};
