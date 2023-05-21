import express from "express";
import mongoose from "mongoose";
import multer from "multer";

import { registerValidation, loginValidation, postCreateValidation } from "./validations.js";
import { UserController, PostController } from "./controllers/index.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";


mongoose
    .connect("mongodb+srv://artndev:###@cluster0.dygip8v.mongodb.net/blog?retryWrites=true&w=majority")
    .then(() => console.log("DB is OK!"))
    .catch(err => console.log("DB has an error!", err))

const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));


app.post('/auth/login', 
    loginValidation,  
    handleValidationErrors, 
    UserController.login
)
app.post('/auth/register', 
    registerValidation, 
    handleValidationErrors, 
    UserController.register
);
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
})

app.get('/posts/', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.delete('/posts/:id', 
    checkAuth, 
    PostController.remove
);
app.post('/posts', 
    checkAuth, 
    postCreateValidation, 
    handleValidationErrors,
    PostController.create
);
app.patch('/posts/:id', 
    checkAuth, 
    postCreateValidation, 
    handleValidationErrors,
    PostController.update
);


app.listen(8888, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log("Server is OK!")
});

