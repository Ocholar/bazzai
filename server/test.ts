import express from 'express';
const app = express();
app.get('/health', (req, res) => res.json({ status: 'ok', test: true }));
const port = Number(process.env.PORT) || 3000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Test server running on port ${port}`);
});
