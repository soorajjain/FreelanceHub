import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CustomToastContainer from "../../components/common/ToastContainer";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
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
  const [jobs, setJobs] = useState([]);
  const [user, setUsers] = useState([]);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/job/");
      const sortedJobs = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setJobs(sortedJobs);
    } catch (error) {
      console.error("Error while fetching jobs:", error);
      // Handle error state in UI or log more specific details for debugging
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
        setSkills(response.data); // Assuming backend returns an array of skills
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    // Fetch categories from backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/api/admin/category"
        );

        setCategories(response.data); // Assuming backend returns an array of categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchClient = async () => {
      try {
        await axios
          .get("http://localhost:3002/auth/users/")
          .then((response) => setUsers(response.data));
      } catch (error) {
        console.log("Error while fetching user");
      }
    };

    fetchSkills();
    fetchCategories();
    fetchClient();
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
      const response = await axios.post(
        "http://localhost:3002/api/job/postJob",
        formData,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );

      // console.log("Response:", response);

      toast.success("Job posted succesffuly", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        toast("Scroll down to see the job", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }, 1000);

      await fetchJobs();

      // Reset form data after successful submission
      setFormData({
        title: "",
        description: "",
        requirements: [],
        category: "",
        budget: "",
        deadline: "",
        client: "",
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

  const handleUpdateJob = (jobId) => {
    navigate(`/client/updateJob/${jobId}`);
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3002/api/job/delete/${jobId}`, {
        headers: {
          authorization: `${token}`,
        },
      });

      toast.success("Job deleted successfully");

      await fetchJobs(); // Fetch updated job list after deletion
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <>
      <h1 className="flex justify-center items-center">
        <span className="sm:text-[30px] text-[25px] font-serif font-bold mt-16 sm:mt-32">
          JOB POST FORM
        </span>
      </h1>
      <div className="flex justify-center items-center w-full mt-10 sm:mt-8 sm:mb-2 mb-10 ">
        <form
          className="grid sm:grid-cols-1 grid-cols-1 w-[80%] gap-4 justify-center items-center"
          onSubmit={handleSubmit}
        >
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
                    <span className="ml-2 text-[14px]">{skill.skill_name}</span>
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
              value={formData.deadline}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="text-white bg-[#141C3A] border focus:ring-4 focus:outline-none hover:border-[#141C3A]
              hover:text-[#141C3A] hover:bg-[#ffffff] font-medium rounded-lg text-sm px-5 py-2.5 text-center w-[40%] sm:w-[30%]"
            >
              Post Job
            </button>
          </div>
        </form>
        <CustomToastContainer />
      </div>

      {/* get posted jobs started here */}
      {/* job posting */}

      {jobs &&
        jobs.map((job) => {
          const jobSkills = skills.filter((skill) =>
            job.requirements.includes(skill._id)
          );
          const category = categories.map((cat) => {
            if (job.category === cat._id) {
              return cat.category_name;
            }
          });
          // const client =
          //   user &&
          //   user.map((client) => {
          //     if (client._id === job.client) {
          //       return client.user_name;
          //     }
          //   });

          return (
            <div key={job._id} className="m-5">
              <div className="group mt-10 grid max-w-screen-xl grid-cols-12 space-x-8 overflow-hidden rounded-lg border py-8 text-gray-700 shadow transition hover:shadow-lg sm:mx-auto">
                <div className="col-span-11 flex flex-col pr-8 text-left sm:pl-4 mx-10">
                  {/* Job details */}
                  <h3 className="text-sm text-gray-600">
                    Category: {category?.category_name}
                  </h3>
                  <a
                    href="#"
                    className="mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-xl"
                  >
                    {job.title}
                  </a>
                  <h3 className="text-sm text-gray-600">Requirements:</h3>
                  <p className="overflow-hidden pr-7 text-sm">
                    {job.description}
                  </p>

                  <div className="mt-5 flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                    {/* Additional details */}
                    <div className="">
                      Deadline:
                      <span className="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900">
                        {formatDate(job.deadline)}
                      </span>
                    </div>
                    <div className="">
                      Budget:
                      <span className="ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900">
                        {job.budget} Rs
                      </span>
                    </div>
                    <div className="">
                      Skills:
                      <span className="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900">
                        {jobSkills.map((skill) => skill.skill_name).join(", ")}
                      </span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex mt-3">
                    <button
                      type="button"
                      className="text-white bg-[#141C3A] border focus:ring-4 focus:outline-none hover:border-[#141C3A] hover:text-[#141C3A] hover:bg-[#ffffff] font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3"
                      onClick={() => handleUpdateJob(job._id)}
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="text-white bg-red-500 border focus:ring-4 focus:outline-none hover:border-red-500 hover:text-red-500 hover:bg-[#ffffff] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      onClick={() => {
                        handleDeleteJob(job._id);
                        console.log("hey");
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      {/* get posted jobs ends here */}
    </>
  );
};

export default PostJob;
