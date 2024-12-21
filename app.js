
import express from 'express';

const path = require('path');
const app = express();
const port =  3000;

// Cấu hình API backend
const backendApi = require('./back-end');  // Đảm bảo backend của bạn có một entry point (ví dụ: backend/index.js)

app.use('/api', backendApi);  // API route

// Cấu hình frontend admin và user
app.use('/admin', express.static(path.join(__dirname, 'admin/build')));
app.use('/user', express.static(path.join(__dirname, 'front-end/build')));
// app.use('/sale', express.static(path.join(__dirname, 'sale/build')));
// app.use('/shipper', express.static(path.join(__dirname, 'shipper/build')));
// app.use('/warehouse', express.static(path.join(__dirname, 'warehouse/build')));

// Chuyển tiếp các yêu cầu tới frontend của bạn (React/Vue, v.v.)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'front-end/build', 'index.html'));
});

// Lắng nghe cổng
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
