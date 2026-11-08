// Dựng website tĩnh Nguyễn Minh Thắng vào dist/ (bản thật) và art/ (bản xem trước dạng artifact).
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;

const SITE = 'https://www.minhthangspace.com';
const C = {
  wialProfile: 'https://directory.wial.org/vietnam/ph%E1%BB%91-%C4%91%E1%BB%A9c-giang/coaches/nguyen-minh-thang',
  email: 'thangnm.ypt@gmail.com',
  linkedin: 'https://www.linkedin.com/in/thangaiskill',
  linkedinText: 'linkedin.com/in/thangaiskill',
  calendly: 'https://calendly.com/thangnm-ypt/peer-coaching-40min',
  hub: 'https://ldskillhub.com',
  fanpage: 'https://www.facebook.com/profile.php?id=100066461480224',
  zalo: 'https://zalo.me/g/0j7jkkc2txkw2nokfqhf',
  skills: 75,
  mottoEn: 'Become <em>greater</em> every day and inspire greatness in others.',
  mottoVi: 'Trở nên vượt trội hơn mỗi ngày và truyền cảm hứng để người khác khám phá sự vượt trội bên trong họ.',
};

// Bài viết lấy từ mục Học hỏi của L&D AI Skill Hub (bản MVP: danh sách tĩnh; sau này tự cập nhật)
const ARTICLES = [
  { s: 'AI cho người làm L&D', slug: 'hieu-ai-du-de-dung-dung', t: 'Hiểu AI đủ để dùng đúng: 12 ngộ nhận người làm L&D hay gặp' },
  { s: 'AI cho người làm L&D', slug: 'tu-cau-lenh-den-ai-skill', t: 'Từ câu lệnh đến AI skill: đóng gói chuyên môn để AI làm đúng cách của mình', top: 1 },
  { s: 'AI cho người làm L&D', slug: 'mo-hinh-nguoi-ai-nguoi', t: 'Mô hình Người – AI – Người: giữ chuyên môn ở ghế lái', top: 2 },
  { s: 'AI cho người làm L&D', slug: 'tu-nguoi-nhan-don-den-kien-truc-su-hoc-tap', t: 'Từ người nhận đơn hàng đến kiến trúc sư học tập: vai trò L&D thay đổi thế nào khi có AI' },
  { s: 'AI cho người làm L&D', slug: 'dung-ai-co-trach-nhiem-trong-ld', t: 'Dùng AI có trách nhiệm trong L&D: dữ liệu, thiên lệch và minh bạch' },
  { s: 'Train the Trainer nền tảng', slug: 'thiet-ke-buoi-hoc-lay-nguoi-hoc-lam-trung-tam', t: 'Thiết kế buổi học lấy người học làm trung tâm: từ nguyên tắc học tập của người lớn đến persona' },
  { s: 'Train the Trainer nền tảng', slug: 'bien-chuyen-gia-thanh-nguoi-day-gioi', t: 'Biến chuyên gia giỏi thành người dạy giỏi: chọn, chuẩn bị và đồng hành cùng giảng viên nội bộ', top: 3 },
  { s: 'Train the Trainer nền tảng', slug: 'hoc-xong-co-nho-khong', t: 'Học xong có nhớ không? Ứng dụng khoa học trí nhớ vào thiết kế đào tạo' },
  { s: 'Train the Trainer nền tảng', slug: 'tuong-tac-co-chu-dich', t: 'Tương tác có chủ đích, không phải trò chơi cho vui: phá băng, đặt câu hỏi và tạo niềm vui học tập' },
  { s: 'Train the Trainer nền tảng', slug: 'slide-la-nguoi-dong-hanh', t: 'Slide là người đồng hành, không phải kịch bản: storyboard trước, hình ảnh có chủ đích' },
  { s: 'Train the Trainer nền tảng', slug: 'mat-xich-bi-bo-quen-chuyen-giao-hoc-tap', t: 'Mắt xích bị bỏ quên: giúp học viên áp dụng điều đã học vào công việc' },
  { s: 'Train the Trainer nền tảng', slug: 'kirkpatrick-the-gioi-moi', t: 'Kirkpatrick thế giới mới: bắt đầu từ cấp 4, dồn sức cho cấp 3' },
  { s: 'Train the Trainer nền tảng', slug: 'noi-chuyen-voi-lanh-dao-bang-ngon-ngu-kinh-doanh', t: 'Nói chuyện với lãnh đạo bằng ngôn ngữ kinh doanh: chiến lược, chỉ số và ngân sách đào tạo' },
  { s: 'Hướng dẫn dùng skill', slug: 'cai-skill-tren-claude-chatgpt-gemini', t: 'Cài và dùng skill trên Claude, ChatGPT và Gemini' },
  { s: 'Hướng dẫn dùng skill', slug: 'chon-skill-theo-addie', t: 'Chọn đúng skill cho việc đang làm, theo từng chặng ADDIE' },
];
const MONTH = 'Tháng 10/2026';
const artLink = (a) => `<li><a href="${C.hub}/hoc/${a.slug}/" target="_blank" rel="noopener"><time>${MONTH}</time><span>${a.t}</span><span class="arr" aria-hidden="true">→</span></a></li>`;

const PROGRAMS = [
  { id: 'ca-nhan', name: 'Ứng dụng AI nâng cao hiệu quả cá nhân', q: 'Đã thử AI nhưng chưa thành thói quen?', for: 'Dành cho chuyên gia và người đi làm',
    what: 'Chuyển từ hỏi-đáp rời rạc sang ứng dụng AI có phương pháp trong công việc hằng ngày.',
    items: ['Khung câu lệnh và cách kiểm chứng đầu ra', 'Xử lý văn bản, tổng hợp dữ liệu, lập kế hoạch cùng AI', 'Đóng gói kinh nghiệm thành AI skill dùng lại được', 'Thói quen làm việc hiệu quả cùng AI'],
    result: 'Ra về với ít nhất một AI skill chạy được trên việc thật của mình.' },
  { id: 'lanh-dao', name: 'Ứng dụng AI nâng cao hiệu quả lãnh đạo', q: 'Muốn đội ngũ dùng AI nhưng chưa biết bắt đầu từ đâu?', for: 'Dành cho lãnh đạo và quản lý',
    what: 'Dùng AI để ra quyết định, giao việc và phát triển đội ngũ hiệu quả hơn.',
    items: ['Tư duy lãnh đạo trong thời AI', 'AI trong lập kế hoạch, giao việc và theo dõi hiệu suất', 'Thiết lập trợ lý AI cho nhà quản lý'],
    result: 'Tự thiết lập được quy trình quản trị đội ngũ có AI hỗ trợ.' },
  { id: 'ld', name: 'Ứng dụng AI chuyển đổi L&D', q: 'Đội L&D ngập trong slide, khảo sát, báo cáo?', for: 'Dành cho người làm L&D và giảng viên nội bộ',
    what: 'Đưa AI vào quy trình đào tạo và phát triển, từ phân tích nhu cầu đến đánh giá hiệu quả.',
    items: ['Phân tích nhu cầu và thiết kế chương trình', 'Phát triển học liệu đồng bộ', 'Đo lường hiệu quả theo Kirkpatrick', 'Biến chuyên môn thành AI skill với phương pháp CAPTURE'],
    result: 'Đội ngũ L&D rút ngắn thời gian thiết kế và phát triển chương trình.' },
  { id: 'ttt', name: 'Train the Trainer (TTT)', sub: 'Giảng viên chuyên nghiệp', q: 'Giỏi chuyên môn nhưng chưa biết cách truyền đạt?', for: 'Dành cho chuyên gia, giảng viên nội bộ và người mới đứng lớp',
    what: 'Giúp người giỏi chuyên môn trở thành người dạy giỏi: thiết kế buổi học lấy người học làm trung tâm và dẫn dắt lớp học có tương tác.',
    items: ['Thiết kế buổi học lấy người học làm trung tâm', 'Tương tác có chủ đích và coaching tại chỗ theo EDAC (Explain, Demonstrate, Apply, Consolidate)', 'Slide và học liệu đồng hành cùng giảng viên', 'Giúp học viên áp dụng điều đã học vào công việc', 'Dùng AI để chuẩn bị bài giảng nhanh hơn'],
    result: 'Thiết kế và thực hành một buổi dạy hoàn chỉnh của chính mình.' },
];

