const Cart={count:0,
async get(){const r=await fetch('/cart.js');return r.json()},
async add(id,qty=1){const r=await fetch('/cart/add.js',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,quantity:qty})});const item=await r.json();await this.render();this.open();return item},
async change(key,qty){await fetch('/cart/change.js',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:key,quantity:qty})});await this.render()},
async render(){try{const cart=await this.get();this.count=cart.item_count;
document.querySelectorAll('.cart-count').forEach(el=>el.textContent=cart.item_count);
const box=document.getElementById('CartItems');
if(box){box.innerHTML=cart.items.length?cart.items.map(i=>`<div class="cart-row"><img src="${i.image}" alt="${i.title}"><div><div style="font-size:12px;letter-spacing:1px">${i.product_title}</div>${i.variant_title&&i.variant_title!=='Default Title'?`<div style="font-size:12px;color:#B9AEA4">${i.variant_title}</div>`:''}<div class="qty-step"><button onclick="Cart.change('${i.key}',${i.quantity-1})" aria-label="Decrease quantity">−</button><span>${i.quantity}</span><button onclick="Cart.change('${i.key}',${i.quantity+1})" aria-label="Increase quantity">+</button></div><div style="font-size:12px">₹${(i.line_price/100).toLocaleString('en-IN')}</div></div><button onclick="Cart.change('${i.key}',0)" style="background:none;border:0;cursor:pointer;font-size:16px">×</button></div>`).join(''):'<p style="text-align:center;padding:30px 0">Your cart is empty</p>';
const tot=document.getElementById('CartTotal');if(tot)tot.textContent='₹'+(cart.total_price/100).toLocaleString('en-IN');}}catch(e){}},
open(){document.getElementById('CartDrawer').classList.add('open');document.querySelector('[data-overlay]').classList.add('show')},
close(){document.getElementById('CartDrawer').classList.remove('open');const m=document.getElementById('MobileMenu');if(!m||!m.classList.contains('open'))document.querySelector('[data-overlay]').classList.remove('show')}
};
document.addEventListener('DOMContentLoaded',()=>Cart.render());
