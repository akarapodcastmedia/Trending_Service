// import jsonwebtoken
const jwt = require("jsonwebtoken");
const middlewarer = async (req,res,next)=>{
    const token = req.header("Authorization");
    if(token){
        const real_token = token.split(" ")[1];
        jwt.verify(real_token,process.env.PROGRAM_TOKEN_SECRET,(error,data)=>{
            if(error){
                return res.json({
                    error : true,
                    message : error.message
                });
            }else{
                if(data.email != null || data.email !="none"){
                    req.email = data.email;
                    req.identify = data.email 
                    next();
                }else{
                    req.identify = data.identify;
                    next();
                }
            }
        })
    }else{
        return res.json({
            error : true,
            message : "require token"
        })
    }
}

module.exports = {
    middlewarer
}