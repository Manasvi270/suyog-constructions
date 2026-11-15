/**
 * fix-pune-to-solapur.js
 * Updates all existing project locations that say Pune → Solapur equivalents.
 * Run once: node scripts/fix-pune-to-solapur.js
 */
require('dotenv').config();
const { getDb, initializeDatabase } = require('../src/config/database');

initializeDatabase();
const db = getDb();

const updates = [
  { from: 'Kothrud, Pune',      to: 'Hotagi Road, Solapur' },
  { from: 'Baner, Pune',        to: 'Daji Peth, Solapur' },
  { from: 'Hinjewadi, Pune',    to: 'Vijapur Road, Solapur' },
  { from: 'Shivajinagar, Pune', to: 'Shivajinagar, Solapur' },
  { from: 'Magarpatta, Pune',   to: 'Akkalkot Road, Solapur' },
  { from: 'Wakad, Pune',        to: 'Murarji Peth, Solapur' },
  { from: 'Viman Nagar, Pune',  to: 'Sainath Nagar, Solapur' },
  { from: 'Koregaon Park, Pune',to: 'Daji Peth, Solapur' },
];

const updateStmt = db.prepare('UPDATE projects SET location = ? WHERE location = ?');

const fixAll = db.transaction((list) => {
  let changed = 0;
  for (const { from, to } of list) {
    const info = updateStmt.run(to, from);
    if (info.changes > 0) {
      console.log(`  ✅ "${from}" → "${to}" (${info.changes} row)`);
      changed += info.changes;
    }
  }
  return changed;
});

const total = fixAll(updates);
console.log(`\n✅  Fixed ${total} project location(s) — all now say Solapur!\n`);
