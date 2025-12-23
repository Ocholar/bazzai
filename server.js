import express from 'express';
const app = express();
app.get('/health', (req, res) => res.json({ status: 'ok', root: true }));
const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Root server running on port ${port}`);
});
