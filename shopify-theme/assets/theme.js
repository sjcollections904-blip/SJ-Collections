/**
 * SJ COLLECTIONS — Official Shopify Theme JavaScript
 * Implements Mobile Navigation, Cart Drawer, Dynamic Variant Selection,
 * and Cash on Delivery (COD) WhatsApp Order Submission.
 */

(function () {
  'use strict';

  // --- Utility: Format PKR Currency ---
  function formatPKR(centsOrAmount) {
    let amt = centsOrAmount;
    if (typeof centsOrAmount === 'number' && centsOrAmount > 1000) {
      // In Shopify, prices are in cents (e.g. 850000 = PKR 8,500)
      amt = Math.round(centsOrAmount / 100);
    }
    return 'PKR ' + new Intl.NumberFormat('en-PK').format(amt);
  }

  // --- Pakistan Phone Validation: accepts 03XXXXXXXXX or +923XXXXXXXXX ---
  function validatePakistanPhone(phone) {
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    return /^(03\d{9}|\+923\d{9})$/.test(cleaned);
  }

  // --- Mobile Navigation Drawer ---
  function initMobileMenu() {
    const toggles = document.querySelectorAll('[data-mobile-menu-toggle]');
    const drawer = document.getElementById('MobileDrawer');
    if (!drawer) return;

    toggles.forEach((btn) => {
      btn.addEventListener('click', () => {
        drawer.classList.toggle('is-active');
        document.body.style.overflow = drawer.classList.contains('is-active') ? 'hidden' : '';
      });
    });

    const closeBtn = drawer.querySelector('[data-drawer-close]');
    const backdrop = drawer.querySelector('.mobile-drawer__backdrop');
    [closeBtn, backdrop].forEach((el) => {
      if (el) {
        el.addEventListener('click', () => {
          drawer.classList.remove('is-active');
          document.body.style.overflow = '';
        });
      }
    });
  }

  // --- Cart Drawer & AJAX Cart Operations ---
  const CartManager = {
    drawer: null,
    itemsContainer: null,
    subtotalEl: null,
    countBadges: [],

    init() {
      this.drawer = document.getElementById('CartDrawer');
      if (!this.drawer) return;

      this.itemsContainer = this.drawer.querySelector('[data-cart-drawer-items]');
      this.subtotalEl = this.drawer.querySelector('[data-cart-drawer-subtotal]');
      this.countBadges = document.querySelectorAll('[data-cart-count]');

      // Drawer Open/Close Triggers
      document.querySelectorAll('[data-cart-drawer-open]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.open();
        });
      });

      const closeTrigger = this.drawer.querySelector('[data-drawer-close]');
      const backdrop = this.drawer.querySelector('.cart-drawer__backdrop');
      [closeTrigger, backdrop].forEach((el) => {
        if (el) {
          el.addEventListener('click', () => this.close());
        }
      });

      // Quick Add & Form Submit Interception
      document.addEventListener('submit', (e) => {
        if (e.target && e.target.matches('form[action*="/cart/add"]')) {
          e.preventDefault();
          this.handleAddToCart(e.target);
        }
      });
    },

    open() {
      if (!this.drawer) return;
      this.fetchCart();
      this.drawer.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    },

    close() {
      if (!this.drawer) return;
      this.drawer.classList.remove('is-open');
      document.body.style.overflow = '';
    },

    async fetchCart() {
      try {
        const res = await fetch('/cart.js');
        const cart = await res.json();
        this.render(cart);
      } catch (err) {
        console.error('Failed to load cart', err);
      }
    },

    async handleAddToCart(form) {
      const submitBtn = form.querySelector('[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerText : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'ADDING...';
      }

      try {
        const formData = new FormData(form);
        const res = await fetch('/cart/add.js', {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' }
        });
        const item = await res.json();
        if (item && item.id) {
          this.open();
        } else {
          alert(item.description || 'Could not add creation to bag.');
        }
      } catch (err) {
        console.error('Error adding to cart', err);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = originalText;
        }
      }
    },

    async updateQuantity(lineKey, quantity) {
      try {
        const res = await fetch('/cart/change.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({ id: lineKey, quantity })
        });
        const cart = await res.json();
        this.render(cart);
      } catch (err) {
        console.error('Failed to update quantity', err);
      }
    },

    render(cart) {
      // Update badge counts
      this.countBadges.forEach((badge) => {
        badge.innerText = cart.item_count;
        badge.style.display = cart.item_count > 0 ? 'flex' : 'none';
      });

      if (this.subtotalEl) {
        this.subtotalEl.innerText = formatPKR(cart.total_price);
      }

      if (!this.itemsContainer) return;

      if (!cart.items || cart.items.length === 0) {
        this.itemsContainer.innerHTML = `
          <div style="padding: 3rem 1.5rem; text-align: center; color: var(--color-warm-grey);">
            <p style="font-size: 0.875rem; margin-bottom: 1.5rem;">Your shopping bag is currently empty.</p>
            <a href="/collections/all" class="btn btn-secondary" style="font-size: 0.7rem; padding: 0.75rem 1.25rem;">
              Explore Creations
            </a>
          </div>
        `;
        return;
      }

      let html = '<div class="cart-drawer__list" style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem 0;">';
      cart.items.forEach((item) => {
        const variantTitle = item.variant_title ? `<p style="font-size: 0.6875rem; color: var(--color-warm-grey);">${item.variant_title}</p>` : '';
        html += `
          <div style="display: flex; gap: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--color-border-ivory); align-items: center;">
            <img src="${item.image}" alt="${item.title}" style="width: 60px; height: 75px; object-fit: cover; background-color: #F0ECE1; border: 1px solid var(--color-border-ivory);" />
            <div style="flex: 1 1 0%; min-width: 0;">
              <h4 style="font-size: 0.875rem; font-family: var(--font-serif); margin-bottom: 0.25rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.product_title}</h4>
              ${variantTitle}
              <p style="font-size: 0.8125rem; font-weight: 600; margin-top: 0.25rem;">${formatPKR(item.final_line_price)}</p>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.4rem;">
                <button type="button" onclick="window.SJCart.updateQuantity('${item.key}', ${item.quantity - 1})" style="padding: 2px 7px; border: 1px solid var(--color-border-ivory); background: none; cursor: pointer;">-</button>
                <span style="font-size: 0.75rem; font-weight: 600;">${item.quantity}</span>
                <button type="button" onclick="window.SJCart.updateQuantity('${item.key}', ${item.quantity + 1})" style="padding: 2px 7px; border: 1px solid var(--color-border-ivory); background: none; cursor: pointer;">+</button>
                <button type="button" onclick="window.SJCart.updateQuantity('${item.key}', 0)" style="margin-left: auto; font-size: 0.6875rem; color: #B91C1C; background: none; border: none; cursor: pointer; text-decoration: underline;">Remove</button>
              </div>
            </div>
          </div>
        `;
      });
      html += '</div>';
      this.itemsContainer.innerHTML = html;
    }
  };

  window.SJCart = CartManager;

  // --- Product Variant Selector Handler ---
  function initProductVariants() {
    const productForms = document.querySelectorAll('[data-product-form]');
    productForms.forEach((form) => {
      const variantJsonEl = form.querySelector('[data-product-variants-json]');
      if (!variantJsonEl) return;

      let variants = [];
      try {
        variants = JSON.parse(variantJsonEl.textContent);
      } catch (e) {
        return;
      }

      const variantIdInput = form.querySelector('input[name="id"]');
      const priceEl = form.closest('.product-detail, .main-product')?.querySelector('[data-product-price]');
      const comparePriceEl = form.closest('.product-detail, .main-product')?.querySelector('[data-product-compare-price]');
      const submitBtn = form.querySelector('[type="submit"]');

      form.addEventListener('change', () => {
        // Collect current selections
        const selectedOptions = [];
        form.querySelectorAll('[data-single-option-selector]').forEach((select) => {
          selectedOptions.push(select.value);
        });

        // Find matching variant
        const match = variants.find((v) => {
          return selectedOptions.every((val, index) => v.options[index] === val);
        });

        if (match) {
          if (variantIdInput) variantIdInput.value = match.id;
          if (priceEl) priceEl.innerText = formatPKR(match.price);
          if (comparePriceEl) {
            if (match.compare_at_price && match.compare_at_price > match.price) {
              comparePriceEl.innerText = formatPKR(match.compare_at_price);
              comparePriceEl.style.display = 'inline';
            } else {
              comparePriceEl.style.display = 'none';
            }
          }
          if (submitBtn) {
            if (match.available) {
              submitBtn.disabled = false;
              submitBtn.innerText = 'ADD TO SHOPPING BAG';
            } else {
              submitBtn.disabled = true;
              submitBtn.innerText = 'SOLD OUT';
            }
          }
        }
      });
    });
  }

  // --- Dedicated Cash on Delivery (COD) WhatsApp Order Placement ---
  function initCodWhatsAppCheckout() {
    const codForm = document.getElementById('CodCheckoutForm');
    if (!codForm) return;

    const errorEl = codForm.querySelector('[data-cod-error]');
    const submitBtn = codForm.querySelector('[data-cod-submit]');

    codForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (errorEl) {
        errorEl.style.display = 'none';
        errorEl.innerText = '';
      }

      const name = (codForm.querySelector('[name="name"]')?.value || '').trim();
      const phone = (codForm.querySelector('[name="phone"]')?.value || '').trim();
      const email = (codForm.querySelector('[name="email"]')?.value || '').trim();
      const address = (codForm.querySelector('[name="address"]')?.value || '').trim();
      const city = (codForm.querySelector('[name="city"]')?.value || '').trim();
      const province = (codForm.querySelector('[name="province"]')?.value || '').trim();
      const postalCode = (codForm.querySelector('[name="postal_code"]')?.value || '').trim();
      const notes = (codForm.querySelector('[name="order_notes"]')?.value || '').trim();

      // Separate shipping fields if unchecked
      const sameAsShipping = codForm.querySelector('[name="same_shipping"]')?.checked;
      let shippingName = name;
      let shippingPhone = phone;
      let shippingAddress = address;
      let shippingCity = city;

      if (!sameAsShipping) {
        shippingName = (codForm.querySelector('[name="shipping_name"]')?.value || '').trim();
        shippingPhone = (codForm.querySelector('[name="shipping_phone"]')?.value || '').trim();
        shippingAddress = (codForm.querySelector('[name="shipping_address"]')?.value || '').trim();
        shippingCity = (codForm.querySelector('[name="shipping_city"]')?.value || '').trim();
      }

      // Validations
      if (!name) {
        showError('Please enter your full name in the billing form.');
        return;
      }
      if (!phone || !validatePakistanPhone(phone)) {
        showError('Please enter a valid Pakistani mobile number (e.g. 0300 1234567 or +92 333 3368420).');
        return;
      }
      if (!email || !email.includes('@')) {
        showError('Please enter a valid email address.');
        return;
      }
      if (!address) {
        showError('Please enter your complete street address.');
        return;
      }
      if (!city) {
        showError('Please specify your delivery city.');
        return;
      }

      if (!sameAsShipping && (!shippingName || !shippingPhone || !shippingAddress)) {
        showError('Please complete all recipient shipping details.');
        return;
      }

      // Fetch Cart contents
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'GENERATING WHATSAPP ORDER...';
      }

      try {
        const res = await fetch('/cart.js');
        const cart = await res.json();

        if (!cart.items || cart.items.length === 0) {
          showError('Your shopping bag is empty.');
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = 'CONFIRM ORDER VIA WHATSAPP';
          }
          return;
        }

        const storeWhatsApp = codForm.getAttribute('data-whatsapp-number') || '923333368420';
        const shippingFee = parseInt(codForm.getAttribute('data-shipping-fee') || '0', 10);
        const subtotal = Math.round(cart.total_price / 100);
        const totalPayable = subtotal + shippingFee;

        // Formatted order items
        const itemsList = cart.items
          .map((item) => {
            const variantInfo = item.variant_title ? ` [${item.variant_title}]` : '';
            const itemPrice = Math.round(item.final_line_price / 100);
            return `• ${item.product_title}${variantInfo} — Qty: ${item.quantity} — PKR ${itemPrice}`;
          })
          .join('\n');

        const orderRef = 'SJC-' + Math.floor(100000 + Math.random() * 900000);

        const waMessage = `Hello SJ Collections! I would like to confirm my Cash on Delivery order.

Order Reference: ${orderRef}

Items:
${itemsList}

Subtotal: PKR ${subtotal}
Shipping Fee: ${shippingFee === 0 ? 'Complimentary' : 'PKR ' + shippingFee}
Total Payable (COD): PKR ${totalPayable}

Customer Details:
Name: ${shippingName}
Phone: ${shippingPhone}
Email: ${email}
Delivery Address: ${shippingAddress}
City: ${shippingCity}${province ? ', ' + province : ''}${postalCode ? ' (' + postalCode + ')' : ''}
${notes ? '\nOrder Notes: ' + notes : ''}

Payment Method: Cash on Delivery (COD)
Please confirm my order. Thank you!`;

        const waUrl = `https://wa.me/${storeWhatsApp}?text=${encodeURIComponent(waMessage)}`;

        // Open WhatsApp
        window.open(waUrl, '_blank', 'noopener,noreferrer');

        // Optional: clear cart after generating
        setTimeout(() => {
          fetch('/cart/clear.js', { method: 'POST' }).then(() => {
            window.location.href = '/pages/order-confirmation?ref=' + orderRef;
          }).catch(() => {
            window.location.reload();
          });
        }, 800);

      } catch (err) {
        showError('Could not process order details. Please retry or message our concierge directly.');
        console.error(err);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = 'CONFIRM ORDER VIA WHATSAPP';
        }
      }
    });

    function showError(msg) {
      if (errorEl) {
        errorEl.innerText = msg;
        errorEl.style.display = 'block';
      } else {
        alert(msg);
      }
    }
  }

  // --- Separate Shipping Toggle in Checkout ---
  function initShippingToggle() {
    const toggle = document.querySelector('[data-same-shipping-toggle]');
    const separateFields = document.querySelector('[data-separate-shipping-fields]');
    if (!toggle || !separateFields) return;

    toggle.addEventListener('change', () => {
      separateFields.style.display = toggle.checked ? 'none' : 'block';
    });
  }

  // DOM Ready initialization
  document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    CartManager.init();
    initProductVariants();
    initCodWhatsAppCheckout();
    initShippingToggle();
  });
})();
