(function(){
  var root=document.documentElement;

  // menu trên điện thoại
  var btn=document.querySelector('.menu-btn'), menu=document.getElementById('menu');
  if(btn&&menu){
    btn.addEventListener('click',function(){
      var open=menu.classList.toggle('open');
      btn.setAttribute('aria-expanded',String(open));
      btn.textContent=open?'Đóng':'Menu';
    });
  }

  // dải thông báo hết hạn thì ẩn
  document.querySelectorAll('[data-until]').forEach(function(a){ if(Date.now()>Date.parse(a.getAttribute('data-until'))) a.hidden=true; });

  // nút chép
  document.querySelectorAll('[data-copy]').forEach(function(b){
    b.addEventListener('click',function(){
      var el=document.getElementById(b.getAttribute('data-copy')); if(!el) return;
      var t=el.textContent;
      function sel(){var r=document.createRange();r.selectNodeContents(el);var s=getSelection();s.removeAllRanges();s.addRange(r);b.textContent='Đã chọn, nhấn Ctrl+C';}
      try{navigator.clipboard.writeText(t).then(function(){b.textContent='Đã chép';},sel);}catch(e){sel();}
    });
  });

  // cuộn đến đâu hiện đến đó
  if(!('IntersectionObserver' in window)) return;
  if(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var els=[].slice.call(document.querySelectorAll('.rv')), vh=window.innerHeight||800;
  els.forEach(function(el){ if(el.getBoundingClientRect().top<vh) el.classList.add('in'); });
  root.classList.add('rv-on');
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{rootMargin:'0px 0px -8% 0px',threshold:0.05});
  els.forEach(function(el){ if(!el.classList.contains('in')) io.observe(el); });
  window.addEventListener('beforeprint',function(){els.forEach(function(el){el.classList.add('in');});});
})();
