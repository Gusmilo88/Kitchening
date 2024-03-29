const {validationResult} = require("express-validator")

const fs = require("fs");
const courses = require("../data/courses.json");
const chefs = require("../data/chefs.json");
const chefsSorts = chefs.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)


module.exports = {
  list: (req, res) => {
    const courses = JSON.parse(fs.readFileSync("./data/courses.json", "utf-8"))
    return res.render("courses/list",{
      title : "listado de cursos",
      courses : courses.filter(course => course.visible)
    });
  },
  detail: (req, res) => {
    const { id } = req.params;
    const courses = JSON.parse(fs.readFileSync("./data/courses.json", "utf-8"))
    const course = courses.find(course => course.id === +id);

    return res.render("courses/detail",{
        title : "Detalle del curso",
      ...course,
    });
  },

  add : (req, res) => {
    return res.render("courses/formAdd", {
      chefs : chefsSorts
    })
  },

  store : (req, res) => {

    const errors = validationResult(req)

    if(!req.file){
      errors.errors.push({
        value : "",
        msg : "El producto debe tener una imagen",
        param : "image",
        location : "file"
      })
    }

    if(errors.isEmpty()){
      const {title, price, description, section, chef, visible, } = req.body;

      const newCourse = {
          id : courses[courses.length - 1].id + 1,
          title : title.trim(),
          price : +price,
          description : description.trim(),
          image : req.file ? req.file.filename : null,
          chef,
          sale : section === "sale" && true,
          newest : section === "newest" && true,
          free : section === "free" && true,
          visible : visible ? true : false,
      }
  
      courses.push(newCourse);
  
      fs.writeFileSync("./data/courses.json", JSON.stringify(courses, null, 3), "utf-8")
  
      return res.redirect("/courses/list");
    }else {
      
      if(req.file){
        fs.existsSync(`./public/images/courses/${req.file.filename}`) && fs.unlinkSync(`./public/images/courses/${req.file.filename}`)
      }

      const chefs = require("../data/chefs.json");
      const chefsSorts = chefs.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
      return res.render("courses/formAdd", {
        chefs : chefsSorts,
        errors : errors.mapped(),
        old : req.body
      })

    }

  },

  edit : (req, res) => {
    const { id } = req.params;

    const course = courses.find(course => course.id === +id);
    return res.render("courses/formEdit", {
      ...course,
      chefs: chefsSorts
    })
  },

  update : (req, res) => {
    /* Recibo la info del formulario */
    const errors = validationResult(req);

    if(errors.isEmpty()) {
      const {title, price, description, section, chef, visible} = req.body;
    
      const id = +req.params.id;
  
      // Recupero los datos del curso
      const course = courses.find(course => course.id === +id);
  
      /* Guardo en un objeto la información modificada */
      const courseUpdated = {
        id,
        title : title.trim(),
        price : +price,
        description : description.trim(),
        image : course.image,
        chef,
        sale : section === "sale" && true,
        newest : section === "newest" && true,
        free : section === "free" && true,
        visible : visible ? true : false,
    }
      /* Actualizar mi array de cursos */
      const coursesModified = courses.map(course => {
        if(course.id === +id){
          return courseUpdated
        }
        return course
      });
  
      /* Guardar los cambios */
  
      fs.writeFileSync("./data/courses.json", JSON.stringify(coursesModified, null, 3), "utf-8")
  
      return res.redirect(`/courses/detail/${id}`)
    } else {
      const { id } = req.params;

      const course = courses.find(course => course.id === +id);
      return res.render("courses/formEdit", {
      ...course,
      chefs: chefsSorts,
      errors : errors.mapped(),
      old : req.body
    })
    }

  },

  removeConfirm : (req, res) => {
    const id = req.params.id;
    const course = courses.find(course => course.id === +id);

    return res.render("courses/confirmRemove", {
      ...course
    })
  },

  remove : (req, res) => {
    const id = req.params.id;
    const coursesModified = courses.filter(course => course.id !== +id); 

    // Guardar los cambios
    fs.writeFileSync("./data/courses.json", JSON.stringify(coursesModified, null, 3), "utf-8")
    return res.redirect(`/courses/list`)
  }
};
