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
    res.render('Home', { title: 'Trang Chủ', message: 'Chào mừng bạn đến với trang chủ!' });
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
// Route trang đặt hàng
app.post('/dathang', async (req, res) => {
    res.render('dathang', { title: 'Đặt Món' });
    const { name, phone, dish, quantity, note } = req.body;

    // Cấu hình transporter với Gmail
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nguyenquocduy574@gmail.com', // Email của bạn
            pass: 'mdjbzqbvbazdoxyg' // App password (Gmail)
        }
    });

    // Nội dung email đơn hàng
    let mailOptions = {
        from: 'nguyenquocduy574@gmail.com',
        to: 'nguyenquocduy574@gmail.com',
        subject: 'Đơn đặt món mới từ khách hàng',
        html: `
            <h3>Thông tin đơn hàng</h3>
            <p><b>Khách hàng:</b> ${name}</p>
            <p><b>SĐT:</b> ${phone}</p>
            <p><b>Món đã đặt:</b> ${dish}</p>
            <p><b>Số lượng:</b> ${quantity}</p>
            <p><b>Ghi chú:</b> ${note || 'Không có'}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send(`<h2>Đặt hàng thành công!</h2><p>Cảm ơn bạn ${name} đã đặt món.</p><a href="/DatHang">Đặt tiếp</a>`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Có lỗi khi gửi đơn hàng, vui lòng thử lại sau.');
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



