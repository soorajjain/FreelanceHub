import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { MdErrorOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const AllApplicationsFreelancer = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const [id, setId] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.id) {
          setId(decodedToken.id);
        }
      } catch (error) {
        console.error("Invalid token");
      }
    }
  }, []);

  useEffect(() => {
    if (id) {
      const fetchApp = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3002/api/application/freelancer/${id}`
          );

          if (Array.isArray(response.data)) {
            const sortedResponse = response.data.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setApplications(sortedResponse);
          }
        } catch (error) {
          setError("Error fetching applications data.");
          console.error("Error fetching applications data:", error);
        }
      };
      fetchApp();
    }
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/api/admin/category`
        );
        setCategories(response.data);
        // console.log(response.data)
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (applications.length === 0) {
    return (
      <div className="h-[80vh] w-full flex justify-center items-center">
        <h1 className="text-[30px]">
          <MdErrorOutline className="ml-20" />
          <span>No Applications Found</span>
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center px-4">
      <h2 className="text-3xl font-bold mb-6 mt-[120px]">Applications</h2>
      {applications.map((application) => {
        const category = categories.find(
          (category) => application.job_postings.category === category._id
        );

        return (
          <section
            key={application._id}
            className="flex items-center justify-center w-full"
          >
            <div className="m-4 mx-auto w-full max-w-4xl rounded-md border border-gray-100 text-[#141c3a] shadow-md">
              <div className="relative grid h-full grid-cols-1 md:grid-cols-[70%_auto] text-[#141c3a]">
                <div className="relative p-8">
                  <div className="flex flex-col md:flex-row">
                    <h2 className="mb-2 text-2xl md:text-3xl font-black">
                      {application.job_postings.title}
                    </h2>
                  </div>
                  <div className="flex text-sm">
                    <span>Budget: </span>
                    <h3 className="mb-5 ml-2 mr-3 rounded-full bg-green-100 text-green-900 px-2 py-0.5">
                      {application.job_postings.budget} Rs
                    </h3>
                  </div>
                  <p className="text-xl font-black">
                    {category?.category_name}
                  </p>
                  <div className="mt-2">
                    <span>Description: </span>
                    <p className="font-sans text-base tracking-normal">
                      {application.job_postings.description}
                    </p>
                  </div>
                  <div className="mt-5 flex space-y-3 w-full text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                    <div>
                      Deadline:
                      <span className="ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900">
                        {new Date(
                          application.job_postings.deadline
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mx-auto flex flex-col gap-3 items-center px-5 pt-1 md:p-8 z-10">
                  <p className="text-l font-black">Freelancer Details</p>
                  <p className="text-xl font-black">
                    {application.freelancer.user_name}
                  </p>
                  <p className="text-sm">{application.freelancer.email}</p>
                  <p className="text-sm">
                    {application.freelancer.company_name}
                  </p>
                </div>
              </div>
              <div className="p-8 mx-auto flex flex-col justify-center items-center gap-2 md:w-[60%]">
                <h3 className="text-2xl font-bold mb-2">Application Details</h3>
                <p className="mb-2 text-center"><strong>Cover Letter:</strong> {application.coverLetter}</p>

                {application.status === "rejected" ? (
                  <p className="text-xl font-black border border-red-600 p-2 px-3  my-2 text-center bg-red-300">
                    Status: {application.status}
                    {application.rejectionMessage && (
                      <p className="mt-2 text-l">
                        {" "}
                        <span className="text-lg">
                          Rejection Message : {application.rejectionMessage}
                        </span>
                      </p>
                    )}
                  </p>
                ) : application.status === "hired" ? (
                  <Link to="/freelancer/project">
                    <p className="text-xl font-black border p-2 px-3  border-green-600 text-center bg-green-300">
                      Status: {application.status}
                    </p>
                  </Link>
                ) : (
                  <p className="text-xl font-black border p-2 px-3  my-2 text-center">
                    Status: {application.status}
                  </p>
                )}

                <p className="mt-2">
                  Applied At: {new Date(application.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default AllApplicationsFreelancer;
