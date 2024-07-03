import userModel from "../model/userModel.js";

export const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id).populate("jobPostings")
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const user = await userModel.findByIdAndUpdate(id, updates, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User profile updated", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
