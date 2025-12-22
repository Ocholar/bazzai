// Usage:
//   set APIFY_TOKEN=your_token
//   node c:\Antigravity\scripts\apify_search.js

const fs = require('fs');
const path = require('path');

async function run() {
  const token = process.env.APIFY_TOKEN;
  if (!token) {
    console.error('Set APIFY_TOKEN env var.');
    process.exit(1);
  }

  const url = `https://api.apify.com/v2/acts/apify~google-search-scraper/run-sync-get-dataset-items?token=${encodeURIComponent(token)}`;

  const input = {
    // Queries focused on Kenya
    queries: [
      'Airtel 5G Kenya',
      'Internet Services Kenya',
      '5G internet Kenya',
      'unlimited internet Kenya',
    ],
    countryCode: 'KE',
    resultsPerPage: 50,
    maxPagesPerQuery: 1,
    includeUnfilteredResults: false,
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Apify error: ${res.status} ${txt}`);
  }

  const items = await res.json();

  // Minimal filtering and mapping
  const results = items.map((i) => ({
    query: i.query || null,
    title: i.title || null,
    url: i.url || null,
    snippet: i.snippet || null,
    source: 'google',
  })).filter(r => r.url && r.title);

  const outDir = path.join('c:', 'Antigravity', 'output');
  const outFile = path.join(outDir, 'search_results.json');

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(results, null, 2), 'utf-8');

  console.log(`Saved ${results.length} results to ${outFile}`);
}

run().catch(err => {
  console.error(err.message);
  process.exit(1);
});
