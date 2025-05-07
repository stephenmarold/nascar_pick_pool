const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Path to the SQLite database file
const dbPath = path.resolve(__dirname, 'nascar_pick_pool.db');

// Create or open the database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

db.serialize(() => {
    // Maybe need later?
    // db.run(`
    //     CREATE TABLE IF NOT EXISTS race_info (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         name TEXT NOT NULL,
    //         track_name TEXT NOT NULL,
    //         laps INTEGER NOT NULL,
    //         start_date DATETIME NOT NULL,
    //         created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    //     )
    // `, (err) => {
    //     if (err) {
    //         console.error('Error creating table:', err.message);
    //     } else {
    //         console.log('race_info table created or already exists.');
    //     }
    // });
    db.run(`
        CREATE TABLE IF NOT EXISTS picks_tbl (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            pool_id INTEGER NOT NULL,
            driver_1 INTEGER NOT NULL,
            driver_2 INTEGER NOT NULL,
            driver_3 INTEGER NOT NULL,
            cur_points INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (pool_id) REFERENCES pool_info(id)

        )
    `, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('picks table created or already exists.');
        }
    });
    db.run(`
        CREATE TABLE IF NOT EXISTS pool_info (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pool_name TEXT NOT NULL,
            race_name TEXT NOT NULL,
            race_date DATETIME NOT NULL,
            winner INTEGER,
            password TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (winner) REFERENCES picks_tbl(id)
        )
    `, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('pool_info table created or already exists.');
        }
    });
});

// Close the database connection when done
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        } else {
            console.log('Database connection closed.');
        }
        process.exit(0);
    });
});

module.exports = db;