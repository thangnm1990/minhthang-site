# Website Nguyễn Minh Thắng

Website cá nhân tĩnh, không dùng framework. `build.js` sinh toàn bộ trang vào `dist/`.

- Dựng: `node build.js` (không cần cài gì thêm)
- Vercel đọc `vercel.json`: chạy `node build.js`, phục vụ thư mục `dist/`.
- Nội dung nằm trong `build.js` (các hằng `C`, `PROGRAMS`, `ARTICLES` và từng trang); giao diện ở `assets/style.css`.
