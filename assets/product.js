document.addEventListener('DOMContentLoaded',()=>{
const form=document.getElementById('ProductForm');if(!form)return;
const sel={};
form.querySelectorAll('.variant').forEach(btn=>btn.addEventListener('click',()=>{
const opt=btn.dataset.option;form.querySelectorAll(`.variant[data-option="${opt}"]`).forEach(b=>b.classList.remove('on'));btn.classList.add('on');sel[opt]=btn.dataset.value;resolveVariant();
}));
function resolveVariant(){try{const variants=JSON.parse(document.getElementById('VariantData').textContent);const v=variants.find(v=>v.options.every((o,i)=>!sel['option'+(i+1)]||sel['option'+(i+1)]===o));
const idInput=document.getElementById('VariantId');if(v&&idInput){idInput.value=v.id;const avail=document.getElementById('Avail');if(avail)avail.innerHTML=v.available?'<span class="stock-in">● In Stock</span>':'<span class="stock-out">● Out of Stock</span>';}}catch(e){}}
form.querySelectorAll('[data-qty]').forEach(b=>b.addEventListener('click',()=>{const inp=form.querySelector('[name=quantity]');let q=parseInt(inp.value||'1');q=b.dataset.qty==='plus'?q+1:Math.max(1,q-1);inp.value=q}));
const thumbs=document.querySelectorAll('.pdp-thumbs button');const main=document.getElementById('PdpMain');
thumbs.forEach(t=>t.addEventListener('click',()=>{thumbs.forEach(x=>x.classList.remove('on'));t.classList.add('on');if(main&&t.dataset.src)main.src=t.dataset.src}));
form.addEventListener('submit',async e=>{e.preventDefault();const id=form.querySelector('#VariantId').value;const qty=parseInt(form.querySelector('[name=quantity]').value||'1');
try{await Cart.add(parseInt(id),qty);const ok=document.getElementById('CartOk');if(ok){ok.style.display='block';setTimeout(()=>ok.style.display='none',3000)}}catch(err){alert('Could not add to cart')}});
});
