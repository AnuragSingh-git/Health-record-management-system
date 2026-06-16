import React from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-sky-500 p-6">

            <div className="bg-stone-50 rounded-3xl min-h-[95vh] shadow-2xl">

                <nav className="flex justify-between items-center p-8">

                    <div className="text-4xl font-bold text-blue-600">
                        MediCare
                    </div>

                    <div className="flex gap-4">

                        <button
                            onClick={() => navigate("/login")}
                            className="px-6 py-3 rounded-xl border border-blue-500 text-blue-600 hover:bg-blue-50"
                        >
                            Login
                        </button>

                        <button
                            onClick={() => navigate("/register")}
                            className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Register
                        </button>

                    </div>

                </nav>

                <section className="flex flex-col items-center text-center px-10 py-20">

                    <h1 className="text-6xl font-bold text-gray-800 max-w-5xl">
                        E-Healthcare Record Management System
                    </h1>

                    <p className="mt-8 text-xl text-gray-600 max-w-3xl">
                        Securely manage healthcare records while giving patients
                        full control over who can access their medical data.
                    </p>

                    <div className="mt-10 flex gap-6">

                        <button
                            onClick={() => navigate("/login")}
                            className="bg-blue-600 text-white px-10 py-4 rounded-2xl hover:bg-blue-700"
                        >
                            Get Started
                        </button>

                        <button
                            onClick={() => navigate("/register")}
                            className="border px-10 py-4 rounded-2xl hover:bg-gray-100"
                        >
                            Create Account
                        </button>

                    </div>

                </section>

                <section className="px-14 pb-20">

                    <h2 className="text-4xl font-bold text-center mb-12">
                        How It Works
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">

                        <div className="bg-white rounded-3xl p-8 shadow">

                            <div className="text-5xl mb-5">
                                🩺
                            </div>

                            <h3 className="text-2xl font-bold mb-4">
                                Doctor Request Access
                            </h3>

                            <p className="text-gray-600">
                                Doctors can send requests to patients to access
                                their healthcare records.
                            </p>

                        </div>

                        <div className="bg-white rounded-3xl p-8 shadow">

                            <div className="text-5xl mb-5">
                                ✅
                            </div>

                            <h3 className="text-2xl font-bold mb-4">
                                Patient Approval
                            </h3>

                            <p className="text-gray-600">
                                Patients decide whether to approve,
                                reject, or keep requests pending directly
                                from their dashboard.
                            </p>

                        </div>

                        <div className="bg-white rounded-3xl p-8 shadow">

                            <div className="text-5xl mb-5">
                                📁
                            </div>

                            <h3 className="text-2xl font-bold mb-4">
                                Record Access
                            </h3>

                            <p className="text-gray-600">
                                Once approved, doctors can securely
                                view uploaded healthcare records.
                            </p>

                        </div>

                    </div>

                </section>

                <section className="px-14 pb-20">

                    <h2 className="text-4xl font-bold text-center mb-12">
                        Core Features
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">

                        <div className="bg-blue-50 rounded-3xl p-8">

                            <h3 className="text-2xl font-bold mb-5">
                                Patient Dashboard
                            </h3>

                            <ul className="space-y-3 text-gray-700">

                                <li>• Upload healthcare records</li>
                                <li>• Manage doctor requests</li>
                                <li>• View access history</li>
                                <li>• Control permissions</li>

                            </ul>

                        </div>

                        <div className="bg-blue-50 rounded-3xl p-8">

                            <h3 className="text-2xl font-bold mb-5">
                                Security & Authentication
                            </h3>

                            <ul className="space-y-3 text-gray-700">

                                <li>• JWT token authentication</li>
                                <li>• Secure cookie storage</li>
                                <li>• Protected dashboard routes</li>
                                <li>• Controlled record access</li>

                            </ul>

                        </div>

                    </div>

                </section>

                <section className="px-14 pb-20">

                    <div className="bg-white rounded-3xl p-12 shadow">

                        <h2 className="text-4xl font-bold mb-8">
                            About Project
                        </h2>

                        <p className="text-lg text-gray-600 leading-9">

                            This MERN based E-Healthcare Record Management System
                            focuses on secure and controlled access to medical data.

                            Patients upload and manage records while doctors
                            request permission before accessing information.

                            Authentication details are protected using token based
                            authorization stored securely through cookies,
                            ensuring user privacy and controlled access.

                        </p>

                    </div>

                </section>

                <footer className="text-center pb-10 text-gray-500">

                    Built using MERN Stack • React • Node • Express • MongoDB • JWT • ImageKit

                </footer>

            </div>

        </div>
    );
};
