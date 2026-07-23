import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export const PatientDashboard = () => {

  const [User, setUser] = useState({});
  const [gotrequests, setgotrequests] = useState([]);
  const [showRequests, setShowRequests] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {

    const fetchUser = async () => {

      try {

        const userdata =
          await api.get(
            "/api/auth/getuser"
          );

        if (!userdata) {
          return;
        }

        setUser(
          userdata.data.user
        );

      }

      catch (error) {

        console.log(
          error.response?.data ||
          error.message
        );

      }

    };

    fetchUser();

  }, []);

  const permissionhandle = async () => {

    try {

      const response =
        await api.get(
          "/api/request/getrequests"
        );

      setgotrequests(
        response.data.requestgot
      );

      setShowRequests(
        prev => !prev
      );

    }

    catch (error) {

      setShowRequests(
        prev => !prev
      );

      console.log(
        error.response?.data ||
        error.message
      );

    }

  };

  const givepermissionhandle =
    async (doctorid) => {

      try {

        await api.post(
          "/api/request/permission",
          {
            doctorid,
          }
        );

        setgotrequests(prev =>
          prev.map(req =>
            req.doctorid._id === doctorid
              ? {
                ...req,
                status:
                  "approved",
              }
              : req
          )
        );

      }

      catch (err) {

        console.log(
          err.response?.data ||
          err.message
        );

      }

    };

  const revokepermissionhandle =
    async (doctorid) => {

      try {

        await api.post(
          "/api/request/revokepermission",
          {
            doctorid,
          }
        );

        setgotrequests(prev =>
          prev.map(req =>
            req.doctorid._id === doctorid
              ? {
                ...req,
                status:
                  "rejected",
              }
              : req
          )
        );

      }

      catch (err) {

        console.log(
          err.response?.data ||
          err.message
        );

      }

    };

  const deletepermissionhandle =
    async (doctorid) => {

      try {

        await api.delete(
          "/api/request/deletepermission",
          {
            data: {
              doctorid,
            },
          }
        );

        setgotrequests(
          prev =>
            prev.filter(
              req =>
                req.doctorid._id !==
                doctorid
            )
        );

      }

      catch (err) {

        console.log(
          err.response?.data ||
          err.message
        );

      }

    };

  const getrecords = () => {
    navigate("/recordpatient");
  };

  return (

    <div className="min-h-screen bg-sky-500 p-6">

      <div className="bg-stone-50 rounded-3xl shadow-2xl min-h-[92vh] p-10">

        <div className="flex justify-between items-center mb-10 px-2">

          <div className="text-3xl font-bold text-gray-800">
            Medi<span className="text-blue-600">Care</span>
          </div>

          <div className="text-sm text-gray-500">
            Patient Dashboard
          </div>

        </div>

        <div className="bg-white rounded-3xl p-12 shadow mb-10 flex flex-col items-center text-center">

          <span className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-4">
            Welcome Back
          </span>

          <h1 className="text-5xl font-bold text-gray-800">
            {User.name}
          </h1>

          <p className="mt-5 text-lg text-gray-600 max-w-xl">
            Manage your healthcare records and control doctor access.
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">

          <div className="bg-white rounded-3xl p-8 shadow hover:shadow-lg transition">

            <div className="text-5xl mb-5">
              📁
            </div>

            <h2 className="text-2xl font-bold mb-4">
              Your Health Records
            </h2>

            <p className="text-gray-500 mb-8">
              Access, upload and manage all healthcare records securely.
            </p>

            <button
              onClick={getrecords}
              className="bg-blue-600 text-white px-8 py-3 rounded-2xl hover:bg-blue-700 transition"
            >
              View Records
            </button>

          </div>

          <div className="bg-white rounded-3xl p-8 shadow hover:shadow-lg transition">

            <div className="text-5xl mb-5">
              🩺
            </div>

            <h2 className="text-2xl font-bold mb-4">
              Doctor Permissions
            </h2>

            <p className="text-gray-500 mb-8">
              Approve or revoke doctor access requests.
            </p>

            <button
              onClick={permissionhandle}
              className="bg-blue-600 text-white px-8 py-3 rounded-2xl hover:bg-blue-700 transition"
            >
              {showRequests ? "Hide Requests" : "Manage Permissions"}
            </button>

          </div>

        </div>

        {showRequests && (

          <div className="bg-white rounded-3xl p-8 shadow mb-10">

            <div className="flex items-center justify-between mb-8">

              <h2 className="text-3xl font-bold">
                Permission Requests
              </h2>

              <div className="bg-blue-50 text-blue-700 px-5 py-2 rounded-full font-semibold">
                {gotrequests.length} {gotrequests.length === 1 ? "Request" : "Requests"}
              </div>

            </div>

            {gotrequests.length === 0 ? (

              <div className="text-center py-20">

                <div className="text-7xl mb-5">
                  📭
                </div>

                <h3 className="text-3xl font-bold">
                  No Requests
                </h3>

                <p className="text-gray-500 mt-3">
                  Doctor requests will appear here
                </p>

              </div>

            ) : (

              <div className="grid gap-5">

                {gotrequests.map((request, index) => (

                  <div
                    key={index}
                    className="bg-blue-50 rounded-3xl border border-blue-100 p-6 hover:shadow-lg transition"
                  >

                    <div className="flex justify-between items-center">

                      <div>

                        <h3 className="text-2xl font-bold">
                          Dr. {request.doctorid.name}
                        </h3>

                        <div
                          className={`mt-4 inline-flex px-5 py-2 rounded-full font-semibold capitalize

${request.status === "approved"
                              ? "bg-green-100 text-green-700"

                              : request.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"

                                : "bg-red-100 text-red-700"
                            }

`}
                        >

                          {request.status}

                        </div>

                      </div>

                      <div className="flex gap-3">

                        {request.status === "pending" && (

                          <button
                            onClick={() =>
                              givepermissionhandle(
                                request.doctorid._id
                              )
                            }
                            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
                          >

                            Allow

                          </button>

                        )}

                        {request.status === "approved" && (

                          <button
                            onClick={() =>
                              revokepermissionhandle(
                                request.doctorid._id
                              )
                            }
                            className="bg-yellow-500 text-white px-6 py-3 rounded-xl hover:bg-yellow-600"
                          >

                            Revoke

                          </button>

                        )}

                        {request.status === "rejected" && (

                          <>

                            <button
                              onClick={() =>
                                givepermissionhandle(
                                  request.doctorid._id
                                )
                              }
                              className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
                            >

                              Allow

                            </button>

                            <button
                              onClick={() =>
                                deletepermissionhandle(
                                  request.doctorid._id
                                )
                              }
                              className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700"
                            >

                              Delete

                            </button>

                          </>

                        )}

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        )}

        <div className="bg-white rounded-3xl p-10 shadow">

          <h2 className="text-2xl font-bold mb-5">
            About This Project
          </h2>

          <p className="text-gray-600 leading-8">

            This MERN based E-Healthcare Record Management System
            focuses on secure and controlled access to medical data.

            Patients upload and manage records while doctors
            request permission before accessing information.

            Authentication details are protected using token based
            authorization stored securely through cookies,
            ensuring user privacy and controlled access.

          </p>

          <p className="mt-6 text-sm text-gray-400 tracking-wide">

            Built using MERN Stack • React • Node • Express • MongoDB • JWT • ImageKit

          </p>

        </div>

      </div>

    </div>

  );

};

export default PatientDashboard;
