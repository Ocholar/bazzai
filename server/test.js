import express from 'express';
const app = express();
app.get('/health', (req, res) => res.json({ status: 'ok', js: true }));
const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
    console.log(`JS Test server running on port ${port}`);
});
