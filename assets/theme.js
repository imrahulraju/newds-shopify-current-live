document.addEventListener('DOMContentLoaded',()=>{
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  const overlay=document.querySelector('[data-overlay]');
  const menu=document.getElementById('MobileMenu');
  document.querySelectorAll('[data-menu-open]').forEach(b=>b.addEventListener('click',()=>{menu.classList.add('open');overlay.classList.add('show')}));
  const closeMenu=()=>{menu.classList.remove('open');if(!document.getElementById('CartDrawer').classList.contains('open'))overlay.classList.remove('show')};
  document.querySelectorAll('[data-menu-close]').forEach(b=>b.addEventListener('click',closeMenu));
  overlay&&overlay.addEventListener('click',()=>{closeMenu();Cart.close();Search.close()});
  document.querySelectorAll('.acc-head').forEach(h=>h.addEventListener('click',()=>{
    const body=h.nextElementSibling,open=h.parentElement.classList.toggle('open');
    if(body)body.style.display=open?'block':'none';
  }));
  document.querySelectorAll('[data-scroll]').forEach(btn=>btn.addEventListener('click',()=>{
    const dir=btn.dataset.scroll==='next'?1:-1;
    btn.closest('.carousel-wrap').querySelector('.carousel').scrollBy({left:dir*320,behavior:'smooth'});
  }));
  document.querySelectorAll('[data-modal]').forEach(b=>b.addEventListener('click',()=>{document.getElementById(b.dataset.modal).classList.add('open')}));
  document.querySelectorAll('[data-modal-close]').forEach(b=>b.addEventListener('click',()=>{b.closest('.modal').classList.remove('open')}));
});
