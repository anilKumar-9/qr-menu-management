import QRCode from 'qrcode';

export const generateRestaurantQR = async (restaurantId, frontendUrl) => {
  const baseUrl = (frontendUrl || process.env.FRONTEND_URL || '').replace(/\/$/, '');
  if (!baseUrl) {
    throw new Error('Frontend URL is not configured for QR generation');
  }

  const url = `${baseUrl}/menu/${restaurantId}`;
  return await QRCode.toDataURL(url);
};
