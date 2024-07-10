import axios from "axios";
import React, { useEffect, useState } from "react";
import profile from "../../assets/profile.png";

function FindFreelancers() {
  const [users, setUsers] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3002/auth/users?role=freelancer",
          {
            headers: {
              authorization: `${token}`,
            },
          }
        );
        const freelancers = response.data.filter(
          (user) => user.role === "freelancer"
        );
        const sortedFreelancers = freelancers.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setUsers(sortedFreelancers);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

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

    fetchUsers();
    fetchSkills();
  }, []);

  return (
    <>
      {users.map((user) => {
        const jobSkills = skills.filter((skill) =>
          user.skills.includes(skill._id)
        );

        return (
          <section key={user._id} className="w-screen">
            <div className="m-4 mx-auto max-w-screen-lg rounded-md border border-gray-100 text-gray-600 shadow-md">
              <div className="relative flex h-full flex-col text-gray-600 md:flex-row">
                <div className="relative p-8 md:w-4/6">
                  <div className="flex flex-col md:flex-row">
                    <h2 className="mb-2 text-4xl font-black">
                      {user.user_name}
                    </h2>
                  </div>
                  <h3 className="mb-2 text-sm">{user.email}</h3>

                  <div className="flex ">
                    <p className="text-2xl font-black">{user.company_name}</p>
                  </div>
                  <p className="mt-3 font-sans text-base tracking-normal">
                    {user.about}
                  </p>
                  {/* <div className="mt-8 flex flex-col sm:flex-row">
                    <button className="mr-2 mb-4 flex cursor-pointer items-center justify-center rounded-md bg-emerald-400 py-2 px-8 text-center text-white transition duration-150 ease-in-out hover:translate-y-1 hover:bg-emerald-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Buy now
                    </button>
                    <button className="mr-2 mb-4 flex cursor-pointer items-center justify-center rounded-md border py-2 px-8 text-center text-gray-500 transition duration-150 ease-in-out hover:translate-y-1 hover:bg-rose-500 hover:text-white">
                      Preview
                    </button>
                  </div> */}
                  <div className="mt-7">
                    <a
                      href={`http://localhost:3002/${user.resume}`}
                      className="text-white bg-[#141C3A] border focus:ring-4 focus:outline-none hover:border-[#141C3A] active:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center w-[30%] "
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Resume
                    </a>
                  </div>

                  <div className="mt-5 grid grid-cols-2 space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                    {/* Additional details */}
                    <div className="">
                      Experience:
                      <span className="ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900">
                        {user.experience}
                      </span>
                    </div>
                    <div className="">
                      Skills:
                      <span className="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900">
                        {jobSkills.map((skill) => skill.skill_name).join(", ")}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mx-auto flex items-center px-5 pt-1 md:p-8 z-0">
                  <img
                    className="block h-70px max-w-[200px] rounded-md shadow-lg"
                    src={
                      user &&
                      Array.isArray(user.profile_image) &&
                      user.profile_image.length > 0
                        ? `http://localhost:3002/${user.profile_image}`
                        : profile
                    }
                    alt="Shop image"
                  />
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}

export default FindFreelancers;
