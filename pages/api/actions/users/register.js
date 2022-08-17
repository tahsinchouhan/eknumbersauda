import DBCONNECT from '../../database/database.config'; // IMPORTANT!
import USERSCHEMA from '../../models/users.schema';
import BCRYPT from 'bcryptjs';

DBCONNECT(); // IMPORTANT!

export default async function handle(req, res){
    if(req.method === "POST") {
        try{
            const { name, email, password, role } = req.body;

            // CHECK ALL FILEDS ARE NOT EMPTY
            if(!name || !email || !password || !role) {
                return res.status(400).json({ message: "All Fields are Required!" });
            }

             // CHECKING TO ENSURE PASSWORD LENGTH IS AT LEAST 5 CHARACTERS
            if(password.length < 6) {
                return res.status(400).json({ message: "The Password Needs to be at Least 5 Characters Long!" });
            }

            // CHECK EMAIL ARE UNIQUE IN THE DATABASE
            const EXISTING_EMAIL = await USERSCHEMA.findOne({ email: email });
            if(EXISTING_EMAIL) {
                return res.status(400).json({ message: "EMAIL ALREADY USED!" });
            }

            // HASH PASSWORD BCRYPTJS
            const SALT = await BCRYPT.genSalt();
            const PASSWORD_HASH = await BCRYPT.hash(password, SALT);

            // CREATING NEW USER SCHEMA TO STORE HASH PASSWORD
            const NEW_USER = new USERSCHEMA({
                name: name,
                email: email,
                password: PASSWORD_HASH,
                role: role,
            });

            const SAVE_USER = await NEW_USER.save();
            res.json(SAVE_USER);
        } catch(error){
            res.status(500).json({ message: "THERE WAS AN ERROR!"})
        }
    } else{
        res.status(500).json({ message: `${req.method} METHOD NOT SUPPORTED | ONLY POST METHOD SUPPORTED!`})
    }
}