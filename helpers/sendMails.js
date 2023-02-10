const nodemailer = require("nodemailer")

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

module.exports = {
    confirmRegister : async (data) => {
        const {name, email, token} = data;

        try {
            const infoMail = await transport.sendMail({
                from : "Project Manager <info@projectmanager.com>",
                to : email,
                subjet : "Confirma tu cuenta",
                text : "Confirma tu cuenta en Project Manager",
                html : `<p>Hola ${name}, para confirmar tu cuenta haz click en el siguiente enlace<p/>
                <a href="${process.env.URL_FRONTEND}/confirm/${token}">Confirmar mi cuenta</a>`
            })
            console.log(infoMail);
        } catch (error) {
            console.log(error);
        }
    },
    forgotPassword : async (data) => {
        const {name, email, token} = data;

        try {
            const infoMail = await transport.sendMail({
                from : "Project Manager <info@projectmanager.com>",
                to : email,
                subjet : "Reestablecé tu cuenta",
                text : "Reestablecé tu contraseña en Project Manager",
                html : `<p>Hola ${name}, para reestablecer tu contraseña haz click en el siguiente enlace<p/>
                <a href="${process.env.URL_FRONTEND}/recover-password/${token}">Reestablecer mi contraseña</a>`
            })
            console.log(infoMail);
        } catch (error) {
            console.log(error);
        }
    },
}