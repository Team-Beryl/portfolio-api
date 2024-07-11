import { ProjectsModel } from "../models/projects_model.js";
import { UserModel } from "../models/user_model.js";
import { projectsSchema } from "../schema/projects_schema.js";

export const postProject = async (req, res, next) => {
  try {
    const { error, value } = projectsSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const newProject = await ProjectsModel.create(value);

    const user = await UserModel.findById(value.user);
    if (!user) {
      return res.status(404).send("User not found");
    }

    user.projects.push(newProject.id);

    await user.save();

    res.status(201).json({ newProject });
  } catch (error) {
    next(error);
  }
};

export const getAllUserProjects = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const getAllProjects = await ProjectsModel.find({ user: userId });
    if (getAllProjects.length == 0) {
      return res.status(404).send("No projects added");
    }
    res.status(200).json({ projects: getAllProjects });
  } catch (error) {
    next(error);
  }
};

export const getOneProject = async (req, res, next) => {
  try {
    const singleProject = await ProjectsModel.findById(req.params.id);
    res.status(200).json(singleProject);
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const updatedProject = await ProjectsModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).send(updatedProject);
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    await ProjectsModel.findByIdAndDelete(req.params.id);
    res.status(201).send("Project removed");
  } catch (error) {
    next(error);
  }
};
