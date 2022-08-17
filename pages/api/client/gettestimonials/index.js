import DBCONNECT from '../../database/database.config'; // IMPORTANT!
import TESTIMONIAL_SCHEMA from '../../models/testimonial.schema';

DBCONNECT(); // IMPORTANT!

export default async function handle(req, res) {
    if(req.method === "GET"){
        try{
            let data = await TESTIMONIAL_SCHEMA.find().sort({createdAt: -1});
            res.send(data)
        } catch(err){
            res.status(500).json({ message: "THERE WAS AN ERROR!"})
        }
    } else{
        res.status(500).json({ message: `${req.method} METHOD NOT SUPPORTED | ONLY GET METHOD SUPPORTED!`})
    }
};