// import DBCONNECT from '../../database/database.config'; // IMPORTANT!
import BANNER from '../../models/banner.schema';

// DBCONNECT(); // IMPORTANT!

export default async function handle(req, res){
    if(req.method === "GET"){
        try{
            let data = await BANNER.find().sort({createdAt: -1});
            res.send(data)
        } catch(error){
            res.status(500).json({ message: "THERE WAS AN ERROR!"})
        }
    } else{
        res.status(500).json({ message: `${req.method} METHOD NOT SUPPORTED | ONLY GET METHOD SUPPORTED!`})
    }
};