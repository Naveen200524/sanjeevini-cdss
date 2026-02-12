
const fs = require('fs');
const path = require('path');

const files = [
    'app/patient-form/history/page.tsx',
    'app/patient-form/quality-of-life/page.tsx',
    'app/patient-form/distress/page.tsx',
    'app/patient-form/cost-facit/page.tsx',
    'app/patient-form/dass/page.tsx'
];

files.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        content = content.replace(/@\/lib\/supabase-api/g, '@/lib/tier-mock-api');
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${file}`);
    } else {
        console.log(`File not found: ${file}`);
    }
});
