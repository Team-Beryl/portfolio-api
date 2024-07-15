import { achievementsModel } from "../models/achievements_model.js";
import { achievementsSchema } from "../schema/achievement_schema.js";


//Function to post a new achievement
export const addAchievement = async (req, res, next)=> {
    try {
        const {error, value} = achievementsSchema.validate(req.body)
    if (error){
        return res.status(400).send(error.details[0].message)
    }
    console.log('value', value)
       const newAchievement = await achievementsModel.create(value) 
       res.status(201).send(newAchievement)
    } catch (error) {
        next (error)
    }
}

//Function to update an achievement
export const updateAchievement = async (req, res, next) =>{
    try {
        const {error, value} = achievementsSchema.validate(value)
        if (error){
            return res.status(400).send(error.details[0].message)
        }
        console.log('value', value)
        const patchAchievement = await achievementsModel.findByIdAndUpdate(req.params.id, req.body)
        res.status(201).send(patchAchievement)
    } catch (error) { 
        next(error)
    
}}

//Function to delete an achievement
export const deleteAchievement = async (req, res, next) =>{
    try {
        const deletedAchievement = await achievementsModel.findByIdAndDelete(req.params.id)
        res.status(200).send("Achievement deleted successfully")
   } catch (error) {
        
    }
}

//Function to get all achievements
export const allAchievements = async (req, res, next) => {
try {
    const achievements = await achievementsModel.find()
    if(allAchievements.length===0){
        return res.status(404).send('No achievements added')
    }
    // res.status(200).json({achievement: allAchievements})
    res.status(200).json(allAchievements)
} catch (error) {
    next(error)
}
}