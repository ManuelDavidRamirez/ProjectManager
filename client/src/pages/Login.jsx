import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { Alert } from "../components/Alert";
import { clientAxios } from "../config/clientAxios";
import useAuth from "../hooks/useAuth";

export const Login = () => {

    const [alert, setAlert] = useState({});
    const {setAuth} = useAuth();
    const navigate = useNavigate();

    const handleShowAlert = (msg, time = true) => {
        setAlert({
            msg
        })

        if (time) {
            setTimeout(() => {
                setAlert({})
            }, 3000);
        }
        reset()
    }

    const {formValues, handleInputChange, reset} = useForm({
        email : "",
        password : "",
    })

    const {email,password} = formValues;

    const handleSubmit = async (e) => {
        e.preventDefault()

        if ([email, password].includes("")) {
            handleShowAlert("Todos los campos son obligatorios");
            return null
        }

        try {
            const {data} = await clientAxios.post("/auth/login",{
                email,
                password
            })
            // console.log(data);

            setAuth(data.user);
            sessionStorage.setItem("token", data.token)

            navigate("/projects")

        } catch (error) {
            console.error(error);
            handleShowAlert(error.response?.data.msg)
        }
    }

    return (
        <>
            {
                alert.msg && <Alert {...alert} />
            }
            <form onSubmit={handleSubmit} className="my-8 p-8 bg-stone-200 rounded-lg border shadow-lg" noValidate>
                <h1 className="text-orange-500 text-center font-black text-3xl capitalize">Iniciar sesión</h1>
                <div className="my-5">
                    <label htmlFor="email" className="text-gray-500 block font-bold uppercase">Correo electrónico</label>
                    <input id= "email" type="email" placeholder="Ingrese un email" className="w-full mt-3 p-3 border rounded-full" autoComplete="off" name="email" value={email} onChange={handleInputChange} />
                </div>
                <div className="my-5">
                    <label htmlFor="password" className="text-gray-500 block font-bold uppercase">Contraseña</label>
                    <input id="password" type="password" placeholder="Ingrese su contraseña" className="w-full mt-3 p-3 border rounded-full" name="password" value={password} onChange={handleInputChange} />
                </div>
                <button type="submit" className="bg-orange-500 w-full py-3 text-white uppercase font-sans rounded-full hover:bg-orange-600 transition-colors">Iniciar sessión</button>
                <nav className="mt-5 md:flex md:justify-between">
                    <Link to={"/register"} className="text-orange-600 block text-center my-3 text-sm uppercase hover:underline">¿No tenés una cuenta? Registrate</Link>
                    <Link to={"/forget-password"} className="text-orange-600 block text-center my-3 text-sm uppercase hover:underline">Olvide mi password</Link>
                </nav>
            </form>
        </>
    )
}