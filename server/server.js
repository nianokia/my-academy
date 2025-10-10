import express from 'express';
const app = express();
const port = import.meta.env.PORT || 3200;

app.use(express.json());

app.get('/', (req, res) => {
    console.log("Hello from GET operation.");
});

app.listen(port, () => {
    console.log(`My Academy server listening on port ${port}`);
    console.log(`Open Dev Server => ${import.meta.env.DOMAIN}`)
})