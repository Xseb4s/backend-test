const express = require('express')
const productsRouter = require('./routes/products.js')
const cartRouter = require('./routes/cart.js')
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);


app.get('/', (req, res) => {
    res.send('¡Bienvenido al servidor!');
});

app.use((req, res) => {
    res.status(404).send('Ruta no encontrada');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}/api`);
});
