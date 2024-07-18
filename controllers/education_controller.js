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
    const id = req.session?.user?.id || req?.user?.id;
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Create education with the 'value'
    const newEducation = await EducationModel.create({
      ...value,
      user: id,
    });

    // push education id into user
    user.education.push(newEducation.id);

    // save user with education id
    await user.save();

    res.status(201).json({message:"Education added successfully", newEducation});
  } catch (error) {
    next(error);
  }
};

// All education associated with one user
export const getAllUserEducation = async (req, res, next) => {
  try {
    // Fetching education that belongs to a particular user
    const id = req.session?.user?.id || req?.user?.id;
    const getAllEducation = await EducationModel.find({ user: id });
    if (getAllEducation.length == 0) {
      return res.status(404).json({ education: getAllEducation });
    }
    res.status(200).json({ education: getAllEducation });
  } catch (error) {
    next(error);
  }
};

export const updateEducation = async (req, res, next) => {
  try {
    const { error, value } = educationSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const id = req.session?.user?.id || req?.user?.id;
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const updatedEducation = await EducationModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updateEducation) {
      return res.status(404).json({ Education: updatedEducation });
    }
    res.status(201).json({message:"Educated updated successfully", updatedEducation});
  } catch (error) {
    next(error);
  }
};

export const deleteEducation = async (req, res, next) => {
  try {
    const id = req.session?.user?.id || req?.user?.id;
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const deletedEducation = await EducationModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedEducation) {
      return res.status(404).send("Education not found");
    }

    user.education.pull(req.params.id);
    await user.save();
    res.status(200).send("Education deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const getUserEducation = async (req, res, next)=>{
 try {
   const anEducation = await EducationModel.findById(req.params.id)
   res.status(200).send(anEducation)
 }
 catch (error) {
  next(error)
 }}
