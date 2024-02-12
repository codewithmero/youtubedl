import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
          
cloudinary.config({ 
  cloud_name: 'djfn3o7ms', 
  api_key: '125386579943317', 
  api_secret: 'IGCJ_Wkyrp38ErfsLFa4EQ9wDWo' 
});

async function uploadFileOnCloudinary(localFilePath) {
    try {
        if (!localFilePath) return null

        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        fs.unlinkSync(localFilePath)
        return response;
    } catch(err) {
        console.log("Error while uploading:::", err);
        fs.unlinkSync(localFilePath);
        return null;
    }
}

export { uploadFileOnCloudinary };