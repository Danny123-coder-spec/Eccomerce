

import jwt from 'jsonwebtoken';
import User from '../models/users/userModel';

const protect = (handler) => async (req, res) => {
    const token = req.headers.authorization;
    if (token) {
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          const user = await User.findById(decoded.id).select('-password');
          req.user = user;
          
        } catch (error) {
          console.error(error.message);
          return res.status(401).json({ message: 'Unauthorized - Invalid token' });
        }
    } else {
        res.json({message:"Not authorized, no token", status:401})
    }
    
//   try {
//     let token;
//     if (req?.headers?.authorization && req.headers.authorization.startsWith('Bearer')) {
//       token = req.headers.authorization;
//       if (token) {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await User.findById(decoded?.id);
//         res.user = user;
//         return handler(req, res);
//       }
//     }

//     throw new Error('Unauthorized - Invalid token');
//   } catch (error) {
//     console.error(error.message);
//     return res.status(401).json({ message: 'Unauthorized - Invalid token' });
//   }
};

// const isAdmin = async (req, res, next) => {
//   console.log(req.user);
//   // Add your isAdmin logic here
// };

// export { protect, isAdmin };


import passport from 'passport';
import User from '../models/users/userModel';
import LocalStrategy from 'passport-local';
import initializePassport from './initializePassport';


initializePassport(passport);

const authMiddleware = (handler) => async(req, res) => {
  await new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user) => {
      if(err) reject(err);
      req.logIn(user, (err) => {
        if(err) reject(err);
        resolve();
      })
    })(req, res);
  });

  return handler(req, res);
}

export default authMiddleware;




 