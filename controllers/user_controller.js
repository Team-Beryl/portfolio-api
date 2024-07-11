import { UserModel } from "../models/user_model.js";
import { userSchema } from "../schema/user_schema.js";
import * as bcrypt from 'bcrypt';
import { skillsSchema } from "../schema/skills_schema.js";


export const signup = async(req, res) =>{ 
    const {error, value} = userSchema.validate(req.body)
    if (error){
        return res.status(400).send(error.details[0].message)
    }

//Check if user exists already in the database
const email = value.email
console.log('email', email)

const findIfUserExist = await UserModel.findOne({email})
if(findIfUserExist){
    return res.status(401).send('User has already signed up')
}else{
    const hashedPassword = bcrypt.hashSync(value.password, 12)
    value.password = hashedPassword
    console.log('val', value)

   const addUser = await UserModel.create(value)
    return res.status(201).send('User registered successfully')
}

}

export const login = async (req, res, next) => {
    try {
        const {email, username, password} = req.body
    //Find a user using their unique identifier
    const user = await UserModel.findOne({
       $or:[
        { email:email},
        {username: username}
       ]
    });
    if (!user){
        res.status(401).json('No user found')
    }else{
    //Verify their password
    const correctPassword = bcrypt.compareSync(password, user.password)
    if(!correctPassword){
        res.status(401).json('Invalid credentials')
    }else{
    //Generate a session
    // req.session.user = {id: user.id} 
    //Return response
    res.status(200).json('Login successful')

    }

    }
    } catch (error) {
       next(error) 
    }
   
}

export const allUsers = async (req, res, next)=>{
    try {
        const users = await UserModel.find()
        .select({password: false})
        res.status(200).send(users)
    } catch (error) {
        next(error)
    }
}


export const getUser = async (req, res, next) => {
    try {
      const userId = req.params.id;
  
      // Get user based on the user id
      // Use the select to exclude the password
      // Use populate to populate the related fields
      const userDetails = await UserModel.findById(userId)
        .select({ password: false })
        // .populate([
        //   { path: 'education' },
        //   { path: 'achievements' },
        //   { path: 'experience' },
        //   { path: 'projects' },
        //   { path: 'userProfile' },
        //   { path: 'volunteering' },
        //   { path: 'skills' } // Ensure 'skills' is defined in your schema
        // ]);
  
      return res.status(200).json({ user: userDetails });
    } catch (error) {
      next(error);
    }
  };
  