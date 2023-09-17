const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('auth.db');

db.serialize(() => {
  db.run('CREATE TABLE User (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT)');

  const stmt = db.prepare('INSERT INTO User (email, password) VALUES (?, ?)');

  for (let i = 0; i < 10; i++) {
    /* password 123 com SHA3-256 */
    stmt.run(`user${i}@example.com`, `8ca32d950873fd2b5b34a7d79c4a294b2fd805abe3261beb04fab61a3b4b75609afd6478aa8d34e03f262d68bb09a2ba9d655e228c96723b2854838a6e613b9d`);
  }

  stmt.finalize();

  db.each('SELECT * FROM User', (err, row) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`User ID: ${row.id}, Email: ${row.email}, Password: ${row.password}`);
    }
  });
});

db.close();
