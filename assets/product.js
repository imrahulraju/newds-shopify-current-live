document.addEventListener('click',function(e){
  var b=e.target&&e.target.closest?e.target.closest('#ProductForm [data-qty],.pdp-info [data-qty]'):null;
  if(!b)return;
  e.preventDefault();
  var scope=b.closest('#ProductForm')||b.closest('.pdp-info')||document;
  var inp=scope.querySelector('[name=quantity]');
  if(!inp)return;
  var q=parseInt(inp.value,10);
  if(isNaN(q))q=1;
  var act=(b.getAttribute('data-qty')||'').toLowerCase();
  q=act==='plus'?Math.min(99,q+1):Math.max(1,q-1);
  inp.value=q;
  inp.dispatchEvent(new Event('input',{bubbles:true}));
  inp.dispatchEvent(new Event('change',{bubbles:true}));
});
document.addEventListener('DOMContentLoaded',function(){
var form=document.getElementById('ProductForm');if(!form)return;
var sel={};
form.querySelectorAll('.variant').forEach(function(btn){btn.addEventListener('click',function(){
var opt=btn.dataset.option;form.querySelectorAll('.variant[data-option="'+opt+'"]').forEach(function(x){x.classList.remove('on')});btn.classList.add('on');sel[opt]=btn.dataset.value;resolveVariant();
})});
function resolveVariant(){try{var variants=JSON.parse(document.getElementById('VariantData').textContent);var v=variants.find(function(v){return v.options.every(function(o,i){return !sel['option'+(i+1)]||sel['option'+(i+1)]===o})});
var idInput=document.getElementById('VariantId');if(v&&idInput){idInput.value=v.id;var avail=document.getElementById('Avail');if(avail)avail.innerHTML=v.available?'<span class="stock-in">● In Stock</span>':'<span class="stock-out">● Out of Stock</span>';}}catch(e){}}
var inp=form.querySelector('[name=quantity]');
if(inp)inp.addEventListener('change',function(){var q=parseInt(inp.value,10);if(isNaN(q)||q<1)q=1;if(q>99)q=99;inp.value=q;});
var thumbs=document.querySelectorAll('.pdp-thumbs button');var main=document.getElementById('PdpMain');
thumbs.forEach(function(t){t.addEventListener('click',function(){thumbs.forEach(function(x){x.classList.remove('on')});t.classList.add('on');if(main&&t.dataset.src)main.src=t.dataset.src})});
form.addEventListener('submit',async function(e){e.preventDefault();var id=form.querySelector('#VariantId').value;var qty=Math.max(1,parseInt(form.querySelector('[name=quantity]').value,10)||1);
try{await Cart.add(parseInt(id,10),qty);var ok=document.getElementById('CartOk');if(ok){ok.style.display='block';setTimeout(function(){ok.style.display='none'},3000)}}catch(err){alert('Could not add to cart')}});
});
