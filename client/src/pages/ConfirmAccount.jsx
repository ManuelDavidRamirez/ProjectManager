import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { clientAxios } from "../config/clientAxios";
import Swal from "sweetalert2";
import { Alert } from "../components/Alert";

export const ConfirmAccount = () => {

    const { token } = useParams();
    const navigate = useNavigate()
    const [alert, setAlert] = useState({});

    const handleShowAlert = (msg) => {
        setAlert({
            msg
        })
    }

    useEffect(() => {
        const confirmAccount = async () => {
            try {
                const {data} = await clientAxios.get(`/auth/checked?token=${token}`)
                Swal.fire({
                    icon : "info",
                    title : "Tu cuenta ha sido confirmada con exito",
                    text : data.msg,
                    confirmButtonText : "Iniciar Sesión",
                    allowOutsideClick : false
                }).then(result => {
                    if (result.isConfirmed) {
                        navigate("/")
                    }
                })
            } catch (error) {
                console.error(error);
                handleShowAlert(error.response?.data.msg)
            }
        }
        confirmAccount();
    }, []);

    return (
        <>
            <h1 className="text-orange-500 font-black text-3xl capitalize">Confirma tu cuenta</h1>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded bg-white">
                {
                    alert.msg && (
                        <>
                            <Alert {...alert} />
                            <nav className="md:flex md:justify-between">
                                <Link to={"/register"} className="text-sky-700 block text-center my-3 text-sm uppercase hover:underline">¿No tenés una cuenta? Registrate</Link>
                                <Link to={"/"} className="text-sky-700 block text-center my-3 text-sm uppercase hover:underline">¿Estás registrado? Iniciá sesión</Link>
                            </nav>
                        </>
                    )
                }
            </div>
        </>
    )
}