const { Router } = require('express');
const products = require('../json/product.json'); // Archivo JSON con los productos

const router = Router();

let cart = [];

router.get('/', (req, res) => {
    res.json({ cart });
});

router.post('/:id', (req, res) => {
    const { id } = req.params;
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
        return res.status(400).json({ message: 'El ID proporcionado no es válido' });
    }

    const product = products.find((prod) => prod.id === parsedId);

    if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const isProductInCart = cart.some((item) => item.id === parsedId);

    if (!isProductInCart) {
        cart.push(product);
        return res.status(201).json({
            message: `Producto con ID ${parsedId} agregado al carrito`,
            cart,
        });
    } else {
        return res.status(400).json({
            message: `El producto con ID ${parsedId} ya está en el carrito`,
            cart,
        });
    }
});

module.exports = router;
