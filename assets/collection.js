document.addEventListener('DOMContentLoaded',()=>{
const sort=document.getElementById('SortBy');
if(sort)sort.addEventListener('change',()=>{const u=new URL(location.href);u.searchParams.set('sort_by',sort.value);location.href=u.toString()});
});
