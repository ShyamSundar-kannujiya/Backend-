import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (localFilePath) => {
    if (!localFilePath) return null;
    //Upload the file to Cloudinary
    try{
        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        })
        //File has been uploaded 
        console.log("File is uploaded ", result.url);
        return result.url;
    }catch(error){
        fs.unlinkSync(localFilePath); // Remove the locally file saved temporarily file uploaded to cloudinary
        return null;
    }
}
