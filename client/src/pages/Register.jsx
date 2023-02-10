import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "../components/Alert";
import { clientAxios } from "../config/clientAxios";
import { useForm } from "../hooks/useForm";
import Swal from "sweetalert2";

const exRegEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}/;

export const Register = () => {

    const [alert, setAlert] = useState({});
    const [sending, setSending] = useState(false);

    const {formValues, handleInputChange, reset} = useForm({
        name : "",
        email : "",
        password : "",
        password2 : "",
    })

    const {name, email, password, password2} = formValues;

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(formValues);

        if ([name, email, password, password2].includes("")) {
            handleShowAlert("Todos los campos son obligatorios");
            return null
        }

        if (!exRegEmail.test(email)) {
            handleShowAlert("El email tiene un formato invalido");
            return null
        }

        if (password !== password2) {
            handleShowAlert("Las contraseñas no coinciden");
            return null
        }

        try {

            setSending(true)

            const { data } = await clientAxios.post("/auth/register", {
                name,
                email,
                password
            })

            setSending(false)

            Swal.fire({
                icon : 'info',
                title : 'Gracias por registrarte!',
                text : data.msg,
            })

            reset()

        } catch (error) {
            console.log(error);
            handleShowAlert(error.response?.data.msg);
            reset()
        }
    }

    const handleShowAlert = (msg) => {
        setAlert({
            msg
        })

        setTimeout(() => {
            setAlert({})
        }, 3000);
    }

    return (
        <>
            {
                alert.msg && <Alert {...alert}/>
            }
            <form action="" onSubmit={handleSubmit} noValidate className="my-8 p-8 bg-stone-200 rounded-lg border shadow-lg">
                <h1 className="text-orange-500 text-center font-black text-3xl capitalize">Creá tu cuenta</h1>
                <div className="my-5">
                    <label htmlFor="name" className="text-gray-500 block font-bold uppercase">Nombre</label>
                    <input id="name" type="text" placeholder="Ingresá tu nombre" value={name} name="name" onChange={handleInputChange} className="w-full mt-3 p-3 border rounded-full" />
                </div>
                <div className="my-5">
                    <label htmlFor="email" className="text-gray-500 block font-bold uppercase">Correo electrónico</label>
                    <input id="email" type="email" placeholder="Ingresá un email" value={email} name="email" onChange={handleInputChange} className="w-full mt-3 p-3 border rounded-full" />
                </div>
                <div className="my-5">
                    <label htmlFor="password" className="text-gray-500 block font-bold uppercase">Contraseña</label>
                    <input id="password" type="password" placeholder="Ingrese su contraseña" value={password} name="password" onChange={handleInputChange} className="w-full mt-3 p-3 border rounded-full" />
                </div>
                <div className="my-5">
                    <label htmlFor="password2" className="text-gray-500 block font-bold uppercase">Confirma tu contraseña</label>
                    <input id="password2" type="password" placeholder="Ingrese su contraseña" value={password2} name="password2" onChange={handleInputChange} className="w-full mt-3 p-3 border rounded-full" />
                </div>
                <button type="submit" disabled={sending} className="bg-orange-500 w-full py-3 mt-2 text-white uppercase font-sans rounded-full hover:bg-orange-600 transition-colors disabled:bg-orange-300">Crear cuenta</button>
                <nav className="mt-5 md:flex md:justify-between">
                    <Link to={"/"} className="text-orange-600 block text-center my-3 text-sm uppercase hover:underline">¿Estás registrado? Iniciá sesión</Link>
                    <Link to={"/forget-password"} className="text-orange-600 block text-center my-3 text-sm uppercase hover:underline">Olvidé mi password</Link>
                </nav>
            </form>
        </>
    )
}