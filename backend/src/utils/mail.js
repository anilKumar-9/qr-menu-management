import Mailgen from 'mailgen';
import nodemailer from 'nodemailer';

// await sendEmail({
//   email: user?.email,
//   subject: 'Please verify your email',
//   mailgenContent: emailVerificationMailgenContent(
//     user.username,
//     `${req.protocol}://${req.get('host')}/api/v1/users/verify-email/${unHashedToken}`,
//   ),
// });

export const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Qr-menu-Management',
      link: 'https://qr-menu-management-project.vercel.app',
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);

  const emailHtml = mailGenerator.generate(options.mailgenContent);

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mail = {
    from: process.env.FROM_EMAIL,
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHtml,
  };

  try {
    await transport.sendMail(mail);
  } catch (error) {
    console.error(
      'Email service failed. Please check SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS and FROM_EMAIL environment variables.',
    );
    console.error('Mail send error:', error);
    throw error;
  }

};

export const emailVerificationMailgenContent = (username, verifyURL) => {
  return {
    body: {
      name: username,
      intro: "Welcome to our APP! We're very excited to have you on board.",
      action: {
        instructions: 'To verify Email, please click here:',
        button: {
          color: '#22BC66', // Optional action button color
          text: 'Confirm your account',
          link: verifyURL,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

export const passwordVerificationMailgenContent = (username, passwordURL) => {
  return {
    body: {
      name: username,
      intro: 'We have recieved a request for password reset',
      action: {
        instructions: 'To reset password, please click here:',
        button: {
          color: '#22BC66', // Optional action button color
          text: 'Confirm your account',
          link: passwordURL,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};
