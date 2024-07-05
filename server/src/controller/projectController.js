import Project from "../model/projectModel.js";
import User from "../model/userModel.js";
import authenticate from "../middleware/authenticate.js";

export const getProjectById = async (req, res) => {
  const projectId = req.params.id;

  try {
    // Find project by ID and populate related fields
    const project = await Project.findById(projectId)
      .populate("jobPosting")
      .populate("client")
      .populate("freelancer")
      .exec();

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    // Check if user is authorized to view project (example authorization logic)
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Example authorization check based on user role
    if (user.role !== "client" && user.role !== "freelancer") {
      return res.status(403).json({ msg: "Unauthorized to view project" });
    }

    res.status(200).json({ project });
  } catch (error) {
    console.error("Error fetching project:", error);
    res.json({ msg: "Something went wrong while fetching project." });
  }
};

export const createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save(); // First save the project document

    // Populate referenced fields after saving
    await Project.populate(project, { path: "jobPosting client freelancer" });

    res.status(201).json({ msg: "Project created successfully", project });
  } catch (error) {
    res.json({ msg: "Something went wrong while creating project." });
  }
};

// Update project status
export const updateProjectStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(req.user);
    const { id } = req.params;
    const { status } = req.body;
    const project = await Project.findById(id)
      .populate("client")
      .populate("freelancer")
      .populate("jobPosting");
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    // Check if the user is authorized based on their role
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (
      user.role === "freelancer" &&
      project.freelancer._id.toString() !== userId &&
      project.status !== "completed"
    ) {
      return res.status(403).json({ msg: "Unauthorized to update the status" });
    }

    if (user.role === "client" && project.client._id.toString() !== userId) {
      return res.status(403).json({ msg: "Unauthorized to update the status" });
    }

    project.status = status;
    await project.save();
    res.status(200).json({ msg: "Project status updated", project });
  } catch (error) {
    res.json({ msg: "Something went wrong while updating project status." });
  }
};

// Update project milestones
export const updateProjectMilestones = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(req.user);
    const { id } = req.params;
    const { milestones } = req.body;
    const project = await Project.findById(id)
      .populate("client")
      .populate("freelancer")
      .populate("jobPosting");
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    // Check if the user is authorized based on their role
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    if (user.role !== "client") {
      return res
        .status(403)
        .json({ msg: "Only clients can update milestones" });
    }

    project.milestones = milestones;
    await project.save();
    res.status(200).json({ msg: "Project milestones updated", project });
  } catch (error) {
    res.json({ msg: "Something went wrong while updating milestones." });
  }
};
