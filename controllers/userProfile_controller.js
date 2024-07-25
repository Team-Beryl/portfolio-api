import { UserProfileModel } from "../models/userProfile_model.js";
import { UserModel } from "../models/user_model.js";
import { userProfileSchema } from "../schema/user_profile_validation.js";

export const postUserProfile = async (req, res) => {
  try {
    const { error, value } = userProfileSchema.validate({
      ...req.body,
      profilePicture: req.files?.profilePicture[0].filename,
    });
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    //Get user id from session or request

    const id = req.session?.user?.id || req?.user.id;

    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const newProfile = await UserProfileModel.create({
      ...value,
      user: id,
    });

    user.userProfile = newProfile.id;

    await user.save();

    res
      .status(201)
      .json({ message: "User Profile added successfully", newProfile });
  } catch (error) {
    console.log(error);
  }
};

export const getAllUserProfile = async (req, res, next) => {
  try {
    const id = req.session?.user?.id || req?.user?.id;
    const allUserProfile = await UserProfileModel.find({ user: id });
    if (allUserProfile.length == 0) {
      return res.status(404).json({ userProfile: allUserProfile });
    }
    res.status(200).json({ userProfile: allUserProfile });
  } catch (error) {
    next(error);
  }
};

export const patchUserProfile = async (req, res) => {
  try {
    const updateFields = { ...req.body };

    if (req.file?.profilePicture) {
      console.log("req.file", req.file, updateFields);

      updateFields.profilePicture = req.file.filename;
    } else if (req.files?.profilePicture) {
      updateFields.profilePicture = req.files.profilePicture[0].filename;
    }

    const { error, value } = userProfileSchema.validate(updateFields);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userId = req.session?.user?.id || req?.user.id;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const profile = await UserProfileModel.findByIdAndUpdate(
      req.params.id,
      value,
      {
        new: true,
      }
    );
    if (!profile) {
      return res.status(404).send("Profile not found");
    }

    res.status(201).json({ profile });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserProfile = async (req, res, next) => {
  try {
    const id = req.session?.user?.id || req?.user?.id;
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const deleteUserProfile = await UserProfileModel.findByIdAndDelete(
      req.params.id
    );
    if (!deleteUserProfile) {
      return res.status(404).send("Profile not found");
    }

    user.userProfile.pull(req.params.id);
    await user.save();
    res.status(200).send(`User Profile with id ${req.params.id} Deleted`);
  } catch (error) {
    next(error);
  }
};

export const getAUserProfile = async (req, res, next) => {
  try {
    const userId = req.session?.user?.id || req?.user.id;

    const aUserProfile = await UserProfileModel.findOne({
      user: userId,
    }).populate({
      path: "user",
      select: "-password",
    });

    if (!aUserProfile) {
      return res.status(200).json({ aUserProfile });
    }
    res.status(200).json(aUserProfile);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
