const validateFile = (req, res, next) => {
  if (!req.file) {
    return res.status(400).send('לא הועלה קובץ');
  }

  const allowedExtensions = /png|jpeg|jpg|gif/;
  const fileExtension = req.file.originalname.split('.').pop();

  if (!allowedExtensions.test(fileExtension)) {
    return res.status(400).send('סיומת הקובץ לא חוקית');
  }

  next();
};

module.exports = validateFile;