import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CustomToastContainer from "../../components/common/ToastContainer";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

const PostJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: " ",
    description: " ",
    requirements: [], //array of skill IDs
    category: " ",
    budget: " ",
    deadline: " ",
    client: " ",
  });

  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]); //to get multiple data we use array to store
  // const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3002/api/job/${jobId}`,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      setFormData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error while fetching jobs:", error);
    }
  };

  // Call fetchJobs inside useEffect to ensure it runs after component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/api/admin/skill"
        );
        setSkills(response.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/api/admin/category"
        );

        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchSkills();
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    const updatedRequirements = [...formData.requirements];

    if (e.target.checked) {
      updatedRequirements.push(value);
    } else {
      const index = updatedRequirements.indexOf(value);
      if (index !== -1) {
        updatedRequirements.splice(index, 1);
      }
    }

    setFormData({ ...formData, requirements: updatedRequirements });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3002/api/job/edit/${jobId}`,
        formData,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );

      toast.success("Job updated succesffuly", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Error creating job posting:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const today = new Date().toISOString().split("T")[0];

  const navigateToPostJob = () => {
    navigate("/client/postJob");
  };
  return (
    <>
      <h1 className="flex justify-center items-center ">
        <span className="sm:text-[30px] text-[25px] font-serif font-bold mt-16 sm:mt-32">
          JOB UPDATE FORM
        </span>
      </h1>
      <div className="flex justify-center items-center w-full mt-10 sm:mt-8 sm:mb-2 mb-10">
        <form
          onSubmit={handleSubmit}
          className="grid sm:grid-cols-1 grid-cols-1 w-[80%] gap-4 justify-center items-center"
        >
          <div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-[#141C3A]">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                className="shadow-sm bg-gray-50 border border-gray-300 text-[#141C3A] text-sm rounded-lg focus:text-[#141C3A]  block p-2.5 w-full"
                placeholder="Project Title"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-[#141C3A]">
                Budget
              </label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                className="shadow-sm bg-gray-50 border  text-sm rounded-lg text-[#141C3A] block w-full p-2.5 "
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-[#141C3A] ">
                description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                rows="4"
                className="block p-2.5 w-full text-sm text-[#141C3A] bg-gray-50 rounded-lg border text-[#141C3A]focus:text-[#141C3A] focus:text-[#141C3A]"
                placeholder="Project Description..."
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-[#141C3A]">
                category
              </label>
              <select
                id="countries"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="bg-gray-50 border text-[#141C3A] text-sm rounded-lg focus:text-[#141C3A]focus:text-[#141C3A] block w-full p-2.5"
              >
                <option value="">Select categories</option>
                {categories &&
                  categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.category_name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-[#141C3A]">
                Skills Required
              </label>

              <div className="grid gap-2 items-center sm:grid-cols-4 grid-cols-2   w-full">
                {skills &&
                  skills.map((skill) => (
                    <label key={skill._id} className="flex items-center">
                      <input
                        id={skill._id}
                        value={skill._id}
                        type="checkbox"
                        checked={formData.requirements.includes(skill._id)}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-[#141C3A] bg-gray-100 rounded focus:ring-[#141C3A]"
                      />
                      <span className="ml-2 text-[14px]">
                        {skill.skill_name}
                      </span>
                    </label>
                  ))}
              </div>
            </div>

            <div className="deadline mb-5">
              <label className="block mb-2 text-sm font-medium text-[#141C3A]">
                Deadline
              </label>
              <input
                className="shadow-sm bg-gray-50 border border-gray-300 text-[#141C3A] text-sm rounded-lg focus:text-[#141C3A] block w-full p-2.5 "
                type="date"
                name="deadline"
                value={formData.deadline || today}
                onChange={handleChange}
                required
                min={today}
              />
            </div>
          </div>
          <div className="flex justify-center items-center gap-6 mt-10 mb-10 md:flex-row flex-col">
            <button
              type="submit"
              className="text-white bg-[#141C3A] border focus:ring-4 focus:outline-none hover:border-[#141C3A]
              hover:text-[#141C3A] hover:bg-[#ffffff] font-medium rounded-lg text-sm px-5 py-2.5 text-center w-[70%] sm:w-[30%]"
            >
              Update Job
            </button>
            <button
              type="submit"
              onClick={navigateToPostJob}
              className="text-white bg-[#141C3A] border focus:ring-4 focus:outline-none hover:border-[#141C3A]
              hover:text-[#141C3A] hover:bg-[#ffffff] font-medium rounded-lg text-sm px-5 py-2.5 text-center w-[70%] sm:w-[30%]"
            >
              Back to Post Job
            </button>
          </div>
        </form>
      </div>

      {/* <button onClick={fetchJobs} className="border border-black">
          fetch
        </button> */}
      <CustomToastContainer />
    </>
  );
};

export default PostJob;
