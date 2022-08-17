import DBCONNECT from '../../database/database.config';
import CONTACT from '../../models/contact.schema';
// import VALIDATEUSER from '../../middleware/validatetoken';

DBCONNECT(); // IMPORTANT!!!

const handle = async (req, res) => {
    const { method } = req;

    if(method === "GET"){
        try{
            let data = await CONTACT.find().sort({createdAt: -1});
            res.send(data)
        } catch(error){
            res.status(500).json({ error: "There Was an Error!"})
        }
    } else if(method === "POST"){
        try{
            const { name, email, phone, dateOfBirth, messages } = req.body;

            // CHECK ALL FILEDS ARE NOT EMPTY
            if(!name || !email || !phone || !dateOfBirth || !messages) {
                return res.status(400).json({ message: "All Fields are Required!" });
            }
            
             // CREATING NEW BANNER FROM ADMIN SIDE
             const CONTACTUS = new CONTACT({
                name: name,
                email: email,
                phone: phone,
                dateOfBirth: dateOfBirth,
                messages: messages
            });

            const SAVE_CONTACT = await CONTACTUS.save();
            res.send(SAVE_CONTACT)
        } catch(err){
            res.status(500).json({ error: "There Was an Error!"})
        }
    } else{
        console.log("METHOD NOT SUPPORTED!")
    }
}

export default handle; // TESTING MODE
// export default VALIDATEUSER(handle); // PRODUCTION