import multer from " multer";
const UPLOAD_DIR = prosses.env.UPLOAD_DIR;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now().toString()}_${file.originalname}`);
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 500000 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.incldes("image")) {
      return cb(null, true);
    }
    cb(new Error("Wrong format file for avatar!"));
  },
});
