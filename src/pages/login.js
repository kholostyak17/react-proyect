import React from "react";
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { LoginUserAction } from "../redux/actions";
import { browserRouterRef } from "../App";
import MyNavbar from "../components/my-navbar";

const Login = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);

    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        const userAccount = users.find(element => element.email === data.email);
        console.log({users:users, formData:data, userAccount: data});
        if (userAccount && data.password === userAccount.password) {
            localStorage.setItem("name", userAccount.name);
            localStorage.setItem("email", userAccount.email);
            localStorage.setItem("signedIn", true);
            browserRouterRef.current.history.replace("/wallet");

        }
        else {
            alert("Usuario no encontrado / Credenciales incorrectas")
        }
    };

    return (<>
        <MyNavbar />
        <div className="div-login">
            <h3 className="primary-color">Iniciar sesión</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="div-login-form mb-3">
                    <label htmlFor="email" className="form-label mt-3">Correo electrónico</label>
                    <input {...register("email")} type="email" name="email" className="form-control" id="email" />
                    <label htmlFor="password" className="form-label mt-3">Contraseña</label>
                    <input {...register("password")} type="password" name="password" className="form-control" id="password" />
                </div>
                <input type="submit" value="Acceder" className="button-green" />
            </form>
            <p>¿No tienes cuenta? <Link to="register"><span className="primary-color">Regístrate</span></Link></p>
        </div>
    </>);
};

export default Login;