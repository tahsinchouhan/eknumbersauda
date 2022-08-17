import DBCONNECT from '../../database/database.config';
import CONTACT from '../../models/contact.schema';
// import VALIDATEUSER from '../../middleware/validatetoken';

DBCONNECT(); // IMPORTANT!

const handle = async (req, res) => {
    const { method } = req;
    const { contactid } = req.query;

    if(method === "GET"){
        try{
            if(contactid){
                let data = await CONTACT.findById(contactid);
                res.send(data)
            }
        } catch(err){
            res.status(500).json({ error: "There Was an Error!"})
        }
    } else if(method === "PUT"){
        const { name, email, phone, dateOfBirth, messages } = req.body;

        if(!name || !email || !phone || !dateOfBirth || !messages) {
            res.status(500).json({ message: "Filed are Not Filled Properly!"})
        }
        if(!contactid){
            res.status(500).json({ error: "Need ID!"})
        }
        const data = await CONTACT.findByIdAndUpdate(
            contactid,
            req.body
        );
        res.send(data);
    } else if(method === "DELETE"){
        if(!contactid){
            res.status(500).json({ error: "Need ID!"})
        }
        await CONTACT.findByIdAndDelete(contactid);
        res.json({ message: "DELETED!" });
    }
    else{
        console.log("METHOD NOT SUPPORTED!")
    }
}

export default handle; // TESTING MODE
// export default VALIDATEUSER(handle); // PRODUCTION