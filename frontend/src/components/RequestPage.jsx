import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export const RequestPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [searcheduser, setsearcheduser] =
    useState({});

  const [records, setrecords] =
    useState([]);

  useEffect(() => {

    const fetchUser = async () => {

      try {

        const patientdetails =
          await api.get(
            `/api/request/patient/${id}`
          );

        setsearcheduser(
          patientdetails.data.user
        );

        setrecords(
          patientdetails.data.data
        );

      }

      catch (error) {

        if (
          error.response?.data?.Code ===
          "no request"
        ) {

          setsearcheduser({
            status:
              "no request",
          });

        }

        else if (
          error.response?.data?.Code ===
          "no permission"
        ) {

          setsearcheduser({
            status:
              error.response?.data?.reason,
          });

        }

        else if (
          error.response?.data?.Code ===
          "no data uploaded"
        ) {

          setsearcheduser({
            status:
              "no data uploaded",
          });

        }

        else {

          console.log(
            error.response?.data ||
            error.message
          );

        }

      }

    };

    fetchUser();

  }, [id]);

  const sendrequesthandle =
    async () => {

      try {

        await api.post(
          `/api/request/send/${id}`
        );

        alert(
          "✅ Request sent successfully. Waiting for patient approval."
        );

        setsearcheduser({
          status:
            "pending",
        });

        navigate(
          "/DoctorDashboard"
        );

      }

      catch (err) {

        alert(
          "❌ Failed to send request"
        );

        console.log(
          err.response?.data ||
          err.message
        );

      }

    };

  return (

<div className="min-h-screen bg-sky-500 p-6">

<div className="bg-stone-50 rounded-3xl shadow-2xl min-h-[92vh] flex justify-center items-center">

{searcheduser?.status==="no request" && (

<div className="bg-white rounded-3xl shadow-xl p-12 text-center">

<div className="text-7xl mb-6">
📨
</div>

<h1 className="text-4xl font-bold mb-5">
Request Not Found
</h1>

<p className="text-gray-500 mb-8">
Send request to access patient records.
</p>

<button
onClick={sendrequesthandle}
className="bg-blue-600 text-white px-10 py-4 rounded-2xl hover:bg-blue-700"
>

Send Request

</button>

</div>

)}

{searcheduser?.status==="pending" && (

<div className="bg-white rounded-3xl shadow-xl p-12 text-center">

<div className="text-7xl mb-6">
⏳
</div>

<h1 className="text-4xl font-bold">
Request Pending
</h1>

<p className="text-gray-500 mt-4">
Waiting for patient approval.
</p>

</div>

)}

{searcheduser?.status==="rejected" && (

<div className="bg-white rounded-3xl shadow-xl p-12 text-center">

<div className="text-7xl mb-6">
❌
</div>

<h1 className="text-4xl font-bold">
Request Rejected
</h1>

<p className="text-gray-500 mt-4">
Patient denied access.
</p>

</div>

)}

{searcheduser?.status==="no data uploaded" && (

<div className="bg-white rounded-3xl shadow-xl p-12 text-center">

<div className="text-7xl mb-6">
📂
</div>

<h1 className="text-4xl font-bold">
No Records Uploaded
</h1>

<p className="text-gray-500 mt-4">
Patient has not uploaded records yet.
</p>

</div>

)}

{searcheduser?.status==="approved" && (

<div className="w-full max-w-6xl">

<div className="bg-white rounded-3xl shadow-xl overflow-hidden">

<div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-8">

<h1 className="text-4xl font-bold">

{
searcheduser.patientid?.name
}

</h1>

<p className="mt-3 text-lg">

Age:
{" "}
{
searcheduser.patientid?.age
}

</p>

</div>

<div className="p-8">

<h2 className="text-3xl font-bold mb-8">
Health Records
</h2>

{records.length===0 ? (

<div className="text-center py-20">

<div className="text-7xl mb-5">
📭
</div>

<h2 className="text-3xl font-bold">
No Records Found
</h2>

</div>

)

:

(

<div className="space-y-5 max-h-[500px] overflow-y-auto">

{records.map(
(Data,index)=>(

<a
key={index}
href={Data.url}
target="_blank"
rel="noreferrer"
>

<div className="border rounded-3xl p-6 flex justify-between items-center hover:shadow-lg hover:bg-gray-50 transition">

<div>

<h3 className="text-2xl font-semibold">

{
Data.recordname
}

</h3>

</div>

<div className="text-gray-500">

{
Data.date.split(
"T"
)[0]
}

</div>

</div>

</a>

))
}

</div>

)}

</div>

</div>

</div>

)}

</div>

</div>

);

};

export default RequestPage;