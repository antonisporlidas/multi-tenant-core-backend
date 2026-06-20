# Multi-Tenant Core Backend

Ένα advanced, multi-tenant backend σύστημα σε Node.js και Express, σχεδιασμένο με την Enterprise αρχιτεκτονική των **ξεχωριστών βάσεων δεδομένων ανά πελάτη (Separate Databases per Tenant)** για μέγιστη ασφάλεια και απομόνωση δεδομένων.

Το σύστημα υποστηρίζει dynamic database routing και είναι έτοιμο να εξυπηρετήσει εφαρμογές όπως το **AgroManage** και το **Rental App**.

---

## 🛠️ Τεχνολογικό Stack & Εργαλεία
* **Backend:** Node.js (Express Framework)
* **ORM:** Prisma (PostgreSQL Provider)
* **Database & Virtualization:** Docker Desktop & PostgreSQL (Alpine Image)
* **Database GUI:** DBeaver

---

## 🚀 Βήματα Υλοποίησης (Μέχρι Σήμερα)

### 1. Αρχικοποίηση Project & Express Server
* Στήσιμο του φακέλου και αρχικοποίηση με `npm init -y`.
* Εγκατάσταση και παραμετροποίηση των `express`, `dotenv`, και `nodemon` για αυτόματες επανεκκινήσεις κατά το development.
* Δημιουργία του βασικού `server.js`.

### 2. Παραμετροποίηση Git & Ασφάλεια
* Δημιουργία αρχείου `.gitignore` για τον αποκλεισμό ευαίσθητων αρχείων (`.env`) και βαριών φακέλων (`node_modules`).
* Καθαρισμός του Git ιστορικού από παλιά κολλημένα αρχεία και σύνδεση με το remote repository στο GitHub.

### 3. Dockerization & PostgreSQL Υποδομή
* Δημιουργία αρχείου `docker-compose.yml` χρησιμοποιώντας μια ελαφριά εικόνα `postgres:15-alpine`.
* Σύνδεση των μεταβλητών περιβάλλοντος (`.env`) με το Docker για ασφάλεια των κωδικών.
* Δημιουργία αυτοματοποιημένου SQL initialization script (`init-scripts/01-init.sql`) για την αυτόματη δημιουργία των 3 απομονωμένων βάσεων:
  * `management_db` (Κεντρική διαχείριση tenants)
  * `agromanage_db` (Βάση για το AgroManage app)
  * `rental_app_db` (Βάση για το Rental app)

### 4. Εγκατάσταση Prisma ORM
* Εγκατάσταση της σταθερής έκδοσης `prisma@5.15.0` και του αντίστοιχου `@prisma/client`.
* Αρχικοποίηση του Prisma με `npx prisma init` και σύνδεση του `DATABASE_URL` στο `.env` με την `management_db`.

---

## 🏃 Πώς να το τρέξετε τοπικά

1. Κλωνοποιήστε το repository:
   ```bash
   git clone [https://github.com/antonisporlidas/multi-tenant-core-backend.git](https://github.com/antonisporlidas/multi-tenant-core-backend.git)