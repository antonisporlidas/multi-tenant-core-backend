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

<<<<<<< HEAD
### 5. Προσθηκη βασεων τησ management_db και agromanage_db 
    αναλυεται η αρχιτεκτονικη αναλυτικα πιο κατω
### 6. Automation via npm Scripts
   Για την αποφυγή χειροκίνητης πληκτρολόγησης μεγάλων connection strings με ευαίσθητα δεδομένα (passwords) στο τερματικό, δημιουργήθηκαν αυτοματοποιημένα scripts στο `package.json` (`push:management`, `push:agro`). Αυτά χρησιμοποιούν το `cross-env` για να τροφοδοτούν δυναμικά το Prisma με το σωστό URL ανάλογα με τη βάση-στόχο.

---

## 🗄️ Αρχιτεκτονική Βάσεων Δεδομένων (Multi-Tenancy)

Το σύστημα έχει σχεδιαστεί με τη λογική **Database-per-Tenant** για μέγιστη ασφάλεια, απομόνωση δεδομένων και ευκολία στο scaling. Η υποδομή χωρίζεται σε δύο επίπεδα:

### 1. Central / Management Database (`management_db`)
Είναι η κεντρική βάση δεδομένων ("τροχονόμος") του συστήματος. Δεν περιέχει επιχειρηματικά δεδομένα των χρηστών, αλλά διαχειρίζεται το multi-tenant περιβάλλον.
* **Κύριος Πίνακας (`Tenant`):** Καταγράφει όλους τους εγγεγραμμένους πελάτες/εταιρείες (Tenants).
* **Λειτουργία:** Αποθηκεύει το μοναδικό, κρυπτογραφημένο connection string (`dbUrl`) για τη βάση του κάθε Tenant. Όταν ένας χρήστης συνδέεται, το backend συμβουλεύεται αυτή τη βάση για να μάθει πού πρέπει να τον δρομολογήσει.

### 2. Tenant Database (`agromanage_db`)
Είναι η απομονωμένη βάση δεδομένων που περιέχει όλο το "ζουμί" και τα επιχειρηματικά δεδομένα (business logic) της εφαρμογής AgroManage.
* **Κύριοι Πίνακες:** `User` (Αγρότες/Έμποροι), `Field` (Χωράφια), `Crop` (Καλλιέργειες), `Listing` (Αγγελίες Market), `Message` (Chats).
* **Λειτουργία:** Εδώ εκτελούνται όλες οι καθημερινές λειτουργίες του ERP (έξοδα, εργασίες) και του Marketplace. Στο μέλλον, κάθε νέος πελάτης (π.χ. μια άλλη εταιρεία ενοικιάσεων ή άλλος οργανισμός) θα αποκτά τη δική του αντίστοιχη απομονωμένη βάση (π.χ. `rental_app_db`), αφήνοντας την `agromanage_db` τελείως ανεπηρέαστη.

## 🛠️ Τεχνικές Δυσκολίες & Troubleshooting (Session: June 2026)

Κατά το στήσιμο της Multi-Tenant αρχιτεκτονικής και του διαχωρισμού των βάσεων (`management_db` και `agromanage_db`), αντιμετωπίστηκαν και λύθηκαν τα εξής θέματα:

1. **Prisma Config Override & Dynamic Schemas**: 
   Η χρήση του νέου package `prisma/config` (αρχείο `prisma.config.ts`) δημιουργούσε διενέξεις (conflict) στα paths και πέταγε σφάλμα `Error: The "path" argument must be of type string. Received undefined` όταν προσπαθούσαμε να περάσουμε διαφορετικά schemas (`--schema`) από το τερματικό. Το αρχείο αφαιρέθηκε, επιτρέποντας στο Prisma CLI να διαβάζει απευθείας τα dynamic scripts.

2. **PostgreSQL Password URL Encoding**:
   Το password της βάσης περιείχε τον ειδικό χαρακτήρα `@`. Επειδή το Prisma χρησιμοποιεί το `@` ως διαχωριστικό για το host, η σύνδεση αποτύγχανε. Το πρόβλημα λύθηκε με **URL Encoding**, μετατρέποντας το `@` σε κατι αλλο μεσα στον env αρχειο  μέσα στο Connection String.

3. **Prisma v6+ CLI Limitations**:
   Στις νεότερες εκδόσεις του Prisma, η παράμετρος `--url` έχει αφαιρεθεί από την εντολή `db push`. Η εναλλαγή των βάσεων για το push επιτεύχθηκε dynamic μέσω του πακέτου `cross-env`, το οποίο περνάει το σωστό `DATABASE_URL` ως προσωρινή μεταβλητή συστήματος την ώρα που εκτελείται το script στο `package.json`.


## 🚀 Οδηγός Εγκατάστασης σε Νέο Περιβάλλον (Clone & Run)

1. **Clone το project:** `git clone <repo_url>` και `npm install`.
2. **Setup `.env`:** Δημιουργήστε αρχείο `.env` με τις κατάλληλες μεταβλητές και το σωστό URL Encoding (`%40` αντί για `@` στο password).
3. **Docker:** Τρέξτε `docker compose up -d` για να σηκωθεί η PostgreSQL.
4. **Database Push:** Εκτελέστε `npm run push:management` και `npm run push:agro` για να δημιουργηθούν αυτόματα οι πίνακες και στις δύο βάσεις.
5. **Start:** `npm run dev`.
=======
---


