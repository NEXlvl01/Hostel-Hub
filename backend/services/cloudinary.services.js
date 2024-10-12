const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (fileBuffer) => {
    try {
        if (!fileBuffer) return null;

        const response = await cloudinary.uploader.upload_stream(
            { resource_type: 'auto' },
            (error, result) => {
                if (error) throw new Error(error);
                console.log("File has been successfully uploaded", result.url);
                return result;
            }
        );

        const stream = require('stream');
        const readableStream = new stream.PassThrough();
        readableStream.end(fileBuffer);
        readableStream.pipe(response);
    } catch (error) {
        console.error("Error uploading file to Cloudinary", error);
        return null;
    }
};

module.exports = { uploadOnCloudinary };
