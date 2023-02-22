const express =require("express");
const router = express.Router();

const {list,detail, add, edit, store, update, removeConfirm, remove} = require("../controllers/courseController");
const { upLoadcoursesImages } = require("../middleware/upLoad");

/* /courses */

router
    .get("/list",list)
    .get("/detail/:id",detail)
    .get("/add",add)
    .post("/add", upLoadcoursesImages.single('images'), store)
    .get("/edit/:id",edit)
    .put("/update/:id", update)
    .get("/remove/:id", removeConfirm)
    .delete("/remove/:id", remove)
    

module.exports = router;