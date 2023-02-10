module.exports = {
    profile: async (req,res) => {
        try {
            return res.status(200).json({
                ok : true,
                msg : "Perfil de Usuario",
                user : req.user
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message || "Upss, hubo un error en PERFIL"
            })
        }
    }
}