const ICONS = {
  'ca-nhan': '<svg viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/></svg>',
  'lanh-dao': '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1M15 14.5a4 4 0 0 1 6 3.5v1"/></svg>',
  'ld': '<svg viewBox="0 0 24 24"><path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M7 9v5c0 1.7 2.2 3 5 3s5-1.3 5-3V9"/><path d="M21 7v6"/></svg>',
  'ttt': '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4M7 12l3-3 2 2 4-4"/></svg>',
};
const CAL = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>';

const NAV = [
  ['ve-toi.html', 'Về tôi', 've-toi', [['ve-toi.html#su-menh', 'Sứ mệnh'], ['ve-toi.html#hanh-trinh', 'Hành trình']]],
  ['chuong-trinh.html', 'Chương trình', 'chuong-trinh'],
  ['coaching.html', 'Khai vấn', 'khai-van', [['coaching.html', '1-1 Coaching'], ['action-learning.html', 'Team Coaching (Action Learning)']]],
  [C.hub, 'AI cho L&amp;D ↗', 'ai-ld', null, true],
  ['bai-viet.html', 'Bài viết', 'bai-viet'],
  ['lien-he.html', 'Liên hệ', 'lien-he'],
];

function header(active) {
  const items = NAV.map(([href, label, key, sub, ext]) => {
    const cur = key === active ? ' aria-current="page"' : '';
    if (ext) return `<li><a href="${href}" target="_blank" rel="noopener" title="Mở L&amp;D AI Skill Hub trong tab mới">${label}</a></li>`;
    if (!sub) return `<li><a href="${href}"${cur}>${label}</a></li>`;
    return `<li class="has-sub"><a href="${href}"${cur}>${label}</a><ul class="sub">${sub.map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join('')}</ul></li>`;
  }).join('');
  return `<header class="top"><div class="col">
  <a class="brand" href="index.html"><span class="mono" aria-hidden="true">MT</span>Nguyễn Minh Thắng</a>
  <button type="button" class="menu-btn" aria-expanded="false" aria-controls="menu">Menu</button>
  <ul class="menu" id="menu">${items}</ul>
</div></header>`;
}

function contactBlock() {
  return `<footer class="contact on-navy" id="ket-noi"><div class="col">
  <h2 class="big2">Kết nối <span>với tôi</span></h2>
  <p class="sub">Anh chị muốn trao đổi về một chương trình cho đội ngũ, một buổi chia sẻ, hay đơn giản là kết nối và học hỏi cùng nhau, cứ nhắn cho tôi.</p>
  <div class="social">
    <a href="mailto:${C.email}"><small>Email</small><b>${C.email}</b></a>
    <a href="${C.linkedin}" target="_blank" rel="noopener"><small>LinkedIn</small><b>${C.linkedinText}</b></a>
    <a href="${C.fanpage}" target="_blank" rel="noopener"><small>Fanpage Facebook</small><b>Theo dõi trên Facebook ↗</b></a>
    <a href="${C.zalo}" target="_blank" rel="noopener"><small>Nhóm cộng đồng Zalo</small><b>Tham gia nhóm Zalo ↗</b></a>
  </div>
  <div class="foot"><span>Greater Every Day · © 2026 Nguyễn Minh Thắng</span>
    <nav aria-label="Chân trang"><a href="ve-toi.html">Về tôi</a><a href="chuong-trinh.html">Chương trình</a><a href="coaching.html">1-1 Coaching</a><a href="action-learning.html">Team Coaching (Action Learning)</a><a href="bai-viet.html">Bài viết</a><a href="lien-he.html">Liên hệ</a></nav>
  </div>
</div></footer>`;
}

const FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Be+Vietnam+Pro:ital,wght@0,400;0,500;0,600;0,700;0,800;1,500;1,600;1,700&display=swap" rel="stylesheet">';

function pageDoc({ title, desc, active, body, url = '/' }, bodyOnly) {
  const head = `<title>${title}</title>
<meta name="description" content="${desc}">
${FONTS}
<link rel="stylesheet" href="assets/style.css">
<link rel="icon" href="assets/img/chan-dung-2.jpg">`;
  const inner = `${header(active)}
<main id="noi-dung">
${body}
</main>
${contactBlock()}
<script src="assets/main.js" defer></script>`;
  if (bodyOnly) return `${head}\n<meta name="claude:viewport-fit-sides" content="cover">\n${inner}\n`;
  return `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${head}
<link rel="canonical" href="${SITE}${url}">
<meta property="og:type" content="website">
<meta property="og:locale" content="vi_VN">
<meta property="og:site_name" content="Nguyễn Minh Thắng">
<meta property="og:url" content="${SITE}${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${SITE}/assets/img/og-cover.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
</head>
<body>
${inner}
</body>
</html>
`;
}

// Đầu trang chi tiết: tiêu đề hai dòng, ảnh tách nền (cut) hoặc ảnh có khung (framed)
function pageHero({ eyebrow, l1, l2, sub, intro, buttons = '', img, alt, kind = 'cut', w, h }) {
  const pic = !img ? '' : kind === 'cut'
    ? `<div class="cut"><img src="assets/img/${img}" alt="${alt}" width="${w}" height="${h}"></div>`
    : `<div class="framed"><img src="assets/img/${img}" alt="${alt}" width="${w}" height="${h}"></div>`;
  return `<section class="page-hero on-navy${img ? '' : ' noimg'}"><div class="col">
  <div class="txt">
    <span class="eyebrow">${eyebrow}</span>
    <h1 class="big2">${l1} <span>${l2}</span></h1>
    ${sub ? `<p class="sub-title">${sub}</p>` : ''}
    <p class="intro">${intro}</p>
    ${buttons ? `<div class="btns">${buttons}</div>` : ''}
  </div>
  ${pic}
</div></section>`;
}
const BTN_CAL = `<a class="btn btn-o" href="${C.calendly}" target="_blank" rel="noopener">Đặt lịch khai vấn</a>`;
const BTN_CONTACT = `<a class="btn btn-o" href="lien-he.html">Liên hệ trao đổi</a>`;
const BTN_PROFILE = `<a class="btn btn-w" href="lien-he.html#ho-so">Nhận hồ sơ năng lực</a>`;
const stepsHtml = (arr, n) => `<ol class="steps rv n${n}">${arr.map(([t, d], i) => `<li><b>${i + 1}</b><div><strong>${t}</strong><span>${d}</span></div></li>`).join('')}</ol>`;

