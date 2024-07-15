import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdErrorOutline } from "react-icons/md";

function FindJobs() {
  const [jobs, setJobs] = useState([]);
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);

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

    fetchSkills();
    fetchCategories();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      {jobs && jobs.length > 0 ? (
        jobs.map((job) => {
          const jobSkills = skills.filter((skill) =>
            job.requirements.includes(skill._id)
          );
          const category = categories.find((cat) => job.category === cat._id);
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
                  {/* <div className="flex mt-3">
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
                  </div> */}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="h-[80vh] w-full flex justify-center items-center">
          <h1 className=" text-[30px]">
            <MdErrorOutline className="ml-20" />
            <span>No jobs available</span>{" "}
          </h1>
        </div>
      )}
    </div>
  );
}

export default FindJobs;
