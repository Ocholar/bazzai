import express from 'express';
import cors from 'cors';

console.log('--- MINIMAL BACKEND STARTUP ---');
console.log('Time:', new Date().toISOString());
console.log('ENV KEYS:', Object.keys(process.env).join(', '));

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Minimal Bazztech API is running');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`[server] Listening on port ${port}`);
});

process.on("uncaughtException", (err) => {
  console.error("[server] Uncaught Exception:", err);
});
process.on("unhandledRejection", (reason) => {
  console.error("[server] Unhandled Rejection:", reason);
});
