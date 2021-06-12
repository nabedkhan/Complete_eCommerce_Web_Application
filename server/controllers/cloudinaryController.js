const cloudinary = require('cloudinary');

// configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadImages = async (req, res) => {
    const result = await cloudinary.uploader.upload(req.body.image, {
        resource_type: 'auto',
    });
    res.json({
        public_id: result.public_id,
        url: result.url,
    });
};

const removeImage = async (req, res) => {
    try {
        const imageId = req.params.id;
        await cloudinary.uploader.destroy(imageId);
        res.status(200).json({
            msg: 'Image deleted successfully',
        });
    } catch (e) {
        res.status(500).json({
            error: e.message,
        });
    }
};

module.exports = {
    uploadImages,
    removeImage,
};
