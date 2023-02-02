const express =require('express');
const router = express.Router();

const {list,detail, add, edit, store} = require('../controllers/courseController');

/* /courses */

router
    .get('/list',list)
    .get('/detail/:id',detail)
    .get('/add',add)
    .post("/add", store)
    .get('/edit/:id',edit)
    

module.exports = router;