/* ============ TRANG CHỦ ============ */
const home = {
  title: 'Nguyễn Minh Thắng · Trainer, Coach, AI Builder',
  desc: 'Nguyễn Minh Thắng giúp người đi làm, nhà quản lý và người làm L&D ứng dụng AI có phương pháp, để có thêm thời gian cho phát triển con người.',
  active: '',
  body: `
<section class="hero"><div class="col">
  <div class="hero-text">
    <span class="eyebrow tor">Xin chào, tôi là</span>
    <h1>Nguyễn Minh <span>Thắng</span></h1>
    <div class="roles"><span>Trainer</span><span>Coach</span><span>AI Builder</span></div>
    <p class="mission-label">Sứ mệnh của tôi là</p>
    <p class="motto">${C.mottoEn}</p>
    <p class="motto-vi">${C.mottoVi}</p>
    <div class="btns"><a class="btn btn-o" href="lien-he.html">Liên hệ trao đổi</a><a class="btn btn-w" href="chuong-trinh.html">Xem chương trình</a></div>
  </div>
  <div class="cut"><img src="assets/img/tach-nen-chap-tay.webp" alt="Chân dung Nguyễn Minh Thắng" width="591" height="1300"></div>
</div></section>

<section class="band band-white" aria-label="Ba vai trò"><div class="col">
  <div class="roles3 rv">
    <div class="role-card"><h3>Trainer</h3><p>Đào tạo các chương trình chuyển hóa và có tác động cao vào thực tiễn về Hiệu quả cá nhân, Lãnh đạo và ứng dụng AI.</p></div>
    <div class="role-card"><h3>Coach</h3><p>Khai vấn ở nhiều cấp độ, gồm Khai vấn 1-1 theo chuẩn năng lực ICF và Khai vấn nhóm theo phương pháp Action Learning, chuẩn WIAL.</p></div>
    <div class="role-card"><h3>AI Builder</h3><p>Thiết kế và xây dựng các giải pháp AI cho các bài toán thực tế. Tác giả L&amp;D AI Skill Hub, thư viện AI skill chuyên biệt dành cho người làm L&amp;D. Tác giả framework CAPTURE, giúp biến kỹ năng chuyên môn thành các AI skill dùng được trên mọi công cụ AI tạo sinh.</p></div>
  </div>
</div></section>

<section class="band band-navy on-navy band-tight" aria-label="Số liệu"><div class="col">
  <div class="nums">
    <div><b>11<i>+</i></b><span>năm Đào tạo và Phát triển con người</span></div>
    <div><b>3</b><span>năm nghiên cứu, phát triển ứng dụng và giảng dạy về AI</span></div>
    <div><b>4</b><span>tổ chức quốc tế cấp chứng nhận: WIAL, Anthropic, Google, Microsoft</span></div>
    <div class="orgs">Kinh nghiệm làm việc tại<div><span>FPT</span><span>MB GROUP</span><span>TECHCOMBANK</span></div></div>
  </div>
</div></section>

<section class="about band-white"><div class="col">
  <div class="ttl"><h2 class="big2">Về <span>tôi</span></h2></div>
  <div class="txt rv">
    <p class="lead">Kỹ sư công nghệ, hơn 11 năm làm nghề phát triển con người.</p>
    <p>Với tôi, vượt trội không phải là hơn người khác, mà là vượt qua giới hạn của chính mình mỗi ngày, và giúp người bên cạnh nhận ra những khả năng tốt đẹp bên trong họ. Hành trình ấy đi qua bốn chặng:</p>
    <ol class="chapters">
      <li><b>01</b><a href="ve-toi.html#chuyen-1">Từ kỹ sư công nghệ chuyển thành nhà đào tạo</a></li>
      <li><b>02</b><a href="ve-toi.html#chuyen-2">Trở thành nhà đào tạo, huấn luyện chuyên nghiệp</a></li>
      <li><b>03</b><a href="ve-toi.html#chuyen-3">Khám phá sứ mệnh bản thân và thực hành thói quen hiệu quả</a></li>
      <li><b>04</b><a href="ve-toi.html#chuyen-4">Xây dựng giá trị giao thoa giữa AI và con người</a></li>
    </ol>
    <a class="more" href="ve-toi.html">Đọc hành trình của tôi →</a>
  </div>
  <div class="photo"><img src="assets/img/tach-nen-khoanh-tay.webp" alt="Nguyễn Minh Thắng" width="552" height="1300" loading="lazy"></div>
</div></section>

<section class="band band-navy on-navy"><div class="col">
  <div class="head-row rv"><h2 class="big2">Chương <span>trình</span></h2><p>Bốn chương trình đào tạo, mỗi chương trình đi từ hiểu đến làm và kết thúc bằng một sản phẩm dùng được ngay trong công việc.</p></div>
  <div class="prog-grid rv">
    ${PROGRAMS.map((p) => `<a class="prog-item" href="chuong-trinh.html#${p.id}"><span class="ico">${ICONS[p.id]}</span><div><h3>${p.name}${p.sub ? `<small>${p.sub}</small>` : ''}</h3><p class="q">${p.q}</p><p class="for">${p.for}</p></div></a>`).join('\n    ')}
  </div>
  <div class="btns rv mt44"><a class="btn btn-o" href="chuong-trinh.html">Xem chi tiết chương trình</a><a class="btn btn-w" href="lien-he.html#ho-so">Nhận hồ sơ năng lực</a></div>
</div></section>

<section class="band band-cream"><div class="col">
  <div class="coach-home">
    <div class="collage rv">
      <img class="c1" src="assets/img/coaching-trao-doi.jpg" alt="Nguyễn Minh Thắng trong một phiên khai vấn 1-1" width="900" height="1124" loading="lazy">
      <img class="c2" src="assets/img/action-learning-1.jpg" alt="Nguyễn Minh Thắng điều phối một nhóm Action Learning" width="1448" height="1086" loading="lazy">
    </div>
    <div class="txt rv">
      <h2 class="big2">Khai <span>vấn</span></h2>
      <p class="tbody">Tôi khai vấn theo hướng hiệu quả bền vững và thói quen. Mục tiêu không phải là đưa ra lời khuyên, mà là giúp anh chị tự nhìn rõ điều mình muốn và biến nó thành hành động duy trì được.</p>
      <div class="forms">
        <a href="coaching.html"><small>CHO CÁ NHÂN</small><h3>1-1 Coaching</h3><p>Dựa trên trí tuệ cảm xúc, đào tạo theo chuẩn năng lực ICF. Hiệu quả bền vững và thói quen.</p><span class="go">Tìm hiểu thêm →</span></a>
        <a href="action-learning.html"><small>CHO NHÓM VÀ TỔ CHỨC</small><h3>Team Coaching (Action Learning)</h3><p>Theo phương pháp WIAL. Giải quyết vấn đề thật, phát triển năng lực cùng lúc.</p><span class="go">Tìm hiểu thêm →</span></a>
      </div>
    </div>
  </div>
</div></section>

<section class="quote quote-bg"><div class="col">
  <p class="rv">Biết điều đúng không đồng nghĩa <em>sống được</em> điều đúng.</p>
  <small>Nguyễn Minh Thắng · Greater Every Day</small>
</div></section>

<!-- Khối Ghi nhận: ẩn, bật lên khi có trích dẫn thật của người trong nghề -->

<section class="band band-white"><div class="col">
  <div class="posts-grid">
    <h2 class="big2 rv">Bài <span>viết</span></h2>
    <div class="rv">
      <ul class="articles">${ARTICLES.filter((a) => a.top).sort((a, b) => a.top - b.top).map(artLink).join('')}</ul>
      <p class="mt20"><a class="more" href="bai-viet.html">Xem tất cả bài viết →</a></p>
    </div>
  </div>
</div></section>
`,
};

