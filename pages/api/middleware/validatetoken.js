import JWT from 'jsonwebtoken';

const validateToken = (handle) => async (req, res) => {
    const secret = process.env.JWT_SECRET;
    const jwttoken = req.cookies.paridhi;

    if(jwttoken){
        JWT.verify(jwttoken, secret, async (err, decode) => {
            if(!err && decode){
                return await handle(req, res);
            } else{
                res.json({message: "INVALID TOKEN!"})
            }
        });
    } else{
        res.json({message: "NO TOKEN PROVIDED PLEASE LOGIN YOURSELF!"})
    }
}

export default validateToken;