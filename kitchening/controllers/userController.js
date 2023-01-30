module.exports = {
    register : (req,res) => {
        return res.render('users/register',{
            title : "Registro de Usuario"
        })
    },
    login : (req,res) => {
        return res.render('users/login',{
            title : "Iniciar Sesión"
        })
    },
    profile : (req,res) => {
        return res.render('users/profile',{
            title : "Perfil de usuario"
        })
    }
}