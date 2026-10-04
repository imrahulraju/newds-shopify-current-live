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
  var lim=99;
  try{lim=variantLimit(getSelectedVariant());}catch(e){}
  q=act==='plus'?Math.min(lim,q+1):Math.max(1,q-1);
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
function getVariants(){try{return JSON.parse(document.getElementById('VariantData').textContent)||[];}catch(e){return[];}}
function getSelectedVariant(){var id=selVariantId();var vs=getVariants();for(var k=0;k<vs.length;k++){if(vs[k].id===id)return vs[k];}return vs[0]||null;}
function stockMap(){try{return JSON.parse(document.getElementById('StockData').textContent)||{};}catch(e){return{};}}
function variantLimit(v){try{var m=stockMap();var e=v&&m[String(v.id)];if(e){if(e.managed&&e.policy==='deny')return Math.max(0,parseInt(e.qty,10)||0);return 99;}}catch(err){}if(!v)return 99;if(v.inventory_management&&v.inventory_policy==='deny'){var q=parseInt(v.inventory_quantity,10);if(isNaN(q))return 99;return Math.max(0,q);}return 99;}
function isTracked(v){try{var m=stockMap();var e=v&&m[String(v.id)];if(e)return !!(e.managed&&e.policy==='deny');}catch(err){}return !!(v&&v.inventory_management&&v.inventory_policy==='deny');}
function renderStock(){try{var v=getSelectedVariant();var lim=variantLimit(v);var tr=isTracked(v);var note=document.getElementById('StockNote');var i=pdpQtyInput();if(i){i.max=lim;var q=parseInt(i.value,10);if(!isNaN(q)&&q>lim){i.value=Math.max(1,lim);}}var avail=document.getElementById('Avail');if(avail&&v){if(!v.available||lim===0){avail.innerHTML='<span class="stock-out">● Out of Stock</span>';}else if(tr&&lim<=10){avail.innerHTML='<span class="stock-in">● In Stock</span> <span style="color:#B00">— Only '+lim+' left</span>';}else{avail.innerHTML='<span class="stock-in">● In Stock</span>';}}if(note){if(tr&&lim>0&&lim<=10){note.textContent='Only '+lim+' available'+(v.title&&v.title!=='Default Title'?' for '+v.title:'')+'.';note.style.color='#B00';}else{note.textContent='';}}}catch(e){}}
function resolveVariant(){try{var variants=getVariants();var v=variants.find(function(v){return v.options.every(function(o,i){return !sel['option'+(i+1)]||sel['option'+(i+1)]===o})});
var idInput=document.getElementById('VariantId');if(v&&idInput){idInput.value=v.id;renderStock();}}catch(e){}}
var inp=form.querySelector('[name=quantity]');
if(inp)inp.addEventListener('change',function(){var q=parseInt(inp.value,10);if(isNaN(q)||q<1)q=1;var lim=99;try{lim=variantLimit(getSelectedVariant());}catch(e){}if(q>lim)q=Math.max(1,lim);inp.value=q;try{renderStock();}catch(e){}});
if(inp){inp.addEventListener('input',function(){try{evalCta();}catch(e){}});inp.addEventListener('change',function(){try{evalCta();}catch(e){}});}
var thumbs=Array.prototype.slice.call(document.querySelectorAll('.pdp-thumbs button'));var main=document.getElementById('PdpMain');var wrap=document.getElementById('PdpMainWrap');var count=document.getElementById('PdpCount');var cur=0;
function showSlide(i){if(!thumbs.length||!main)return;cur=(i+thumbs.length)%thumbs.length;var b=thumbs[cur];thumbs.forEach(function(x){x.classList.remove('on')});b.classList.add('on');if(b.dataset.src)main.src=b.dataset.src;main.alt=b.querySelector('img')?b.querySelector('img').alt:main.alt;if(count)count.textContent=(cur+1)+' / '+thumbs.length;}
thumbs.forEach(function(b){b.addEventListener('click',function(){showSlide(parseInt(b.dataset.index||0,10));});});
var dots=Array.prototype.slice.call(document.querySelectorAll('#PdpDots button'));
dots.forEach(function(d){d.addEventListener('click',function(e){e.stopPropagation();showSlide(parseInt(d.dataset.index||0,10));});});
var _showSlide=showSlide;
showSlide=function(i){_showSlide(i);dots.forEach(function(d){d.classList.toggle('on',parseInt(d.dataset.index||0,10)===cur);});};
if(wrap){var sx=null;wrap.addEventListener('touchstart',function(e){sx=e.touches[0].clientX;},{passive:true});wrap.addEventListener('touchend',function(e){if(sx===null)return;var dx=e.changedTouches[0].clientX-sx;sx=null;if(Math.abs(dx)>40)showSlide(cur+(dx<0?1:-1));},{passive:true});
var mx=null,moved=false;wrap.addEventListener('mousedown',function(e){if(e.button!==0)return;mx=e.clientX;moved=false;});wrap.addEventListener('mousemove',function(e){if(mx===null)return;if(Math.abs(e.clientX-mx)>8)moved=true;});wrap.addEventListener('mouseup',function(e){if(mx===null)return;var dx=e.clientX-mx;mx=null;if(Math.abs(dx)>40){showSlide(cur+(dx<0?1:-1));}e.preventDefault();});wrap.addEventListener('mouseleave',function(){mx=null;});wrap.addEventListener('dragstart',function(e){e.preventDefault();});}
document.addEventListener('keydown',function(e){if(document.getElementById('PdpLightbox')&&!document.getElementById('PdpLightbox').hidden){if(e.key==='Escape')closeLb();return;}if(e.key!=='ArrowLeft'&&e.key!=='ArrowRight')return;if(!document.getElementById('ProductForm'))return;showSlide(cur+(e.key==='ArrowRight'?1:-1));});
var lb=document.getElementById('PdpLightbox'),zoomImg=document.getElementById('PdpZoomImg');
function openLb(){if(!lb||!thumbs.length)return;var b=thumbs[cur];if(zoomImg)zoomImg.src=b.dataset.full||b.dataset.src||main.src;lb.hidden=false;document.body.style.overflow='hidden';}
function closeLb(){if(!lb)return;lb.hidden=true;document.body.style.overflow='';}
window.closeLb=closeLb;
var zb=document.getElementById('PdpZoom');if(zb)zb.addEventListener('click',function(e){e.stopPropagation();openLb();});

