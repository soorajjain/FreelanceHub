// http://localhost:3000/client/freelancers

import axios from "axios";
import React, { useEffect, useState } from "react";
import profile from "../../assets/profile.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CustomToastContainer from "../../components/common/ToastContainer";

function FindFreelancers() {
  const [users, setUsers] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3002/auth/users", {
        headers: {
          authorization: `${token}`,
        },
      });
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
      const response = await axios.get("http://localhost:3002/api/admin/skill");
      setSkills(response.data); // Assuming backend returns an array of skills
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Access Denied");
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }

        await fetchUsers();
        await fetchSkills();
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleClick = (id) => {
    navigate(`/user/profile/${id}`);
  };

  const handleSkillChange = (skillId) => {
    setSelectedSkills((prev) =>
      prev.includes(skillId)
        ? prev.filter((s) => s !== skillId)
        : [...prev, skillId]
    );
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSkills = selectedSkills.length
      ? user.skills.some((skill) => selectedSkills.includes(skill))
      : true;
    const matchesSearch = user.user_name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSkills && matchesSearch;
  });

  return (
    <div className="flex ">
      <div className="w-[20%] border-r border-gray-200 p-4 fixed h-full mt-[100px] hidden lg:block">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name"
            className="w-full rounded border p-2"
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
        <h2 className="mb-2 font-bold">Filter by Skills</h2>
        <div className="flex flex-col">
          {skills.map((skill) => (
            <label key={skill._id} className="mb-2">
              <input
                type="checkbox"
                value={skill._id}
                checked={selectedSkills.includes(skill._id)}
                onChange={(e) => handleSkillChange(e.target.value)}
                className="mr-2"
              />
              {skill.skill_name}
            </label>
          ))}
        </div>
      </div>
      <div className="p-4 lg:w-[80%] w-[90%] lg:ml-[20%] mx-auto pt-[100px]">
        {/* serach sec for large screen */}
        <div className=" border-gray-200 p-4 lg:hidden w-[300px] mx-auto">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by name"
              className="w-full rounded border p-2"
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
        </div>
        {filteredUsers.map((user) => {
          const jobSkills = skills.filter((skill) =>
            user.skills.includes(skill._id)
          );

          return (
            <>
              <section
                key={user._id}
                className="flex flex-col items-center justify-center"
              >
                {/* other section */}

                <div className="m-4 mx-auto max-w-screen-lg rounded-md border border-gray-100 text-[#141c3a] shadow-md">
                  <div className="relative h-full grid text-[#141c3a]  md:grid-cols-[60%_auto] text-center md:text-left">
                    <div className="relative p-8 order-2 md:order-1">
                      <div className="flex flex-col lg:flex-row">
                        <h2 className="mb-2 md:text-3xl text-2xl  font-black">
                          {user.user_name}
                        </h2>
                      </div>
                      <h3 className="mb-5 text-sm">{user.email}</h3>
                      <p className="md:text-xl text-l font-black">
                        {user.company_name}
                      </p>
                      <p className="mt-2 font-sans text-base tracking-normal">
                        {user.about}
                      </p>
                      <div className="flex flex-col md:flex-row gap-2 mt-7 mx-auto items-center">
                        <button
                          className="text-white bg-[#141C3A] border focus:ring-4 focus:outline-none hover:border-[#141C3A] active:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center w-fit"
                          onClick={() => handleClick(user._id)}
                        >
                          View Profile
                        </button>
                        <a
                          href={`http://localhost:3002/${user.resume}`}
                          className="text-white bg-[#141C3A] border focus:ring-4 focus:outline-none hover:border-[#141C3A] active:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center w-fit"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Resume
                        </a>
                      </div>
                      <div className="mt-5 space-y-3 w-[100%] text-sm font-medium text-gray-500 flex flex-col md:flex-row  md:items-center md:space-y-0 sm:space-x-2">
                        <div className="">
                          Experience:
                          <span className="ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900">
                            {user.experience}
                          </span>
                        </div>
                        <div className="">
                          Skills:
                          <span className="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900">
                            {jobSkills
                              .map((skill) => skill.skill_name)
                              .join(", ")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mx-auto flex items-center px-5 pt-1 md:p-8 z-10 order-1 md:order-2">
                      <img
                        className="block h-70px w-[200px] md:w-[300px] rounded-md shadow-lg"
                        src={
                          user &&
                          Array.isArray(user.profile_image) &&
                          user.profile_image.length > 0
                            ? `http://localhost:3002/${user.profile_image}`
                            : profile
                        }
                        alt="Profile"
                      />
                    </div>
                  </div>
                </div>
              </section>
            </>
          );
        })}
      </div>
      <CustomToastContainer />
    </div>
  );
}

export default FindFreelancers;
