import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CustomToastContainer from "../../components/common/ToastContainer";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

const EditUserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_name: " ",
    role: " ",
    email: " ",
    skills: [], //array of skill IDs
    password: " ",
    about: " ",
    experience: " ",
    company_name: " ",
    // resume: [""],
    // profile_image: [""],
  });

  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]); //to get multiple data we use array to store
  // const [jobs, setJobs] = useState([]);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3002/auth/users/${id}`,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      // console.log(response.data);
      setFormData(response.data);
    } catch (error) {
      console.log("clientprofile" + error);
    }
  };

  // Call fetchJobs inside useEffect to ensure it runs after component mount
  useEffect(() => {
    fetchUser();
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

    fetchSkills();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    const updatedRequirements = [...formData.skills];

    if (e.target.checked) {
      updatedRequirements.push(value);
    } else {
      const index = updatedRequirements.indexOf(value);
      if (index !== -1) {
        updatedRequirements.splice(index, 1);
      }
    }

    setFormData({ ...formData, skills: updatedRequirements });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      console.log(formData);
      const response = await axios.put(
        `http://localhost:3002/auth/users/edit/${id}`,
        formData,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );

      toast.success("User profile updated succesffuly", {
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
      console.error("Error Updating user:", error);
    }
  };

  //   const formatDate = (dateString) => {
  //     const date = new Date(dateString);
  //     const year = date.getFullYear();
  //     const month = String(date.getMonth() + 1).padStart(2, "0");
  //     const day = String(date.getDate()).padStart(2, "0");
  //     return `${year}-${month}-${day}`;
  //   };

  const navigateToPostJob = () => {
    navigate(`/user/profile/${id}`);
  };
  return (
    <>
      <h1 className="flex justify-center items-center mt-4 sm:mt-10">
        <span className="sm:text-[30px] text-[25px] font-serif font-bold">
          USER PROFILE UPDATE
        </span>
      </h1>
      <div className="flex justify-center items-center w-full mt-10 sm:mt-14 sm:mb-28  mb-14">
        <form
          onSubmit={handleSubmit}
          className="grid sm:grid-cols-1 grid-cols-1 w-[80%] gap-4"
        >
          <div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-[#141C3A]">
                Name
              </label>
              <input
                name="user_name"
                type="text"
                value={formData.user_name}
                className="shadow-sm bg-gray-50 border border-gray-300 text-[#141C3A] text-sm rounded-lg focus:text-[#141C3A]  block p-2.5 w-full"
                placeholder="Project Title"
                required
                onChange={handleChange}
              />
            </div>

            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-[#141C3A]">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                className="shadow-sm bg-gray-50 border  text-sm rounded-lg text-[#141C3A] block w-full p-2.5 "
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-[#141C3A]">
                Company Name
              </label>
              <input
                name="company_name"
                type="text"
                value={formData.company_name}
                className="shadow-sm bg-gray-50 border border-gray-300 text-[#141C3A] text-sm rounded-lg focus:text-[#141C3A]  block p-2.5 w-full"
                placeholder="Project Title"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-[#141C3A] ">
                About
              </label>
              <textarea
                id="description"
                name="about"
                value={formData.about}
                rows="4"
                className="block p-2.5 w-full text-sm text-[#141C3A] bg-gray-50 rounded-lg border text-[#141C3A]focus:text-[#141C3A] focus:text-[#141C3A]"
                placeholder="Project Description..."
                onChange={handleChange}
              ></textarea>
            </div>

            {/* <div className="mb-5">
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
            </div> */}

            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-[#141C3A]">
                Skills
              </label>

              <div className="grid gap-2 items-center sm:grid-cols-4 grid-cols-2   w-full">
                {skills &&
                  skills.map((skill) => (
                    <label key={skill._id} className="flex items-center">
                      <input
                        id={skill._id}
                        value={skill._id}
                        type="checkbox"
                        checked={formData.skills.includes(skill._id)}
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
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-[#141C3A]">
                Experience
              </label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                className="shadow-sm bg-gray-50 border  text-sm rounded-lg text-[#141C3A] block w-full p-2.5 "
                required
                onChange={handleChange}
              />
            </div>

            {/* <div className="deadline mb-5">
              <label className="block mb-2 text-sm font-medium text-[#141C3A]">
                Deadline
              </label>
              <input
                className="shadow-sm bg-gray-50 border border-gray-300 text-[#141C3A] text-sm rounded-lg focus:text-[#141C3A] block w-full p-2.5 "
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
              />
            </div> */}
          </div>
          <div className="flex justify-center items-center gap-6 mt-10 mb-10 md:flex-row flex-col">
            <button
              type="submit"
              className="text-white bg-[#141C3A] border focus:ring-4 focus:outline-none hover:border-[#141C3A]
              active:text-[#141C3A] active:bg-[#ffffff] font-medium rounded-lg text-sm px-5 py-2.5 text-center w-[70%] sm:w-[20%]"
            >
              Update Profile
            </button>
            <button
              type="submit"
              onClick={navigateToPostJob}
              className="text-white bg-[#141C3A] border focus:ring-4 focus:outline-none hover:border-[#141C3A]
              active:text-[#141C3A] active:bg-[#ffffff] font-medium rounded-lg text-sm px-5 py-2.5 text-center w-[70%] sm:w-[20%]"
            >
              Back to Profile
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

export default EditUserProfile;