/* ============ VỀ TÔI ============ */
const about = {
  title: 'Về tôi · Nguyễn Minh Thắng',
  desc: 'Sứ mệnh và hành trình của Nguyễn Minh Thắng: từ kỹ sư công nghệ thông tin đến người làm nghề phát triển con người.',
  active: 've-toi',
  body: `
${pageHero({ eyebrow: 'Kỹ sư công nghệ · 11+ năm phát triển con người', l1: 'Về', l2: 'tôi',
  intro: 'Tôi là Nguyễn Minh Thắng (Thomas), trainer, coach và AI builder. Tôi bắt đầu sự nghiệp với máy móc và phần mềm, rồi dành hơn 11 năm cho đào tạo và phát triển con người tại FPT, MB Group và Techcombank.',
  buttons: `<a class="btn btn-o" href="#hanh-trinh">Đọc hành trình</a><a class="btn btn-w" href="lien-he.html">Liên hệ trao đổi</a>`,
  img: 'tach-nen-khoanh-tay.webp', alt: 'Nguyễn Minh Thắng', w: 552, h: 1300 })}

<section class="band band-cream smt" id="su-menh"><div class="col stack">
  <span class="eyebrow rv">Sứ mệnh</span>
  <p class="mission-big rv">${C.mottoEn}</p>
  <p class="mission-vi rv">${C.mottoVi}</p>
  <div class="halves rv mt16">
    <div><small>NỬA ĐẦU · VIỆC CỦA TÔI</small><h3>Trở nên vượt trội hơn mỗi ngày</h3><p>Tôi chọn chữ "greater" thay vì "better". Vượt trội không phải là hơn người khác, mà là vượt qua những giới hạn hiện tại của chính mình. Và "mỗi ngày" không có nghĩa ngày nào cũng phải có thành tựu lớn. Đôi khi, đó chỉ là duy trì một việc nhỏ mà mình biết là quan trọng.</p></div>
    <div><small>NỬA SAU · LÝ DO TÔI LÀM NGHỀ</small><h3>Truyền cảm hứng cho người khác</h3><p>Tôi tin mỗi người đều có những khả năng tốt đẹp chưa được khám phá hoặc chưa có điều kiện phát huy. Mỗi lần đào tạo, khai vấn hay đồng hành cùng ai đó, tôi mong góp một phần để họ nhận ra khả năng ấy và tiến thêm một bước.</p></div>
  </div>
</div></section>

<section class="band band-white smt" id="hanh-trinh"><div class="col narrow">
  <div class="head-row rv"><h2 class="big2">Hành <span>trình</span></h2><p>Bốn chặng đường làm nên tôi hôm nay.</p></div>
  <ol class="map rv">
    <li><span class="dot"></span><b>Kỹ sư CNTT</b></li>
    <li class="star"><span class="dot">1</span><b>FPT</b><a href="#chuyen-1">Chặng 1</a></li>
    <li class="star"><span class="dot">2</span><b>MB Group</b><a href="#chuyen-2">Chặng 2</a></li>
    <li class="star"><span class="dot">3</span><b>Techcombank</b><a href="#chuyen-3">Chặng 3</a></li>
    <li class="star"><span class="dot">4</span><b>AI</b><a href="#chuyen-4">Chặng 4</a></li>
  </ol>

  <article class="story" id="chuyen-1">
    <div class="flag rv"><b>01</b><small>Chặng</small></div>
    <div class="rv">
      <h3>Từ kỹ sư công nghệ chuyển thành nhà đào tạo</h3>
      <div class="prose">
        <p>Năm 2014, tôi là một kỹ thuật viên công nghệ thông tin. Công việc hằng ngày là máy móc và phần mềm: sự cố nào cũng có nguyên nhân, có cách sửa, và máy không cần được thuyết phục.</p>
        <p>Rồi tôi xin thử sức ở vị trí giảng viên. Đó là một thử thách ba tháng: ai đáp ứng đủ yêu cầu sẽ ở lại làm giảng viên chính thức, ai chưa đủ sẽ quay về vị trí cũ.</p>
        <p>Xuất phát điểm của tôi gần như không có lợi thế nào. Trình bày, thuyết phục, tạo ảnh hưởng đến người khác đều là điểm yếu của một người quen làm việc với máy. Thứ tôi có chỉ là sự chăm chỉ, tinh thần trách nhiệm, sự cẩn thận, chu đáo, ham học hỏi và mong muốn thật lòng giúp người học hiểu bài.</p>
        <p>Ba tháng sau, tôi được giữ lại.</p>
        <p>Nhìn lại, tôi hiểu điều giữ tôi ở lại không phải vì kỹ năng giảng dạy của tôi đã thay đổi hoàn toàn. Kỹ năng có thể học và rèn luyện thành thạo sau một thời gian. Còn sự tử tế, trách nhiệm và hết mình với công việc thì rất khó thay đổi ở một con người, và đó lại là những phẩm chất quan trọng nhất của người làm nghề đào tạo.</p>
      </div>
      <p class="lesson">Điều quan trọng nhất ở một người giảng viên không bắt đầu từ kỹ năng, mà từ phẩm chất bên trong: trách nhiệm, tử tế, ham học hỏi và mong muốn giúp đỡ người khác.</p>
    </div>
  </article>

  <article class="story" id="chuyen-2">
    <div class="flag rv"><b>02</b><small>Chặng</small></div>
    <div class="rv">
      <h3>Trở thành nhà đào tạo, huấn luyện chuyên nghiệp</h3>
      <div class="prose">
        <p>Sau khi được giữ lại, tôi biết mình mới chỉ đi những bước đầu tiên. Những năm tiếp theo, ở vai trò quản lý đào tạo rồi giảng viên nội bộ tại MB Group, tôi tập trung học hỏi và củng cố các kỹ năng để trở thành một nhà đào tạo, huấn luyện chuyên nghiệp.</p>
        <p>Tôi đặt cho mình hai mục tiêu cho mỗi lớp học. Thứ nhất, lớp học phải có năng lượng và cảm hứng, để người học muốn tham gia chứ không chỉ ngồi nghe. Thứ hai, quan trọng hơn, người học phải áp dụng được vào công việc và tạo ra kết quả thực tế.</p>
      </div>
      <p class="lesson">Một lớp học không kết thúc khi hết giờ. Nó chỉ thật sự hoàn thành khi người học mang được điều đã học vào công việc.</p>
    </div>
  </article>

  <article class="story" id="chuyen-3">
    <div class="flag rv"><b>03</b><small>Chặng</small></div>
    <div class="rv">
      <h3>Khám phá sứ mệnh bản thân và thực hành thói quen hiệu quả</h3>
      <div class="prose">
        <p>Khoảng bốn năm trước, tôi dành thời gian suy ngẫm nghiêm túc về sứ mệnh của bản thân. Tôi thử hình dung một thời điểm rất xa, khi mình đã già và có cơ hội nhìn lại toàn bộ cuộc đời đã đi qua. Khi ấy, điều gì sẽ khiến tôi thấy cuộc đời này có ý nghĩa? Tôi đã trở thành người như thế nào, đã tạo ra giá trị gì?</p>
        <p>Phiên bản đầu tiên của bản tuyên ngôn sứ mệnh không phải một câu ngắn gọn. Nó dài gần hai trang giấy: những khát khao, những thế mạnh và cả điểm yếu tôi nhận ra ở mình, những điều khiến tôi hạnh phúc khi làm, những giá trị tôi sẵn lòng cho đi.</p>
        <p>Mỗi năm, tôi đọc lại và suy ngẫm. Bản tuyên ngôn ngắn dần, không phải vì những điều từng viết không còn quan trọng, mà vì tôi thấy rõ hơn điều gì đang kết nối tất cả lại với nhau. Từ gần hai trang giấy, cuối cùng chỉ còn một câu: <strong>Become greater every day and inspire greatness in others.</strong></p>
        <p>Những năm làm đào tạo cũng cho tôi thấy: biết thêm một phương pháp chưa chắc tạo ra thay đổi. Giá trị chỉ xuất hiện khi điều đã học đi vào thực hành và trở thành hành vi duy trì được. Với chính bản tuyên ngôn này cũng vậy.</p>
      </div>
      <p class="lesson">Điều quan trọng không nằm ở việc viết được một bản tuyên ngôn hay đến đâu, mà là mình đã sống với nó như thế nào.</p>
    </div>
  </article>

  <article class="story" id="chuyen-4">
    <div class="flag rv"><b>04</b><small>Chặng</small></div>
    <div class="rv">
      <h3>Xây dựng giá trị giao thoa giữa AI và con người</h3>
      <div class="prose">
        <p>Hơn 11 năm làm nghề, tôi đã nhiều lần thấy đồng nghiệp cặm cụi hàng giờ nghiên cứu tài liệu, soạn giáo án, chuẩn bị lớp. Nhiều giờ trong số đó bị tiêu vào những việc lặp đi lặp lại, thay vì phần quan trọng nhất của nghề: ở bên con người, lắng nghe, kèm cặp, giúp một ai đó tiến bộ.</p>
        <p>AI có thể gánh bớt phần việc đó. Nhưng khi bắt đầu đóng gói chính công việc của mình thành AI skill, tôi nhận ra điều khó nhất không phải công nghệ, mà là diễn đạt rõ cách mình làm việc: bắt đầu từ đâu, dựa vào gì để quyết định, thế nào là đủ tốt.</p>
        <p>Tôi dành một tháng, nhiều đêm thức muộn, để nghiên cứu phương pháp, viết từng skill và tự xây một website để chia sẻ. Từ đó có phương pháp CAPTURE và L&amp;D AI Skill Hub, thư viện AI skill miễn phí cho người làm L&amp;D.</p>
        <p>Người kỹ sư công nghệ năm nào và người làm nghề phát triển con người hôm nay, cuối cùng đã gặp lại nhau.</p>
      </div>
      <p class="lesson">AI có thể gánh bớt việc lặp lại, nhưng chỉ khi nó hiểu cách chúng ta làm việc.</p>
    </div>
  </article>
</div></section>

<section class="band band-cream" id="chung-nhan"><div class="col">
  <div class="head-row rv"><h2 class="big2">Nền <span>tảng</span></h2><p>Học vấn và các chứng nhận chuyên môn.</p></div>
  <div class="stack rv">
    <div class="edu"><b>HỌC VẤN</b><span>Kỹ sư Công nghệ thông tin</span>·<span>Thạc sĩ Quản trị Kinh doanh (MBA), Đại học FPT</span></div>
    <ul class="certs">
      <li><span class="org">WIAL · 2024</span><strong>Certified Action Learning Coach (CALC)</strong><span>World Institute for Action Learning · <a href="${C.wialProfile}" target="_blank" rel="noopener">Xem hồ sơ trên trang WIAL</a></span></li>
      <li><span class="org">LCV</span><strong>Leap Coaching Essentials (ICF Level 1)</strong><span>Chương trình đào tạo khai vấn theo chuẩn năng lực ICF</span></li>
      <li><span class="org">ANTHROPIC · 2026</span><strong>AI Fluency for Educators &amp; Teaching AI Fluency</strong><span>Anthropic Academy</span></li>
      <li><span class="org">GOOGLE · 2026</span><strong>Generative AI for Educators &amp; Google Certified Educator L1</strong><span>Google for Education</span></li>
      <li><span class="org">MICROSOFT · 2025</span><strong>Innovative Trainer</strong><span>Microsoft</span></li>
      <li><span class="org">KHÁC</span><strong>Mental Health First Aider · Certified Professional Trainer</strong></li>
    </ul>
  </div>
</div></section>
`,
};

