import DBCONNECT from '../../database/database.config';
import USERPOSTPROPERTY from '../../models/userpostproperty.schema';

DBCONNECT(); // IMPORTANT!

export default async function handle(req, res) {
    const { method } = req;

    if(method === "POST"){
        try{
            const { name, email, phone, type, message } = req.body;

            // CHECK ALL FILEDS ARE NOT EMPTY
            if(!name || !email || !phone || !type || !message) {
                return res.status(400).json({ message: "All Fields are Required!" });
            }
            
             // CREATING GETIN TOUCH FROM USER SIDE
             const USER_POSTPROPERTY = new USERPOSTPROPERTY({
                name: name,
                email: email,
                phone: phone,
                type: type,
                message: message
            });

            const SAVE_USERPOSTPRO = await USER_POSTPROPERTY.save();
            res.send(SAVE_USERPOSTPRO)
        } catch(error){
            res.status(500).json({ message: "THERE WAS AN ERROR!"})
        }
    } else{
        res.status(500).json({ message: `${req.method} METHOD NOT SUPPORTED | ONLY POST METHOD SUPPORTED!`})
    }
};