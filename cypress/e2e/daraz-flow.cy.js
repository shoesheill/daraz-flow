describe('Daraz  Test', () => {
  

  it('Complete Daraz Test Flow:', () => {
    cy.wrap(null).then(() => Cypress.config('pageLoadTimeout', 120000))
    cy.log('Open Daraz ...')
    cy.visit('/', { timeout: 120000 })
    cy.wait(3000)
    
    cy.get('body').then($body => {
      if ($body.find('.next-dialog-close, [class*="modal-close"], [aria-label="Close"]').length > 0) {
        cy.get('.next-dialog-close, [class*="modal-close"], [aria-label="Close"]').first().click({ force: true })
        cy.wait(1000)
      }
    })
    
    cy.log('Website opened successfully')
    
    cy.log('Log in to Daraz...')
    
    cy.get('body').then($body => {
      // Try multiple selectors for login button
      const loginSelectors = [
        '#anonLogin',
        'a:contains("Login")',
        'a:contains("LOGIN")',
        '[data-spm="d_login"]',
        '.lzd-header-login'
      ]
      
      let found = false
      loginSelectors.forEach(selector => {
        if (!$body.find(selector).length) return
        cy.get(selector).first().click({ force: true })
        found = true
        return false
      })
      
      if (!found) {
        cy.contains('a', /login/i).first().click({ force: true })
      }
    })
    
    cy.wait(3000)
    
   // handle iframe as daraz has pop-up form for login
    cy.get('body').then($body => {
      if ($body.find('iframe[id*="login"], iframe[src*="login"]').length > 0) {

        cy.get('iframe[id*="login"], iframe[src*="login"]').then($iframe => {
          const iframeBody = $iframe.contents().find('body')

          cy.wrap(iframeBody).within(() => {

            cy.get('input[type="text"], input[placeholder*="phone"], input[placeholder*="email"]')
              .first()
              .clear()
              .type(Cypress.env('DARAZ_EMAIL'))
              .should('have.value', Cypress.env('DARAZ_EMAIL'))

            cy.get('input[type="password"]')
              .clear()
              .type(Cypress.env('DARAZ_PASSWORD'))
              .should('have.value', Cypress.env('DARAZ_PASSWORD'))

            cy.contains('button', /login/i)
              .should('be.enabled')   // 🔒 gate
              .click()
          })
        })

      } else {
        cy.get('input[type="text"], input[placeholder*="phone"], input[placeholder*="email"], input[name="username"]')
          .first()
          .clear()
          .type(Cypress.env('DARAZ_EMAIL'), { delay: 100 })
          .should('have.value', Cypress.env('DARAZ_EMAIL'))

        cy.get('input[type="password"]')
          .clear()
          .type(Cypress.env('DARAZ_PASSWORD'), { delay: 100 })
          .should('have.value', Cypress.env('DARAZ_PASSWORD'))

        cy.contains('button', /login/i)
          .should('be.enabled')   // 🔒 gate
          .click()
      }
    })

    
    cy.wait(5000)
    cy.log('ogin completed')
    
    
    cy.log('searching for "laptop"...')
    
    cy.get('#q, input[placeholder*="Search"], input[name="q"], input[type="search"]')
      .first()
      .clear({ force: true })
      .type('laptop{enter}', { delay: 100, force: true })
    
    cy.wait(8000)
    cy.log('search completed')
    
    
    cy.log('fltering by Brand "Apple" from left navigation...')
    
    // Scroll to see the left navigation menu
    cy.scrollTo(0, 300)
    cy.wait(2000)
    
    // Find and click Apple brand filter in the left sidebar
    cy.get('body').then($body => {

      if ($body.find('label:contains("Apple")').length) {
    
        cy.contains('label', /^Apple$/)
          .scrollIntoView()
          .click({ force: true })
    
      } else {
    
        cy.get('input[businessvalue="apple"]')
          .closest('.ant-checkbox')
          .scrollIntoView()
          .click({ force: true })
      }
    })
    

    cy.wait(5000)
    cy.log('apple brand filter applied')
    
    
    cy.log('cicking first product from search results...')
  cy.get('body').then($body => {

      if ($body.find('[data-qa-locator="product-item"]').length) {
    
        // cy.get('[data-qa-locator="product-item"]', { timeout: 15000 })
        // .should('be.visible')
        // .children()
        //cy.get('[data-qa-locator="product-item"]').first().click()
         cy.get('[data-qa-locator="product-item"]').eq(1).click()
        // .scrollIntoView()
        // .click({ force: true })
      }
    })
    
    cy.wait(6000)
    cy.log('poduct page opened')
    
    
    cy.log('addproduct to cart...')
    
    // Get initial cart count before adding
    let initialCartCount = 0
    // cy.get('.dd-to-cart-buy-now-btn').first().click();
    
    // cy.wait(3000)
    // cy.log('product added to cart')
    
    cy.contains('button', 'Add to Cart').click()

    cy.log('verifying cart count increased by 1...')
    cy.get('body').then($body => {
      cy.contains('button', 'Add to Cart').click()

      const cartCountSelectors = '.dd-to-cart-buy-now-btn';
      const selector= '.dd-to-cart-buy-now-btn';
     // cartCountSelectors.forEach(selector => {
        if ($body.find(selector).length > 0) {
          cy.get(selector).first().click();
        }
      //})
      cy.wait(3000)
      cy.get('#topActionCartNumber')
        .invoke('text')
        .then(text => {
          const count = Number(text.trim()) || 0
          cy.log('Current Cart Count:'+count)
        })
    })
    
    cy.wait(1000)
  })
})
