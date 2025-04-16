import express from "express";
import cors from "cors";
import Database from 'better-sqlite3';

const db = new Database('./database.db');
const PORT = process.env.PORT || 3000;
const app = express();

// Create table
db.exec(`
  CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user TEXT,
    description TEXT,
    date DATE,
    location TEXT
  )
`);

app.use(cors());
app.use(express.json());




app.get("/logs", (req, res) => {
  const stmt = db.prepare('SELECT * FROM logs');
  const logs = stmt.all();
  res.json(logs);
});


app.post('/logs', (req, res) => {
  const { user, description, date, location } = req.body;
  const stmt = db.prepare(`
    INSERT INTO logs (user, description, date, location) VALUES (?, ?,?, ?)`
  );
  const result = stmt.run(user, description, date, location);
  
  res.status(201).json({ message: 'log entry created', id: result.lastInsertRowid });
});

app.put('/logs/:id', (req, res) => {
  const { id } = req.params;
  const { user, description, date, location } = req.body;

  const stmt = db.prepare(`
    UPDATE logs
    SET user = ?, description = ?, date = ?, location = ?
    WHERE id = ?
  `);

  const result = stmt.run(user, description, date, location, id);

  if (result.changes === 0) {
    return res.status(404).json({ message: 'Log entry not found' });
  }

  res.json({ message: 'Log entry updated' });
});

app.delete('/logs/:id', (req, res) => {
  const { id } = req.params;

  const stmt = db.prepare('DELETE FROM logs WHERE id = ?');
  const result = stmt.run(id);

  if (result.changes === 0) {
    return res.status(404).json({ message: 'Log entry not found' });
  }

  res.json({ message: 'Log entry deleted' });
});



// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
