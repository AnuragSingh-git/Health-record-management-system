import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [age, setage] = useState("");
    const [role, setrole] = useState("patient");

    const navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();

        try {

            await api.post("/api/auth/register", {
                name,
                email,
                password,
                age,
                role,
            });

            navigate("/");

        } catch (err) {
            console.log(err.response?.data || err.message);
        }
    };

    return (

        <div className='min-h-screen bg-[url("https://images.unsplash.com/photo-1641160923894-b1a80920187d?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")] bg-cover bg-center flex items-center justify-center p-8'>

            <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-lg p-10">

                <div className="text-center mb-8">

                    <h1 className="text-4xl font-bold text-blue-600">
                        MediCare
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Create your healthcare account
                    </p>

                </div>

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
                        className="bg-blue-600 text-white h-14 rounded-2xl hover:bg-blue-700 transition"
                    >
                        Create Account
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
