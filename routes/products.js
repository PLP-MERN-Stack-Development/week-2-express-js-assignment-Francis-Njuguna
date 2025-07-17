const express = require('express');
const { v4: uuidv4 } = require('uuid');
const validateProduct = require('../middleware/validateProduct');
const { NotFoundError, ValidationError } = require('../errors/customErrors');

const router = express.Router();

// In-memory products array
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// GET /api/products - List all products (with filtering & pagination)
router.get('/', (req, res) => {
  let { category, page = 1, limit = 10 } = req.query;
  let result = [...products];
  if (category) {
    result = result.filter(p => p.category === category);
  }
  // Pagination
  page = parseInt(page);
  limit = parseInt(limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = result.slice(start, end);
  res.json({
    total: result.length,
    page,
    limit,
    products: paginated
  });
});

// GET /api/products/:id - Get a specific product by ID
router.get('/:id', (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return next(new NotFoundError('Product not found'));
  res.json(product);
});

// POST /api/products - Create a new product
router.post('/', validateProduct, (req, res, next) => {
  try {
    const { name, description, price, category, inStock } = req.body;
    const newProduct = {
      id: uuidv4(),
      name,
      description,
      price,
      category,
      inStock
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
});

// PUT /api/products/:id - Update an existing product
router.put('/:id', validateProduct, (req, res, next) => {
  try {
    const idx = products.findIndex(p => p.id === req.params.id);
    if (idx === -1) return next(new NotFoundError('Product not found'));
    const { name, description, price, category, inStock } = req.body;
    products[idx] = { id: req.params.id, name, description, price, category, inStock };
    res.json(products[idx]);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/products/:id - Delete a product
router.delete('/:id', (req, res, next) => {
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return next(new NotFoundError('Product not found'));
  const deleted = products.splice(idx, 1);
  res.json({ message: 'Product deleted', product: deleted[0] });
});

// GET /api/products/search?name=... - Search products by name
router.get('/search', (req, res) => {
  const { name } = req.query;
  if (!name) return res.status(400).json({ error: 'Name query required' });
  const result = products.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
  res.json(result);
});

// GET /api/products/stats - Product statistics (count by category)
router.get('/stats', (req, res) => {
  const stats = {};
  for (const p of products) {
    stats[p.category] = (stats[p.category] || 0) + 1;
  }
  res.json(stats);
});

module.exports = router; 