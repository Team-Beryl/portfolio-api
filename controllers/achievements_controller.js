import { achievementsModel } from "../models/achievements_model.js";
import { UserModel } from "../models/user_model.js";
import { achievementsSchema } from "../schema/achievement_schema.js";



export const addAchievement = async (req, res, next)=>{
    try {
        const {error, value} = achievementsSchema.validate(req.body)
        if (error){
            return res.status(400).send(error.details[0].message)
        }
        //create achievement with value
        const achievement = await achievementsModel.create(value)

        //Find the user with the id that was passed whiles creating the achievement
        const user = await UserModel.findById(value.user);
        if(!user){
            return res.status(404).send('User not found');
        }

        //If user is found, push the achievement id created inside
        user.achievement.push(achievement._id);

        //Save the user with the achievement id
        await user.save();

        //return the achievement
        res.status(201).json(education)
    } catch (error) {
       next(error) 
    }
}

//Function to get all achievements that belong to a user
export const getAllUserAchievements = async (req, res, next)=> {
    try {
        //Fetching achievements that belong to a particular user
        const userId = req.params.id
        const allAchievements = await achievementsModel.find({user: userId})
        if (allAchievements.length == 0){
            return res.status(404).send('No achievement added')
        }
        res.status(200).json(allAchievements)
        
    } catch (error) {
        next(error)
        
    }
}

//Function to get one achievement 
export const getOneAchievement = async (req, res, next) => {

    try {
        const achievement = await achievementsModel.findById(req.params.id)
        res.status(200).json(achievement)
    } catch (error) {
        next(error)
    }

}

//Function to delete an achievement
export const deleteAchievement = async (req, res, next) => {
   try {
     await achievementsModel.findByIdAndDelete(req.params.id)
     res.status(200).json('Achievement deleted successfully')
   } catch (error) {
    next(error)
   }

}

//Function to update an achievement
export const updateAchievement = async (req, res, next) => {
    try {
     const patchedAchievement = await achievementsModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
      res.status(200).json(patchedAchievement)
    } catch (error) {
     next(error)
    }
 
 }