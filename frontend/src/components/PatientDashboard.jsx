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

    <div className="min-h-screen bg-slate-100 p-6">

      <div className="bg-white rounded-3xl shadow-xl ring-1 ring-slate-900/5 min-h-[92vh] p-10">

        <div className="bg-gradient-to-br flex flex-col from-teal-700 via-teal-600 to-slate-800 rounded-3xl p-10 text-white mb-10 items-center justify-center text-center shadow-lg">

          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-teal-200 mb-3">
            Patient Portal
          </span>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Welcome back, {User.name}
          </h1>

          <p className="mt-4 text-base md:text-lg text-teal-50/80 max-w-xl">
            Manage your healthcare records and control doctor access.
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">

          <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-slate-200 hover:shadow-md hover:ring-teal-200 transition-all duration-200">

            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-teal-50 text-2xl mb-6">
              📁
            </div>

            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Your Health Records
            </h2>

            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              Access, upload and manage all healthcare records securely.
            </p>

            <button
              onClick={getrecords}
              className="bg-teal-700 text-white px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-teal-800 active:scale-[0.98] transition-all duration-150"
            >
              View Records
            </button>

          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-slate-200 hover:shadow-md hover:ring-slate-300 transition-all duration-200">

            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-slate-100 text-2xl mb-6">
              🩺
            </div>

            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Doctor Permissions
            </h2>

            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              Approve or revoke doctor access requests.
            </p>

            <button
              onClick={permissionhandle}
              className="bg-slate-800 text-white px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-slate-900 active:scale-[0.98] transition-all duration-150"
            >
              {showRequests ? "Hide Requests" : "Manage Permissions"}
            </button>

          </div>

        </div>

        {showRequests && (

          <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-slate-200">

            <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">

              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Permission Requests
              </h2>

              <div className="bg-teal-50 text-teal-800 text-sm font-semibold px-4 py-1.5 rounded-full">
                {gotrequests.length} {gotrequests.length === 1 ? "Request" : "Requests"}
              </div>

            </div>

            {gotrequests.length === 0 ? (

              <div className="text-center py-20">

                <div className="text-6xl mb-5 opacity-80">
                  📭
                </div>

                <h3 className="text-2xl font-bold text-slate-900">
                  No Requests
                </h3>

                <p className="text-slate-500 mt-2 text-sm">
                  Doctor requests will appear here
                </p>

              </div>

            ) : (

              <div className="grid gap-4">

                {gotrequests.map((request, index) => (

                  <div
                    key={index}
                    className="bg-slate-50 rounded-2xl border border-slate-200 p-6 hover:border-slate-300 hover:bg-slate-50/70 transition-all duration-150"
                  >

                    <div className="flex justify-between items-center gap-4 flex-wrap">

                      <div>

                        <h3 className="text-lg font-bold text-slate-900">
                          Dr. {request.doctorid.name}
                        </h3>

                        <div
                          className={`mt-3 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold capitalize

${request.status === "approved"
                              ? "bg-emerald-100 text-emerald-700"

                              : request.status === "pending"
                                ? "bg-amber-100 text-amber-700"

                                : "bg-rose-100 text-rose-700"
                            }

`}
                        >

                          <span className={`w-1.5 h-1.5 rounded-full ${
                            request.status === "approved"
                              ? "bg-emerald-500"
                              : request.status === "pending"
                                ? "bg-amber-500"
                                : "bg-rose-500"
                          }`} />

                          {request.status}

                        </div>

                      </div>

                      <div className="flex gap-2.5">

                        {request.status === "pending" && (

                          <button
                            onClick={() =>
                              givepermissionhandle(
                                request.doctorid._id
                              )
                            }
                            className="bg-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-teal-800 active:scale-[0.98] transition-all duration-150"
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
                            className="bg-amber-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-amber-600 active:scale-[0.98] transition-all duration-150"
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
                              className="bg-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-teal-800 active:scale-[0.98] transition-all duration-150"
                            >

                              Allow

                            </button>

                            <button
                              onClick={() =>
                                deletepermissionhandle(
                                  request.doctorid._id
                                )
                              }
                              className="bg-white text-rose-600 border border-rose-200 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-rose-50 active:scale-[0.98] transition-all duration-150"
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

      </div>

    </div>

  );

};

export default PatientDashboard;
