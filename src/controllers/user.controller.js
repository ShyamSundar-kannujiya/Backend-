import { asyncHandler } from "../utils/asyncHandler.js";
import {apiError} from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";

const ragisterUser = asyncHandler(async (req, res) => {
    // get user data from frontend
    // validation - not empty
    // check if user allready exists: user, email
    // check for image, check for avatar
    // upload them to cloudinary, avatar
    // create user update , create entry in DB
    // remove password and refresh token filds from response
    // check for user creation
    // return res

    const {fullName, username, email, password} = req.body
    console.log("email", email);

    if ([
        fullName,
        username,
        email,  
        password
    ].some((field) => field === "")) 
    {throw apiError(400, "All fields are required")}
    
    // if (fullName === "" ) {
    //     throw new apiError(400, "Full name is required")
    // }

    // validation check

    const existingUser = User.findOne({
        $or: [ { email }, { username } ]
    })
    if (existingUser) {
        throw apiError(400, "User with the same email or username already exists")
    }

    const avartarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if (!avartarLocalPath) {
        throw apiError (400, "Avatar is required")
    }

    const avatar = await uploadToCloudinary(avartarLocalPath)
    const coverImage = await uploadToCloudinary(coverImageLocalPath)
    if (!avatar) {
        throw new apiError(400, "Failed to upload avatar")
    }

    const user = await User.create({
        fullName,
        username: username.toLowerCase(),
        email,
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
    })

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    )
    if (!createdUser) {
        throw new apiError(500, "Somting went wrong, user creation failed")
    }

    return res.status(201).json(
        new apiResponse(201, "User created successfully", createdUser)
    )
    
})

export { ragisterUser } 