const express = require('express');
const { detail,list,category } = require('../controllers/coursesController');
const router = express.Router();

/* /courses */
router
    .get('/detail/:id', detail)
    .get('/list', list)
    .get('/category/:idCategory', category)

module.exports = router;