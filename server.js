// Φέρνουμε (κάνουμε import) τις βιβλιοθήκες που κατεβάσαμε
import express from 'express';
import dotenv from 'dotenv';

// Λέμε στο dotenv να διαβάσει τις ρυθμίσεις από το αρχείο .env (θα το φτιάξουμε σε λίγο)
dotenv.config();

// Δημιουργούμε μια εφαρμογή Express. Αυτό το "app" είναι ο server μας!
const app = express();

// Ορίζουμε σε ποια "θύρα" (Port) του υπολογιστή θα ακούει ο server.
// Του λέμε: Διάβασε την πόρτα από το αρχείο .env, αν δεν υπάρχει, χρησιμοποίησε την 5000.
const PORT = process.env.PORT; 

// Αυτή η γραμμή είναι middleware. Λέει στον server: 
// "Όταν σου στέλνουν δεδομένα, διάβαζέ τα σε μορφή JSON (κείμενο)".
app.use(express.json());

// Φτιάχνουμε το πρώτο μας "Route" (Διαδρομή).
// Όταν κάποιος μπει στην αρχική διεύθυνση ('/'), ο server θα εκτελέσει αυτή τη συνάρτηση.
// req (request) = το αίτημα που έρχεται, res (response) = η απάντηση που στέλνουμε εμείς.
app.get('/', (req, res) => {
  res.json({ message: "Welcome to the Multi-Tenant API Gateway!" });
});

// Λέμε στον server να ξεκινήσει να "ακούει" στην πόρτα που ορίσαμε
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}, Welcome to our Multi-Tenant Server!`);
});``