const jwt = require("jsonwebtoken");
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  
  // console.log("token here", token)

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  // console.log("token here", token)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Attach decoded token (user info) to the request object
    console.log(req.user)
    next();  // Proceed to the next middleware or controller
  } catch (err) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = verifyToken;




// const jwt = require("jsonwebtoken");

// const verifyToken = (req, res, next) => {
  
//   const token = req.header('Authorization'); 

//   // console.log("token here", token)

//   if (!token) {
//     return res.status(401).json({ msg: 'No token, authorization denied'});
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); 
//     console.log("Decoded token without verification:", decoded);
//     req.user = decoded; 
//     console.log(req.user)
//     next(); 
//   } catch (err) {
//     return res.status(401).json({ msg: 'Token is not valid' });
//   }
// };

// module.exports = verifyToken;
