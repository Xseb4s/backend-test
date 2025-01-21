const { Router } = require('express');
const products = require('../json/product.json');

const router = Router();

router.get('/', (req, res) => {
    res.send(products);
});

module.exports = router;
