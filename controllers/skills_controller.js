import { SkillsModel } from "../models/skills_model.js";
import { UserModel } from "../models/user_model.js";
import { skillsSchema } from "../schema/skills_schema.js";



export const addSkill = async (req, res, next)=>{
    try {
        const {error, value} = skillsSchema.validate(req.body)
        if (error){
            return res.status(400).send(error.details[0].message)
        }
       
        //Find the user with the id that was passed whiles creating the skills
        const user = await UserModel.findById(value.user);
        if(!user){
            return res.status(404).send('User not found');
        }
         //create skills with value
         const skills = await SkillsModel.create(value)
+

        //If user is found, push the skilsl id created inside
        user.skills.push(skills._id);

        //Save the user with the skills id
        await user.save();

        //return the skills
        res.status(201).json({skills})
    } catch (error) {
       next(error) 
    }
}

//Function to get all skills that belong to a user
export const getAllUserSkills = async (req, res, next)=> {
    try {
        //Fetching skills that belong to a particular user
        const userId = req.params.id
        const allSkills = await SkillsModel.find({user: userId})
        if (allSkills.length == 0){
            return res.status(404).send('No skills added')
        }
        res.status(200).json(allSkills)
        
    } catch (error) {
        next(error)
        
    }
}

//Function to get one skill 
export const getOneSkill = async (req, res, next) => {

    try {
        const skill = await SkillsModel.findById(req.params.id)
        res.status(200).json(skill)
    } catch (error) {
        next(error)
    }

}

//Function to delete a skill
export const deleteSkill = async (req, res, next) => {
   try {
     await SkillsModel.findByIdAndDelete(req.params.id)
     res.status(200).json('Skill deleted successfully')
   } catch (error) {
    next(error)
   }

}

//Function to update a skill
export const updateSkill = async (req, res, next) => {
    try {
     const patchedSkill = await SkillsModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
      res.status(200).json(patchedSkill)
    } catch (error) {
     next(error)
    }
 
 }