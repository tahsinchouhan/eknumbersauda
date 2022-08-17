import DBCONNECT from '../../database/database.config'; // IMPORTANT!
import COUNTERS from '../../models/counters.schema';

DBCONNECT(); // IMPORTANT!

export default async function handle(req, res) {
    if(req.method === "GET"){
        try{
            let data = await COUNTERS.find();
            res.send(data)
        } catch(error){
            res.status(500).json({ message: "THERE WAS AN ERROR!"})
        }
    } else{
        res.status(500).json({ message: `${req.method} METHOD NOT SUPPORTED | ONLY GET METHOD SUPPORTED!`})
    }
};