# KBE Demo-Projekt: Quarkus Backend & Vue 3 Frontend

Ein modernes Enterprise-Anwendungs-Demo-Projekt mit einem **Quarkus (Java 21)** REST-Backend, einem **Vue 3 (TypeScript / Vite)** Frontend und automatisierter **Cypress E2E-Testvalidierung** (inklusive GitHub Actions CI/CD-Pipeline).

---

## 🚀 Technologie-Stack
* **Backend:** Java 17, Quarkus (REST, CDI, Jackson)
* **Frontend:** Vue 3, Vite, TypeScript
* **E2E-Tests:** Cypress 13 (mit interaktivem `cy.pause()` Modus für Live-Präsentationen)
* **CI/CD:** GitHub Actions

---

## 🛠️ Lokale Installation & Start (3-Terminal-Setup)

Um das Projekt lokal zu starten, benötigst du drei Terminals:

### 1. Backend starten (Quarkus)
```bash
# Im Hauptverzeichnis des Projekts
mvn quarkus:dev
```
*Das Backend läuft danach auf `http://localhost:8080`.*

### 2. Frontend starten (Vue 3)
```bash
# In den Frontend-Ordner wechseln
cd frontend
npm install
npm run dev
```
*Das Frontend läuft danach auf `http://localhost:5173`.*

### 3. E2E-Tests ausführen (Cypress)
* **Headless-Modus (CLI):**
  ```bash
  cd frontend
  npx cypress run --browser electron
  ```
* **Interactive/Headed-Modus (Für Live-Präsentationen mit `cy.pause()`):**
  ```bash
  cd frontend
  npx cypress run --browser electron --headed
  ```

---

## 🔄 CI/CD Pipeline (GitHub Actions)
Das Projekt beinhaltet eine automatisierte GitHub Actions Pipeline (`.github/workflows/e2e.yml`), die bei jedem Push/Pull-Request:
1. Java 17 & Node.js 20 einrichtet.
2. Das Quarkus-Backend im Hintergrund startet und die REST-Schnittstellen prüft.
3. Das Vue-Frontend baut und die Cypress E2E-Tests fehlerfrei durchführt.