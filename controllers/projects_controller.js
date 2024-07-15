import { ProjectsModel } from "../models/projects_model.js";
import { UserModel } from "../models/user_model.js";
import { projectsSchema } from "../schema/projects_schema.js";

export const postProject = async (req, res, next) => {
  try {
    const { error, value } = projectsSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // Find user with the id you passed when creating project
    const userSessionId = req.session.user.id;
    const user = await UserModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Create project with value
    const newProject = await ProjectsModel.create({
      ...value,
      user: userSessionId,
    });

    // push projects id into user
    user.projects.push(newProject.id);

    // save user with projects id
    await user.save();

    res.status(201).json({ newProject });
  } catch (error) {
    next(error);
  }
};

export const getAllUserProjects = async (req, res, next) => {
  try {
    const userSessionId = req.session.user.id;

    const getAllProjects = await ProjectsModel.find({ user: userSessionId });
    if (getAllProjects.length == 0) {
      return res.status(404).send("No projects added");
    }
    res.status(200).json({ projects: getAllProjects });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const { error, value } = projectsSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session.user.id;
    const user = await UserModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const updatedProject = await ProjectsModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updateProject) {
      return res.status(404).send("Project not found");
    }
    res.status(201).json({ updatedProject });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const userSessionId = req.session.user.id;
    const user = await UserModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const deletedProject = await ProjectsModel.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).send("Project not found");
    }

    user.projects.pull(req.params.id);
    await user.save();
    res.status(200).send("Project removed");
  } catch (error) {
    next(error);
  }
};
