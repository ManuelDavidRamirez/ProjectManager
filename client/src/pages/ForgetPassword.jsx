import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "../components/Alert";
import { clientAxios } from "../config/clientAxios";
import Swal from "sweetalert2";

export const ForgetPassword = () => {

    const [alert, setAlert] = useState({});
    const [email, setEmail] = useState("");
    const [sending, setSending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            handleShowAlert("El email es requerido");
            return null
        };

        try {
            setSending(true)
            const {data} = await clientAxios.post("/auth/send-token", {
                email
            })
            setSending(false)

            Swal.fire({
                icon : "info",
                title : "Revisá tu correo!",
                text : data.msg,
                confirmButtonText : "Entendido",
                allowOutsideClick : false
            });
            setEmail("");
        } catch (error) {
            handleShowAlert(error.respose?.data.msg)
            setEmail("");
        }
    }

    const handleShowAlert = (msg) => {
        setAlert({
            msg
        });

        setTimeout(() => {
            setAlert({});
        }, 3000)
    }

    return (
        <>
            {
                alert.msg && <Alert {...alert} />
            }
            <form onSubmit={handleSubmit} className="my-8 p-8 bg-stone-200 rounded-lg border shadow-lg" noValidate>
                <h1 className="text-orange-500 font-black text-center text-3xl capitalize">Recupera tu acceso</h1>
                <div className="my-5">
                    <label htmlFor="email" className="text-gray-500 block font-bold uppercase">Correo electrónico</label>
                    <input id="email" type="email" placeholder="Ingresa un email" className="w-full mt-3 p-3 border rounded-full" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <button type="submit" disabled={sending} className="bg-orange-500 w-full py-3 text-white uppercase font-sans rounded-full hover:bg-orange-600 transition-colors">Recuperar contraseña</button>
                <nav className="mt-5 md:flex md:justify-between">
                    <Link to={"/register"} className="text-orange-600 block text-center my-3 text-sm uppercase hover:underline">¿No tenés una cuenta? Registrate</Link>
                    <Link to={"/"} className="text-orange-600 block text-center my-3 text-sm uppercase hover:underline">¿Ya estás registrados? Iniciá sesión</Link>
                </nav>
            </form>
        </>
    )
}