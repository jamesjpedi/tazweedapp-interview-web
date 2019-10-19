const bcrypt    = require('bcrypt');
const mongoose  = require('mongoose');
const User      = require('../models/user.model');

const Index = {

    index : (req, res) => {
        res.redirect('login');
    },


    login : (req, res) => {
        res.render('login', { title: 'Login', url : req.originalUrl });
    },

    submitLogin : async (req, res) => {
        var { email, password } = req.body;
        if(!email || !password){
            res.render('login', { error: 'Fields must not be empty' });
            return;
        }

        let existingUser = await User.findOne({ email : email });
        if(existingUser){
            const match = await bcrypt.compare(password, existingUser.password);
            if(match) {
                req.session.loggedIn = true;
                req.session.userId   = existingUser._id;
                
                res.redirect(`/${existingUser.role}`);
                return;
            }
            
            res.render('login', { error: 'Invalid credentials' });
            return;
        }

        res.render('login', { error: 'Invalid credentials' });
        return;
    },

    register : (req, res) => {
        res.render('register', { title: 'Register' });
    },

    submitRegister : async (req, res) => {
        var { name, email, password } = req.body;
        if(!name || !email || !password){
            res.render('register', { error: 'Fields must not be empty' });
            return;
        }

        let passwordDecrypted = await bcrypt.hash(password, 10);
        if(!passwordDecrypted){
            res.render('register', { error: 'Something went wrong' });
            return;
        }

        let existingUser = await User.findOne({email : email});
        if(existingUser){
            res.render('register', { error: 'Email already exist' });
            return;
        }

        let newUser = new User({
            _id     : new mongoose.Types.ObjectId(),
            role    : 'seller',
            name    : name,
            email   : email,
            password: passwordDecrypted
        });

        try{
            let user = await newUser.save();
            req.session.loggedIn = true;
            req.session.userId   = user._id;
            res.redirect('/seller');
        } catch(err){
            res.render('register', { error: 'Something went wrong' });
            return;
        }
    },

    logout : (req, res) => {
        req.session.destroy(() => {});
        res.redirect('/login')
    }
}

module.exports = Index;