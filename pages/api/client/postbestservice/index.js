import DBCONNECT from '../../database/database.config';
import BESTSERVICE from '../../models/bestservice.schema';

DBCONNECT(); // IMPORTANT!

export default async function handle(req, res) {
    if(req.method === "POST"){
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
            res.status(500).json({ message: "THERE WAS AN ERROR!"})
        }
    } else{
        res.status(500).json({ message: `${req.method} METHOD NOT SUPPORTED | ONLY POST METHOD SUPPORTED!`})
    }
};