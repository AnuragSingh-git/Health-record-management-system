import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {

    const [name, setname] = useState("");
    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [age, setage] = useState(0);
    const [role, setrole] = useState("patient");

    const [loading, setloading] = useState(false);
    const [message, setmessage] = useState("");
    const [success, setsuccess] = useState(false);

    const navigate = useNavigate();

    const handlesubmit = async (e) => {

        e.preventDefault();

        setloading(true);
        setmessage("");

        try {

            await api.post("/api/auth/register", {
                name,
                username,
                email,
                password,
                age,
                role,
            });

            setsuccess(true);
            setmessage("Registration Successful!");

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        }

        catch (err) {

            setsuccess(false);

            setmessage(
                err.response?.data?.message ||
                "Registration Failed!"
            );

            setloading(false);

        }

    };

    return (

        <div className='min-h-screen bg-[url("https://images.unsplash.com/photo-1641160923894-b1a80920187d?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")] bg-cover bg-center flex items-center justify-center p-8 relative'>

            {
                loading && (

                    <div className='absolute inset-0 bg-[url("https://images.unsplash.com/photo-1641160923894-b1a80920187d?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")] bg-cover bg-center flex items-center justify-center z-50'>

                        <div className="bg-white/80 backdrop-blur-lg rounded-3xl px-10 py-8 flex flex-col items-center shadow-2xl">

                            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

                            <div className="mt-5 text-center">

                                <p className="text-xl font-semibold text-blue-700">

                                    {success ? "Registration Successful!" : "Creating Account..."}

                                </p>

                                {!success && (

                                    <p className="mt-3 text-sm text-gray-600 max-w-sm leading-6">

                                        This app is hosted on a free <span className="font-semibold">Render</span> server.
                                        If the server is sleeping, creating your account may take
                                        <span className="font-semibold"> 30–60 seconds </span>
                                        while the server wakes up. Please keep this page open and wait.

                                    </p>

                                )}

                            </div>

                        </div>

                    </div>

                )
            }

            <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-lg p-10">

                <div className="text-center mb-8">

                    <h1 className="text-4xl font-bold text-blue-600">
                        MediCare
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Create your healthcare account
                    </p>

                </div>

                {
                    message && (

                        <div
                            className={`mb-5 p-3 rounded-xl text-center font-semibold ${success
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                        >

                            {message}

                        </div>

                    )
                }

                <form
                    onSubmit={handlesubmit}
                    className="flex flex-col gap-5"
                >

                    <input
                        onChange={(e) => setname(e.target.value)}
                        className="border rounded-2xl h-14 px-5 outline-none focus:ring-2 focus:ring-blue-400"
                        type="text"
                        placeholder="Full Name"
                        required
                    />

                    <input
                        onChange={(e) => setusername(e.target.value)}
                        className="border rounded-2xl h-14 px-5 outline-none focus:ring-2 focus:ring-blue-400"
                        type="text"
                        placeholder="Username"
                        required
                    />

                    <input
                        onChange={(e) => setemail(e.target.value)}
                        className="border rounded-2xl h-14 px-5 outline-none focus:ring-2 focus:ring-blue-400"
                        type="email"
                        placeholder="Email Address"
                        required
                    />

                    <input
                        onChange={(e) => setage(Number(e.target.value))}
                        className="border rounded-2xl h-14 px-5 outline-none focus:ring-2 focus:ring-blue-400"
                        type="number"
                        placeholder="Age"
                        required
                    />

                    <select
                        value={role}
                        onChange={(e) => setrole(e.target.value)}
                        className="border rounded-2xl h-14 px-5 outline-none focus:ring-2 focus:ring-blue-400"
                    >

                        <option value="patient">
                            Patient
                        </option>

                        <option value="doctor">
                            Doctor
                        </option>

                    </select>

                    <input
                        onChange={(e) => setpassword(e.target.value)}
                        className="border rounded-2xl h-14 px-5 outline-none focus:ring-2 focus:ring-blue-400"
                        type="password"
                        placeholder="Password"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white h-14 rounded-2xl hover:bg-blue-700 transition disabled:bg-blue-400"
                    >

                        {loading ? "Please Wait..." : "Create Account"}

                    </button>

                </form>

                <div className="text-center mt-8">

                    <p className="text-gray-500">

                        Already have an account?

                        <button
                            onClick={() => navigate("/login")}
                            className="ml-2 text-blue-600 font-semibold hover:underline"
                        >

                            Login

                        </button>

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Register;