import axios from "axios";
import React, { useEffect, useState } from "react";
import profile from "../../assets/profile.png";
import { useNavigate } from "react-router-dom";

function FindFreelancers() {
  const [users, setUsers] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

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
      <div className="w-[20%] border-r border-gray-200 p-4 fixed h-full mt-[100px]">
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
      <div className="p-4 w-[80%] ml-[20%] pt-[100px]">
        {filteredUsers.map((user) => {
          const jobSkills = skills.filter((skill) =>
            user.skills.includes(skill._id)
          );

          return (
            <section
              key={user._id}
              className="flex items-center justify-center"
            >
              <div className="m-4 mx-auto max-w-screen-lg rounded-md border border-gray-100 text-[#141c3a] shadow-md">
                <div className="relative flex h-full flex-col text-[#141c3a] md:flex-row">
                  <div className="relative p-8">
                    <div className="flex flex-col md:flex-row">
                      <h2 className="mb-2 text-3xl font-black">
                        {user.user_name}
                      </h2>
                    </div>
                    <h3 className="mb-5 text-sm">{user.email}</h3>
                    <p className="text-xl font-black">{user.company_name}</p>
                    <p className="mt-2 font-sans text-base tracking-normal">
                      {user.about}
                    </p>
                    <div className="flex gap-2 mt-7">
                      <button
                        className="text-white bg-[#141C3A] border focus:ring-4 focus:outline-none hover:border-[#141C3A] active:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center w-[25%]"
                        onClick={() => handleClick(user._id)}
                      >
                        View Profile
                      </button>
                      <a
                        href={`http://localhost:3002/${user.resume}`}
                        className="text-white bg-[#141C3A] border focus:ring-4 focus:outline-none hover:border-[#141C3A] active:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center w-[25%]"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Resume
                      </a>
                    </div>
                    <div className="mt-5 grid grid-cols-2 space-y-3 w-[100%] text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
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
                  <div className="mx-auto flex items-center px-5 pt-1 md:p-8  z-10">
                    <img
                      className="block h-70px w-[200px] rounded-md shadow-lg"
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
          );
        })}
      </div>
    </div>
  );
}

export default FindFreelancers;
