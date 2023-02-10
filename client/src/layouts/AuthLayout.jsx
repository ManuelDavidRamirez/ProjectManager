import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const AuthLayout = () => {

    const {auth, loading} = useAuth();

    if (loading) {
        return <p>Cargando...</p>
    }

    return (
        <>
        {
            !auth._id ? (
                <main className="container mx-auto mt-5 md:mt-10 p-5 md:flex md:justify-center">
                    <div className="md:w-2/3 lg:w-2/5">
                        <Outlet />
                    </div>
                </main>
            ) : <Navigate to={"projects"} />
        }
        </>
    )
}