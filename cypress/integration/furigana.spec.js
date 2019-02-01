describe('Generate furigana and correct output', () => {
  before(() => {
    cy.visit('index.html')
    cy.wait(4000)
  })

  beforeEach(() => {
    cy.get('#furigana-area')
      .clear()
      .type('自業自得')
      .should('have.value', '自業自得')
    cy.get('#get-furigana').click()
  })

  it('It should generate correct furigana', () => {
    cy.get('#result ruby').contains('自業自得')

    cy.get('#result ruby rt').contains('じごうじとく')

    cy.get('#correct-ouput').should(
      'have.value',
      '<ruby>自業自得<rp>(</rp><rt>じごうじとく</rt><rp>)</rp></ruby>'
    )
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
    cy.get('#get-furigana').click()

    cy.get('#result ruby rt').contains('じごうじとく')
  })
})
