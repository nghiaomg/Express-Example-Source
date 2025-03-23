# Express-Example-Source

Dự án mẫu Express.js với cấu trúc MVC đầy đủ, được thiết kế để giúp người mới học Express.js hiểu rõ về cách tổ chức và phát triển ứng dụng web backend.

## Giới Thiệu

Express-Example-Source là một dự án mẫu được xây dựng trên nền tảng Express.js, cung cấp một cấu trúc dự án rõ ràng và đầy đủ các tính năng cơ bản cho một ứng dụng web backend. Dự án này phù hợp cho người mới bắt đầu học Express.js hoặc muốn có một template để khởi tạo dự án mới nhanh chóng.

## Tính Năng

- Kiến trúc MVC (Model-View-Controller)
- Kết nối cơ sở dữ liệu MongoDB
- Xác thực người dùng với JWT
- Tích hợp Socket.io cho giao tiếp thời gian thực
- Middleware xử lý lỗi và bảo mật
- Cấu hình Routes theo RESTful API
- Công việc định kỳ với Cron jobs
- Xử lý lỗi toàn cục

## Cài Đặt

1. Clone repository:
   ```
   git clone https://github.com/nghiaomg/Express-Example-Source.git
   cd Express-Example-Source
   ```

2. Cài đặt các gói phụ thuộc:
   ```
   npm install
   ```

3. Tạo file `.env` trong thư mục gốc:
   ```
   PORT=3000
   BASE_URL=http://localhost
   MONGODB_URI=mongodb://localhost:27017/express-example
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   CLIENT_URL=http://localhost:3000
   ```

4. Khởi động server:
   ```
   npm start
   ```
   Hoặc chạy với chế độ phát triển:
   ```
   npm run dev
   ```

## Cấu Trúc Dự Án

- `/app` - Mã nguồn chính của ứng dụng
  - `/config` - Các file cấu hình
  - `/controllers` - Xử lý request
  - `/helper` - Các hàm trợ giúp
  - `/middleware` - Middleware tùy chỉnh
  - `/models` - Mô hình dữ liệu
  - `/routes` - Định tuyến API
  - `/services` - Logic nghiệp vụ
  - `/socket` - Xử lý Socket.io
  - `/utils` - Các tiện ích

## Tài Liệu API

Các endpoint API được tổ chức theo tài nguyên và tuân theo quy ước RESTful.

### Ví Dụ Các Endpoint

- `GET /api/users` - Lấy tất cả người dùng
- `GET /api/users/:id` - Lấy thông tin người dùng cụ thể
- `POST /api/users` - Tạo người dùng mới
- `PUT /api/users/:id` - Cập nhật thông tin người dùng
- `DELETE /api/users/:id` - Xóa người dùng

## Sự Kiện Socket.IO

Dự án này bao gồm chức năng thời gian thực sử dụng Socket.IO.

### Ví Dụ Các Sự Kiện

- `connection` - Khi client kết nối
- `disconnect` - Khi client ngắt kết nối
- `message` - Để gửi/nhận tin nhắn

## Xử Lý Lỗi

Ứng dụng bao gồm xử lý lỗi toàn cục cho cả lỗi đồng bộ và bất đồng bộ.

## Mô Hình Người Dùng

Dự án bao gồm một mô hình người dùng đầy đủ với các tính năng:
- Đăng ký và đăng nhập
- Xác thực JWT
- Phân quyền (user/admin)
- Mã hóa mật khẩu
- CRUD operations

## Hướng Dẫn Sử Dụng

### Tạo Người Dùng Mới

```javascript
// Gửi POST request đến /api/users
const newUser = {
  username: "example_user",
  email: "user@example.com",
  password: "securepassword",
  firstName: "Example",
  lastName: "User"
};
```

### Đăng Nhập

```javascript
// Gửi POST request đến /api/users/login
const loginData = {
  email: "user@example.com",
  password: "securepassword"
};
```

### Sử Dụng Token JWT

```javascript
// Thêm token vào header của request
headers: {
  'Authorization': 'Bearer your_jwt_token'
}
```

## Đóng Góp

Mọi đóng góp đều được hoan nghênh. Vui lòng tạo issue hoặc pull request để cải thiện dự án.

## Giấy Phép

MIT
```