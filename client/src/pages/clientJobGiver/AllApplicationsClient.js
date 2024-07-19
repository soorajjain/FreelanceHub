import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { MdErrorOutline } from "react-icons/md";
import { toast } from "react-toastify";
import CustomToastContainer from "../../components/common/ToastContainer";
import profile from "../../assets/profile.png";
import { useNavigate } from "react-router-dom";
import { PiClubLight } from "react-icons/pi";

const AllApplicationsClient = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const [clientId, setClientId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [rejectionMessage, setRejectionMessage] = useState("");
  const [currentApplicationId, setCurrentApplicationId] = useState(null);
  const [acceptedApplications, setAcceptedApplications] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.id) {
          setClientId(decodedToken.id);
        }
      } catch (error) {
        console.error("Invalid token");
      }
    }
  }, []);

  const fetchApplications = async () => {
    try {
      if (clientId) {
        const response = await axios.get(
          `http://localhost:3002/api/application/client/${clientId}`
        );

        if (Array.isArray(response.data)) {
          const sortedResponse = response.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setApplications(sortedResponse);
        }
      }
    } catch (error) {
      setError("Error fetching applications data.");
      console.error("Error fetching applications data:", error);
    }
  };

  useEffect(() => {
    fetchApplications();

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
  }, [clientId]);

  const handleAccept = async (applicationId) => {
    try {
      const token = localStorage.getItem("token");

      if (acceptedApplications.includes(applicationId)) {
        toast.error("Application already accepted");

        return;
      }

      const response = await axios.post(
        `http://localhost:3002/api/application/${applicationId}/accept`,
        {},
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      fetchApplications();
      console.log(response.data._id);
      const projectId = response.data._id;
      setAcceptedApplications([...acceptedApplications, applicationId]);
      toast.success("Accepted successfully and Project Created");
      setTimeout(() => {
        navigate(`/projects/${projectId}`);
      }, 3000);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Application already accepted");
        toast.success("navigating to project page");

        setTimeout(() => {
          navigate(`/client/projects`);
        }, 3000);
      } else {
        console.error("Error accepting application:", error);
        toast.error("Error accepting application");
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setRejectionMessage("");
  };

  const handleReject = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!rejectionMessage) {
        toast.error("Rejection message is mandatory");
      }

      const response = await axios.put(
        `http://localhost:3002/api/application/${currentApplicationId}/reject`,
        { rejectionMessage },
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );

      console.log(response);
      setApplications((prev) =>
        prev.map((app) =>
          app._id === currentApplicationId
            ? { ...app, status: "rejected", rejectionMessage }
            : app
        )
      );
      fetchApplications();

      setIsModalOpen(false);
      setRejectionMessage("");
    } catch (error) {
      console.error("Error rejecting application:", error);
    }
  };

  const openRejectionBox = (applicationId) => {
    setCurrentApplicationId(applicationId);
    setIsModalOpen(true);
  };
  const handleProfile = (id) => {
    navigate(`/user/profile/${id}`);
  };

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
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 mt-[120px]">Applications</h2>
      {applications.map((application) => {
        const category = categories.find(
          (category) => application.job_postings.category === category._id
        );
        // console.log(application.freelancer.profile_image);
        return (
          <section
            key={application._id}
            className="flex flex-col items-center justify-center w-full"
          >
            <div className="m-4 mx-auto w-[1000px] rounded-md border border-gray-100 text-[#141c3a] shadow-md">
              <div className="relative p-8 flex flex-col md:flex-row">
                <div className="flex flex-col items-center md:w-1/3 ">
                  <img
                    src={
                      application &&
                      Array.isArray(application.freelancer.profile_image) &&
                      application.freelancer.profile_image.length > 0
                        ? `http://localhost:3002/${application.freelancer.profile_image}`
                        : profile
                    }
                    alt="Freelancer Profile"
                    className="w-24 h-24 rounded-full mb-4 object-cover"
                  />

                  <div className="flex flex-col text-center gap-2">
                    <p className="text-xl font-black">
                      {application.freelancer.user_name}
                    </p>
                    <p className="text-sm">{application.freelancer.email}</p>
                    <p className="text-sm">
                      {application.freelancer.company_name}
                    </p>
                    <button
                      onClick={() => {
                        handleProfile(application.freelancer._id);
                      }}
                      className="text-white bg-[#141C3A] border focus:ring-4 focus:outline-none hover:border-[#141C3A] active:text-white font-medium rounded-lg text-sm px-5 py-2 text-center  w-[80%] mx-auto"
                      type="button"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
                <div className="md:w-2/3 md:pl-8">
                  <div className="flex flex-col md:flex-row">
                    <h2 className="mb-2 text-3xl font-black">
                      {application.job_postings.title}
                    </h2>
                  </div>
                  <div className="flex text-sm">
                    <span>Budget: </span>
                    <h3 className="mb-5 ml-2 mr-3 rounded-full bg-green-100 text-green-900">
                      {application.job_postings.budget}.Rs
                    </h3>
                  </div>
                  <p className="text-xl font-black">{category.category_name}</p>
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
                  <div className="mt-5 border w-fit p-5 px-10 text-center">
                    <p className="text-2xl font-bold mb-4">
                      Application Details
                    </p>
                    <p>Cover Letter: {application.coverLetter}</p>
                    <p className="text-xl font-black border p-2 my-2">
                      Status: {application.status}
                    </p>
                    <p>
                      Applied At:{" "}
                      {new Date(application.createdAt).toLocaleString()}
                    </p>
                    <div className="flex mt-4 mx-auto items-center justify-center">
                      <button
                        type="button"
                        className="text-white bg-[#141C3A] border focus:ring-4 focus:outline-none hover:border-[#141C3A] hover:text-[#141C3A] hover:bg-[#ffffff] font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3"
                        onClick={() => handleAccept(application._id)}
                      >
                        Accept
                      </button>
                      <button
                        type="button"
                        className="text-white bg-red-500 border focus:ring-4 focus:outline-none hover:border-red-500 hover:text-red-500 hover:bg-[#ffffff] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        onClick={() => openRejectionBox(application._id)}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {isModalOpen && currentApplicationId === application._id && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-auto">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-[30%] ">
                    <h2 className="text-2xl font-bold mb-4">
                      Rejection Message
                    </h2>
                    <textarea
                      placeholder="Message"
                      className="w-full p-2 mb-4 border rounded"
                      value={rejectionMessage}
                      onChange={(e) => setRejectionMessage(e.target.value)}
                    />

                    <div className="flex justify-end">
                      <button
                        onClick={handleModalClose}
                        className="text-white bg-[#141C3A] border focus:ring-4 focus:outline-none hover:border-[#141C3A] hover:text-[#141C3A] hover:bg-[#ffffff] font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleReject}
                        className="text-white bg-red-500 border focus:ring-4 focus:outline-none hover:border-red-500 hover:text-red-500 hover:bg-[#ffffff] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        Submit Rejection
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        );
      })}
      <CustomToastContainer />
    </div>
  );
};

export default AllApplicationsClient;
