#!/usr/bin/env python3
import os
import json

BASE_DIR = "/home/5238126445_0/Documents/git projects/newds-shopify-current-live"

def write(rel_path, content):
    full_path = os.path.join(BASE_DIR, rel_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Created: {rel_path}")

print("Building snippets...")

# 1. snippets/icon.liquid
write("snippets/icon.liquid", '''
{%- comment -%}
  Icon snippet: renders SVG icons with thin line style (17-20px)
  Usage: {% render 'icon', icon: 'cart' %}
{%- endcomment -%}

{%- case icon -%}
  {%- when 'hamburger' or 'menu' -%}
    <svg class="icon icon-menu" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>

  {%- when 'search' -%}
    <svg class="icon icon-search" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>

  {%- when 'account' or 'user' -%}
    <svg class="icon icon-account" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>

  {%- when 'cart' or 'bag' -%}
    <svg class="icon icon-cart" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>

  {%- when 'close' or 'x' -%}
    <svg class="icon icon-close" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>

  {%- when 'chevron-down' -%}
    <svg class="icon icon-chevron-down" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>

  {%- when 'chevron-left' -%}
    <svg class="icon icon-chevron-left" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>

  {%- when 'chevron-right' -%}
    <svg class="icon icon-chevron-right" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>

  {%- when 'home' -%}
    <svg class="icon icon-home" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>

  {%- when 'whatsapp' -%}
    <svg class="icon icon-whatsapp" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>

  {%- when 'instagram' -%}
    <svg class="icon icon-instagram" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>

  {%- when 'filter' -%}
    <svg class="icon icon-filter" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <line x1="4" y1="6" x2="20" y2="6"></line>
      <line x1="7" y1="12" x2="17" y2="12"></line>
      <line x1="10" y1="18" x2="14" y2="18"></line>
    </svg>

  {%- when 'zoom' -%}
    <svg class="icon icon-zoom" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      <line x1="11" y1="8" x2="11" y2="14"></line>
      <line x1="8" y1="11" x2="14" y2="11"></line>
    </svg>

  {%- when 'share' -%}
    <svg class="icon icon-share" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="18" cy="5" r="3"></circle>
      <circle cx="6" cy="12" r="3"></circle>
      <circle cx="18" cy="19" r="3"></circle>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
    </svg>

  {%- when 'size_guide' -%}
    <svg class="icon icon-size-guide" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M21.3 8.7l-6-6a2 2 0 0 0-2.8 0L3.7 11.5a2 2 0 0 0 0 2.8l6 6a2 2 0 0 0 2.8 0l8.8-8.8a2 2 0 0 0 0-2.8z"></path>
      <path d="M7.5 10.5l2 2"></path>
      <path d="M10.5 7.5l2 2"></path>
      <path d="M13.5 4.5l2 2"></path>
    </svg>

  {%- when 'minus' -%}
    <svg class="icon icon-minus" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>

  {%- when 'plus' -%}
    <svg class="icon icon-plus" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>

  {%- when 'star' -%}
    <svg class="icon icon-star" width="15" height="15" viewBox="0 0 24 24" fill="#8F7967" stroke="#8F7967" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>

  {%- when 'star-empty' -%}
    <svg class="icon icon-star-empty" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DED6CF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>

  {%- when 'check' -%}
    <svg class="icon icon-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>

  {%- when 'anti_tarnish' -%}
    <svg class="icon icon-benefit" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8F7967" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      <path d="M12 8v4"></path>
      <path d="M12 16h.01"></path>
    </svg>

  {%- when 'stainless_steel' -%}
    <svg class="icon icon-benefit" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8F7967" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
      <polyline points="2 17 12 22 22 17"></polyline>
      <polyline points="2 12 12 17 22 12"></polyline>
    </svg>

  {%- when 'gold_plated' -%}
    <svg class="icon icon-benefit" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8F7967" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9"></circle>
      <path d="M12 7l1.5 3 3.5.5-2.5 2.5.5 3.5-3-1.5-3 1.5.5-3.5-2.5-2.5 3.5-.5z"></path>
    </svg>

  {%- when 'long_lasting' -%}
    <svg class="icon icon-benefit" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8F7967" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>

  {%- else -%}
    <svg class="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"></circle>
    </svg>
{%- endcase -%}
''')

# 2. snippets/price.liquid
write("snippets/price.liquid", '''
{%- comment -%}
  Price snippet
  Usage: {% render 'price', product: product, price_class: '' %}
{%- endcomment -%}

{%- liquid
  assign target = product.selected_or_first_available_variant | default: product
  assign price = target.price | default: 199900
  assign compare_at_price = target.compare_at_price
  assign available = target.available | default: true
-%}

<div class="price-wrapper {{ price_class }}">
  {%- if compare_at_price > price -%}
    <span class="price price--sale">{{ price | money }}</span>
    <span class="price price--compare">{{ compare_at_price | money }}</span>
  {%- else -%}
    <span class="price">{{ price | money }}</span>
  {%- endif -%}
</div>
''')

# 3. snippets/product-card.liquid
write("snippets/product-card.liquid", '''
{%- comment -%}
  Product Card Snippet
  Usage: {% render 'product-card', product: product, show_badge: true %}
{%- endcomment -%}

{%- liquid
  assign current_variant = product.selected_or_first_available_variant
  assign has_secondary_image = false
  if product.images.size > 1
    assign has_secondary_image = true
  endif
  assign badge_text = ''
  if show_badge
    if product.metafields.custom.badge != blank
      assign badge_text = product.metafields.custom.badge
    elsif product.compare_at_price > product.price
      assign badge_text = 'SALE'
    elsif product.tags contains 'Best Seller' or product.tags contains 'best-seller' or product.tags contains 'bestseller'
      assign badge_text = 'Best Seller'
    endif
  endif
-%}

<article class="product-card" data-product-id="{{ product.id }}">
  <!-- Image Container -->
  <div class="product-card__media-wrapper">
    <a href="{{ product.url }}" class="product-card__link" aria-label="{{ product.title | escape }}">
      <div class="product-card__image-box">
        {%- if product.featured_image != blank -%}
          <img
            src="{{ product.featured_image | image_url: width: 600 }}"
            srcset="{{ product.featured_image | image_url: width: 300 }} 300w,
                    {{ product.featured_image | image_url: width: 600 }} 600w"
            sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
            alt="{{ product.featured_image.alt | default: product.title | escape }}"
            loading="lazy"
            width="600"
            height="600"
            class="product-card__image product-card__image--primary"
          >
          {%- if has_secondary_image -%}
            <img
              src="{{ product.images[1] | image_url: width: 600 }}"
              srcset="{{ product.images[1] | image_url: width: 300 }} 300w,
                      {{ product.images[1] | image_url: width: 600 }} 600w"
              sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
              alt="{{ product.images[1].alt | default: product.title | escape }}"
              loading="lazy"
              width="600"
              height="600"
              class="product-card__image product-card__image--secondary"
            >
          {%- endif -%}
        {%- else -%}
          <div class="product-card__placeholder">
            {{ 'product-1' | placeholder_svg_tag: 'placeholder-svg' }}
          </div>
        {%- endif -%}
      </div>
    </a>

    <!-- Badge (top right) -->
    {%- if badge_text != blank -%}
      <span class="product-card__badge">{{ badge_text }}</span>
    {%- endif -%}

    <!-- Image Dots (bottom left) -->
    {%- if product.images.size > 1 -%}
      <div class="product-card__dots" aria-hidden="true">
        {%- for img in product.images limit: 4 -%}
          <span class="product-card__dot{% if forloop.first %} active{% endif %}"></span>
        {%- endfor -%}
      </div>
    {%- endif -%}

    <!-- Quick Add Button (bottom right) -->
    <div class="product-card__quick-add">
      {%- if product.has_only_default_variant and product.available -%}
        <button
          type="button"
          class="product-card__add-btn btn-reset"
          data-quick-add
          data-variant-id="{{ current_variant.id }}"
          aria-label="Add {{ product.title | escape }} to cart"
        >
          <span class="product-card__add-text">ADD</span>
          {%- render 'icon', icon: 'cart' -%}
        </button>
      {%- elsif product.available -%}
        <a
          href="{{ product.url }}"
          class="product-card__add-btn"
          aria-label="Choose options for {{ product.title | escape }}"
        >
          <span class="product-card__add-text">ADD</span>
          {%- render 'icon', icon: 'cart' -%}
        </a>
      {%- else -%}
        <button type="button" class="product-card__add-btn btn-reset disabled" disabled>
          <span class="product-card__add-text">SOLD OUT</span>
        </button>
      {%- endif -%}
    </div>
  </div>

  <!-- Content -->
  <div class="product-card__info">
    <h3 class="product-card__title">
      <a href="{{ product.url }}">{{ product.title }}</a>
    </h3>
    <div class="product-card__price">
      {%- render 'price', product: product -%}
    </div>
  </div>
</article>
''')

# 4. snippets/quick-add.liquid
write("snippets/quick-add.liquid", '''
{%- comment -%}
  Quick Add form snippet
{%- endcomment -%}
<form method="post" action="/cart/add" class="quick-add-form" data-quick-add-form>
  <input type="hidden" name="id" value="{{ product.selected_or_first_available_variant.id }}">
  <input type="hidden" name="quantity" value="1">
  <button type="submit" class="quick-add-btn button button--primary">
    <span>ADD TO CART</span>
  </button>
</form>
''')

# 5. snippets/cart-drawer.liquid
write("snippets/cart-drawer.liquid", '''
<div id="cart-drawer" class="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping Cart" hidden>
  <div class="cart-drawer__overlay" data-cart-close tabindex="-1"></div>
  <div class="cart-drawer__panel">
    <!-- Header -->
    <div class="cart-drawer__header">
      <h2 class="cart-drawer__title">SHOPPING BAG (<span data-cart-drawer-count>{{ cart.item_count }}</span>)</h2>
      <button class="cart-drawer__close btn-reset" aria-label="Close cart" data-cart-close>
        {%- render 'icon', icon: 'close' -%}
      </button>
    </div>

    <!-- Free Shipping Progress -->
    <div class="cart-drawer__shipping-bar">
      {%- assign threshold = 379900 -%}
      {%- assign cart_total = cart.total_price -%}
      {%- if cart_total >= threshold -%}
        <p class="cart-drawer__shipping-text">You have earned <strong>FREE SHIPPING!</strong></p>
        <div class="cart-drawer__progress-track">
          <div class="cart-drawer__progress-fill" style="width: 100%;"></div>
        </div>
      {%- else -%}
        {%- assign remaining = threshold | minus: cart_total -%}
        <p class="cart-drawer__shipping-text">Add <strong>{{ remaining | money }}</strong> more to enjoy <strong>FREE SHIPPING</strong></p>
        <div class="cart-drawer__progress-track">
          {%- assign percent = cart_total | times: 100 | divided_by: threshold -%}
          <div class="cart-drawer__progress-fill" style="width: {{ percent }}%;"></div>
        </div>
      {%- endif -%}
    </div>

    <!-- Items List -->
    <div class="cart-drawer__body" data-cart-drawer-items>
      {%- if cart.item_count == 0 -%}
        <div class="cart-drawer__empty">
          <p>Your bag is currently empty.</p>
          <a href="/collections/all" class="button button--primary" style="margin-top: 16px;">EXPLORE JEWELLERY</a>
        </div>
      {%- else -%}
        <div class="cart-drawer__items-list">
          {%- for item in cart.items -%}
            <div class="cart-item" data-line-item-key="{{ item.key }}" data-line-index="{{ forloop.index }}">
              <div class="cart-item__media">
                {%- if item.image -%}
                  <img src="{{ item.image | image_url: width: 140 }}" alt="{{ item.title | escape }}" width="70" height="70" loading="lazy">
                {%- endif -%}
              </div>
              <div class="cart-item__details">
                <a href="{{ item.url }}" class="cart-item__title">{{ item.product.title }}</a>
                {%- unless item.product.has_only_default_variant -%}
                  <span class="cart-item__variant">{{ item.variant.title }}</span>
                {%- endunless -%}
                <div class="cart-item__price">{{ item.final_line_price | money }}</div>

                <div class="cart-item__actions">
                  <div class="qty-stepper">
                    <button type="button" class="qty-btn btn-reset" data-qty-change="minus" data-key="{{ item.key }}" data-qty="{{ item.quantity | minus: 1 }}" aria-label="Decrease quantity">
                      {%- render 'icon', icon: 'minus' -%}
                    </button>
                    <span class="qty-val">{{ item.quantity }}</span>
                    <button type="button" class="qty-btn btn-reset" data-qty-change="plus" data-key="{{ item.key }}" data-qty="{{ item.quantity | plus: 1 }}" aria-label="Increase quantity">
                      {%- render 'icon', icon: 'plus' -%}
                    </button>
                  </div>
                  <button type="button" class="cart-item__remove btn-reset" data-qty-change="remove" data-key="{{ item.key }}" data-qty="0">Remove</button>
                </div>
              </div>
            </div>
          {%- endfor -%}
        </div>
      {%- endif -%}
    </div>

    <!-- Footer -->
    {%- if cart.item_count > 0 -%}
      <div class="cart-drawer__footer" data-cart-drawer-footer>
        <div class="cart-drawer__subtotal">
          <span>Subtotal</span>
          <span class="cart-drawer__subtotal-val" data-cart-subtotal>{{ cart.total_price | money }}</span>
        </div>
        <p class="cart-drawer__tax-note">Shipping, taxes, and discounts calculated at checkout.</p>
        <a href="/checkout" class="button button--primary button--full" style="height: 48px; font-size: 13px; letter-spacing: 2px;">CHECKOUT</a>
        <a href="{{ routes.cart_url }}" class="cart-drawer__view-cart">View Bag</a>
      </div>
    {%- endif -%}
  </div>
</div>
''')

# 6. snippets/predictive-search.liquid
write("snippets/predictive-search.liquid", '''
<div id="predictive-search-modal" class="search-modal" role="dialog" aria-modal="true" aria-label="Search" hidden>
  <div class="search-modal__overlay" data-search-close tabindex="-1"></div>
  <div class="search-modal__panel">
    <div class="search-modal__header">
      <form action="{{ routes.search_url }}" method="get" role="search" class="search-modal__form">
        <button type="submit" class="search-modal__submit btn-reset" aria-label="Search">
          {%- render 'icon', icon: 'search' -%}
        </button>
        <input
          type="search"
          name="q"
          class="search-modal__input"
          placeholder="Search rings, bracelets, neck chains..."
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          data-predictive-search-input
        >
        <input type="hidden" name="type" value="product,collection">
        <input type="hidden" name="options[prefix]" value="last">
        <button type="button" class="search-modal__close btn-reset" aria-label="Close search" data-search-close>
          {%- render 'icon', icon: 'close' -%}
        </button>
      </form>
    </div>

    <div class="search-modal__results" data-predictive-search-results>
      <div class="search-modal__suggestions">
        <span class="search-modal__label">Popular Searches</span>
        <div class="search-modal__tags">
          <a href="/search?q=Rings&type=product" class="search-tag">Rings</a>
          <a href="/search?q=Neck+Chains&type=product" class="search-tag">Neck Chains</a>
          <a href="/search?q=Bracelets&type=product" class="search-tag">Bracelets</a>
          <a href="/search?q=Earring&type=product" class="search-tag">Earrings</a>
          <a href="/search?q=Anklets&type=product" class="search-tag">Anklets</a>
        </div>
      </div>
    </div>
  </div>
</div>
''')

# 7. snippets/breadcrumbs.liquid
write("snippets/breadcrumbs.liquid", '''
{%- unless template == 'index' or template == 'cart' or template == 'list-collections' -%}
  <nav class="breadcrumbs" aria-label="breadcrumbs">
    <div class="container">
      <ol class="breadcrumbs__list list-reset">
        <li class="breadcrumbs__item"><a href="{{ routes.root_url }}">Home</a></li>
        {%- if template contains 'collection' and collection.handle -%}
          <li class="breadcrumbs__separator">/</li>
          <li class="breadcrumbs__item"><span aria-current="page">{{ collection.title }}</span></li>
        {%- elsif template contains 'product' -%}
          {%- if collection.url -%}
            <li class="breadcrumbs__separator">/</li>
            <li class="breadcrumbs__item">{{ collection.title | link_to: collection.url }}</li>
          {%- endif -%}
          <li class="breadcrumbs__separator">/</li>
          <li class="breadcrumbs__item"><span aria-current="page">{{ product.title }}</span></li>
        {%- elsif template contains 'page' -%}
          <li class="breadcrumbs__separator">/</li>
          <li class="breadcrumbs__item"><span aria-current="page">{{ page.title }}</span></li>
        {%- else -%}
          <li class="breadcrumbs__separator">/</li>
          <li class="breadcrumbs__item"><span aria-current="page">{{ page_title }}</span></li>
        {%- endif -%}
      </ol>
    </div>
  </nav>
{%- endunless -%}
''')

# 8. snippets/pagination.liquid
write("snippets/pagination.liquid", '''
{%- comment -%}
  Pagination snippet: numbered, show_next true, filled circle active style
  Usage: {% render 'pagination', paginate: paginate %}
{%- endcomment -%}

{%- if paginate.parts.size > 0 -%}
  <nav class="pagination" role="navigation" aria-label="Pagination">
    <ul class="pagination__list list-reset">
      {%- if paginate.previous -%}
        <li class="pagination__item">
          <a href="{{ paginate.previous.url }}" class="pagination__arrow" aria-label="Previous page">
            {%- render 'icon', icon: 'chevron-left' -%}
          </a>
        </li>
      {%- endif -%}

      {%- for part in paginate.parts -%}
        <li class="pagination__item">
          {%- if part.is_link -%}
            <a href="{{ part.url }}" class="pagination__link" aria-label="Page {{ part.title }}">{{ part.title }}</a>
          {%- else -%}
            {%- if part.title == paginate.current_page -%}
              <span class="pagination__link pagination__link--active" aria-current="page">{{ part.title }}</span>
            {%- else -%}
              <span class="pagination__ellipsis">{{ part.title }}</span>
            {%- endif -%}
          {%- endif -%}
        </li>
      {%- endfor -%}

      {%- if paginate.next -%}
        <li class="pagination__item">
          <a href="{{ paginate.next.url }}" class="pagination__arrow" aria-label="Next page">
            {%- render 'icon', icon: 'chevron-right' -%}
          </a>
        </li>
      {%- endif -%}
    </ul>
  </nav>
{%- endif -%}
''')

print("Snippets created successfully.")
