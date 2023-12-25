# UPLOADING IMAGE - Using Multer

## Install Multer in "backend" folder
`npm i multer`

---

## Create route file called uploadRoutes.js in routes folder (backend) and add following codes
```
import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

<!-- as we are saving file to our server, we use diskStorage. -->
const storage = multer.diskStorage({
  <!-- cb is callback function -->
  destination(req, file, cb) {
    <!-- we can replace error with null if we have one -->
    <!-- create a folder called upload in the root -->
    cb(null, 'upload/');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
})

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.orginalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if(extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Images only!'), false);
  }
}

const upload = multer({ storage, fileFilter });
<!-- This 'image' is the fieldname we used up there -->
const uploadSingleImage = upload.single('image');

router.post('/', (req, res) => {
  uploadSingleImage(req, res, function (error) {
    if (error) {
      res.status(400).send({ message: error.message });
    }

    res.status(200).send({
      message: 'Image uploaded successfully',
      image: `/${req.file.path}`,
    });
  }) 
})

export default router;
```

---

## Add routes to server.js
```
app.use('/api/upload', uploadRoutes);
```

---

## Make the uploads folder static to make it accessible
```
import path from 'path';

const __dirname = path.resolve(); // set __dirname to current directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
```