import express from 'express';
const app = express();
app.get('/', (req, res) => res.send('Root JS server is running'));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));
