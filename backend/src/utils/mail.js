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
      link: 'https://menumanagelink.com',
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);

  const emailHtml = mailGenerator.generate(options.mailgenContent);

  // Looking to send emails in production? Check out our Email API/SMTP product!
  var transport = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USERNAME,
      pass: process.env.MAILTRAP_SMTP_PASSWORD,
    },
  });

  const mail = {
    from: 'mail.menu.management@example.com',
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHtml,
  };
   try {
     await transport.sendMail(mail);
   } catch (error) {
     console.error(
       'Email service failed siliently. Make sure that you have provided your MAILTRAP credentials in the .env file',
     );
     console.error('Error: ', error);
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