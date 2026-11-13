describe('KBE To-Do App E2E Test (Vue 3 + Quarkus)', () => {

    beforeEach(() => {
        // Überwacht den REST-Call zum Quarkus-Backend
        cy.intercept('POST', '/api/todos').as('createTodo')
        cy.visit('http://localhost:5173')
    })

    it('sollte eine neue Aufgabe hinzufügen und als erledigt markieren', () => {
        // 0. Start: Test hält an, du kannst die geladene Seite zeigen
        cy.pause()

        // 1. Eingabe der Aufgabe
        cy.get('[data-cy="todo-input"]').type('Cypress Live Demo präsentieren')
        cy.get('[data-cy="todo-submit"]').click()

        // Stopp vor der Überprüfung im DOM
        cy.pause()

        // 2. Prüfung, ob das Element im DOM gerendert wurde
        cy.get('[data-cy="todo-item"]')
            .should('have.length', 1)
            .and('contain.text', 'Cypress Live Demo präsentieren')

        // Stopp vor dem Abhaken
        cy.pause()

        // 3. Status auf "erledigt" umstellen
        cy.get('[data-cy="todo-toggle"]').click()
        cy.get('[data-cy="todo-item"]').should('have.class', 'completed')

        // Finale Pause: Das Fenster bleibt offen, damit man das grüne Ergebnis sieht
        cy.pause()
    })

})