/* ============ CHƯƠNG TRÌNH ============ */
const programs = {
  title: 'Chương trình · Nguyễn Minh Thắng',
  desc: 'Bốn chương trình đào tạo: ứng dụng AI cho cá nhân, nhà lãnh đạo, đội ngũ L&D, và Train the Trainer.',
  active: 'chuong-trinh',
  body: `
${pageHero({ eyebrow: 'Bốn chương trình đào tạo', l1: 'Chương', l2: 'trình',
  intro: 'Biết thêm một phương pháp chưa chắc tạo ra thay đổi. Vì vậy mỗi chương trình đều đi từ hiểu đến làm, thực hành trên bài toán thật của người học, và kết thúc bằng một sản phẩm dùng được ngay trong công việc.',
  buttons: BTN_CONTACT + BTN_PROFILE, img: 'tach-nen-chinh-tay-ao.webp', alt: 'Nguyễn Minh Thắng', w: 570, h: 1300 })}

<section class="band band-cream"><div class="col stack g28">
  ${PROGRAMS.map((p, i) => `<article class="prog-card rv" id="${p.id}">
    <div class="side"><span class="ico">${ICONS[p.id]}</span><small>CHƯƠNG TRÌNH 0${i + 1}</small><h3>${p.name}</h3>${p.sub ? `<p><strong class="w">${p.sub}</strong></p>` : ''}<p class="q">${p.q}</p><p>${p.for}</p></div>
    <div class="body"><p class="what">${p.what}</p>
      <ul class="dash">${p.items.map((x) => `<li>${x}</li>`).join('')}</ul>
      <p class="result"><small>KẾT QUẢ CHO NGƯỜI HỌC</small>${p.result}</p></div>
  </article>`).join('\n  ')}
</div></section>

<section class="band band-navy on-navy"><div class="col">
  <div class="head-row rv"><h2 class="big2">Nhịp <span>học</span></h2><p>Mỗi nội dung trong chương trình đi qua năm bước, và kết thúc bằng kế hoạch thực hành 21–30 ngày sau lớp học.</p></div>
  ${stepsHtml([['Hiểu', 'Nắm nguyên lý và khung phương pháp'], ['Xem mẫu', 'Quan sát cách làm chuẩn'], ['Làm theo', 'Thực hành có hướng dẫn'], ['Tự làm', 'Áp dụng vào việc của mình'], ['Làm cùng nhóm', 'Chia sẻ, phản hồi, nhân rộng']], 5)}
</div></section>
`,
};

