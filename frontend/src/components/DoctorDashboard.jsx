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

  return (

    <div className="min-h-screen bg-sky-500 p-4">

      <div className="bg-stone-50 rounded-2xl shadow-2xl h-[95vh] flex overflow-hidden">

        <div className="w-56 bg-white border-r p-4 flex flex-col justify-between">

          <div>

            <h1 className="text-xl font-bold text-blue-600 mb-6">
              MediCare
            </h1>

            <div className="space-y-1">

              <button
                onClick={() => {
                  setactiveTab(
                    "dashboard"
                  )
                }}
                className={`w-full text-left text-sm font-medium p-2.5 rounded-lg transition ${activeTab === "dashboard"
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
                className={`w-full text-left text-sm font-medium p-2.5 rounded-lg transition ${activeTab === "patients"
                    ?
                    "bg-blue-100 text-blue-700"

                    :
                    "hover:bg-gray-100 text-gray-600"
                  }`}
              >

                Patients

              </button>

            </div>

          </div>

          <div className="border rounded-lg p-3">

            <h2 className="text-sm font-semibold leading-tight">
              Dr. {user.name || "Loading..."}
            </h2>

            <p className="text-xs text-gray-500">
              {user.role}
            </p>

          </div>

        </div>

        <div className="flex-1 flex flex-col items-center justify-start p-6 overflow-y-auto">

          {activeTab === "dashboard"

            ?

            (

              <>

                <div className="text-center mb-6">

                  <h1 className="text-2xl font-bold text-gray-800">

                    Welcome back,
                    {" "}
                    Dr.
                    {" "}
                    {user.name}

                  </h1>

                  <p className="text-gray-500 mt-1 text-sm">

                    Manage patients and requests quickly

                  </p>

                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 w-140 max-w-[90%]">

                  <h2 className="text-lg font-semibold text-center mb-4">

                    Search Patient

                  </h2>

                  <div className="space-y-3">

                    <input
                      type="text"
                      value={userid}
                      onChange={(e) => {
                        setuserid(
                          e.target.value
                        )
                      }}
                      placeholder="Enter Patient User ID"
                      className="w-full border rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <button
                      onClick={
                        searchhandle
                      }
                      className="w-full bg-blue-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-blue-700 transition"
                    >

                      Search Patient

                    </button>

                  </div>

                  {searcheduser.patientname && (

                    <div className="mt-4 bg-gray-50 rounded-xl p-4 text-center border">

                      <h3 className="text-base font-bold">

                        {
                          searcheduser.patientname
                        }

                      </h3>

                      <button
                        onClick={
                          requestdetailhandle
                        }
                        className="mt-3 bg-red-500 text-white text-sm px-5 py-2 rounded-lg hover:bg-red-600"
                      >

                        View Request Details

                      </button>

                    </div>

                  )}

                </div>

              </>

            )

            :

            (

              <div className="w-full max-w-4xl">

                <div className="mb-4">

                  <h1 className="text-2xl font-bold text-center">
                    Patients
                  </h1>

                  <p className="text-center text-gray-500 text-sm mt-1">
                    Approved • Pending • Rejected
                  </p>

                </div>

                <div className="bg-white rounded-2xl shadow-lg p-4 max-h-162.5 overflow-y-auto">

                  {patients.length > 0 ? (

                    <div className="space-y-2">

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
                            className={`border rounded-xl px-4 py-2.5 flex justify-between items-center transition ${patient.status === "approved"
                                ?
                                "hover:bg-blue-50 hover:border-blue-200 cursor-pointer"

                                :
                                "opacity-80"
                              }`}
                          >

                            <div>

                              <h2 className="text-sm font-bold leading-tight">

                                {
                                  patient.patientid.name
                                }

                              </h2>

                              <p className="text-gray-500 text-xs mt-0.5">

                                User ID:
                                {" "}
                                {
                                  patient.patientid.username
                                }

                              </p>

                            </div>

                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${patient.status === "approved"

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

                      <div className="flex flex-col items-center justify-center py-16">

                        <div className="text-5xl mb-3">
                          📭
                        </div>

                        <h2 className="text-xl font-bold">
                          No Requests Sent
                        </h2>

                        <p className="text-gray-500 mt-1 text-sm text-center">
                          You haven't sent any patient access requests yet.
                        </p>

                        <button
                          onClick={() => {
                            setactiveTab(
                              "dashboard"
                            )
                          }}
                          className="mt-5 bg-blue-600 text-white text-sm px-6 py-2.5 rounded-xl hover:bg-blue-700"
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
