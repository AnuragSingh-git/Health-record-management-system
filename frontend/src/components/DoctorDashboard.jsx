import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export const DoctorDashboard = () => {
  const [user, setuser] = useState({});
  const [userid, setuserid] = useState("");
  const [searcheduser, setsearcheduser] = useState({});
  const [activeTab, setactiveTab] = useState("dashboard");
  const [patients, setpatients] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userdata =
          await api.get(
            "/api/auth/getuser"
          );

        if (!userdata) {
          return console.log(
            "No user found"
          );
        }

        setuser(
          userdata.data.user
        );

      } catch (err) {

        console.log(
          err.response?.data ||
          err.message
        );

      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchPatientsOverview =
      async () => {

        try {

          const res =
            await api.get(
              "/api/request/getrequestdoctor"
            );

          setpatients(
            res.data.requestgot || []
          );

        } catch (err) {

          console.log(
            err.response?.data ||
            err.message
          );

        }
      };

    fetchPatientsOverview();
  }, []);

  const searchhandle = async () => {
    try {

      const patientdetails =
        await api.get(
          `/api/request/search/${userid}`
        );

      if (!patientdetails) {
        return console.log(
          "No patient found"
        );
      }

      setsearcheduser(
        patientdetails.data
      );

    } catch (err) {

      console.log(
        err.response?.data ||
        err.message
      );

    }
  };

  const requestdetailhandle = () => {
    navigate(
      `/request/${searcheduser.id}`
    );
  };

  const requestdetailhandlepatient =
    (id) => {
      navigate(
        `/request/${id}`
      );
    };

  const fetchPatients =
    async () => {

      setactiveTab(
        "patients"
      );

      try {

        const res =
          await api.get(
            "/api/request/getrequestdoctor"
          );

        setpatients(
          res.data.requestgot || []
        );

      } catch (err) {

        setpatients([]);

        console.log(
          err.response?.data ||
          err.message
        );

      }
    };

  const approvedCount = patients.filter(
    (p) => p.status === "approved"
  ).length;

  const pendingCount = patients.filter(
    (p) => p.status === "pending"
  ).length;

  const rejectedCount = patients.filter(
    (p) => p.status === "rejected"
  ).length;

  return (

    <div className="min-h-screen bg-sky-500 p-6">

      <div className="bg-stone-50 rounded-3xl shadow-2xl h-[92vh] flex overflow-hidden">

        <div className="w-64 bg-white border-r p-6 flex flex-col justify-between">

          <div>

            <h1 className="text-2xl font-bold text-blue-600 mb-8">
              MediCare
            </h1>

            <div className="space-y-2">

              <button
                onClick={() => {
                  setactiveTab(
                    "dashboard"
                  )
                }}
                className={`w-full text-left p-3 rounded-xl font-medium transition ${activeTab === "dashboard"
                    ?
                    "bg-blue-100 text-blue-700"

                    :
                    "hover:bg-gray-100 text-gray-600"
                  }`}
              >

                Dashboard

              </button>

              <button
                onClick={
                  fetchPatients
                }
                className={`w-full text-left p-3 rounded-xl font-medium transition ${activeTab === "patients"
                    ?
                    "bg-blue-100 text-blue-700"

                    :
                    "hover:bg-gray-100 text-gray-600"
                  }`}
              >

                Patients

              </button>

            </div>

            <div className="mt-8 pt-8 border-t">

              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
                Overview
              </p>

              <div className="space-y-3">

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Approved</span>
                  <span className="text-sm font-bold text-green-600">{approvedCount}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Pending</span>
                  <span className="text-sm font-bold text-yellow-600">{pendingCount}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Rejected</span>
                  <span className="text-sm font-bold text-red-500">{rejectedCount}</span>
                </div>

              </div>

            </div>

          </div>

          <div className="border rounded-xl p-4">

            <h2 className="font-semibold">
              Dr. {user.name || "Loading..."}
            </h2>

            <p className="text-sm text-gray-500 capitalize">
              {user.role}
            </p>

          </div>

        </div>

        <div className="flex-1 flex flex-col items-center p-8 overflow-y-auto">

          {activeTab === "dashboard"

            ?

            (

              <>

                <div className="text-center mb-8">

                  <h1 className="text-4xl font-bold text-gray-800">

                    Welcome back,
                    {" "}
                    Dr.
                    {" "}
                    {user.name}

                  </h1>

                  <p className="text-gray-500 mt-2 text-base">

                    Manage patients and requests quickly

                  </p>

                </div>

                <div className="grid grid-cols-3 gap-5 w-162.5 max-w-[90%] mb-8">

                  <div className="bg-white rounded-2xl shadow p-5 text-center">
                    <p className="text-3xl font-bold text-green-600">{approvedCount}</p>
                    <p className="text-sm text-gray-500 mt-1">Approved</p>
                  </div>

                  <div className="bg-white rounded-2xl shadow p-5 text-center">
                    <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
                    <p className="text-sm text-gray-500 mt-1">Pending</p>
                  </div>

                  <div className="bg-white rounded-2xl shadow p-5 text-center">
                    <p className="text-3xl font-bold text-red-500">{rejectedCount}</p>
                    <p className="text-sm text-gray-500 mt-1">Rejected</p>
                  </div>

                </div>

                <div className="bg-white rounded-3xl shadow-xl p-10 w-162.5 max-w-[90%] mb-8">

                  <h2 className="text-2xl font-semibold text-center mb-6">

                    Search Patient

                  </h2>

                  <div className="space-y-4">

                    <input
                      type="text"
                      value={userid}
                      onChange={(e) => {
                        setuserid(
                          e.target.value
                        )
                      }}
                      placeholder="Enter Patient User ID"
                      className="w-full border rounded-2xl p-3.5 outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <button
                      onClick={
                        searchhandle
                      }
                      className="w-full bg-blue-600 text-white py-3.5 rounded-2xl font-medium hover:bg-blue-700 transition"
                    >

                      Search Patient

                    </button>

                  </div>

                  {searcheduser.patientname && (

                    <div className="mt-6 bg-gray-50 rounded-2xl p-5 text-center border">

                      <h3 className="text-xl font-bold">

                        {
                          searcheduser.patientname
                        }

                      </h3>

                      <button
                        onClick={
                          requestdetailhandle
                        }
                        className="mt-4 bg-red-500 text-white px-6 py-2.5 rounded-xl hover:bg-red-600"
                      >

                        View Request Details

                      </button>

                    </div>

                  )}

                </div>

                <div className="bg-white rounded-3xl shadow-xl p-10 w-162.5 max-w-[90%]">

                  <h2 className="text-2xl font-semibold text-center mb-8">

                    What You Can Do

                  </h2>

                  <div className="grid grid-cols-2 gap-5">

                    <div className="bg-blue-50 rounded-2xl p-5">

                      <div className="text-3xl mb-3">
                        🔍
                      </div>

                      <h3 className="font-bold mb-1">
                        Search Patients
                      </h3>

                      <p className="text-sm text-gray-500">
                        Find a patient using their unique User ID.
                      </p>

                    </div>

                    <div className="bg-blue-50 rounded-2xl p-5">

                      <div className="text-3xl mb-3">
                        📨
                      </div>

                      <h3 className="font-bold mb-1">
                        Request Access
                      </h3>

                      <p className="text-sm text-gray-500">
                        Send a request to view a patient's health records.
                      </p>

                    </div>

                    <div className="bg-blue-50 rounded-2xl p-5">

                      <div className="text-3xl mb-3">
                        📁
                      </div>

                      <h3 className="font-bold mb-1">
                        View Records
                      </h3>

                      <p className="text-sm text-gray-500">
                        Once approved, securely access uploaded records.
                      </p>

                    </div>

                    <div className="bg-blue-50 rounded-2xl p-5">

                      <div className="text-3xl mb-3">
                        📊
                      </div>

                      <h3 className="font-bold mb-1">
                        Track Requests
                      </h3>

                      <p className="text-sm text-gray-500">
                        See which requests are approved, pending, or rejected.
                      </p>

                    </div>

                  </div>

                </div>

              </>

            )

            :

            (

              <div className="w-full max-w-5xl">

                <div className="mb-6 flex items-end justify-between">

                  <div>
                    <h1 className="text-3xl font-bold">
                      Patients
                    </h1>
                    <p className="text-gray-500 mt-1">
                      {patients.length} total request{patients.length === 1 ? "" : "s"}
                    </p>
                  </div>

                  <div className="flex gap-2 text-sm font-semibold">
                    <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full">
                      {approvedCount} Approved
                    </span>
                    <span className="bg-yellow-100 text-yellow-700 px-4 py-1.5 rounded-full">
                      {pendingCount} Pending
                    </span>
                    <span className="bg-red-100 text-red-700 px-4 py-1.5 rounded-full">
                      {rejectedCount} Rejected
                    </span>
                  </div>

                </div>

                <div className="bg-white rounded-3xl shadow-xl p-6 max-h-140 overflow-y-auto">

                  {patients.length > 0 ? (

                    <div className="space-y-3">

                      {patients.map(
                        (patient, index) => (

                          <div
                            key={index}
                            onClick={() => {
                              if (
                                patient.status === "approved"
                              ) {
                                requestdetailhandlepatient(
                                  patient.patientid._id
                                )
                              }
                            }}
                            className={`border rounded-2xl p-5 flex justify-between items-center transition ${patient.status === "approved"
                                ?
                                "hover:bg-blue-50 hover:border-blue-200 cursor-pointer"

                                :
                                "opacity-90"
                              }`}
                          >

                            <div>

                              <h2 className="text-lg font-bold">

                                {
                                  patient.patientid.name
                                }

                              </h2>

                              <p className="text-gray-500 text-sm mt-0.5">

                                User ID:
                                {" "}
                                {
                                  patient.patientid.username
                                }

                              </p>

                            </div>

                            <span
                              className={`px-4 py-1.5 rounded-full font-semibold capitalize text-sm ${patient.status === "approved"

                                  ?

                                  "bg-green-100 text-green-700"

                                  :

                                  patient.status === "rejected"

                                    ?

                                    "bg-red-100 text-red-700"

                                    :

                                    "bg-yellow-100 text-yellow-700"

                                }`}
                            >

                              {
                                patient.status
                              }

                            </span>

                          </div>

                        ))
                      }

                    </div>

                  )

                    :

                    (

                      <div className="flex flex-col items-center justify-center py-24">

                        <div className="text-7xl mb-5">
                          📭
                        </div>

                        <h2 className="text-3xl font-bold">
                          No Requests Sent
                        </h2>

                        <p className="text-gray-500 mt-3 text-center">
                          You haven't sent any patient access requests yet.
                        </p>

                        <button
                          onClick={() => {
                            setactiveTab(
                              "dashboard"
                            )
                          }}
                          className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-2xl hover:bg-blue-700"
                        >

                          Search Patient

                        </button>

                      </div>

                    )}

                </div>

              </div>

            )

          }

        </div>

      </div>

    </div>

  );

};

export default DoctorDashboard;
