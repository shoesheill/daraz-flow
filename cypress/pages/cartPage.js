// ─────────────────────────────────────────────────────────────
// pages/cartPage.js
// to be done:
//   – read the current cart badge count
//   – click "Add to Cart"
//   – dismiss any post-add modal/popup
//   – re-read the badge and assert it incremented by 1
// ─────────────────────────────────────────────────────────────

class CartPage {
  addToCart() {
    this.getCartCount().then((before) => {
      cy.log(`🛒 Cart count BEFORE add: ${before}`)

      this._clickAddToCart()

      cy.wait(3000)
      this._dismissPostAddModal()
      cy.wait(2000)

      this.getCartCount().then((after) => {
        cy.log(`🛒 Cart count AFTER  add: ${after}`)

        if (after !== before + 1) {
          cy.fail(
            `add to card — badge did not increase.\n` +
            `   Before: ${before}  |  After: ${after}  |  Expected: ${before + 1}\n` + '   Possible causes:\n' +
            '     • "Add to Cart" button was not the correct one\n' +
            '     • A modal blocked the action\n' +
            '     • Stock is zero / item is unavailable'
          )
        }

        cy.log('item added to cart — badge incremented by 1')
      })
    })
  }

  getCartCount() {
    const badgeSelectors = [
      '#topActionCartNumber',
      '[data-qa-locator="cart-count"]',
      '.cart-count',
      '[class*="cartCount"]',
      '[class*="cart-number"]',
    ]

    return cy.get('body').then(($body) => {
      for (const sel of badgeSelectors) {
        const el = $body.find(sel)
        if (el.length > 0) {
          const raw = el.first().text().trim()
          return Number(raw) || 0
        }
      }
      return 0
    })
  }

  // ── click ──────────────────────────────────────────────────
  _clickAddToCart() {
    cy.get('body').then(($body) => {
      const addBtn = $body.find('button').filter((_, el) => {
        return /^Add to Cart$/i.test(el.textContent.trim())
      })

      if (addBtn.length > 0) {
        cy.wrap(addBtn).first().scrollIntoView().click({ force: true })
        return
      }

      if ($body.find('.dd-to-cart-buy-now-btn').length > 0) {
        cy.get('.dd-to-cart-buy-now-btn').first().click({ force: true })
        return
      }
      const fallback = $body.find('button, a').filter((_, el) => {
        return /add.*cart/i.test(el.textContent)
      })

      if (fallback.length > 0) {
        cy.wrap(fallback).first().scrollIntoView().click({ force: true })
        return
      }

      cy.fail(
        '❌ "Add to Cart" button not found on the product page.\n' +
        '   The product may be out of stock or the page did not load fully.'
      )
    })
  }

  _dismissPostAddModal() {
    cy.get('body').then(($body) => {
      const closeSelectors = [
        '.next-dialog-close',
        '[class*="modal-close"]',
        '[aria-label="Close"]',
        'button[aria-label="close"]',
        '.next-dialog-wrap .next-btn:last-child', 
      ]
      const selector = closeSelectors.join(', ')

      if ($body.find(selector).length > 0) {
        cy.get(selector).first().click({ force: true })
        cy.wait(1000)
      }
    })
  }
}

module.exports = new CartPage()
