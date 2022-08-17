import DBCONNECT from '../../database/database.config';
import CONTACTSCHEMA from '../../models/contact.schema';

DBCONNECT(); // IMPORTANT!

export default async function handle(req, res) {
    if(req.method === "POST"){
        try{
            const { name, email, phone, dateOfBirth, messages } = req.body;

            // CHECK ALL FILEDS ARE NOT EMPTY
            if(!name || !email || !phone || !dateOfBirth || !messages ) {
                return res.status(400).json({ message: "All Fields are Required!" });
            }
            
             // CREATING GETIN TOUCH FROM USER SIDE
             const USER_CONTACTSCHEMA = new CONTACTSCHEMA({
                name: name,
                email: email,
                phone: phone,
                dateOfBirth: dateOfBirth,
                messages: messages
            });

            const SAVE_CONTACTSCHEMA = await USER_CONTACTSCHEMA.save();
            res.send(SAVE_CONTACTSCHEMA)
        } catch(error){
            res.status(500).json({ message: "THERE WAS AN ERROR!"})
        }
    } else{
        res.status(500).json({ message: `${req.method} METHOD NOT SUPPORTED | ONLY POST METHOD SUPPORTED!`})
    }
};