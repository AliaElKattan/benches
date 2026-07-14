import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(__dirname + "/"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

// Start the server
const port = process.env.PORT || 3800;
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});