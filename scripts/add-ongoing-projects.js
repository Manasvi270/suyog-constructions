/**
 * add-ongoing-projects.js
 * Inserts two ongoing construction projects into the DB.
 * Run once: node scripts/add-ongoing-projects.js
 */
require('dotenv').config();
const { getDb, initializeDatabase } = require('../src/config/database');

initializeDatabase();
const db = getDb();

const newProjects = [
  {
    title: 'Medical College Hostel — Sainath Nagar',
    description: 'An ongoing large-scale hostel construction project for a medical college at 13 Hotagi Road, Sainath Nagar, Solapur. The project involves multi-storey RCC framed structure with modern amenities for student accommodation. Currently under active slab and column work.',
    category: 'commercial',
    location: 'Sainath Nagar, Solapur',
    status: 'ongoing',
    area_sqft: 18000,
    year_completed: null,
    client_name: null,
    image_urls: JSON.stringify(['/images/projects/project-ongoing-medical-hostel.jpg']),
    featured: 1,
  },
  {
    title: 'Gurunanak Nagar Residential Complex — Solapur',
    description: 'An ongoing residential construction project at Gurunanak Nagar, Solapur. The project features a multi-storey residential complex with premium RCC construction. The site was inaugurated with dignitaries and is progressing at a rapid pace.',
    category: 'residential',
    location: 'Gurunanak Nagar, Solapur',
    status: 'ongoing',
    area_sqft: 12000,
    year_completed: null,
    client_name: null,
    image_urls: JSON.stringify(['/images/projects/project-ongoing-gurunanak.jpg']),
    featured: 1,
  },
];

const insert = db.prepare(`
  INSERT INTO projects (title, description, category, location, status, area_sqft, year_completed, client_name, image_urls, featured)
  VALUES (@title, @description, @category, @location, @status, @area_sqft, @year_completed, @client_name, @image_urls, @featured)
`);

const insertMany = db.transaction((projects) => {
  for (const p of projects) insert.run(p);
});

insertMany(newProjects);

console.log(`\n✅  Successfully added ${newProjects.length} ongoing projects!`);
newProjects.forEach((p, i) => console.log(`  ${i + 1}. [ONGOING] ${p.title}`));
console.log('\nRestart the server to see changes at /projects\n');
