const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const app = express();
const PORT = 3005;

// Cấu hình EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//cau hình thư mục tĩnh
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));
// Route trang chủ
app.get('/', (req, res) => {
    res.render('home', { title: 'Trang Chủ', message: 'Chào mừng bạn đến với trang chủ!' });
});
// Route trang thực đơn
app.get('/menu', (req, res) => {
    res.render('Menu', { title: 'Thực Đơn' });
});
// Route trang liên hệ
app.get('/contact', (req, res) => {
    res.render('Contact', { title: 'Liên hệ', message: null, formData: {} });
});
app.post('/contact', async (req, res) => {
    const { name, email, phone, message } = req.body;

    // Cấu hình transporter với Gmail (hoặc SMTP khác)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nguyenquocduy574@gmail.com', // Thay bằng email của bạn
            pass: 'mdjbzqbvbazdoxyg'    // Thay bằng app password (không phải mật khẩu Gmail)
        }
    });

    // Nội dung email
    let mailOptions = {
        from: email,
        to: 'nguyenquocduy574@gmail.com', // Email nhận liên hệ
        subject: 'Liên hệ mới từ website',
        html: `
            <h3>Thông tin liên hệ</h3>
            <p><b>Họ tên:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Số điện thoại:</b> ${phone}</p>
            <p><b>Nội dung:</b> ${message}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send('Gửi liên hệ thành công!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Gửi liên hệ thất bại!');
    }
});

app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});



