import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CustomToastContainer from "../../components/common/ToastContainer";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const EditUserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [formData, setFormData] = useState({
    user_name: "",
    role: "",
    email: "",
    skills: [], // array of skill IDs
    password: "",
    about: "",
    experience: "",
    company_name: "",
    resume: "",
    profile_image: "",
  });

  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]); // to get multiple data we use array to store

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
      setFormData(response.data);
    } catch (error) {
      console.log("clientprofile" + error);
    }
  };

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

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
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
    const token = localStorage.getItem("token");

    const data = new FormData();
    for (const key in formData) {
      if (formData[key] instanceof File) {
        data.append(key, formData[key]);
      } else if (Array.isArray(formData[key])) {
        formData[key].forEach((item) => data.append(`${key}[]`, item));
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.put(
        `http://localhost:3002/auth/users/edit/${id}`,
        data,
        {
          headers: {
            authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("User profile updated successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const navigateToPostJob = () => {
    navigate(`/user/profile/${id}`);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.role) {
          setRole(decodedToken.role);
        }
      } catch (error) {
        console.error("Invalid token");
      }
    }
  }, []);

  return (
    <>
      <h1 className="flex justify-center items-center mt-4 sm:mt-10">
        <span className="sm:text-[30px] text-[25px] font-serif font-bold">
          USER PROFILE UPDATE
        </span>
      </h1>
      <div className="flex justify-center items-center w-full mt-10 sm:mt-14 sm:mb-28 mb-14">
        <form
          onSubmit={handleSubmit}
          className="grid sm:grid-cols-1 grid-cols-1 w-[80%] gap-4"
          encType="multipart/form-data"
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
                className="shadow-sm bg-gray-50 border border-gray-300 text-[#141C3A] text-sm rounded-lg focus:text-[#141C3A] block p-2.5 w-full"
                placeholder="Name"
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
                className="shadow-sm bg-gray-50 border text-sm rounded-lg text-[#141C3A] block w-full p-2.5"
                required
                onChange={handleChange}
              />
            </div>

            {role === "client" ? (
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-[#141C3A]">
                  Company Name *
                </label>
                <input
                  name="company_name"
                  type="text"
                  value={formData.company_name}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-[#141C3A] text-sm rounded-lg focus:text-[#141C3A] block p-2.5 w-full"
                  placeholder="Company Name"
                  required
                  onChange={handleChange}
                />
              </div>
            ):(
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-[#141C3A]">
                  Designation *
                </label>
                <input
                  name="company_name"
                  type="text"
                  value={formData.company_name}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-[#141C3A] text-sm rounded-lg focus:text-[#141C3A] block p-2.5 w-full"
                  placeholder="Company Name"
                  required
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-[#141C3A]">
                About *
              </label>
              <textarea
                id="about"
                name="about"
                value={formData.about}
                rows="4"
                className="block p-2.5 w-full text-sm text-[#141C3A] bg-gray-50 rounded-lg border focus:text-[#141C3A]"
                placeholder="About"
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-[#141C3A]">
                Skills
              </label>
              <div className="grid gap-2 items-center sm:grid-cols-4 grid-cols-2 w-full">
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
                Experience *
              </label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                className="shadow-sm bg-gray-50 border text-sm rounded-lg text-[#141C3A] block w-full p-2.5"
                required
                onChange={handleChange}
              />
            </div>
            {role === "freelancer" && (
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-[#141C3A]">
                  Resume
                </label>
                <input
                  type="file"
                  name="resume"
                  className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
                  onChange={handleFileChange}
                />
              </div>
            )}

            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-[#141C3A]">
                Profile Image
              </label>
              <input
                type="file"
                name="profile_image"
                className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="mt-10 mr-2 text-white bg-[#141C3A] hover:bg-[#1E293B] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Update
              </button>
              <button
                type="button"
                className="mt-10 ml-2 text-white bg-[#141C3A] hover:bg-[#1E293B] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                onClick={navigateToPostJob}
              >
                Go Back
              </button>
            </div>
          </div>
        </form>
      </div>
      <CustomToastContainer />
    </>
  );
};

export default EditUserProfile;
