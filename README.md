# NEWDS.CO — Custom Shopify Theme (OS 2.0)

Minimal luxury jewellery theme rebuilt from the WooCommerce reference (newds.co.in).

## Quick start
1. `shopify theme dev` (preview) or `shopify theme push` to upload.
2. Products → Import → `products-demo.csv` (19 products, images hotlinked from newds.co.in — re-upload to Files for production).
3. Create collections (auto by tag or manual): All Products, Anklets, Bracelets, Earring, Neck Chains, Rings, Wrist Bands, New Arrivals (`tag: New Arrivals`), Best Sellers (`tag: Best Sellers`).
4. Customizer: set announcement text, hero image, carousel collections.
5. Settings → Metafields → Products: `custom.badge` (text), `custom.material` (text), `custom.care_instructions` (multi-line), `custom.product_features` (list), `custom.size_guide` (rich text).

## Structure
- `layout/theme.liquid` — fonts (Cormorant Garamond + Jost), CSS vars from settings
- `sections/` — announcement, header, hero, benefits, categories, carousel, about, main-collection/cart/search/account/login/product, recommendations, reviews, footer, mobile bottom nav
- `snippets/` — product-card (hover 2nd image, dots, ADD quick-add), price, icon, cart-drawer (AJAX), predictive-search, mobile-menu, breadcrumbs, pagination
- `assets/` — theme.css, responsive.css (1024/768/1440), theme.js, cart.js, product.js, collection.js, search.js
- `templates/` — index, product, collection, cart, search, page, 404, customers/account+login

## Spec compliance
68px/48px sticky 3-col header · 32px marquee announcement · split hero (overlay on mobile) · 4 benefits · 6 category circles · 5/2 carousels · 1:1 cards + dots + ADD · 4/2 collection grid 12pp · PDP 55/45 + SIZE buttons + stepper + View Cart AJAX + size modal + reviews · 5-col footer #F9F8F6 · 54px bottom nav · fullscreen mobile menu. No shadows/gradients, thin #DED6CF borders.

`shopify theme check`: 0 errors (22 warnings = intentional hardcoded collection URLs + remote fallback images).
