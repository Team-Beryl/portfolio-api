import { UserModel } from "../models/user_model.js";
import { userSchema } from "../schema/user_schema.js";
import * as bcrypt from 'bcrypt';
import { skillsSchema } from "../schema/skills_schema.js";
import jwt from "jsonwebtoken";


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
    req.session.user = { id: addUser.id }
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
    req.session.user = {id: user.id} 
    console.log('user', req.session.user)
   // Return response
    res.status(200).json('Login successful')

    }

    }
    } catch (error) {
       next(error) 
    }
   
}


export const token = async (req, res, next) => {
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
  //Generate a token
  const token = jwt.sign(
    {id: user.id}, 
    process.env.JWT_PRIVATE_KEY,
    {expiresIn: '3h'}
  );
  // req.session.user = {id: user.id} 
  // console.log('user', req.session.user)
 // Return response
  res.status(200).json({
    message: 'Login successful',
    accessToken: token
  })

  }

  }
  } catch (error) {
     next(error) 
  }
 
}
export const getUser = async (req, res, next) => {
  try {
    const username = req.params.username.toLowerCase();

  const options = { sort: { startDate: -1 } }
  const userDetails = await UserModel.findOne({ username }).select("-password")
    .populate({
      path: "education",
      options,
    })
    .populate("userProfile")
    .populate("skills")

    .populate({
      path: "achievements",
      options: { sort: { date: -1 } }, 
    })
    .populate({
      path: "experiences",
      options, 
    })
    .populate({
      path: "volunteering",
      options, 
    })
    .populate({
        path: 'projects',
        options 
    });

  return res.status(200).json({ user: userDetails });
  } catch (error) {
  //  next()
  console.log(error)
  }
};


  
  export const getUsers = async (req, res) => {
   
  
    const email = req.query.email?.toLowerCase()
    const username = req.query.username?.toLowerCase();
  
    const filter = {};
    if (email) {
      filter.email = email;
    }
    if (username) {
      filter.username = username;
    }
  
    const users = await UserModel.find(filter);
  
    return res.status(200).json({ users });
  };
  
  export const logout = async (req, res, next) => {
    try {
        //Destroy user section
        await req.session.destroy();
        //Return response 
    res.status(200).json('logout successfull')
    } catch (error) {
        next(error)
    }
}