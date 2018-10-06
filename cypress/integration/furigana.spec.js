describe('Generate furigana and correct output', () => {
  it('It should generate correct furigana', () => {
    cy.visit('http://127.0.0.1:8080')

    cy.get('#furigana-area')
      .type('自業自得')
      .should('have.value', '自業自得')

    cy.get('button')
      .contains('Add furigana')
      .click()

    cy.get('#result ruby').contains('自業自得')

    cy.get('#result ruby rt').contains('じごうじとく')

    cy.get('#correct-ouput').should(
      'have.value',
      '<ruby>自業自得<rp>(</rp><rt>じごうじとく</rt><rp>)</rp></ruby>'
    )

    /* cy.get('#correct-ouput').type({ backspace }) */
  })
  it('It should modify outputed furigana', () => {
    cy.get('#correct-ouput')
      .clear()
      .type('<ruby>自業自得<rp>(</rp><rt>じごうじと</rt><rp>)</rp></ruby')
      .should(
        'have.value',
        '<ruby>自業自得<rp>(</rp><rt>じごうじと</rt><rp>)</rp></ruby'
      )

    cy.get('#result ruby rt').contains('じごうじと')
  })

  it('It should override modifications', () => {
    cy.get('button')
      .contains('Add furigana')
      .click()

    cy.get('#result ruby rt').contains('じごうじとく')
  })

  /* it('It should copy output to clipboard', () => {
    cy.get('#copyToClipboard')
      .contains('Copy to clipboard (only in Chrome 😋)')
      .click()

    cy.get('#notif')
      .contains('Text copied to clipboard!')
      .should('be.visible')

    cy.get('#correct-ouput')
      .clear()
      .type('{ctrl}V', { release: false })
      .should(
        'have.value',
        '<ruby>自業自得<rp>(</rp><rt>じごうじと</rt><rp>)</rp></ruby'
      )
  }) */
})
