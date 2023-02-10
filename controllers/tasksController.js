module.exports = {
    list: async (req,res) => {
        try {
            return res.status(200).json({
                ok : true,
                msg : "Lista de Tareas"
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message || "Upss, hubo un error en TASKS-LIST"
            })
        }
    },
    store: async (req,res) => {
        try {
            return res.status(201).json({
                ok : true,
                msg : "Tarea guardada"
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message || "Upss, hubo un error en STORE-TASK"
            })
        }
    },
    detail: async (req,res) => {
        try {
            return res.status(200).json({
                ok : true,
                msg : "Detalle de la Tarea"
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message || "Upss, hubo un error en TASK-DETAIL"
            })
        }
    },
    update: async (req,res) => {
        try {
            return res.status(201).json({
                ok : true,
                msg : "Tarea actualizada"
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message || "Upss, hubo un error en TASK-UPDATE"
            })
        }
    },
    remove: async (req,res) => {
        try {
            return res.status(200).json({
                ok : true,
                msg : "Tarea eliminada"
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message || "Upss, hubo un error en TASK-REMOVE"
            })
        }
    },
    changeState: async (req,res) => {
        try {
            return res.status(200).json({
                ok : true,
                msg : "Tarea completada"
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message || "Upss, hubo un error en CHANGE-STATE"
            })
        }
    },
}