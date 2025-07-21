const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const { diffChars } = require('diff');

const snapshotDir = './backstop_data/dom_snapshots';
const results = [];

function loadDOM(filePath) {
  const html = fs.readFileSync(filePath, 'utf-8');
  return new JSDOM(html).window.document;
}

function getChangedElements(doc1, doc2) {
  const changes = [];

  const el1 = doc1.querySelector('h1');
  const el2 = doc2.querySelector('h1');

  if (el1 && el2) {
    const text1 = el1.textContent.trim();
    const text2 = el2.textContent.trim();

    if (text1 !== text2) {
      changes.push({
        tag: 'h1',
        selector: 'h1',
        textDiff: {
          before: text1,
          after: text2,
          diff: diffChars(text1, text2)
        }
      });
    }
  }

  return changes;
}

fs.readdirSync(snapshotDir).forEach((file) => {
  if (file.endsWith('_test.html')) {
    const referenceFile = file.replace('_test.html', '_reference.html');
    const testPath = path.join(snapshotDir, file);
    const referencePath = path.join(snapshotDir, referenceFile);

    if (fs.existsSync(referencePath)) {
      const doc1 = loadDOM(referencePath);
      const doc2 = loadDOM(testPath);

      const scenarioLabel = file.split('_')[0];
      const changes = getChangedElements(doc1, doc2);

      results.push({
        label: scenarioLabel,
        changes
      });
    }
  }
});

console.log(JSON.stringify(results, null, 2));
