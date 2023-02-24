const express =require("express");
const router = express.Router();

const {list,detail, add, edit, store, update, removeConfirm, remove} = require("../controllers/courseController");
const { upLoadcoursesImages } = require("../middleware/upLoad");
const addCourseValidator = require("../validations/addCourseValidator");
const editCourseValidator = require("../validations/editCourseValidator");

/* /courses */

router
    .get("/list",list)
    .get("/detail/:id",detail)
    .get("/add",add)
    .post("/add", upLoadcoursesImages.single('image'), addCourseValidator,store)
    .get("/edit/:id",edit)
    .put("/update/:id", upLoadcoursesImages.single('image'), editCourseValidator, update)
    .get("/remove/:id", removeConfirm)
    .delete("/remove/:id", remove)
    

module.exports = router;