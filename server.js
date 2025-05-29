const express = require('express');
const path = require('path');

const app = express();
const PORT = 3005;

// Cấu hình EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//cau hình thư mục tĩnh
app.use(express.static(path.join(__dirname, 'public')));

// Route trang chủ
app.get('/', (req, res) => {
    res.render('index', { title: 'Trang Chủ', message: 'Chào mừng bạn đến với trang chủ!' });
});

app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});