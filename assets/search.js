const Search={open(){document.getElementById('SearchPanel').classList.add('open');const i=document.getElementById('SearchInput');if(i)i.focus()},
close(){document.getElementById('SearchPanel').classList.remove('open')},
async suggest(q){const box=document.getElementById('SearchResults');if(!box)return;if(q.length<2){box.innerHTML='';return}
try{const r=await fetch(`/search/suggest.json?q=${encodeURIComponent(q)}&resources[type]=product&resources[limit]=6`);const d=await r.json();
const items=(d.resources&&d.resources.results&&d.resources.results.products)||[];
box.innerHTML=items.map(p=>`<a href="${p.url}" style="display:flex;gap:12px;align-items:center;padding:10px 0;border-bottom:1px solid #F1ECE7"><img src="${p.image}" width="48" height="48" style="object-fit:cover"><span><span style="font-size:12px;letter-spacing:1px">${p.title}</span><br><span style="font-size:12px">₹${(p.price/100).toLocaleString('en-IN')}</span></span></a>`).join('')}catch(e){}}};
document.addEventListener('DOMContentLoaded',()=>{
document.querySelectorAll('[data-search-open]').forEach(b=>b.addEventListener('click',Search.open));
document.querySelectorAll('[data-search-close]').forEach(b=>b.addEventListener('click',Search.close));
const inp=document.getElementById('SearchInput');if(inp){let t;inp.addEventListener('input',()=>{clearTimeout(t);t=setTimeout(()=>Search.suggest(inp.value),300)})}
});
