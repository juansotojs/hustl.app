const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./models/user');
const Place = require('./models/Place')
const cookieParser = require('cookie-parser');
require('dotenv').config()
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const imageDownloader = require('image-downloader');
//const multer = require('multer');
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'youtinkthebaygonletudisrespectpacn1gga';
const fs = require('fs');
const Booking = require('./models/Booking.js');

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+'/uploads'));
app.use(cors({
    credentials: true,
    origin: "https://hustl-app-frontend.vercel.app",
}));



mongoose.connect(process.env.MONGODB_URI);
app.get('/test', (req,res) => {
    res.json('test ok');
});

function getUserDataFromToken(req){
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if(err) throw err;
            resolve(userData);
        });
    });
}

app.post('/register', async (req, res) => {
    const {name,email,password} = req.body;

    try {
        const userDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(userDoc);
    } catch(e) {
        res.status(422).json(e);
    }
    
});

app.post('/login', async (req, res) => {
    const {email,password} = req.body;
    const userDoc = await User.findOne({email});
    if(userDoc){
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk){
            jwt.sign({
                email:userDoc.email, 
                id:userDoc._id}, jwtSecret, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(userDoc);
            });
        } else {
            res.status(422).json('pass not ok');
        }
    } else {
        res.json('not found');
    }
});

app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if(err) throw err;
            const {name,email,_id} = await User.findById(userData.id);
            res.json({name,email,_id});
        });
    } else {
        res.json(null);
    }
})

app.post('/logout', (req,res) => {
    res.cookie('token', '').json(true);
});

app.post('/upload-by-link', async (req, res) => {
    const {link} = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname+ '/uploads/' +newName,
    });
        res.json(newName);
});

/*const photosMiddleware = multer({dest:'uploads/'});
app.post('/upload', photosMiddleware.array('photos', 100),(req, res) => {
    const uploadedFiles = [];
    for(let i = 0; i < req.files.length; i++){
        const {path, originalname} = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads/', ''));
    }
    res.json(uploadedFiles);
}); */

app.post('/posts', function (req, res) {
    const {token} = req.cookies;
    const {title,address,addedPhotos,description,perks,extraInfo,checkIn,checkOut,} = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if(err) throw err;
        const placeDoc = await Place.create({
            owner:userData.id,
            title,
            address,
            photos:addedPhotos,description,perks,
            extraInfo,checkIn,checkOut,
        });
        res.json(placeDoc);
    });
    
});

app.get('/user-posts', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const {id} = userData;
        res.json( await Place.find({owner:id}));
    });
});

app.get('/posts/:id', async (req,res) => {
    const {id} = req.params;
    res.json(await Place.findById(id));
});

app.put('/posts', async (req,res) => {
    const {token} = req.cookies;
    const {id, title,address,addedPhotos,description,perks,extraInfo,checkIn,checkOut,} = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const placeDoc = await Place.findById(id);
        console.log(userData.id);
        if(userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title,
                address,
                photos:addedPhotos,description,perks,
                extraInfo,checkIn,checkOut,
            });
            await placeDoc.save();
            res.json('ok');

        }
    });
});

app.get('/posts', async (req,res) => {
    res.json( await Place.find() );
});

app.post('/favorites', async (req, res) => {
    const userData = await getUserDataFromToken(req);
    const {post} = req.body;
    Booking.create({post,user:userData.id,}).then((doc) =>{
        res.json(doc);
    }).catch((err) => {
        throw err;
    });

});



app.get('/favorites', async (req,res) => {
    const userData = await getUserDataFromToken(req);
    res.json( await Booking.find({user:userData.id}).populate('post') );
});

app.listen(process.env.PORT);