if(lb)lb.addEventListener('click',function(e){if(e.target===lb||e.target===zoomImg)closeLb();});
var lbClose=document.getElementById('PdpLbClose');if(lbClose)lbClose.addEventListener('click',function(e){e.stopPropagation();closeLb();});
var sh=document.getElementById('PdpShare');
if(sh)sh.addEventListener('click',async function(e){e.stopPropagation();var data={title:document.title,url:location.href};if(navigator.share){try{await navigator.share(data);}catch(err){}return;}try{await navigator.clipboard.writeText(location.href);var ok=document.getElementById('CartOk');if(ok){ok.textContent='\u2713 Product link copied';ok.style.display='block';setTimeout(function(){ok.style.display='none';},2500);}}catch(err){prompt('Copy product link:',location.href);}});
function pdpProductId(){var cta=document.getElementById('PdpCta');return cta&&cta.dataset?parseInt(cta.dataset.productId,10):0;}
function pdpQtyInput(){return form.querySelector('[name=quantity]');}
function pdpQty(){var i=pdpQtyInput();var q=i?parseInt(i.value,10):1;if(isNaN(q)||q<1)q=1;var lim=99;try{lim=variantLimit(getSelectedVariant());}catch(e){}return Math.min(lim,q);}
function setCta(mode){var cta=document.getElementById('PdpCta');if(!cta||cta.disabled)return;cta.dataset.mode=mode;cta.textContent=(mode==='view'?'View Cart':(mode==='modify'?'Modify Cart':'Add to Cart'));}
var pdpLines=[];
function selVariantId(){var el=document.getElementById('VariantId');return el?parseInt(el.value,10):0;}
function lineForSelected(){var id=selVariantId();for(var k=0;k<pdpLines.length;k++){if(pdpLines[k].variant_id===id)return pdpLines[k];}return null;}
function evalCta(){var cta=document.getElementById('PdpCta');if(!cta)return;var line=lineForSelected();if(!line){setCta('add');return;}var q=pdpQty();setCta(q!==line.quantity?'modify':'view');}
function syncQtyToSelected(){var i=pdpQtyInput();if(!i)return;var line=lineForSelected();if(line){var lim=99;try{lim=variantLimit(getSelectedVariant());}catch(e){}i.value=Math.min(line.quantity,Math.max(1,lim));}else{i.value=1;}}
async function refreshCta(syncQty){try{var pid=pdpProductId();if(!pid)return;var cart=await Cart.get();pdpLines=(cart.items||[]).filter(function(i){return i.product_id===pid}).map(function(i){return{key:i.key,variant_id:i.variant_id,quantity:i.quantity};});if(syncQty!==false)syncQtyToSelected();try{renderStock();}catch(e){}evalCta();}catch(e){}}
form.addEventListener('submit',async function(e){e.preventDefault();var cta=document.getElementById('PdpCta');var mode=cta?cta.dataset.mode:'add';if(mode==='view'){try{await Cart.render();}catch(err){}Cart.open();return;}
var qty=pdpQty();
try{var _v=getSelectedVariant();var _lim=variantLimit(_v);if(_lim===0){alert('Sorry, this option is out of stock');return;}if(qty>_lim){qty=_lim;var _qi=pdpQtyInput();if(_qi)_qi.value=_lim;alert('Only '+_lim+' available'+(_v&&_v.title&&_v.title!=='Default Title'?' for '+_v.title:''));if(mode!=='modify')return;}}catch(e){}
if(mode==='modify'){
  var target=lineForSelected();
  if(!target){evalCta();return;}
  cta.disabled=true;var orig=cta.textContent;cta.textContent='Updating…';
  try{await Cart.change(target.key,qty);await refreshCta(false);var ok=document.getElementById('CartOk');if(ok){ok.textContent='✓ Cart updated';ok.style.display='block';setTimeout(function(){ok.style.display='none'},3000)}}
  catch(err){alert('Could not update cart');}
  finally{cta.disabled=false;evalCta();}
  return;}
try{await Cart.add(parseInt(form.querySelector('#VariantId').value,10),qty);await refreshCta(false);var ok2=document.getElementById('CartOk');if(ok2){ok2.textContent='✓ Added to cart successfully';ok2.style.display='block';setTimeout(function(){ok2.style.display='none'},3000)}}catch(err){if(!err||err.message!=='add-rejected')alert('Could not add to cart')}});
try{renderStock();}catch(e){}
refreshCta(true);
document.addEventListener('cart:updated',function(){refreshCta(false);});
});