/* ============ 1-1 COACHING ============ */
const coaching = {
  title: '1-1 Coaching · Nguyễn Minh Thắng',
  desc: 'Khai vấn 1-1 theo trường phái hiệu quả bền vững và thói quen, dựa trên trí tuệ cảm xúc, đào tạo theo chuẩn năng lực ICF.',
  active: 'khai-van',
  body: `
${pageHero({ eyebrow: 'Khai vấn · 1-1 Coaching', l1: '1-1', l2: 'Coaching', sub: 'Khai vấn theo trường phái hiệu quả bền vững và thói quen',
  intro: 'Đồng hành 1:1 dựa trên nền tảng trí tuệ cảm xúc, theo chuẩn năng lực ICF, để cùng anh chị khám phá suy nghĩ, nhìn lại những trăn trở dưới lăng kính của các nguyên lý hiệu quả, từ đó tìm cơ hội xây dựng những thay đổi duy trì được lâu dài trong công việc và cuộc sống.',
  buttons: BTN_CAL, img: 'coaching-lang-nghe.jpg', alt: 'Nguyễn Minh Thắng lắng nghe trong một phiên khai vấn', kind: 'framed', w: 900, h: 1125 })}

<section class="band band-white"><div class="col narrow stack">
  <div class="head-row rv mb6"><h2 class="mid2">Khai vấn <span>là gì</span></h2></div>
  <blockquote class="icf rv">
    <p>"Khai vấn là sự đồng hành cùng khách hàng trong một tiến trình khơi gợi tư duy và sáng tạo, truyền cảm hứng để họ phát huy tối đa tiềm năng cá nhân và nghề nghiệp."</p>
    <footer>ICF, Liên đoàn Khai vấn Quốc tế (International Coaching Federation)</footer>
    <small>Nguyên văn: "Partnering with clients in a thought-provoking and creative process that inspires them to maximize their personal and professional potential."</small>
  </blockquote>
  <div class="prose rv"><p>Người khai vấn không đưa ra lời khuyên hay câu trả lời có sẵn. Bằng cách đặt câu hỏi và lắng nghe, người khai vấn giúp anh chị tự nhìn rõ điều mình muốn, tự tìm ra hướng đi và cam kết hành động của chính mình.</p></div>
</div></section>

<section class="band band-cream"><div class="col narrow">
  <div class="head-row rv"><h2 class="mid2">Phù hợp <span>nếu anh chị</span></h2></div>
  <ul class="bullets rv">
    <li>Muốn thay đổi một thói quen nhưng chưa duy trì được</li>
    <li>Thấy mình bận rộn nhưng chưa thật sự hiệu quả</li>
    <li>Có một trăn trở trong công việc hay cuộc sống muốn được lắng nghe và nhìn lại</li>
  </ul>
</div></section>

<section class="band band-navy on-navy"><div class="col">
  <div class="media2">
    <div class="rv stack g18">
      <span class="eyebrow">Cách tôi khai vấn</span>
      <h2 class="mid2">Một không gian an toàn <span>để nói ra điều mình đang trăn trở</span></h2>
      <div class="prose">
        <p>Mỗi phiên khai vấn là một không gian an toàn và thoải mái, nơi anh chị có thể nói ra những điều đang trăn trở, lo lắng hay suy nghĩ mà không sợ bị đánh giá.</p>
        <p>Khi được lắng nghe trọn vẹn, những điều rối bời bên trong dần trở nên sáng rõ. Anh chị hiểu hơn về bức tranh hiện tại của mình: cảm xúc, mong muốn và những gì đang thực sự quan trọng.</p>
        <p>Từ đó, anh chị nhận ra những điểm sáng sẵn có trong chính mình: những nguồn lực có thể dựa vào để tháo gỡ lo lắng, phát triển hơn và sống đủ đầy hơn.</p>
      </div>
    </div>
    <figure class="m tall rv"><img src="assets/img/coaching-trao-doi.jpg" alt="Nguyễn Minh Thắng trao đổi trong một phiên khai vấn" width="900" height="1124" loading="lazy"></figure>
  </div>
</div></section>

<section class="band band-white"><div class="col">
  <div class="head-row rv"><h2 class="mid2">Một phiên <span>diễn ra thế nào</span></h2><p>40 phút qua Zoom. Tôi đang tích lũy giờ thực hành khai vấn, nên các phiên hiện tại miễn phí.</p></div>
  ${stepsHtml([['Chọn chủ đề', 'Anh chị mang đến một điều đang trăn trở'], ['Làm rõ điều muốn', 'Thành công trông như thế nào với anh chị'], ['Nhìn lại và mở lựa chọn', 'Hiện trạng, điều cản trở, các hướng đi'], ['Chốt một bước', 'Một hành động nhỏ làm được ngay']], 4)}
  <p class="callout rv mt28"><b>Khai vấn không phải là trị liệu.</b> Khai vấn không thay thế trị liệu tâm lý hay tư vấn y tế. Nếu nhận thấy anh chị cần một sự hỗ trợ chuyên sâu hơn, tôi sẽ nói rõ và gợi ý anh chị tìm đến chuyên gia phù hợp.</p>
</div></section>

<section class="band band-cream"><div class="col">
  <div class="head-row rv"><h2 class="mid2">Nền tảng <span>khai vấn</span></h2></div>
  <ul class="certs rv">
    <li><span class="org">LCV</span><strong>Leap Coaching Essentials (ICF Level 1)</strong><span>Đào tạo theo chuẩn năng lực ICF, nền tảng trí tuệ cảm xúc</span></li>
    <li><span class="org">WIAL · 2024</span><strong>Certified Action Learning Coach (CALC)</strong><span>World Institute for Action Learning</span></li>
    <li><span class="org">KHÁC</span><strong>Mental Health First Aider</strong><span>Thành viên Peer Coaching Việt Nam</span></li>
  </ul>
</div></section>

<section class="band band-white"><div class="col narrow stack">
  <div class="head-row rv mb6"><h2 class="mid2">Hỏi <span>đáp</span></h2></div>
  <div class="faq rv">
    <details><summary>Một phiên diễn ra như thế nào?</summary><p>Mỗi phiên 40 phút qua Zoom. Anh chị mang đến một chủ đề đang trăn trở. Chúng ta cùng làm rõ điều anh chị muốn, nhìn lại hiện trạng, các lựa chọn, và chốt một bước làm được ngay.</p></details>
    <details><summary>Nội dung phiên có được bảo mật không?</summary><p>Có. Tôi giữ bảo mật nội dung mọi phiên khai vấn theo chuẩn đạo đức nghề khai vấn.</p></details>
    <details><summary>Vì sao các phiên hiện đang miễn phí?</summary><p>Tôi đang tích lũy giờ thực hành khai vấn. Các phiên miễn phí là cơ hội để anh chị trải nghiệm khai vấn, và để tôi tiếp tục học hỏi.</p></details>
  </div>
  <div class="btns rv">${BTN_CAL}</div>
</div></section>
<a class="float" href="${C.calendly}" target="_blank" rel="noopener" aria-label="Đặt lịch khai vấn">${CAL}<span>Đặt lịch khai vấn</span></a>
`,
};

