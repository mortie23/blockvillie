const fs = require('fs');

const fileContent = fs.readFileSync('/mnt/c/git/github/mortie23/blockvillie/src/components/MapData.js', 'utf8');
const lines = fileContent.split('\n');
const startLineIdx = 121;
let errorFound = false;

for (let i = 0; i < 110; i++) {
  const line = lines[startLineIdx + i];
  // extract just the array part
  const match = line.match(/\[(.*?)\]/);
  if (match) {
    const nums = match[1].split(',').filter(n => n.trim() !== '');
    if (nums.length !== 110) {
      console.log(`Row ${i} (Line ${startLineIdx + i + 1}) has length ${nums.length}, expected 110`);
      errorFound = true;
    }
  } else {
    console.log(`Could not parse row ${i} on line ${startLineIdx + i + 1}`);
    errorFound = true;
  }
}
if (!errorFound) {
  console.log("All 110 rows have length 110.");
}
