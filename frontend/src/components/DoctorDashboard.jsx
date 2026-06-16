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

    <div className="min-h-screen bg-sky-500 p-6">

      <div className="bg-stone-50 rounded-3xl shadow-2xl h-[92vh] flex overflow-hidden">

        <div className="w-[250px] bg-white border-r p-6 flex flex-col justify-between">

          <div>

            <h1 className="text-3xl font-bold text-blue-600 mb-10">
              MediCare
            </h1>

            <div className="space-y-3">

              <button
                onClick={() => {
                  setactiveTab(
                    "dashboard"
                  )
                }}
                className={`w-full text-left p-4 rounded-xl transition ${activeTab === "dashboard"
                    ?
                    "bg-blue-100"

                    :
                    "hover:bg-gray-100"
                  }`}
              >

                Dashboard

              </button>

              <button
                onClick={
                  fetchPatients
                }
                className={`w-full text-left p-4 rounded-xl transition ${activeTab === "patients"
                    ?
                    "bg-blue-100"

                    :
                    "hover:bg-gray-100"
                  }`}
              >

                Patients

              </button>

            </div>

          </div>

          <div className="border rounded-xl p-4">

            <h2 className="font-semibold">
              Dr. {user.name || "Loading..."}
            </h2>

            <p className="text-sm text-gray-500">
              {user.role}
            </p>

          </div>

        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8">

          {activeTab === "dashboard"

            ?

            (

              <>

                <div className="text-center mb-10">

                  <h1 className="text-5xl font-bold text-gray-800">

                    Welcome back,
                    {" "}
                    Dr.
                    {" "}
                    {user.name}

                  </h1>

                  <p className="text-gray-500 mt-3 text-lg">

                    Manage patients and requests quickly

                  </p>

                </div>

                <div className="bg-white rounded-3xl shadow-xl p-10 w-[650px] max-w-[90%]">

                  <h2 className="text-3xl font-semibold text-center mb-8">

                    Search Patient

                  </h2>

                  <div className="space-y-5">

                    <input
                      type="text"
                      value={userid}
                      onChange={(e) => {
                        setuserid(
                          e.target.value
                        )
                      }}
                      placeholder="Enter Patient User ID"
                      className="w-full border rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <button
                      onClick={
                        searchhandle
                      }
                      className="w-full bg-blue-600 text-white py-4 rounded-2xl hover:bg-blue-700 transition"
                    >

                      Search Patient

                    </button>

                  </div>

                  {searcheduser.patientname && (

                    <div className="mt-8 bg-gray-50 rounded-2xl p-6 text-center border">

                      <h3 className="text-2xl font-bold">

                        {
                          searcheduser.patientname
                        }

                      </h3>

                      <button
                        onClick={
                          requestdetailhandle
                        }
                        className="mt-5 bg-red-500 text-white px-8 py-3 rounded-xl hover:bg-red-600"
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

              <div className="w-full max-w-5xl">

                <div className="mb-8">

                  <h1 className="text-4xl font-bold text-center">
                    Patients
                  </h1>

                  <p className="text-center text-gray-500 mt-2">
                    Approved • Pending • Rejected
                  </p>

                </div>

                <div className="bg-white rounded-3xl shadow-xl p-6 max-h-[650px] overflow-y-auto">

                  {patients.length > 0 ? (

                    <div className="space-y-5">

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
                            className={`border rounded-2xl p-6 flex justify-between items-center transition ${patient.status === "approved"
                                ?
                                "hover:shadow-md cursor-pointer"

                                :
                                "opacity-90"
                              }`}
                          >

                            <div>

                              <h2 className="text-xl font-bold">

                                {
                                  patient.patientid.name
                                }

                              </h2>

                              <p className="text-gray-500 mt-1">

                                User ID:
                                {" "}
                                {
                                  patient.patientid.username
                                }

                              </p>

                            </div>

                            <span
                              className={`px-5 py-2 rounded-full font-semibold capitalize ${patient.status === "approved"

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