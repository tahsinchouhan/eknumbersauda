import DBCONNECT from '../../database/database.config'; // IMPORTANT!
import USERSCHEMA from '../../models/users.schema';
import BCRYPT from 'bcryptjs';
import JWT from 'jsonwebtoken';
import { serialize } from "cookie";

DBCONNECT(); // IMPORTANT!

export default async function handle(req, res) {
    if(req.method === "POST"){
        try{
            const { email, password } = req.body;
            // CHECK ALL FILEDS ARE NOT EMPTY
            if(!email || !password) {
                return res.status(400).json({ message: "All Fields are Required!" });
            }

            // CHECK EMAIL IN THE DATABASE
            const USER = await USERSCHEMA.findOne({ email: email });
            if(!USER) {
                return res.status(404).json({ message: "INVALID CREDENTIALS!" });
            }

            // COMPARE PASSWORD WITH HASHED PASSWORD
            const IS_MATCH = await BCRYPT.compare(password, USER.password);
            if (!IS_MATCH) {
                return res.status(404).json({ message: "INVALID CREDENTIALS!" });
            }

            // Creating our json web token by passing the user id and our JWT_SECRET
            const token = JWT.sign({ 
                id: USER._id,
                name: USER.name,
                role: USER.role
            }, process.env.JWT_SECRET, {
                expiresIn: "1h"
            });

            const storeTokenTOCookie = serialize("paridhi", token, { httpOnly: true, sameSite: "strict", maxAge: 60 * 60 * 24 * 7, path: "/"});
            
            res.setHeader("Set-Cookie", storeTokenTOCookie);
            res.json({token});
        } catch(error){
            res.status(500).json({ message: "THERE WAS AN ERROR!"})
        }
    } else{
        res.status(500).json({ message: `${req.method} METHOD NOT SUPPORTED | ONLY POST METHOD SUPPORTED!`})
    }
}
