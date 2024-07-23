import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomToastContainer from "../../components/common/ToastContainer";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { MdErrorOutline } from "react-icons/md";

const ProjectPageFreelancer = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [freelancerId, setFreelancerId] = useState("");
  const [status, setUpdateStatus] = useState("");
  const [review, setReview] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.id) {
          setFreelancerId(decodedToken.id);
        }
      } catch (error) {
        console.error("Invalid token");
      }
    }
  }, []);

  const getProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:3002/api/projects/`, {
        headers: {
          authorization: `${token}`,
        },
      });

      // console.log("Fetched projects:", response.data);

      const sortedProjects = response.data
        .filter((project) => project.freelancer._id === freelancerId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setProjects(sortedProjects);
    } catch (error) {
      console.log("Fetching projects error: " + error);
    }
  };

  const getReviewAndRating = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3002/api/rating/freelancer/${freelancerId}`,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );

      // console.log("Fetched review:", response.data);
      setReview(response.data);
    } catch (error) {
      console.log("Fetching review error: " + error);
    }
  };

  useEffect(() => {
    getProjects();
    getReviewAndRating();
  }, [freelancerId]);

  // http://localhost:3002/api/rating/freelancer/668e5c57a76317ce06089e49

  const updateProjectDetails = async (projectId) => {
    try {
      const token = localStorage.getItem("token");
      // console.log(status);

      await axios.put(
        `http://localhost:3002/api/projects/${projectId}/update_status`,
        {
          status: status,
        },
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      // console.log(response);
      getProjects();
      getReviewAndRating();
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfile = (id) => {
    navigate(`/user/profile/${id}`);
  };

  return (
    <div className="flex flex-col items-center p-4">
      {projects.length > 0 ? (
        projects.map((project) => (
          <>
            <h2 className="text-3xl font-bold mb-6 mt-[120px]">
              Project Overview
            </h2>
            <div
              key={project._id}
              className="w-full max-w-4xl mx-auto bg-white border border-gray-200 rounded-lg shadow-md p-6 mb-6"
            >
              {/* Ensure project and jobPosting are defined */}
              {project && project.jobPosting && (
                <>
                  {/* Job Posting Details */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold mb-2">
                      {project.jobPosting.title}
                    </h3>
                    <p className="text-base mb-2">
                      {project.jobPosting.description}
                    </p>
                    <div className="text-sm mb-2">
                      <span>Budget: </span>
                      <span className="bg-green-100 text-green-900 px-2 py-1 rounded-full">
                        {project.jobPosting.budget} Rs
                      </span>
                    </div>
                    <div className="text-sm">
                      <span>Deadline: </span>
                      <span className="bg-blue-100 text-blue-900 px-2 py-1 rounded-full">
                        {new Date(
                          project.jobPosting.deadline
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </>
              )}

              {/* Freelancer and Project Status */}
              <div className="flex flex-col md:flex-row md:space-x-6">
                {/* Freelancer Details */}
                <div className="md:w-1/3 mb-4 md:mb-0">
                  {project.client && (
                    <div className="flex flex-col items-center border p-4 rounded mb-4 text-center">
                      <h4 className="text-xl font-bold mb-2">Client </h4>
                      <img
                        src={
                          project.client.profile_image.length > 0
                            ? `http://localhost:3002/${project.client.profile_image[0]}`
                            : "/default-profile-image.jpg"
                        }
                        alt="client Profile"
                        className="w-24 h-24 rounded-full mb-4 object-cover"
                      />
                      <p className="font-bold mb-2">
                        {project.client.user_name}
                      </p>
                      <p className="mb-2">{project.client.email}</p>
                      <p className="mb-4">{project.client.company_name}</p>
                      <button
                        onClick={() => handleProfile(project.client._id)}
                        className="text-white bg-[#141C3A] border focus:ring-4 focus:outline-none hover:border-[#141C3A] hover:text-[#141C3A] hover:bg-[#ffffff] font-medium rounded-lg text-sm px-5 py-2 text-center"
                      >
                        View Profile
                      </button>
                    </div>
                  )}
                </div>

                <div className="md:w-1/2">
                  <div className="mb-6">
                    <h4 className="text-xl font-bold mb-2">
                      Milestones & Status
                    </h4>
                    {project.milestones &&
                      project.milestones.map((milestone, index) => (
                        <div key={index} className="mb-4">
                          <p className="mb-2">
                            <span className="font-bold">Milestone: </span>
                            {milestone.description}
                          </p>
                          <p className="mb-2">
                            <span className="font-bold">
                              Deadline for the milestone:{" "}
                            </span>
                            {new Date(milestone.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    <p className="text-sm text-gray-500">
                      Last Updated:{" "}
                      {new Date(project.updatedAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="mb-6">
                    <h4 className="text-xl font-bold mb-2">Status</h4>
                    <input
                      type="text"
                      value={status}
                      className="border p-2 rounded mb-2 w-full"
                      placeholder="Enter updated status here"
                      onChange={(e) => setUpdateStatus(e.target.value)}
                    />
                    <button
                      onClick={() => updateProjectDetails(project._id)}
                      className="text-white bg-[#141C3A] border focus:ring-4 focus:outline-none hover:border-[#141C3A] hover:text-[#141C3A] hover:bg-[#ffffff] font-medium rounded-lg text-sm px-5 py-2 text-center"
                    >
                      Update Status
                    </button>
                  </div>
                  <div className="mt-[-10px]">
                    <span className="font-bold">Last Updated Status: </span>
                    {project.status}
                  </div>

                  {review && project.paymentStatus === "paid" && (
                    <div className="border p-3 mt-5 flex flex-col gap-2">
                      <div className="text-xl font-bold mb-2">
                        {" "}
                        Feedback by Client
                      </div>
                      <div className="">
                        <span className="font-bold">Payment : </span>
                        PAID
                      </div>
                      <div>
                        <Rating
                          size="large"
                          name="read-only"
                          value={review.rating}
                          readOnly
                        />
                      </div>
                      <div className="p-2 border mt-[-10px] text-sm">
                        {review.review}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        ))
      ) : (
        <div className="h-[80vh] w-full flex flex-col justify-center items-center gap-4">
          <MdErrorOutline className="text-3xl" />
          <span className="text-3xl">No Projects Found</span>
          <Link
            to="/freelancer/findJobs"
            className="text-white bg-[#141C3A] border focus:ring-4 focus:outline-none hover:border-[#141C3A]
              active:text-[#141C3A] active:bg-[#ffffff] font-medium rounded-lg text-sm px-5 py-2.5 text-center hidden lg:block"
          >
            Apply Here
          </Link>
        </div>
      )}

      <CustomToastContainer />
    </div>
  );
};

export default ProjectPageFreelancer;
