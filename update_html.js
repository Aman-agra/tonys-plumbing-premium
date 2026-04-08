const fs = require('fs');

const files = [
  'c:/Users/abc/Desktop/Aman/tonys-plumbing/index.html',
  'c:/Users/abc/Desktop/Aman/tonys-plumbing/about.html',
  'c:/Users/abc/Desktop/Aman/tonys-plumbing/services.html',
  'c:/Users/abc/Desktop/Aman/tonys-plumbing/contact.html',
  'c:/Users/abc/Desktop/Aman/tonys-plumbing/areas.html'
];

for (const file of files) {
  let text = fs.readFileSync(file, 'utf8');

  // Inject intro-sweep cinematic transition right below loader-overlay
  if (!text.includes('intro-sweep')) {
    text = text.replace('  <header class="header">', '  <div class="intro-sweep" aria-hidden="true"></div>\n\n  <header class="header">');
  }

  // Edit burger menu to be raw spans for animation transformation into X
  text = text.replace(
    /<button class="burger" aria-label="Menu">.*?<\/button>/s,
    `<button class="burger" aria-label="Menu">\n      <span></span><span></span><span></span>\n    </button>`
  );

  // In Areas page, inject the glorious dark mode Google Maps Apple-tier iframe
  if (file.endsWith('areas.html')) {
    text = text.replace(
      /<div style="width:100%; height:100%; min-height: 400px; background: rgba\(11,16,18,0\.05\);.*?<\/div>/s,
      `<div style="width:100%; height:100%; min-height: 400px; border-radius: 2rem; overflow:hidden; position:relative; border: 1px solid rgba(255,255,255,0.1);"><iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d105942.5029369974!2d-118.3243179!3d33.823908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" width="100%" height="100%" style="border:0; position:absolute; top:0; left:0; filter: invert(90%) hue-rotate(180deg) sepia(20%) saturate(150%);" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`
    );
  }

  fs.writeFileSync(file, text);
}
