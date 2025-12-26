import Mailgen from 'mailgen';
import nodemailer from 'nodemailer';

export const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      product: {
        name: 'QR Menu Management',
        link: process.env.FRONTEND_URL,
      },
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
  const emailHtml = mailGenerator.generate(options.mailgenContent);

  const transport = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: Number(process.env.MAILTRAP_SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.MAILTRAP_SMTP_USERNAME,
      pass: process.env.MAILTRAP_SMTP_PASSWORD,
    },
  });

  await transport.verify(); // 🔥 confirms SMTP

  const mail = {
    from: process.env.FROM_EMAIL,
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHtml,
  };

  await transport.sendMail(mail);
};
