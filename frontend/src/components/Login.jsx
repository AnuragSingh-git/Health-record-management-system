import React, { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";

function Login() {

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const navigate = useNavigate();

    const handlesubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post(
                "/api/auth/login",
                {
                    email,
                    password,
                }
            );

            if (response.data.user.role === "doctor") {
                navigate("/DoctorDashboard");
            }

            else if (response.data.user.role === "patient") {
                navigate("/PatientDashboard");
            }

        }

        catch (err) {
            console.log(
                err.response?.data ||
                err.message
            );
        }

    };

    return (

        <div className='min-h-screen bg-[url("https://images.unsplash.com/photo-1641160923894-b1a80920187d?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")] bg-cover bg-center flex items-center justify-center p-8'>

            <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-md p-10">

                <div className="text-center mb-8">

                    <h1 className="text-4xl font-bold text-blue-600">
                        MediCare
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Login to continue
                    </p>

                </div>

                <form
                    onSubmit={handlesubmit}
                    className="flex flex-col gap-5"
                >

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        className="h-14 rounded-2xl border px-5 outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        className="h-14 rounded-2xl border px-5 outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <button
                        type="submit"
                        className="bg-blue-600 text-white h-14 rounded-2xl hover:bg-blue-700 transition"
                    >

                        Login

                    </button>

                </form>

                <div className="text-center mt-8">

                    <p className="text-gray-500">

                        Don't have an account?

                        <Link
                            to="/register"
                            className="ml-2 text-blue-600 font-semibold hover:underline"
                        >

                            Register

                        </Link>

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Login;
