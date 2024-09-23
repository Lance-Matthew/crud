import User from "../model/userModel.js";


export const create = async(req, res)=>{
    try {
        // Create a new User instance with the request body
        const userData = new User( req.body);
        const {firstName} = userData;
        // // Check if a user with the same email already exists
        // const userExist = await User.findOne({firstName})
        // if (userExist){
        //     return res.status(400).json({message : "User already exists."})
        // }
        // Save the new user data into the database 
        const savedUser = await userData.save();
        // Send a success response with the saved user data
        res.status(200).json(savedUser)
    } catch (error) {
        // Handle any errors and send an internal server error response
        res.status(500).json({error : "Internal Server Error. "})
    }
}

export const fetch = async (req, res)=>{
    try {
        const users = await User.find();
        if(users.length === 0 ){
            return res.status(404).json({message : "Users not Found."})
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error : " Internal Server Error. "})
    }
}

// For updating data
export const update = async (req, res)=>{
    try {
        // Extract user id from request parameters
        const id = req.params.id;
        // Check if the user with the given id exists
        const userExist = await User.findOne({_id:id})
        if (!userExist){
            return res.status(404).json({message : "User not found."})
        }
        // Update the user data and return the updated user
        const updateUser = await User.findByIdAndUpdate(id, req.body, {new : true});
        res.status(201).json(updateUser);
    } catch (error) {
        // Handle any errors and send an internal server error response
        res.status(500).json({error : " Internal Server Error. "})
    }
}

// For deleting data from the database
export const deleteUser = async (req, res)=>{
    try {
        // Extract user id from request parameters
        const id = req.params.id;
        // Check if the user with the given id exists
        const userExist = await User.findOne({_id:id})
        if(!userExist){
            return res.status(404).json({message : " User Not Found. "})
        }
        // Delete the user from the database
        await User.findByIdAndDelete(id);
        // Send a success response
        res.status(201).json({message : " User deleted Successfully."})
    } catch (error) {
        // Handle any errors and send an internal server error response
        res.status(500).json({error : " Internal Server Error. "})
    }
}