import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdErrorOutline } from "react-icons/md";

function FindJobs() {
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [skills, setSkills] = useState([]);
  const [client, setClient] = useState([]);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/job/");

      const sortedJobs = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setJobs(sortedJobs);
      setClient();
    } catch (error) {
      console.error("Error while fetching jobs:", error);
      // Handle error state in UI or log more specific details for debugging
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    // Fetch categories from backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/api/admin/category"
        );
        // console.log("Fetched Categories: ", response.data);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
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

    const fetchClient = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3002/auth/users", {
          headers: {
            authorization: `${token}`,
          },
        });
        setClient(response.data);
        console.table(response.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
    fetchClient();
    fetchCategories();
  }, []);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Returns 'YYYY-MM-DD'
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesCategory = selectedCategory
      ? job.category === selectedCategory
      : true;
    const matchesSearch = job.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryName = (categoryId) => {
    const category = categories.find((category) => category._id === categoryId);
    return category ? category.category_name : "Unknown Category";
  };

  const handleApply = (jobId) => {
    console.log("eh");
  };

  return (
    <div className="flex">
      <div className="w-[20%] border-r border-gray-200 p-4 fixed h-full mt-[100px]">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by title"
            className="w-full rounded border p-2"
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
        <h2 className="mb-2 font-bold">Filter by Category</h2>
        <div className="flex flex-col">
          {categories.map((category) => (
            <label key={category._id} className="mb-2">
              <input
                type="radio"
                value={category._id}
                checked={selectedCategory === category._id}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="mr-2"
              />
              {category.category_name}
            </label>
          ))}
        </div>
      </div>
      <div className="p-4 w-[80%] ml-[20%] pt-[100px]">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => {
            const jobSkills = skills.filter((skill) =>
              job.requirements.includes(skill._id)
            );
            const clientData = () => {
              client &&
                client.map((cl) => {
                  if (job.client === cl._id) {
                    console.log(cl.user_name);
                    return cl.user_name;
                  }
                });
            };

            return (
              <section
                key={job._id}
                className="flex items-center justify-center"
              >
                <div className="m-4 mx-auto w-[900px] rounded-md border border-gray-100 text-[#141c3a] shadow-md">
                  <div className="relative grid h-full grid-cols-[70%_auto] text-[#141c3a] md:flex-row">
                    <div className="relative p-8">
                      <div className="flex flex-col md:flex-row">
                        <h2 className="mb-2 text-3xl font-black">
                          {job.title}
                        </h2>
                      </div>

                      <div className="flex">
                        <span>Budget : </span>
                        <h3 className="mb-5 ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900">
                          {job.budget}.Rs
                        </h3>
                      </div>

                      <p className="text-xl font-black">
                        {getCategoryName(job.category)}
                      </p>
                      <div className="mt-2">
                        <span>Description : </span>
                        <p className="font-sans text-base tracking-normal">
                          {job.description}
                        </p>
                      </div>
                      <div className="flex gap-2 mt-7">
                        <button
                          onClick={() => {
                            handleApply(job._id);
                          }}
                          className="text-white bg-[#141C3A] border focus:ring-4 focus:outline-none hover:border-[#141C3A] active:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center w-[25%]"
                        >
                          Apply here
                        </button>
                      </div>
                      <div className="mt-5 flex space-y-3 w-[100%] text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                        <div>
                          Deadline:
                          <span className="ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900">
                            {formatDate(job.deadline)}
                          </span>
                        </div>
                        <div>
                          Skills Required:
                          <span className="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900">
                            {jobSkills
                              .map((skill) => skill.skill_name)
                              .join(", ")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mx-auto flex items-center px-5 pt-1 md:p-8 z-10">
                      <img
                        className="block h-70px max-w-[200px] rounded-md shadow-lg"
                        src="https://www.google.com/imgres?q=inage%20link&imgurl=https%3A%2F%2Fcompote.slate.com%2Fimages%2F22ce4663-4205-4345-8489-bc914da1f272.jpeg%3Fcrop%3D1560%252C1040%252Cx0%252Cy0&imgrefurl=https%3A%2F%2Fslate.com%2Fculture%2F2023%2F05%2Ftears-kingdom-switch-zelda-link-character-review.html&docid=NUgwR0lsniTTRM&tbnid=2MSkattmMU6XhM&vet=12ahUKEwj-8q3itKiHAxXowTgGHbMtCiYQM3oECBwQAA..i&w=1560&h=1040&hcb=2&ved=2ahUKEwj-8q3itKiHAxXowTgGHbMtCiYQM3oECBwQAA"
                        alt={clientData()}
                      />
                    </div>
                  </div>
                </div>
              </section>
            );
          })
        ) : (
          <div className="h-[80vh] w-full flex justify-center items-center">
            <h1 className="text-[30px]">
              <MdErrorOutline className="ml-20" />
              <span>No Jobs Found</span>
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default FindJobs;
