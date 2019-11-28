const path = require('path');

const express = require('express');

const adminController = require('../public/controller/admin');

const router = express.Router();


// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/product => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

exports.routes = router;