/* ============ TEAM COACHING (ACTION LEARNING) ============ */
const al = {
  title: 'Team Coaching (Action Learning) · Nguyễn Minh Thắng',
  desc: 'Team Coaching theo phương pháp Action Learning của WIAL: một nhóm cùng giải quyết vấn đề thật, phát triển năng lực lãnh đạo trong lúc làm.',
  active: 'khai-van',
  body: `
${pageHero({ eyebrow: 'Khai vấn · Team Coaching', l1: 'Team', l2: 'Coaching', sub: 'Action Learning · Giải quyết vấn đề thật, phát triển năng lực cùng lúc',
  intro: 'Action Learning giúp một nhóm cùng giải quyết một vấn đề thật đang khó của tổ chức. Trong lúc đó, mỗi người rèn luyện năng lực lãnh đạo, kỹ năng đặt câu hỏi và học hỏi lẫn nhau.',
  buttons: BTN_CONTACT, img: 'action-learning-1.jpg', alt: 'Nguyễn Minh Thắng điều phối một nhóm Action Learning', kind: 'framed', w: 1448, h: 1086 })}

<section class="band band-white"><div class="col">
  <div class="head-row rv"><h2 class="mid2">Action Learning <span>là gì</span></h2><p>Sáu thành phần theo phương pháp của WIAL (World Institute for Action Learning).</p></div>
  <div class="grid3 rv">
    <div><b>01</b><h3>Vấn đề thật</h3><p>Một vấn đề quan trọng, cấp bách, chưa có lời giải sẵn.</p></div>
    <div><b>02</b><h3>Nhóm nhỏ</h3><p>Khoảng 4–8 người với góc nhìn và kinh nghiệm khác nhau.</p></div>
    <div><b>03</b><h3>Câu hỏi trước câu trả lời</h3><p>Nhóm đặt câu hỏi và suy ngẫm trước khi đưa ra giải pháp.</p></div>
    <div><b>04</b><h3>Hành động</h3><p>Nhóm đề xuất và cam kết thực hiện hành động cụ thể.</p></div>
    <div><b>05</b><h3>Cam kết học hỏi</h3><p>Học từ chính quá trình giải quyết vấn đề, không chỉ tìm ra lời giải.</p></div>
    <div><b>06</b><h3>Action Learning Coach</h3><p>Giúp nhóm dừng lại, nhìn lại cách làm việc và học hỏi sau mỗi chặng.</p></div>
  </div>
</div></section>

<section class="band band-cream"><div class="col narrow">
  <div class="head-row rv"><h2 class="mid2">Phù hợp <span>khi</span></h2></div>
  <ul class="bullets rv">
    <li>Có một vấn đề phức tạp, nhiều bên liên quan, chưa có lời giải sẵn</li>
    <li>Muốn phát triển đội ngũ quản lý trên chính công việc thật, thay vì chỉ học trên lớp</li>
    <li>Cần các bộ phận cùng ngồi lại và nhìn vấn đề từ nhiều góc</li>
  </ul>
</div></section>

<section class="band band-navy on-navy"><div class="col stack g36">
  <div class="media2 rev">
    <div class="rv stack g16">
      <span class="eyebrow">Một buổi Action Learning</span>
      <h2 class="mid2">Diễn ra <span>thế nào</span></h2>
      <p>Cả nhóm cùng đi từ một vấn đề thật đến những cam kết hành động cụ thể, và mỗi người mang về bài học cho riêng mình.</p>
    </div>
    <figure class="m wide rv"><img src="assets/img/action-learning-2.jpg" alt="Một nhóm Action Learning đang trao đổi quanh bàn tròn" width="1448" height="1086" loading="lazy"></figure>
  </div>
  ${stepsHtml([['Trình bày vấn đề', 'Người có vấn đề chia sẻ ngắn gọn'], ['Đặt câu hỏi', 'Cả nhóm hỏi để hiểu sâu, chưa vội giải pháp'], ['Xác định vấn đề thật', 'Thống nhất điều cần giải quyết'], ['Cam kết hành động', 'Chọn bước đi cụ thể'], ['Đúc kết bài học', 'Mỗi người rút ra điều học được']], 5)}
</div></section>

<section class="band band-white"><div class="col">
  <div class="media2">
    <div class="rv stack g16">
      <h2 class="mid2">Nền tảng <span>WIAL</span></h2>
      <ul class="certs one"><li><span class="org">WIAL · 2024</span><strong>Certified Action Learning Coach (CALC)</strong><span>World Institute for Action Learning</span></li></ul>
      <p class="note">Tôi được đào tạo và chứng nhận theo phương pháp Action Learning của WIAL (World Institute for Action Learning), tổ chức chứng nhận Action Learning Coach trên toàn cầu.</p>
      <p><a class="more" href="${C.wialProfile}" target="_blank" rel="noopener">Xem hồ sơ coach của tôi trên trang WIAL →</a></p>
    </div>
    <figure class="m tall rv fig-wial"><img src="assets/img/wial-viet-nam.jpg" alt="Nguyễn Minh Thắng cùng anh Nguyễn Duy Minh, Giám đốc WIAL Việt Nam" width="900" height="1200" loading="lazy"><figcaption>Cùng anh Nguyễn Duy Minh, Trưởng đại diện, Giám đốc WIAL Việt Nam, WIAL Master Coach &amp; Mentor</figcaption></figure>
  </div>
</div></section>

<section class="band band-cream"><div class="col narrow stack">
  <div class="head-row rv mb6"><h2 class="mid2">Hỏi <span>đáp</span></h2></div>
  <div class="faq rv">
    <details><summary>Action Learning khác một buổi họp giải quyết vấn đề thế nào?</summary><p>Buổi họp thường tập trung tìm ra giải pháp nhanh. Action Learning dành thời gian đặt câu hỏi để hiểu đúng vấn đề, và luôn có phần nhìn lại để cả nhóm học được cách làm việc tốt hơn.</p></details>
    <details><summary>Ai nên tham gia?</summary><p>Những người liên quan đến vấn đề hoặc có góc nhìn khác nhau về nó, thường là đội ngũ quản lý hoặc nhóm dự án từ nhiều bộ phận.</p></details>
    <details><summary>Vai trò của Action Learning Coach là gì?</summary><p>Coach không giải quyết vấn đề thay nhóm. Coach giúp nhóm dừng lại đúng lúc, đặt câu hỏi về cách cả nhóm đang làm việc, và biến trải nghiệm thành bài học.</p></details>
  </div>
  <div class="btns rv">${BTN_CONTACT}</div>
</div></section>
`,
};

