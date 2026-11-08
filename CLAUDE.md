# CLAUDE.md — Website cá nhân Nguyễn Minh Thắng

Website hồ sơ giảng viên của Nguyễn Minh Thắng (Thomas). Repo này tách riêng với `ld-skills-hub`.

## Cách làm việc
- Trao đổi với Thomas bằng tiếng Việt, xưng "em", gọi "anh".
- Thomas muốn đi từng bước: đưa bản nháp/phương án, chờ duyệt rồi mới sửa. Không tự sửa khi chưa được đồng ý.
- Push `main` = Vercel tự đưa lên production. Tên miền: `www.minhthangspace.com` (địa chỉ chính; `minhthangspace.com` tự chuyển sang www). Bản Vercel: `minhthang-site.vercel.app`.

## Nội dung và giọng văn
- Website xưng "tôi", gọi người đọc là "anh chị". Câu ngắn, không emoji, không bịa số liệu.
- Phong cách "chuyên gia điềm tĩnh": không tự phong chuyên gia, không bảng giá, không bán hàng.
- Câu sứ mệnh: "Become greater every day and inspire greatness in others." / "Trở nên vượt trội hơn mỗi ngày và truyền cảm hứng để người khác khám phá sự vượt trội bên trong họ."
- Không nhắc: 7 Habits/FranklinCovey, giải thưởng nội bộ Techcombank, vai trò AI Builder tại Techcombank, ĐH Ngoại thương. Tổ chức chỉ nhắc FPT, MB Group, Techcombank (riêng bước ngoặt 2 trong Hành trình có nhắc Phong Vũ, Thomas đồng ý 08/11/2026).
- Coaching: viết "đào tạo theo chuẩn năng lực ICF" (chưa có chứng chỉ ICF).

## Kỹ thuật
- `node build.js` sinh 7 trang vào `dist/` (không framework). Nội dung nằm trong `build.js`; giao diện `assets/style.css`; JS `assets/main.js`.
- Không viết `<script>` nội tuyến (CSP trong `vercel.json`). Thêm dịch vụ ngoài thì thêm địa chỉ vào CSP.
- Giao diện (từ 07/11/2026): navy chủ đạo, cam nhấn; tiêu đề chữ hẹp đậm hai màu (Barlow Condensed, dòng dưới màu cam) qua class `big2`/`mid2`; chữ thường Be Vietnam Pro; dải nền xen kẽ `band-navy`/`band-white`/`band-cream`; đầu trang chi tiết dùng hàm `pageHero()`; ảnh chân dung tách nền `assets/img/tach-nen-*.webp` đặt trước vòng tròn cam (`.cut`); nút Đặt lịch khai vấn nổi (`.float`); ký hiệu MT làm logo tạm. Tiêu đề lớn cần line-height ≥ 1.06 để dấu tiếng Việt không chồng dòng.
- `SITE` trong `build.js` dùng cho canonical, og:url, sitemap. Bản `dist/` dùng đường dẫn gọn (`/ve-toi`); bản `art/` (xem trước dạng artifact) giữ `.html`.
- Ảnh chia sẻ `assets/img/og-cover.jpg` (1200x630, có tên miền). Đổi tên miền hoặc câu sứ mệnh thì làm lại ảnh.
