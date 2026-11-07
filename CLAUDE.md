# CLAUDE.md — Website cá nhân Nguyễn Minh Thắng

Website hồ sơ giảng viên của Nguyễn Minh Thắng (Thomas). Repo này tách riêng với `ld-skills-hub`.

## Cách làm việc
- Trao đổi với Thomas bằng tiếng Việt, xưng "em", gọi "anh".
- Thomas muốn đi từng bước: đưa bản nháp/phương án, chờ duyệt rồi mới sửa. Không tự sửa khi chưa được đồng ý.
- Push `main` = Vercel tự đưa lên production.

## Nội dung và giọng văn
- Website xưng "tôi", gọi người đọc là "anh chị". Câu ngắn, không emoji, không bịa số liệu.
- Phong cách "chuyên gia điềm tĩnh": không tự phong chuyên gia, không bảng giá, không bán hàng.
- Câu sứ mệnh: "Become greater every day and inspire greatness in others." / "Trở nên vượt trội hơn mỗi ngày và truyền cảm hứng để người khác khám phá sự vượt trội bên trong họ."
- Không nhắc: 7 Habits/FranklinCovey, giải thưởng nội bộ Techcombank, vai trò AI Builder tại Techcombank, ĐH Ngoại thương. Tổ chức chỉ nhắc FPT, MB Group, Techcombank.
- Coaching: viết "đào tạo theo chuẩn năng lực ICF" (chưa có chứng chỉ ICF).

## Kỹ thuật
- `node build.js` sinh 7 trang vào `dist/` (không framework). Nội dung nằm trong `build.js`; giao diện `assets/style.css`; JS `assets/main.js`.
- Không viết `<script>` nội tuyến (CSP trong `vercel.json`). Thêm dịch vụ ngoài thì thêm địa chỉ vào CSP.
- Trắng chủ đạo, chữ navy, điểm nhấn cam, font Be Vietnam Pro.