/* ============ BÀI VIẾT ============ */
const seriesOrder = [...new Set(ARTICLES.map((a) => a.s))];
const posts = {
  title: 'Bài viết · Nguyễn Minh Thắng',
  desc: 'Các bài viết của Nguyễn Minh Thắng về AI cho người làm L&D và Train the Trainer, đăng trên L&D AI Skill Hub.',
  active: 'bai-viet',
  body: `
${pageHero({ eyebrow: 'Chia sẻ về AI và nghề đào tạo', l1: 'Bài', l2: 'viết',
  intro: 'Tôi viết về cách người làm L&amp;D dùng AI vào công việc thật, và những nền tảng của nghề giảng dạy. Các bài được đăng trên L&amp;D AI Skill Hub.',
  buttons: `<a class="btn btn-o" href="${C.hub}/hoc/" target="_blank" rel="noopener">Đọc trên L&amp;D AI Skill Hub ↗</a>` })}

<section class="band band-white"><div class="col narrow stack g48">
  ${seriesOrder.map((s) => `<div class="rv"><p class="series">${s}</p><ul class="articles">${ARTICLES.filter((a) => a.s === s).map(artLink).join('')}</ul></div>`).join('\n  ')}
</div></section>
`,
};

/* ============ LIÊN HỆ ============ */
const subject = encodeURIComponent('Nhận hồ sơ năng lực');
const mailBody = encodeURIComponent('Họ tên:\nSố điện thoại:\nTổ chức:\nVấn đề cần kết nối (mời đào tạo / mời làm diễn giả / khai vấn / khác):\nMô tả thêm:\n');
const contact = {
  title: 'Liên hệ · Nguyễn Minh Thắng',
  desc: 'Liên hệ Nguyễn Minh Thắng: email, LinkedIn, đặt lịch khai vấn, nhận hồ sơ năng lực.',
  active: 'lien-he',
  body: `
${pageHero({ eyebrow: 'Kết nối với tôi', l1: 'Liên', l2: 'hệ',
  intro: 'Anh chị muốn trao đổi về một chương trình cho đội ngũ, một buổi chia sẻ, hay đơn giản là kết nối và học hỏi cùng nhau, cứ nhắn cho tôi.',
  buttons: `<a class="btn btn-o" href="#ho-so">Nhận hồ sơ năng lực</a>`, img: 'tach-nen-chap-tay.webp', alt: 'Nguyễn Minh Thắng', w: 591, h: 1300 })}

<section class="band band-cream"><div class="col narrow stack g28">
  <div class="ways rv">
    <div><small>Email</small><div class="copy"><code id="mail">${C.email}</code><button type="button" class="mini" data-copy="mail">Chép</button></div></div>
    <div><small>LinkedIn</small><b><a href="${C.linkedin}" target="_blank" rel="noopener">${C.linkedinText}</a></b></div>
    <div><small>Fanpage Facebook</small><b><a href="${C.fanpage}" target="_blank" rel="noopener">Theo dõi trên Facebook ↗</a></b></div>
    <div><small>Nhóm cộng đồng Zalo</small><b><a href="${C.zalo}" target="_blank" rel="noopener">Tham gia nhóm Zalo ↗</a></b></div>
  </div>
  <div class="profile-box rv" id="ho-so">
    <h2>Nhận hồ sơ <span>năng lực</span></h2>
    <p>Gửi email đến <strong>${C.email}</strong> với tiêu đề <strong>"Nhận hồ sơ năng lực"</strong>, kèm các thông tin:</p>
    <ol><li>Họ tên</li><li>Số điện thoại</li><li>Tổ chức</li><li>Vấn đề cần kết nối: mời đào tạo, mời làm diễn giả, khai vấn hoặc khác</li></ol>
    <p>Tôi sẽ gửi lại hồ sơ năng lực qua email.</p>
    <div class="btns"><a class="btn btn-o" href="mailto:${C.email}?subject=${subject}&amp;body=${mailBody}">Soạn email nhận hồ sơ</a></div>
  </div>
</div></section>
`,
};
const PAGES = [['index.html', home], ['ve-toi.html', about], ['chuong-trinh.html', programs], ['coaching.html', coaching], ['action-learning.html', al], ['bai-viet.html', posts], ['lien-he.html', contact]];

function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const f of fs.readdirSync(src)) {
    const s = path.join(src, f), d = path.join(dst, f);
    if (fs.statSync(s).isDirectory()) copyDir(s, d); else fs.copyFileSync(s, d);
  }
}

for (const [out, bodyOnlyIndex] of [['dist', false], ['art', true]]) {
  const dir = path.join(ROOT, out);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  for (const [file, page] of PAGES) {
    const url = file === 'index.html' ? '/' : '/' + file.replace('.html', '');
    let html = pageDoc({ ...page, url }, bodyOnlyIndex && file === 'index.html');
    // bản thật dùng đường dẫn gọn (/ve-toi thay vì ve-toi.html)
    if (out === 'dist') html = html.replace(/href="index\.html"/g, 'href="/"').replace(/href="([a-z-]+)\.html(#[a-z0-9-]+)?"/g, (m, n, h) => `href="/${n}${h || ''}"`);
    fs.writeFileSync(path.join(dir, file), html);
  }
  copyDir(path.join(ROOT, 'assets'), path.join(dir, 'assets'));
}
// 404 cho bản thật
fs.writeFileSync(path.join(ROOT, 'dist', '404.html'), pageDoc({ title: 'Không tìm thấy trang · Nguyễn Minh Thắng', desc: 'Không tìm thấy trang.', active: '', body: pageHero({ eyebrow: 'Lỗi 404', l1: 'Không tìm', l2: 'thấy trang', intro: 'Trang anh chị tìm có thể đã đổi địa chỉ.', buttons: `<a class="btn btn-o" href="/">Về trang chủ</a>` }) }));
{ const f=path.join(ROOT,'dist','404.html'); fs.writeFileSync(f, fs.readFileSync(f,'utf8').replace(/(href|src)="(assets\/|[a-z-]+\.html|index\.html)/g,'$1="/$2')); }
fs.writeFileSync(path.join(ROOT, 'dist', 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${PAGES.map(([f]) => `  <url><loc>${SITE}${f === 'index.html' ? '/' : '/' + f.replace('.html', '')}</loc></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(ROOT, 'dist', 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
console.log('Đã dựng', PAGES.length, 'trang vào dist/ và art/');
