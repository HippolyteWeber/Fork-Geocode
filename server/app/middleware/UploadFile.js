const multer = require("multer");
const fs = require("fs").promises;
const path = require("path");

const upload = multer({ dest: path.join(__dirname, "../../public/uploads") });

const UploadFile = async (req, res, next) => {
  try {
    await new Promise((resolve, reject) => {
      upload.single("station")(req, res, (err) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });

    const oldPath = path.join(
      __dirname,
      "../../public/uploads",
      req.file.filename
    );
    const newPath = path.join(
      __dirname,
      "../../public/uploads/bornes-irve.csv"
    );

    await fs.rename(oldPath, newPath);

    res.status(201).json({ message: "Le fichier a bien été téléversé" });
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = UploadFile;
