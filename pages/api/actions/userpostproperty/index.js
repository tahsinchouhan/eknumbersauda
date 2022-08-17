import DBCONNECT from '../../database/database.config'; // IMPORTANT!
import USERPOSTPROPERTY from '../../models/userpostproperty.schema';
// import VALIDATEUSER from '../../middleware/validatetoken';

DBCONNECT(); // IMPORTANT!

const handle = async (req, res) => {
    if(req.method === "GET"){
        try{
            let data = await USERPOSTPROPERTY.find().sort({createdAt: -1});
            res.send(data)
        } catch(error){
            res.status(500).json({ message: "THERE WAS AN ERROR!"})
        }
    } else if(req.method === "POST"){
        try{
            const { name, email, phone, dateOfBirth, propertyType, propertySize, noOfMembers } = req.body;

            // CHECK ALL FILEDS ARE NOT EMPTY
            if(!name || !email || !phone || !dateOfBirth || !propertyType || !propertySize || !noOfMembers) {
                return res.status(400).json({ message: "All Fields are Required!" });
            }
            
             // CREATING GETIN TOUCH FROM USER SIDE
             const USER_POSTPROPERTY = new USERPOSTPROPERTY({
                name: name,
                email: email,
                phone: phone,
                dateOfBirth: dateOfBirth,
                propertyType: propertyType,
                propertySize: propertySize,
                noOfMembers: noOfMembers
            });

            const SAVE_USERPOSTPRO = await USER_POSTPROPERTY.save();
            res.send(SAVE_USERPOSTPRO)
        } catch(error){
            res.status(500).json({ message: "THERE WAS AN ERROR!"})
        }
    } else{
        res.status(500).json({ message: `${req.method} METHOD NOT SUPPORTED | ONLY GET AND POST METHOD SUPPORTED!`})
    }
}

export default handle; // TESTING MODE
// export default VALIDATEUSER(handle); // PRODUCTION