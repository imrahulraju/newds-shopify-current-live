window.Cart={count:0,inFlight:{},pending:{},ver:'qty-fix-v5',
note(msg){let n=document.getElementById('CartNote');if(!n){const f=document.querySelector('#CartDrawer .drawer-foot');if(!f)return;n=document.createElement('div');n.id='CartNote';n.style.cssText='font-size:12px;color:#B00;margin-bottom:8px;min-height:16px';f.prepend(n);}n.textContent=msg||'';},
async get(){const r=await fetch('/cart.js?t='+Date.now(),{credentials:'same-origin',cache:'no-store'});return r.json()},
paint(cart){
  if(!cart||typeof cart.item_count==='undefined')return;
  this.count=cart.item_count||0;
  document.querySelectorAll('.cart-count').forEach(el=>el.textContent=this.count);
  const box=document.getElementById('CartItems');
  if(box){box.innerHTML=cart.items.length?cart.items.map(i=>`<div class="cart-row"><img src="${i.image}" alt="${i.title}"><div><div style="font-size:12px;letter-spacing:1px">${i.product_title}</div>${i.variant_title&&i.variant_title!=='Default Title'?`<div style="font-size:12px;color:#B9AEA4">${i.variant_title}</div>`:''}<div class="qty-step"><button type="button" data-cart-dec data-key="${i.key}" data-cur="${i.quantity}" aria-label="Decrease quantity">−</button><span data-cur-val>${i.quantity}</span><button type="button" data-cart-inc data-key="${i.key}" data-cur="${i.quantity}" aria-label="Increase quantity">+</button></div><div style="font-size:12px">₹${(i.line_price/100).toLocaleString('en-IN')}</div></div><button type="button" data-cart-rem data-key="${i.key}" style="background:none;border:0;cursor:pointer;font-size:16px">×</button></div>`).join(''):'<p style="text-align:center;padding:30px 0">Your cart is empty</p>';
  const tot=document.getElementById('CartTotal');if(tot)tot.textContent='₹'+(cart.total_price/100).toLocaleString('en-IN');}
  try{document.dispatchEvent(new CustomEvent('cart:updated',{detail:cart||null}))}catch(e){}
},
async add(id,qty=1){this.note('');const r=await fetch('/cart/add.js',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,quantity:qty})});await r.json().catch(()=>null);await this.render();this.open();},
async change(key,qty){
  qty=Math.max(0,parseInt(qty,10)||0);
  if(this.inFlight[key]){this.pending[key]=qty;return;}
  this.inFlight[key]=true;
  this.note('');
  try{
    const r=await fetch('/cart/change.js',{method:'POST',credentials:'same-origin',cache:'no-store',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({id:key,quantity:qty})});
    const data=await r.json().catch(()=>null);
    console.log('[cart '+this.ver+'] change',key,'->',qty,'status',r.status,data);
    if(!r.ok){this.note((data&&(data.description||data.message))||('Update failed ('+r.status+')'));}
    else if(data&&typeof data.item_count!=='undefined'){this.paint(data);}
  }catch(err){console.warn('cart update error',err);this.note('Network error, try again');}
  finally{this.inFlight[key]=false;}
  if(this.pending[key]!==undefined){const n=this.pending[key];delete this.pending[key];return this.change(key,n);}
  await this.render();
},
async render(){try{const cart=await this.get();this.paint(cart);}catch(e){console.warn('cart render error',e)}},
open(){document.getElementById('CartDrawer').classList.add('open');var o=document.querySelector('[data-overlay]');if(o)o.classList.add('show')},
close(){document.getElementById('CartDrawer').classList.remove('open');var m=document.getElementById('MobileMenu');if(!m||!m.classList.contains('open')){var o=document.querySelector('[data-overlay]');if(o)o.classList.remove('show')}}
};
console.log('[cart '+window.Cart.ver+'] loaded');
document.addEventListener('click',function(e){
  var b=e.target&&e.target.closest?e.target.closest('[data-cart-inc],[data-cart-dec],[data-cart-rem]'):null;
  if(!b)return;
  var drawer=document.getElementById('CartDrawer');
  if(drawer&&!drawer.contains(b))return;
  e.preventDefault();
  var key=b.getAttribute('data-key');
  if(!key||Cart.inFlight[key])return;
  if(b.hasAttribute('data-cart-rem')){Cart.change(key,0);return;}
  var row=b.closest('.qty-step');
  var valEl=row?row.querySelector('[data-cur-val]'):null;
  var cur=valEl?parseInt(valEl.textContent,10):parseInt(b.getAttribute('data-cur'),10);
  if(isNaN(cur))cur=1;
  var next=b.hasAttribute('data-cart-inc')?cur+1:cur-1;
  if(next<1)next=1;
  if(valEl)valEl.textContent=next;
  if(row)row.querySelectorAll('[data-cart-inc],[data-cart-dec]').forEach(function(x){x.setAttribute('data-cur',next-(x.hasAttribute('data-cart-inc')?0:0));});
  Cart.change(key,next);
});
document.addEventListener('DOMContentLoaded',function(){Cart.render()});
