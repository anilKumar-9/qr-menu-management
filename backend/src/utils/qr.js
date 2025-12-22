import QRCode from 'qrcode';

export const generateRestaurantQR = async (restaurantId) => {
  const url = `${process.env.FRONTEND_URL}/menu/${restaurantId}`;
  return await QRCode.toDataURL(url);
};
