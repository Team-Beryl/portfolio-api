import { EducationModel } from "../models/education_model.js";
import { UserModel } from "../models/user_model.js";
import { educationSchema } from "../schema/education_schema.js";

export const postEducation = async (req, res, next) => {
  try {
    const { error, value } = educationSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // Find user with the id you passed when creating education
    const userSessionId = req.session.user.id;
    const user = await UserModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Create education with the 'value'
    const newEducation = await EducationModel.create({
      ...value,
      user: userSessionId,
    });

    // push education id into user
    user.education.push(newEducation.id);

    // save user with education id
    await user.save();

    res.status(201).json({ newEducation });
  } catch (error) {
    next(error);
  }
};

// All education associated with one user
export const getAllUserEducation = async (req, res, next) => {
  try {
    // Fetching education that belongs to a particular user
    const userSessionId = req.session.user.id;
    const getAllEducation = await EducationModel.find({ user: userSessionId });
    if (getAllEducation.length == 0) {
      return res.status(404).send("No education added");
    }
    res.status(200).json({ education: getAllEducation });
  } catch (error) {
    next(error);
  }
};

export const updateEducation = async (req, res, next) => {
  try {
    const updatedEducation = await EducationModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).send(updatedEducation);
  } catch (error) {
    next(error);
  }
};

export const deleteEducation = async (req, res, next) => {
  try {
    const deletedEducation = await EducationModel.findByIdAndDelete(
      req.params.id
    );
    res.status(201).send("Education removed");
  } catch (error) {
    next(error);
  }
};
