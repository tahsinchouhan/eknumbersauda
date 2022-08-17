import DBCONNECT from '../../database/database.config';
import BESTSERVICE from '../../models/bestservice.schema';
// import VALIDATEUSER from '../../middleware/validatetoken';

DBCONNECT(); // IMPORTANT!

const handle = async (req, res) => {
    const { method } = req;

    if(method === "GET"){
        try{
            let data = await BESTSERVICE.find().sort({createdAt: -1});
            res.send(data)
        } catch(error){
            res.status(500).json({ error: "There Was an Error!"})
        }
    } else if(method === "POST"){
        try{
            const { name, email, phone, service } = req.body;

            // CHECK ALL FILEDS ARE NOT EMPTY
            if(!name || !email || !phone || !service) {
                return res.status(400).json({ message: "All Fields are Required!" });
            }
            
             // CREATING NEW BEST SERVICE FROM USER SIDE
             const BEST_SERVICE = new BESTSERVICE({
                name: name,
                email: email,
                phone: phone,
                service: service,
            });

            const SAVE_SERVICE = await BEST_SERVICE.save();
            res.send(SAVE_SERVICE)
        } catch(err){
            res.status(500).json({ error: "There Was an Error!"})
        }
    } else{
        console.log("METHOD NOT SUPPORTED!")
    }
}

export default handle; // TESTING MODE
// export default VALIDATEUSER(handle); // PRODUCTION