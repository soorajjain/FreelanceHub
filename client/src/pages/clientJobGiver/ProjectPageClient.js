import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CustomToastContainer from "../../components/common/ToastContainer";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProjectPageClient = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [currentPaymentStatus, setCurrentPaymentStatus] = useState("");
  const [milestonesList, setMilestonesList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMilestoneCardVisible, setIsMilestoneCardVisible] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [milestoneDescription, setMilestoneDescription] = useState("");
  const [milestoneDueDate, setMilestoneDueDate] = useState("");
  const [clientId, setClientId] = useState("");

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

  useEffect(() => {
    const getProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3002/api/projects/`,
          {
            headers: {
              authorization: `${token}`,
            },
          }
        );

        console.log("Fetched projects:", response.data);

        const sortedProjects = response.data
          .filter((project) => project.client._id === clientId)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setProjects(sortedProjects);
      } catch (error) {
        console.log("Fetching projects error: " + error);
      }
    };
    getProjects();
  }, [clientId]);

  const handlePaymentStatusChange = (event) => {
    setCurrentPaymentStatus(event.target.value);
  };

  const handleMilestoneUpdate = (index, event) => {
    const updatedMilestones = [...milestonesList];
    updatedMilestones[index] = event.target.value;
    setMilestonesList(updatedMilestones);
  };

  const handleMilestoneDescriptionChange = (event) => {
    setMilestoneDescription(event.target.value);
  };

  const handleMilestoneDueDateChange = (event) => {
    setMilestoneDueDate(event.target.value);
  };

  const updateProjectDetails = async (projectId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:3002/api/projects/${projectId}/update_milestones`,
        {
          paymentStatus: currentPaymentStatus,
          milestones: [
            { description: milestoneDescription, dueDate: milestoneDueDate },
          ],
        },
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      console.log(response);

      setIsMilestoneCardVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfile = (id) => {
    navigate(`/user/profile/${id}`);
  };

  const openMilestoneCard = (projectId) => {
    setSelectedProjectId(projectId);
    setIsMilestoneCardVisible(true);
  };

  const closeMilestoneCard = () => {
    setIsMilestoneCardVisible(false);
    setMilestoneDescription("");
    setMilestoneDueDate("");
  };

  const submitMilestone = () => {
    if (selectedProjectId) {
      updateProjectDetails(selectedProjectId);
      toast.success("Milestone updated succesfully");
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-3xl font-bold mb-6 mt-[120px]">Project Overview</h2>
      {projects.length > 0 ? (
        projects.map((project) => (
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
                      {project.jobPosting.budget}.Rs
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
                {project.freelancer && (
                  <div className="flex flex-col items-center border p-4 rounded mb-4 text-center">
                    <h4 className="text-xl font-bold mb-2">Freelancer</h4>
                    <img
                      src={
                        project.freelancer.profile_image.length > 0
                          ? `http://localhost:3002/${project.freelancer.profile_image[0]}`
                          : "/default-profile-image.jpg"
                      }
                      alt="Freelancer Profile"
                      className="w-24 h-24 rounded-full mb-4 object-cover"
                    />
                    <p className="font-bold mb-2">
                      {project.freelancer.user_name}
                    </p>
                    <p className="mb-2">{project.freelancer.email}</p>
                    <p className="mb-4">{project.freelancer.company_name}</p>
                    <button
                      onClick={() => handleProfile(project.freelancer._id)}
                      className="text-white bg-[#141C3A] border focus:ring-4 focus:outline-none hover:border-[#141C3A] hover:text-[#141C3A] hover:bg-[#ffffff] font-medium rounded-lg text-sm px-5 py-2 text-center"
                    >
                      View Profile
                    </button>
                  </div>
                )}
              </div>

              {/* Project Status, Milestones, and Payment Status */}
              <div className="md:w-1/2">
                <div className="mb-6">
                  <h4 className="text-xl font-bold mb-2">Project Status</h4>
                  <p className="mb-2">{project.status}</p>
                  <p className="text-sm text-gray-500">
                    Last Updated: {new Date(project.updatedAt).toLocaleString()}
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="text-xl font-bold mb-2">Milestones</h4>
                  {project.milestones && Array.isArray(project.milestones) ? (
                    project.milestones.map((milestone, index) => (
                      <input
                        key={index}
                        type="text"
                        value={milestone.description}
                        onChange={(e) => handleMilestoneUpdate(index, e)}
                        className="border p-2 rounded mb-2 w-full"
                        placeholder={`Milestone ${index + 1}`}
                      />
                    ))
                  ) : (
                    <p>No milestones found</p>
                  )}
                  <button
                    onClick={() => openMilestoneCard(project._id)}
                    className="text-white bg-[#141C3A] border focus:ring-4 focus:outline-none hover:border-[#141C3A] hover:text-[#141C3A] hover:bg-[#ffffff] font-medium rounded-lg text-sm px-5 py-2 text-center"
                  >
                    Add/Update Milestones
                  </button>
                </div>

                <div className="mb-6">
                  <h4 className="text-xl font-bold mb-2">Payment Status</h4>
                  <select
                    value={currentPaymentStatus}
                    onChange={handlePaymentStatusChange}
                    className="border p-2 rounded mb-4 w-full"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                  </select>
                  <button
                    onClick={() => updateProjectDetails(project._id)}
                    className="text-white bg-[#141C3A] border focus:ring-4 focus:outline-none hover:border-[#141C3A] hover:text-[#141C3A] hover:bg-[#ffffff] font-medium rounded-lg text-sm px-5 py-2 text-center"
                  >
                    Update Payment Status
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No projects found</p>
      )}

      {/* Milestone Card */}
      {isMilestoneCardVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Add Milestone</h3>
            <input
              type="text"
              value={milestoneDescription}
              onChange={handleMilestoneDescriptionChange}
              className="border p-2 rounded mb-4 w-full"
              placeholder="Milestone Description"
            />
            <input
              type="date"
              value={milestoneDueDate}
              onChange={handleMilestoneDueDateChange}
              className="border p-2 rounded mb-4 w-full"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={closeMilestoneCard}
                className="text-white bg-red-500 border focus:ring-4 focus:outline-none hover:border-gray-500 hover:text-red-500 hover:bg-[#ffffff] font-medium rounded-lg text-sm px-5 py-2 text-center"
              >
                Cancel
              </button>
              <button
                onClick={submitMilestone}
                className="text-white bg-[#141C3A] border focus:ring-4 focus:outline-none hover:border-[#141C3A] hover:text-[#141C3A] hover:bg-[#ffffff] font-medium rounded-lg text-sm px-5 py-2 text-center"
              >
                Add Milestone
              </button>
            </div>
          </div>
        </div>
      )}

      <CustomToastContainer />
    </div>
  );
};

export default ProjectPageClient;
