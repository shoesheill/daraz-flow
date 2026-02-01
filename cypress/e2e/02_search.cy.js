// ─────────────────────────────────────────────────────────────
// e2e / 02_search.cy.js
// Flow  : Login (same as 01) → Search (SEARCH_TERM from env) → Verify results
// Login bata search execute huncha — cy.darazLogin() then search
// ─────────────────────────────────────────────────────────────

const searchPage = require('../pages/searchPage')

describe('Flow 02 — Search', () => {
  before(() => {
    if (!Cypress.env('DARAZ_EMAIL') || !Cypress.env('DARAZ_PASSWORD')) {
      throw new Error('❌ DARAZ_EMAIL / DARAZ_PASSWORD missing in cypress.env.json')
    }
    if (!Cypress.env('SEARCH_TERM')) {
      throw new Error('❌ SEARCH_TERM is missing in cypress.env.json')
    }
  })

  it('should log in then search and show results', () => {
    cy.darazLogin()
    searchPage.search()
  })
})
