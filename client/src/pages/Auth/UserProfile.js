import React, { useEffect, useState } from "react";
import profile from "../../assets/profile.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Rating from "@mui/material/Rating";

const UserProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [skills, setSkills] = useState([]);
  const [tokenId, setId] = useState(null);
  const [review, setReview] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        // console.log(decodedToken);
        if (decodedToken.role) {
          setId(decodedToken.id);
          console.log("role : " + decodedToken.role);
        }
      } catch (error) {
        console.error("Invalid token");
      }
    }
  });

  const getReviewAndRating = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3002/api/rating/freelancer/${id}`,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );

      // console.log("Fetched review:", response.data);
      setReview(response.data);
    } catch (error) {
      console.log("Fetching review error: " + error);
    }
  };

  useEffect(() => {
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
        setUser(response.data);
      } catch (error) {
        console.log("clientprofile" + error);
      }
    };
    const fetchSkill = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/api/admin/skill`
        );
        setSkills(response.data);
      } catch (error) {
        console.log("setSkills" + error);
      }
    };
    fetchUser();
    fetchSkill();
    getReviewAndRating();
  }, []);

  const handleEditProfileById = (id) => {
    navigate(`/user/editProfile/${id}`);
  };

  let jobSkills = [];
  if (user.skills) {
    jobSkills = skills.filter((skill) => user.skills.includes(skill._id));
  }

  return (
    <div className="">
      {/* component */}
      <main className="profile-page ">
        <section className="static py-16 ">
          <div className="container mx-auto px-4 mt-[150px]">
            <div className="relative z-0 flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-10">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="profile photo"
                        className="shadow-xl rounded-full h-[170px] align-middle object-cover border-none -m-20 -ml-24 lg:-ml-20 max-w-none"
                        src={
                          user &&
                          Array.isArray(user.profile_image) &&
                          user.profile_image.length > 0
                            ? `http://localhost:3002/${user.profile_image}`
                            : profile
                        }
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center md:mt-[30px]">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <div className="mr-4 text-center mt-[-30px] sm:mt-[100px] lg:mt-0">
                        <span className="text-[16px] block font-bold uppercase tracking-wide text-blueGray-600">
                          Skills
                        </span>
                        <span className="text-[16px] text-blueGray-600">
                          {jobSkills
                            .map((skill) => skill.skill_name)
                            .join(", ")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1 md:mt-[40px]">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center ">
                        <span className="text-[16px] block font-bold uppercase tracking-wide text-blueGray-600">
                          Experience
                        </span>
                        <span className="text-[16px] tracking-wide text-blueGray-600">
                          {user.experience}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center md:mt-[-40px] mt-8">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 ">
                    {user.user_name}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    {user.role}
                  </div>
                  <div className="mb-2 text-blueGray-600 mt-10">
                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                    {user.email}
                  </div>
                  <div className="mb-2 text-blueGray-600">
                    <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                    {user.company_name}
                  </div>

                  {user.role === "freelancer" && (
                    <div className="mt-4">
                      <span className="text-[16px] block font-bold uppercase tracking-wide text-blueGray-600 mb-5">
                        Resume
                      </span>
                      <a
                        href={`http://localhost:3002/${user.resume}`}
                        className="text-white bg-[#141C3A] border focus:ring-4 focus:outline-none hover:border-[#141C3A] active:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center w-[30%] "
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Resume
                      </a>
                    </div>
                  )}
                </div>
                <div className=" py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        {user.about}
                      </p>

                      {id === tokenId && (
                        <button
                          onClick={() => {
                            handleEditProfileById(user._id);
                          }}
                          className="text-white bg-[#141C3A] border focus:ring-4 focus:outline-none hover:border-[#141C3A] active:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center w-[20%] "
                          type="button"
                        >
                          Edit Profile
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserProfile;
