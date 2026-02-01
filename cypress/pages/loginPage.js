class LoginPage {
  login() {
    this.clickLoginTrigger()
    cy.wait(3000)
    this.fillAndSubmit()
    cy.wait(5000)
    this.verifyLogin()
  }

  clickLoginTrigger() {
    cy.get('body').then(($body) => {
      const triggers = [
        '#anonLogin',
        '[data-spm="d_login"]',
        '.lzd-header-login',
      ]

      for (const sel of triggers) {
        if ($body.find(sel).length > 0) {
          cy.get(sel).first().click({ force: true })
          return 
        }
      }

      cy.contains('a', /login/i).first().click({ force: true })
    })
  }

  fillAndSubmit() {
    const email    = Cypress.env('DARAZ_EMAIL')
    const password = Cypress.env('DARAZ_PASSWORD')

    if (!email || !password) {
      throw new Error(
        'email or password is empty.\n' +
        '   Fill them in  cypress.env.json  and re-run.'
      )
    }

    cy.get('body').then(($body) => {
      const iframeSelector = 'iframe[id*="login"], iframe[src*="login"]'

      if ($body.find(iframeSelector).length > 0) {
        cy.get(iframeSelector).then(($iframe) => {
          const iframeBody = $iframe.contents().find('body')

          cy.wrap(iframeBody).within(() => {
            this._typeEmail(email)
            this._typePassword(password)
            this._clickSubmit()
          })
        })
      } else {
        this._typeEmail(email)
        this._typePassword(password)
        this._clickSubmit()
      }
    })
  }
  verifyLogin() {
    cy.get('body').then(($body) => {
      if ($body.find('#anonLogin').length > 0) {
        cy.fail(
          'login— #anonLogin is still visible.\n' +
          '   Possible causes:\n' +
          '     • Wrong email / password in cypress.env.json\n' +
          '     • Account is locked\n' +
          '     • Captcha was shown (not handled here)\n' +
          '   Check the screenshot for details.'
        )
      }
    })
    cy.log('✅ Login verified — user menu is visible')
  }

  _typeEmail(email) {
    cy.get(
      'input[type="text"], ' +
      'input[placeholder*="phone"], ' +
      'input[placeholder*="email"], ' +
      'input[name="username"]'
    )
      .first()
      .clear()
      .type(email, { delay: 80 })
      .should('have.value', email)
  }

  _typePassword(password) {
    cy.get('input[type="password"]')
      .first()
      .clear()
      .type(password, { delay: 80 })
      .should('have.value', password)
  }

  _clickSubmit() {
    cy.contains('button', /login/i)
      .should('be.enabled')
      .click()
  }
}

module.exports = new LoginPage()
