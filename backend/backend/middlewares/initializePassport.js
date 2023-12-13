import passport from 'passport';

import User from '../models/users/userModel';
import LocalStrategy from 'passport-local';

const initializePassport = () => {
    passport.use(
        new LocalStrategy(async(email, password, done) => {
            try {
                const user = await User.findOne({email});

                if(!user) {
                    return done(null, false, {message:'No user with that email'});
                }

                const isMatch = await user.isPasswordMatched(password);

                if(!isMatch) {
                    return done(null, false, {message:'Incorrect password'});
                } else {
                    return done(null, user);
                    
                    
                }
            } catch (error) {
                return done(error, false, {message:'Something went wrong'})
                
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async(id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error);
            
        }
    })
};

export default initializePassport;