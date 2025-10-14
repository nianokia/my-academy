import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// -------- DEFINE VARIABLES --------
const app = express();
const port = process.env.PORT || 3200;

// -------- DEFINE PATH to the index.html in the build folder --------
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const clientDistPath = path.join(__dirname, '..', 'client', 'dist');

// -------- DEFINE APP USES --------
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(clientDistPath)));

app.get('/', (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));

    console.log('Welcome to My Academy!');
});

app.listen(port, () => {
    console.log(`My Academy server listening on port ${port}`);
    console.log(`Open Dev Server => ${process.env.DOMAIN}`);
})

export default app;