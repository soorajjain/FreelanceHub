import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: [], // Now an array of skill IDs
    category: "",
    budget: "",
    deadline: "",
    client: "",
  });

  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch skills from backend
    const fetchSkills = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/api/admin/addskill"
        );
        setSkills(response.data); // Assuming backend returns an array of skills
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    // Fetch categories from backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/api/admin/addcategory"
        );
        console.log(response);
        setCategories(response.data); // Assuming backend returns an array of categories
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
      const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
      const response = await axios.post(
        "http://localhost:3002/api/clients/job_posting",
        formData,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );

      toast(response.data.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error creating job posting:", error);
    }
  };

  return (
    <>
      <h1 className="flex justify-center items-center mt-4 sm:mt-10">
        <span className="sm:text-[30px] text-[25px] font-serif font-bold">
          JOB POST FORM
        </span>
      </h1>
      <div className="flex justify-center items-center w-full mt-10 sm:mt-14 sm:mb-28  mb-14 ">
        <form
          className="grid sm:grid-cols-2 grid-cols-1 w-[80%] gap-4 justify-center items-center"
          onSubmit={handleSubmit}
        >
          <div className="mb-5">
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-[#141C3A]"
            >
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
            <label
              for="budget"
              className="block mb-2 text-sm font-medium text-[#141C3A]"
            >
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
            <label
              for="description"
              className="block mb-2 text-sm font-medium text-[#141C3A] "
            >
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
              {categories &&
                categories.map((cat) => (
                  <option id={cat._id} value={cat._id}>
                    {cat.category_name}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-[#141C3A]">
              Skills Required
            </label>

            <div className="grid gap-2 items-center sm:grid-cols-4 grid-cols-2  w-full">
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
                    <span className="ml-2">{skill.skill_name}</span>
                  </label>
                ))}
            </div>
          </div>

          <div class="deadline mb-5">
            <label
              for="budget"
              class="block mb-2 text-sm font-medium text-[#141C3A]"
            >
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
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="text-white bg-[#141C3A] focus:ring-4 focus:outline-none focus:text-[#141C3A] font-medium rounded-lg text-sm px-5 py-2.5 text-center w-[40%] sm:w-[30%]"
            >
              Post Job
            </button>
          </div>
        </form>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </>
  );
};

export default PostJob;
