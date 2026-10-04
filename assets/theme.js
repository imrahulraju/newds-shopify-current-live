document.addEventListener('DOMContentLoaded',()=>{
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  const hoverOK = window.matchMedia&&matchMedia('(hover:hover)').matches;
  document.querySelectorAll('.p-card').forEach(card=>{
    const media=card.querySelector('.p-media');
    const track=card.querySelector('.p-track');
    const imgs=card.querySelectorAll('.p-track img');
    if(!track||!media||imgs.length<2)return;
    const dots=card.querySelectorAll('.p-dots i');
    let i=0,timer=null,delay=null;
    const show=n=>{i=(n+imgs.length)%imgs.length;track.style.transition='';track.style.transform='translateX(-'+(i*100)+'%)';dots.forEach((d,k)=>d.classList.toggle('on',k===i));};
    if(hoverOK){
      card.addEventListener('mouseenter',()=>{clearInterval(timer);clearTimeout(delay);delay=setTimeout(()=>{show(i+1);timer=setInterval(()=>show(i+1),1800);},500);});
      card.addEventListener('mouseleave',()=>{clearInterval(timer);clearTimeout(delay);});
    }
    let dx0=0,down=false,drag=false,w=0;
    media.addEventListener('pointerdown',e=>{down=true;drag=false;dx0=e.clientX;w=media.clientWidth||1;track.style.transition='none';try{media.setPointerCapture(e.pointerId)}catch(_){}});
    media.addEventListener('pointermove',e=>{if(!down)return;const dx=e.clientX-dx0;if(Math.abs(dx)>8)drag=true;if(drag){track.style.transform='translateX(calc(-'+(i*100)+'% + '+dx+'px))';}});
    const end=e=>{if(!down)return;down=false;track.style.transition='';const dx=e.clientX-dx0;if(drag){if(dx<-40)show(i+1);else if(dx>40)show(i-1);else show(i);}drag=false;};
    media.addEventListener('pointerup',end);
    media.addEventListener('pointercancel',()=>{down=false;drag=false;show(i);});
    media.addEventListener('click',e=>{if(drag){e.preventDefault();e.stopPropagation();drag=false;}},true);
    media.querySelectorAll('img').forEach(el=>el.setAttribute('draggable','false'));
  });
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
  document.querySelectorAll('.carousel').forEach(car=>{
    let down=false,sx=0,sl=0,moved=false;
    car.addEventListener('pointerdown',e=>{down=true;moved=false;sx=e.clientX;sl=car.scrollLeft;car.classList.add('dragging');});
    window.addEventListener('pointermove',e=>{if(!down)return;const dx=e.clientX-sx;if(Math.abs(dx)>6){moved=true;car.classList.add('dragging');}car.scrollLeft=sl-dx;});
    ['pointerup','pointercancel','pointerleave'].forEach(ev=>window.addEventListener(ev,()=>{down=false;car.classList.remove('dragging');}));
    car.addEventListener('click',e=>{if(moved){e.preventDefault();e.stopPropagation();moved=false;}},true);
    car.querySelectorAll('img,a').forEach(el=>el.setAttribute('draggable','false'));
  });
  document.querySelectorAll('[data-modal]').forEach(b=>b.addEventListener('click',()=>{document.getElementById(b.dataset.modal).classList.add('open')}));
  document.querySelectorAll('[data-modal-close]').forEach(b=>b.addEventListener('click',()=>{b.closest('.modal').classList.remove('open')}));
});
