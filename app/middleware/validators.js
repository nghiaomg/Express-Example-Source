const validateCategory = (req, res, next) => {
  const { name, images } = req.body;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: "Category name is required and must be a non-empty string",
    });
  }

  if (images && !Array.isArray(images)) {
    return res.status(400).json({
      success: false,
      message: "Images must be an array",
    });
  }

  if (images) {
    for (const image of images) {
      if (typeof image !== "string" || image.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: "Each image URL must be a non-empty string",
        });
      }
    }
  }

  next();
};

const validateTag = (req, res, next) => {
  const { name, bgColor, textColor } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Tag name is required and must be a non-empty string'
    });
  }

  if (bgColor && typeof bgColor !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Background color must be a string'
    });
  }

  if (textColor && typeof textColor !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Text color must be a string'
    });
  }

  next();
};

module.exports = {
  validateCategory,
  validateTag
};
