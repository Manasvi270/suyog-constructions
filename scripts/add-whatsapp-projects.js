/**
 * add-whatsapp-projects.js
 * Inserts the 4 WhatsApp construction photos as completed projects into the DB.
 * Run once: node scripts/add-whatsapp-projects.js
 */
require('dotenv').config();
const { getDb, initializeDatabase } = require('../src/config/database');

initializeDatabase();
const db = getDb();

const newProjects = [
  {
    title: 'Modern Multi-Storey Residence — Solapur',
    description: 'A contemporary 4-storey residential building featuring bold horizontal slab projections, premium ACP cladding in warm wood tones, and stone-textured facade tiles. Completed with top-quality craftsmanship for a commercial-cum-residential mixed-use layout.',
    category: 'residential',
    location: 'Solapur, Maharashtra',
    status: 'completed',
    area_sqft: 2800,
    year_completed: 2026,
    client_name: null,
    image_urls: JSON.stringify(['/images/projects/project-residential-1.jpg']),
    featured: 1,
  },
  {
    title: 'Commercial Building — Daji Peth, Solapur',
    description: 'A well-structured 5-storey commercial and residential building with elegant facade detailing, ornamental corner tower, and modern window placements. This project reflects Suyog Constructions\'s expertise in urban mixed-use construction.',
    category: 'commercial',
    location: 'Daji Peth, Solapur',
    status: 'completed',
    area_sqft: 4500,
    year_completed: 2025,
    client_name: null,
    image_urls: JSON.stringify(['/images/projects/project-residential-2.jpg']),
    featured: 1,
  },
  {
    title: 'Balu Niwas — Luxury Family Residence',
    description: 'An elegant 3-floor family bungalow named "Balu Niwas" featuring a modern geometric facade with patterned stone cladding, glass railings, decorative gate with floral motifs, and spacious balconies. Showcases premium residential finishing by Suyog Constructions.',
    category: 'residential',
    location: 'Solapur, Maharashtra',
    status: 'completed',
    area_sqft: 3200,
    year_completed: 2026,
    client_name: null,
    image_urls: JSON.stringify([
      '/images/projects/project-residential-3.jpg',
      '/images/projects/project-residential-4.jpg',
    ]),
    featured: 1,
  },
];

const insert = db.prepare(`
  INSERT INTO projects (title, description, category, location, status, area_sqft, year_completed, client_name, image_urls, featured)
  VALUES (@title, @description, @category, @location, @status, @area_sqft, @year_completed, @client_name, @image_urls, @featured)
`);

const insertMany = db.transaction((projects) => {
  for (const p of projects) {
    insert.run(p);
  }
});

insertMany(newProjects);

console.log(`\n✅  Successfully added ${newProjects.length} WhatsApp projects to the database!`);
console.log('Projects added:');
newProjects.forEach((p, i) => console.log(`  ${i + 1}. ${p.title}`));
console.log('\nRestart the server to see the changes at /projects\n');
