document.addEventListener('DOMContentLoaded',()=>{
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  if(window.matchMedia&&matchMedia('(hover:hover)').matches){
    document.querySelectorAll('.p-card').forEach(card=>{
      const track=card.querySelector('.p-track');
      const imgs=card.querySelectorAll('.p-track img');
      if(!track||imgs.length<2)return;
      const dots=card.querySelectorAll('.p-dots i');
      let i=0,timer=null,delay=null;
      const show=n=>{i=(n+imgs.length)%imgs.length;track.style.transform='translateX(-'+(i*100)+'%)';dots.forEach((d,k)=>d.classList.toggle('on',k===i));};
      card.addEventListener('mouseenter',()=>{clearInterval(timer);clearTimeout(delay);delay=setTimeout(()=>{show(i+1);timer=setInterval(()=>show(i+1),1800);},500);});
      card.addEventListener('mouseleave',()=>{clearInterval(timer);clearTimeout(delay);show(0);});
    });
  }
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
