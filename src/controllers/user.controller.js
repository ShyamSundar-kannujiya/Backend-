import { asyncHandler } from "../utils/asyncHandler.js";

const ragisterUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "Hello Shyam"
    })
})

export { ragisterUser } 