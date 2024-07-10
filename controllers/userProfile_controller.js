import { UserProfileModel } from "../models/userProfile_model.js";

export const postUserProfile = async (req,res, next) => {
    try {
      const newProfile = await UserProfileModel.create({
          ...req.body,
          profilePicture: req.file.filename
  
      })
        
      res.status(201).json(newProfile)
    } catch (error) {
     next(error)
    }
 }


 export const getUserProfile = async (req,res,next) => {
    try {
        const allUserProfiles = await UserProfileModel.find()
        res.json(allUserProfiles)
    } catch (error) {
        next(error)
    }
}


export const getAUserProfile = async (req,res,next) => {
    try {
        const singleUserProfile = await UserProfileModel.findById(req.params.id)
        res.json(singleUserProfile);
    } catch (error) {
        next(error)
    }
}


export const patchUserProfile = async (req,res,next) => {
    try {
        const editUserProfile = await UserProfileModel.findByIdAndUpdate( req.params.id,
            { ...req.body, profilePicture: req?.file?.filename },
            { new: true })
        res.json(editUserProfile);
    } catch (error) {
        next(error)
    }
}


export const deleteUserProfile = async (req,res,next) => {
    try {
      const delUserProfile = await UserProfileModel.findByIdAndDelete(req.params.id);
      res.json(`User Profile with id ${req.params.id} Deleted`)
    } catch (error) {
     next(error)
    }
 }


