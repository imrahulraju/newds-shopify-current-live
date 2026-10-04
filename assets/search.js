const Search = {
  open() {
    document.getElementById('SearchPanel').classList.add('open');
    const i = document.getElementById('SearchInput');
    if (i) { i.focus(); if (!i.value) Search.popular(); }
  },
  close() { document.getElementById('SearchPanel').classList.remove('open'); },
  popular() {
    const box = document.getElementById('SearchResults');
    if (!box) return;
    const tags = ['Tennis Bracelet', 'Necklace', 'Ring', 'Earring', 'Anklet'];
    box.hidden = false;
    box.innerHTML = '<div class="s-pop"><p>POPULAR SEARCHES</p><div>' + tags.map(t => `<a href="/search?q=${encodeURIComponent(t)}">${t}</a>`).join('') + '</div></div>';
  },
  async suggest(q) {
    const box = document.getElementById('SearchResults');
    if (!box) return;
    q = (q || '').trim();
    if (q.length < 2) { Search.popular(); return; }
    box.hidden = false;
    box.innerHTML = '<div class="s-loading">Searching…</div>';
    try {
      const r = await fetch(`/search/suggest.json?q=${encodeURIComponent(q)}&resources[type]=product&resources[limit]=6&resources[options][unavailable_products]=hide`);
      const d = await r.json();
      const items = (d.resources && d.resources.results && d.resources.results.products) || [];
      if (!items.length) { box.innerHTML = `<div class="s-empty">No matches for “${q.replace(/</g, '&lt;')}”. <a href="/search?q=${encodeURIComponent(q)}">View all results</a></div>`; return; }
      box.innerHTML = items.map(p => {
        const price = typeof p.price === 'number' ? '₹' + (p.price / 100).toLocaleString('en-IN') : '';
        const img = p.image ? `<img src="${p.image}" width="56" height="56" alt="" loading="lazy">` : '<span class="s-noimg"></span>';
        return `<a class="s-item" href="${p.url}">${img}<span class="s-meta"><span class="s-title">${p.title}</span>${p.product_type ? `<span class="s-type">${p.product_type}</span>` : ''}<span class="s-price">${price}</span></span><span class="s-arrow">→</span></a>`;
      }).join('') + `<a class="s-all" href="/search?q=${encodeURIComponent(q)}">View all results for “${q.replace(/</g, '&lt;')}” →</a>`;
    } catch (e) { box.innerHTML = ''; }
  }
};
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-search-open]').forEach(b => b.addEventListener('click', Search.open));
  document.querySelectorAll('[data-search-close]').forEach(b => b.addEventListener('click', Search.close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') Search.close(); });
  const panel = document.getElementById('SearchPanel');
  if (panel) panel.addEventListener('click', e => { if (e.target === panel) Search.close(); });
  const inp = document.getElementById('SearchInput');
  if (inp) { let t; inp.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => Search.suggest(inp.value), 250); }); }
});
