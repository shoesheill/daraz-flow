class ProductPage {
  openFirstProduct() {
    cy.get('body').then(($body) => {
      const cards = $body.find('[data-qa-locator="product-item"]')

      if (cards.length === 0) {
        cy.fail(
          'no product cards found to click.\n' +
          '   The search or filter may have returned zero results.'
        )
      }

      cy.log(`clicking product card (1 of ${cards.length})`)

      cy.get('[data-qa-locator="product-item"]')
        .first()
        .click({ force: true })
    })

    cy.wait(6000)

    this.verifyPageLoaded()
  }

  verifyPageLoaded() {
    cy.get('body').then(($body) => {
      const hasTitle =
        $body.find('h1').length > 0 ||
        $body.find('[data-qa*="title"]').length > 0 ||
        $body.find('.next-title, .product-title, [class*="productTitle"]').length > 0

      if (!hasTitle) {
        cy.fail(
          'Product detail page did not load — no title element found.\n' +
          '   The click may have navigated to an unexpected page.\n' +
          '   Check the screenshot for the current URL.'
        )
      }

      cy.log('detail page loaded successfully')
    })
  }
}

module.exports = new ProductPage()
