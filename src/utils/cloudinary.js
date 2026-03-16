import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadToCloudinary = async (localFilePath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  if (!localFilePath) return null;

  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localFilePath);
    return result;
  } catch (error) {
    console.log("Cloudinary Error:", error);
    return null;
  }
};

export { uploadToCloudinary };

// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";

// const uploadToCloudinary = async (localFilePath) => {
//   if (!localFilePath) return null;

//   try {
//     const result = await cloudinary.uploader.upload(localFilePath, {
//       resource_type: "auto",
//     });

//     console.log("File uploaded:", result.url);

//     fs.unlinkSync(localFilePath);
//     return result; //  Important change
//   } catch (error) {
//     console.log("Cloudinary Error:", error); //chenge code
//     fs.unlinkSync(localFilePath);
//     return null;
//   }
// };

// export { uploadToCloudinary };
