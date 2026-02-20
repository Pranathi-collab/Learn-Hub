const jwt = require("jsonwebtoken");

module.exports = async(req, res, next) => {
  try{
    const authorizationheader =req.headers["authorization"];
    if(!authorizationheader){
      return res.status(401).send({
        message:"Authorization header is missing",
        success:false,
      });
    }

    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(tooken, process.env,JWT_KEY,(err, decode) =>{
      if(err){
        return res.status(200)
        .send({
          message: "token is not valid",
          success:false
        });
      }else{
        req.body.userId = decode.id;
        next();
      }
    });
  }catch(error){
    console.error(error);
    res.status(500).send({message:"Internal server error",success: false});
  }
}