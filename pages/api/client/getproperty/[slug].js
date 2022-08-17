import DBCONNECT from '../../database/database.config'; // IMPORTANT!
import UPLOADPROPERTY from '../../models/uploadproperty2.schema';

DBCONNECT(); // IMPORTANT!

export default async function handle(req, res) {
    const { slug } = req.query;

    if(req.method === "GET"){
        try{
            if(slug){
                let data = await UPLOADPROPERTY.findOne({slug: slug}).sort({createdAt: -1});
                res.send(data)
            }
        } catch(err){
            res.status(500).json({ message: "THERE WAS AN ERROR!"})
        }
    } else{
        res.status(500).json({ message: `${req.method} METHOD NOT SUPPORTED | ONLY GET METHOD SUPPORTED!`})
    }
};