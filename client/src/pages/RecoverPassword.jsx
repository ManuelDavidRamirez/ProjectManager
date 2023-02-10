import { useEffect ,useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { clientAxios } from "../config/clientAxios";
import { Alert } from "../components/Alert";
import Swal from "sweetalert2";

export const RecoverPassword = () => {

    const [alert, setAlert] = useState({});
    const [password, setPassword] = useState("");
    const [tokenChecked, setTokenChecked] = useState(false);

    const {token} = useParams();
    const navigate = useNavigate();

    const handleShowAlert = (msg) => {
        setAlert({
            msg
        })

        setTimeout(() => {
            setAlert({})
        }, 3000);
    }

    useEffect(() => {
        const checkToken = async () => {
            try {
                const {data} = await clientAxios.get(`/auth/reset-password?token=${token}`)
                console.log(data.msg);
                setTokenChecked(true)
            } catch (error) {
                console.error(error);
                handleShowAlert(error.response?.data.msg)
            }
        }
        checkToken()
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password) {
            handleShowAlert("El password es requerido")
            return null
        }

        try {
            const {data} = await clientAxios.post(`/auth/reset-password?token=${token}`, {
                password
            })
    
            Swal.fire({
                icon : "info",
                title : "Contraseña reseteada!",
                text : data.msg,
                confirmButtonText : "Iniciá sesión",
                allowOutsideClick : false
            }).then(result => {
                if (result.isConfirmed) {
                    setPassword("");
                    navigate("/")
                }
            })
        } catch (error) {
            console.error(error);
            handleShowAlert(error.response?.data.msg)
            setPassword("");
        }
    }

    return (
        <>
            {
                alert.msg && <Alert {...alert} />
            }
            {
                tokenChecked ?
                (
                    <form onSubmit={handleSubmit} className="my-10 p-8 bg-stone-100 rounder-lg border shadow-lg" noValidate>
                        <h1 className="text-orange-500 font-black text-center text-3xl capitalize">Reestrablecé tu contraseña</h1>
                        <div className="my-7">
                            <label htmlFor="password" className="text-gray-400 block font-bold uppercase">Nueva contraseña</label>
                            <input id="password" type="password" placeholder="Escribí tu nueva contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mt-3 p-3 border rounded" />
                        </div>
                        <button type="submit" className="bg-orange-500 w-full py-3 text-white uppercase font-sans rounded-full hover:bg-orange-600 transition-colors mb-2">Resetear contraseña</button>
                    </form>
                ) :
                    <nav className="md:flex md:justify-between">
                        <Link to={"/register"} className="text-orange-600 block text-center my-3 text-sm uppercase">¿No tenés una cuenta? Registrate</Link>
                        <Link to={"/"} className="text-orange-600 block text-center my-3 text-sm uppercase">¿Estás registrado? Iniciá sesión</Link>
                    </nav>
            }
        </>
    )
}