/* Product list filters: category drawer + client-side size/subtype filtering.
   Works on ALL product list pages: collections, search, carousels, recommendations. */
document.addEventListener('DOMContentLoaded', () => {
  const drawer = document.getElementById('FiltersDrawer');
  if (!drawer) return;
  const grids = Array.from(document.querySelectorAll('.prod-grid, .carousel'));
  const overlay = document.querySelector('[data-overlay]');
  const sub = document.getElementById('BraceletSub');
  const catInputs = Array.from(drawer.querySelectorAll('input[name="fcat"]'));
  const subInputs = Array.from(drawer.querySelectorAll('input[name="fsub"]'));
  const sortInputs = Array.from(drawer.querySelectorAll('input[name="fsort"]'));
  const currentSort = (drawer.dataset.currentSort || 'manual').toLowerCase();
  const hasServerList = !!document.querySelector('.prod-grid');
  function selectedSort() {
    const el = drawer.querySelector('input[name="fsort"]:checked');
    return el ? el.value : '';
  }
  const sizeWrap = document.getElementById('FilterSizePills');
  const sizeGroup = document.getElementById('FilterSizeGroup');
  let pills = Array.from(drawer.querySelectorAll('.f-pill'));
  function bindPill(p) {
    if (p.dataset.fBound) return;
    p.dataset.fBound = '1';
    p.addEventListener('click', () => {
      const on = p.classList.toggle('on');
      p.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }
  pills.forEach(bindPill);
  catInputs.forEach(i => i.addEventListener('change', updateBadge));
  subInputs.forEach(i => i.addEventListener('change', updateBadge));
  sortInputs.forEach(i => i.addEventListener('change', updateBadge));
  drawer.addEventListener('click', e => { const pl = e.target.closest('.f-pill'); if (pl) setTimeout(updateBadge, 0); });
  const applyBtn = document.getElementById('FiltersApply');
  const clearBtn = document.getElementById('FiltersClear');
  const badges = Array.from(document.querySelectorAll('.FilterCountBadge'));
  const countEls = Array.from(document.querySelectorAll('.f-list-count'));
  const currentHandle = (drawer.dataset.currentHandle || '').toLowerCase();
  const emptyBoxes = [];
  grids.forEach((grid) => {
    const box = document.createElement('div');
    box.className = 'filters-empty';
    box.hidden = true;
    box.innerHTML = '<p>No products match these filters.</p><button type="button" class="f-clear">Clear All</button>';
    grid.after(box);
    box.querySelector('button').addEventListener('click', clearAll);
    emptyBoxes.push({ grid, box });
  });

  function openDrawer() {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    if (overlay) overlay.classList.add('show');
  }
  function closeDrawer() {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    const mm = document.getElementById('MobileMenu');
    if (overlay && !(mm && mm.classList.contains('open'))) overlay.classList.remove('show');
  }
  document.querySelectorAll('[data-filters-open]').forEach(b => b.addEventListener('click', openDrawer));
  drawer.querySelectorAll('[data-filters-close]').forEach(b => b.addEventListener('click', closeDrawer));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

  function toggleSub() {
    const sel = drawer.querySelector('input[name="fcat"]:checked');
    if (sub) sub.style.display = sel && sel.value === 'bracelets' ? 'block' : 'none';
  }
  catInputs.forEach(i => i.addEventListener('change', toggleSub));



  function selectedSizes() {
    return pills.filter(p => p.classList.contains('on')).map(p => p.dataset.size.toLowerCase());
  }
  function selectedSubs() {
    return subInputs.filter(i => i.checked).map(i => i.value.toLowerCase());
  }
  function selectedCat() {
    const el = drawer.querySelector('input[name="fcat"]:checked');
    return el ? el.value.toLowerCase() : '';
  }

  function cardData(card) {
    return {
      hay: ((card.dataset.filterTitle || '') + ' ' + (card.dataset.filterType || '') + ' ' + (card.dataset.filterTags || '')).toLowerCase(),
      variants: (card.dataset.filterVariants || '').toLowerCase().split('|').map(s => s.trim()).filter(Boolean)
    };
  }
  function matchSub(hay, subs) {
    if (!subs.length) return true;
    return subs.some(s => {
      if (s === 'double-layer') return hay.includes('double');
      if (s === 'single-layer') return hay.includes('single');
      return hay.includes(s);
    });
  }
  function matchSize(variants, sizes) {
    if (!sizes.length) return true;
    return sizes.some(s => {
      if (s === 'free size') {
        if (!variants.length) return true;
        return variants.some(v => ['free size', 'free', 'default title', 'os', 'one size'].includes(v));
      }
      return variants.includes(s);
    });
  }

  function allCards() {
    return grids.flatMap(g => Array.from(g.querySelectorAll('.p-card')));
  }

  function activeFilterCount() {
    const subs = selectedSubs();
    const sizes = selectedSizes();
    const cat = selectedCat();
    const sort = (selectedSort() || '').toLowerCase();
    let n = subs.length + sizes.length;
    if (cat && cat !== currentHandle) n += 1;
    if (sort && sort !== 'manual' && sort !== currentSort) n += 1;
    return n;
  }
  function updateBadge() {
    const n = activeFilterCount();
    badges.forEach(b => { b.hidden = n === 0; b.textContent = n; });
    const legacyBadge = document.getElementById('FilterCountBadge');
    if (legacyBadge && !badges.includes(legacyBadge)) { legacyBadge.hidden = n === 0; legacyBadge.textContent = n; }
  }
  function applyClientFilters() {
    const subs = selectedSubs();
    const sizes = selectedSizes();
    const activeCount = activeFilterCount();
    let totalVisible = 0;
    let totalCards = 0;
    grids.forEach((grid) => {
      const cards = Array.from(grid.querySelectorAll('.p-card'));
      totalCards += cards.length;
      let visible = 0;
      cards.forEach(card => {
        const d = cardData(card);
        const show = matchSub(d.hay, subs) && matchSize(d.variants, sizes);
        card.style.display = show ? '' : 'none';
        if (show) visible++;
      });
      totalVisible += visible;
      const entry = emptyBoxes.find(e => e.grid === grid);
      if (entry) entry.box.hidden = visible !== 0 || cards.length === 0;
    });
    badges.forEach(b => {
      b.hidden = activeCount === 0;
      b.textContent = activeCount;
    });
    const legacyBadge = document.getElementById('FilterCountBadge');
    if (legacyBadge && !badges.includes(legacyBadge)) {
      legacyBadge.hidden = activeCount === 0;
      legacyBadge.textContent = activeCount;
    }
    countEls.forEach(el => {
      if (activeCount) el.textContent = totalVisible + ' of ' + totalCards + ' products';
      else if (el.id === 'FilterResultCount') { /* keep server count */ }
      else if (totalCards) el.textContent = totalCards + ' products';
    });
    return totalVisible;
  }

  function labelForSize(v) {
    if (['default title', 'os', 'one size'].includes(v)) return 'Free Size';
    if (v === 'free' || v === 'free size') return 'Free Size';
    return v.charAt(0).toUpperCase() + v.slice(1);
  }
  function buildDynamicFilters() {
    const cards = allCards();
    if (!cards.length || !sizeWrap) return;
    const seen = new Map();
    let hayAll = '';
    cards.forEach(card => {
      const d = cardData(card);
      hayAll += ' ' + d.hay;
      d.variants.forEach(v => {
        if (['default title'].includes(v)) v = 'free size';
        if (v === 'os' || v === 'one size' || v === 'free') v = 'free size';
        if (!v) return;
        if (!seen.has(v)) seen.set(v, labelForSize(v));
      });
    });
    const urlSizes = (new URLSearchParams(location.search).get('filter_size') || '').toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
    if (seen.size) {
      const order = Array.from(seen.keys()).sort((a, b) => {
        if (a === 'free size') return -1;
        if (b === 'free size') return 1;
        const na = parseFloat(a), nb = parseFloat(b);
        if (!isNaN(na) && !isNaN(nb)) return na - nb;
        return a.localeCompare(b);
      });
      sizeWrap.innerHTML = '';
      order.forEach(key => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'f-pill' + (urlSizes.includes(key) ? ' on' : '');
        b.dataset.size = key;
        b.setAttribute('aria-pressed', urlSizes.includes(key) ? 'true' : 'false');
        b.textContent = seen.get(key);
        bindPill(b);
        sizeWrap.appendChild(b);
      });
      pills = Array.from(drawer.querySelectorAll('.f-pill'));
      if (sizeGroup) sizeGroup.style.display = '';
    } else if (sizeGroup) {
      sizeGroup.style.display = 'none';
    }
    const hasDouble = hayAll.includes('double');
    const hasSingle = hayAll.includes('single');
    subInputs.forEach(i => {
      const row = i.closest('.f-check');
      if (!row) return;
      if (i.value.toLowerCase() === 'double-layer' && !hasDouble) row.style.display = 'none';
      else if (i.value.toLowerCase() === 'single-layer' && !hasSingle) row.style.display = 'none';
      else row.style.display = '';
    });
  }

  function readURL() {
    const q = new URLSearchParams(location.search);
    const sizeParam = (q.get('filter_size') || '').toLowerCase();
    const subParam = (q.get('filter_sub') || '').toLowerCase();
    if (sizeParam) {
      const want = sizeParam.split(',').map(s => s.trim()).filter(Boolean);
      pills.forEach(p => {
        const on = want.includes(p.dataset.size.toLowerCase());
        p.classList.toggle('on', on);
        p.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    }
    if (subParam) {
      const want = subParam.split(',').map(s => s.trim()).filter(Boolean);
      subInputs.forEach(i => { i.checked = want.includes(i.value.toLowerCase()); });
    }
    if (sizeParam || subParam) applyClientFilters();
  }

  function clearAll() {
    pills = Array.from(drawer.querySelectorAll('.f-pill'));
    sortInputs.forEach(i => { i.checked = i.value.toLowerCase() === currentSort; });
    catInputs.forEach(i => { i.checked = false; });
    subInputs.forEach(i => { i.checked = false; });
    pills.forEach(p => { p.classList.remove('on'); p.setAttribute('aria-pressed', 'false'); });
    toggleSub();
    const u = new URL(location.href);
    u.searchParams.delete('filter_size');
    u.searchParams.delete('filter_sub');
    history.replaceState(null, '', u.toString());
    allCards().forEach(c => { c.style.display = ''; });
    badges.forEach(b => { b.hidden = true; });
    emptyBoxes.forEach(e => { e.box.hidden = true; });
  }

  if (applyBtn) applyBtn.addEventListener('click', () => {
    const cat = selectedCat();
    const subs = selectedSubs();
    const sizes = selectedSizes();
    const sort = selectedSort();
    closeDrawer();
    if (cat && cat !== currentHandle) {
      const u = new URL('/collections/' + cat, location.origin);
      if (sort) u.searchParams.set('sort_by', sort);
      if (subs.length) u.searchParams.set('filter_sub', subs.join(','));
      if (sizes.length) u.searchParams.set('filter_size', sizes.join(','));
      location.href = u.toString();
      return;
    }
    if (sort && sort !== currentSort && hasServerList) {
      const u = new URL(location.href);
      u.searchParams.set('sort_by', sort);
      if (subs.length) u.searchParams.set('filter_sub', subs.join(',')); else u.searchParams.delete('filter_sub');
      if (sizes.length) u.searchParams.set('filter_size', sizes.join(',')); else u.searchParams.delete('filter_size');
      location.href = u.toString();
      return;
    }
    const u = new URL(location.href);
    if (subs.length) u.searchParams.set('filter_sub', subs.join(',')); else u.searchParams.delete('filter_sub');
    if (sizes.length) u.searchParams.set('filter_size', sizes.join(',')); else u.searchParams.delete('filter_size');
    history.replaceState(null, '', u.toString());
    applyClientFilters();
  });
  if (clearBtn) clearBtn.addEventListener('click', () => { clearAll(); closeDrawer(); });

  if (currentHandle) {
    const match = catInputs.find(i => i.value.toLowerCase() === currentHandle);
    if (match) match.checked = true;
  }
  toggleSub();
  buildDynamicFilters();
  readURL();
  updateBadge();
});
