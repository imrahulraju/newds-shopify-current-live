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
var opt=btn.dataset.option;form.querySelectorAll('.variant[data-option="'+opt+'"]').forEach(function(x){x.classList.remove('on')});btn.classList.add('on');sel[opt]=btn.dataset.value;resolveVariant();try{syncQtyToSelected();evalCta();}catch(e){}
})});
function resolveVariant(){try{var variants=JSON.parse(document.getElementById('VariantData').textContent);var v=variants.find(function(v){return v.options.every(function(o,i){return !sel['option'+(i+1)]||sel['option'+(i+1)]===o})});
var idInput=document.getElementById('VariantId');if(v&&idInput){idInput.value=v.id;var avail=document.getElementById('Avail');if(avail)avail.innerHTML=v.available?'<span class="stock-in">● In Stock</span>':'<span class="stock-out">● Out of Stock</span>';}}catch(e){}}
var inp=form.querySelector('[name=quantity]');
if(inp)inp.addEventListener('change',function(){var q=parseInt(inp.value,10);if(isNaN(q)||q<1)q=1;if(q>99)q=99;inp.value=q;});
if(inp){inp.addEventListener('input',function(){try{evalCta();}catch(e){}});inp.addEventListener('change',function(){try{evalCta();}catch(e){}});}
var thumbs=document.querySelectorAll('.pdp-thumbs button');var main=document.getElementById('PdpMain');
thumbs.forEach(function(t){t.addEventListener('click',function(){thumbs.forEach(function(x){x.classList.remove('on')});t.classList.add('on');if(main&&t.dataset.src)main.src=t.dataset.src})});
function pdpProductId(){var cta=document.getElementById('PdpCta');return cta&&cta.dataset?parseInt(cta.dataset.productId,10):0;}
function pdpQtyInput(){return form.querySelector('[name=quantity]');}
function pdpQty(){var i=pdpQtyInput();var q=i?parseInt(i.value,10):1;if(isNaN(q)||q<1)q=1;return Math.min(99,q);}
function setCta(mode){var cta=document.getElementById('PdpCta');if(!cta||cta.disabled)return;cta.dataset.mode=mode;cta.textContent=(mode==='view'?'View Cart':(mode==='modify'?'Modify Cart':'Add to Cart'));}
var pdpLines=[];
function selVariantId(){var el=document.getElementById('VariantId');return el?parseInt(el.value,10):0;}
function lineForSelected(){var id=selVariantId();for(var k=0;k<pdpLines.length;k++){if(pdpLines[k].variant_id===id)return pdpLines[k];}return null;}
function evalCta(){var cta=document.getElementById('PdpCta');if(!cta)return;var line=lineForSelected();if(!line){setCta('add');return;}var q=pdpQty();setCta(q!==line.quantity?'modify':'view');}
function syncQtyToSelected(){var line=lineForSelected();var i=pdpQtyInput();if(!i)return;if(line){i.value=line.quantity;}else{i.value=1;}}
async function refreshCta(syncQty){try{var pid=pdpProductId();if(!pid)return;var cart=await Cart.get();pdpLines=(cart.items||[]).filter(function(i){return i.product_id===pid}).map(function(i){return{key:i.key,variant_id:i.variant_id,quantity:i.quantity};});if(syncQty!==false)syncQtyToSelected();evalCta();}catch(e){}}
form.addEventListener('submit',async function(e){e.preventDefault();var cta=document.getElementById('PdpCta');var mode=cta?cta.dataset.mode:'add';if(mode==='view'){try{await Cart.render();}catch(err){}Cart.open();return;}
var qty=pdpQty();
if(mode==='modify'){
  var target=lineForSelected();
  if(!target){evalCta();return;}
  cta.disabled=true;var orig=cta.textContent;cta.textContent='Updating…';
  try{await Cart.change(target.key,qty);await refreshCta(false);var ok=document.getElementById('CartOk');if(ok){ok.textContent='✓ Cart updated';ok.style.display='block';setTimeout(function(){ok.style.display='none'},3000)}}
  catch(err){alert('Could not update cart');}
  finally{cta.disabled=false;evalCta();}
  return;}
try{await Cart.add(parseInt(form.querySelector('#VariantId').value,10),qty);await refreshCta(false);var ok2=document.getElementById('CartOk');if(ok2){ok2.textContent='✓ Added to cart successfully';ok2.style.display='block';setTimeout(function(){ok2.style.display='none'},3000)}}catch(err){alert('Could not add to cart')}});
refreshCta(true);
document.addEventListener('cart:updated',function(){refreshCta(false);});
});
