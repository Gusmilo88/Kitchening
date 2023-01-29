const courses = require('../data/courses.json')
module.exports={
    home : (req, res) => {
     return res.render('home', {
     title : "Kitchening | HOME",
     courses
    });
    }
    
}