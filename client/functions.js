const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');

admin.initializeApp();
sgMail.setApiKey('YOUR_SENDGRID_API_KEY'); // Thêm API Key của SendGrid

exports.sendResetPasswordEmail = functions.https.onRequest(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send('Email is required');
  }

  try {
    // Tạo một liên kết reset mật khẩu trong Firebase (để tạo đường dẫn)
    const actionCodeSettings = {
      url: `http://localhost:5173/verify-email?email=${email}`,  // URL bạn muốn người dùng chuyển hướng đến
      handleCodeInApp: true,
    };

    const link = await admin.auth().generatePasswordResetLink(email, actionCodeSettings);

    // Nội dung email
    const msg = {
      to: email,
      from: 'your-email@example.com',  // Địa chỉ email bạn sử dụng để gửi
      subject: 'Reset your password',
      html: `<p>Click <a href="${link}">here</a> to reset your password.</p>`,
    };

    // Gửi email qua SendGrid
    await sgMail.send(msg);

    res.status(200).send('Email reset mật khẩu đã được gửi thành công.');
  } catch (error) {
    console.error('Lỗi khi gửi email:', error);
    res.status(500).send('Có lỗi xảy ra khi gửi email.');
  }
});
