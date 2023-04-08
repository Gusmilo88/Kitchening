const courses = require('../data/courses.json');
const {Op} = require("sequelize");
const db = require("../database/models");

module.exports = {
    home : (req, res) => {
        /* toda la lógica!!! */
        const newCourses = db.Course.findAll({
            order : [["createdAt", "DESC"]],
            limit : 4,
            include :  ["images"]
        });

        const saleCourses = db.Course.findAll({
          where : {
              discount : {
                [Op.ne] : 0,
              },
          },
          include :  ["images"]
        });

        const courses = db.Course.findAll({
          include :  ["images"],
        });

        Promise.all([newCourses, saleCourses, courses])
          .then(([newCourses, saleCourses, courses]) => {
            return res.render('home',{
              title : "Kitchening | HOME",
              courses,
              newCourses,
              saleCourses
            });
          }) // Recibe un callback, por eso va dentro de otro parentesis. 
          .catch(error => console.log(error))
        
      },
    admin : (req,res) => {
      return res.render('dashboard',{
        courses
      })
    }
}