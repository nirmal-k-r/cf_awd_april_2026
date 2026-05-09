//router
const router=require('express').Router();
const User=require('../models/user');
const bcrypt = require('bcrypt');

//register route
router.get('/register',(req,res) => {
    if (req.session.user) {
        return res.redirect('/');
    }else{
        ctx={
            user: req.session.user || null
        }
        res.render('components/auth/register', ctx);
    }
});

//login route
router.get('/',(req,res) => {
    if (req.session.user) {
        return res.redirect('/');
    }else{
        ctx={
            user: req.session.user || null
        }
        res.render('components/auth/login', ctx);
    }
});


router.post('/register', async (req,res) => {
    try {
        // const {email, password, name, phone} = req.body;
        email = req.body.email;
        password = req.body.password;
        name = req.body.name;
        phone = req.body.phone;

        //hash password
        const hash = await bcrypt.hash(password, 10);

        //token
        const tokenBase= email + Date.now(); 
        const token = await bcrypt.hash(tokenBase, 10);
        //create user


        const user = new User({email, hash, token, name, phone}); //create user object
        await user.save(); //save object to db

        console.log('User registered:', user);

        req.session.user=user;

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error registering user');
    }
});

router.post('/login', async (req,res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).send('Invalid email or password');
        }

        const isMatch = await bcrypt.compare(password, user.hash);

        if (!isMatch) {
            return res.status(400).send('Invalid email or password');
        }

        console.log('User logged in:', user);

        //regenerate token on login
        const tokenBase= email + Date.now(); 
        user.token = await bcrypt.hash(tokenBase, 10);
        await user.save();

        req.session.user=user;

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error logging in user');
    }
});

router.get('/logout', (req,res) => {
    if (req.session.user) {
        req.session.destroy();
        res.redirect('/auth');
    } else {
        res.redirect('/auth');
    }
});





module.exports=router;