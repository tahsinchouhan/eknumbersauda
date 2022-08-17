import JWT from 'jsonwebtoken';

export default function validate(req, res){
    const secret = process.env.JWT_SECRET;
    // const { cookies, method } = req;
    // const jwttoken = req.body.token || req.headers["x-access-token"] || cookies.paridhi;
    const { method } = req;
    const jwttoken = req.headers["x-access-token"];

    if(jwttoken){
        if(method === "GET"){
            try{
                const verified = JWT.verify(jwttoken, secret);
                res.send(verified)
            } catch{
                res.json({error: "Something Error!"})
            }
        } else{
            res.status(500).json ({ message: "METHOD NOT SUPPORTED!"})
        }
    } else{
        res.json("TOKEN REQUIRED!")
    }
}

