import DBCONNECT from '../../database/database.config';
import GETINTOUCH from '../../models/getintouch.schema';
// import VALIDATEUSER from '../../middleware/validatetoken';

DBCONNECT(); // IMPORTANT!

const handle = async (req, res) => {
    const { method } = req; 

    if(method === "GET"){
        try{
            let data = await GETINTOUCH.find().sort({createdAt: -1});
            res.send(data)
        } catch(err){
            res.status(500).json({ message: "THERE WAS AN ERROR!"})
        }
    } else if(method === "POST"){
        try{
            const { name, email, phone, message, propertyID } = req.body;

            // CHECK ALL FILEDS ARE NOT EMPTY
            if(!name || !email || !phone || !message) {
                return res.status(400).json({ message: "ALL FIELDS ARE REQUIRED!" });
            }
            
             // CREATING GETIN TOUCH FROM USER SIDE
             const GETIN_TOUCH = new GETINTOUCH({
                name: name,
                email: email,
                phone: phone,
                message: message,
                propertyID: propertyID
            });

            const SAVE_TOUCH = await GETIN_TOUCH.save();
            res.send(SAVE_TOUCH)
        } catch(err){
            res.status(500).json({ message: "THERE WAS AN ERROR!"})
        }
    } else{
        res.status(500).json({ message: `${req.method} METHOD NOT SUPPORTED | ONLY GET AND POST METHOD SUPPORTED!`})
    }
}

export default handle; // TESTING MODE
// export default VALIDATEUSER(handle); // PRODUCTION