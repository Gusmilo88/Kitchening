const fs = require("fs");
const courses = require("../data/courses.json");
const chefs = require("../data/chefs.json");
const chefsSorts = chefs.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)


module.exports = {
  list: (req, res) => {
    return res.render("courses/list",{
      title : "listado de cursos",
      courses : courses.filter(course => course.visible)
    });
  },
  detail: (req, res) => {
    const { id } = req.params;

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
    // voy a guardar la info del curso

    const {title, precio, description, section, chef, visible, } = req.body;

    const newCourse = {
        id : courses[courses.length - 1].id + 1,
        title : title.trim(),
        precio : +precio,
        description : description.trim(),
        image : null,
        chef,
        sale : section === "sale" && true,
        newest : section === "newest" && true,
        free : section === "free" && true,
        visible : visible ? true : false,
    }

    courses.push(newCourse);

    fs.writeFileSync("./data/courses.json", JSON.stringify(courses, null, 3), "utf-8")

    return res.redirect("/courses/list");
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
    
    return res.send(req.body)
  }
};
