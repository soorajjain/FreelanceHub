import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: " ",
    description: " ",
    requirements: [], // Now an array of skill IDs
    category: " ",
    budget: " ",
    deadline: " ",
    client: " ",
  });

  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]); //to get multiple data we use array to store
  const [jobs, setJobs] = useState([]);
  const [user, setUsers] = useState([]);
  console.log(user);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/api/clients/job_posting"
      );
      const sortedJobs = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setJobs(sortedJobs);
    } catch (error) {
      console.log("Error while fetching jobs");
    }
  };

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

    const fetchJobs = async () => {
      try {
        await axios
          .get("http://localhost:3002/api/clients/job_posting")
          .then((response) => setJobs(response.data));
      } catch (error) {
        console.log("Error while fetching jobs");
      }
    };

    const fetchClient = async () => {
      try {
        await axios
          .get("http://localhost:3002/api/auth/register")
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
        "http://localhost:3002/api/clients/job_posting",
        formData,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );

      console.log(response.data);

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
    return `${day}-${month}-${year}`;
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
              className="text-white bg-[#141C3A] border focus:ring-4 focus:outline-none hover:border-[#141C3A]
              hover:text-[#141C3A] hover:bg-[#ffffff] font-medium rounded-lg text-sm px-5 py-2.5 text-center w-[40%] sm:w-[30%]"
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
          const client =
            user &&
            user.map((client) => {
              if (client._id === job.client) {
                return client.user_name;
              }
            });

          return (
            <div
              className="job_card mx-auto  p-5 w-[80%] border border-black mt-10 mb-10 rounded-sm"
              key={job._id}
            >
              <div className="flex justify-center items-start w-full">
                <h1 className="category mb-8 text-[18px]">
                  Category : {category}
                </h1>
              </div>
              <div className="main_card grid sm:grid-cols-[40%_auto]">
                <div className="banner bg-gray-400 h-[250px] mt-10">
                  image appears here
                </div>
                <div className="main_info grid sm:grid-cols-2  ml-5">
                  <div className="info-1 flex flex-col gap-10">
                    <h1 className="title text-center text-[24px] font-bold">
                      {job.title}
                    </h1>
                    <p className="description text-left text-[16px] w-full">
                      {job.description}
                    </p>
                  </div>
                  <div className="info-2 info-1 flex flex-col gap-10 mt-16">
                    <h2 className="text-center text-[18px] ">
                      <span className="font-bold"> Deadline </span>
                      <br />

                      {formatDate(job.deadline)}
                    </h2>
                    <h2 className="budget text-center text-[18px] ">
                      <span className="font-bold"> Budget </span>
                      <br />
                      {job.budget}
                    </h2>
                    <h2 className="req_skills text-center text-[18px]">
                      <span className="font-bold"> Skills required </span>
                      <br />

                      {jobSkills.map((skill) => skill.skill_name).join(", ")}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="text-[18px] flex flex-col justify-center items-center mt-10">
                <h1 className="font-bold mb-2">Job Posted by</h1>
                <div className="flex w-fit border border-black mx-auto justify-center items-center text-[18px]">
                  <div className="profile_pic bg-gray-400 w-[50%] h-[50px]">
                    Profile
                  </div>
                  <h1 className="name text-[18px] px-10">
                    <span>{client}</span>
                  </h1>
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
