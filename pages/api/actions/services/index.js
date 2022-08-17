import DBCONNECT from '../../database/database.config';
import SERVICESCHEMA from '../../models/services.schema';
// import VALIDATEUSER from '../../middleware/validatetoken';

DBCONNECT(); // IMPORTANT!

const handle = async (req, res) => {
    if(req.method === "GET"){
        try{
            let data = await SERVICESCHEMA.find().sort({createdAt: -1});
            res.send(data);
        } catch(err){
            res.status(500).json({ message: "THERE WAS AN ERROR!"})
        }
    } else if(req.method === "POST"){
        try{
            let data = new SERVICESCHEMA(req.body);
            await data.save();
            res.send("DONE!");
        } catch(err){
            res.status(500).json({ message: "THERE WAS AN ERROR!"})
        }
    } else{
        res.status(500).json({ message: `${req.method} METHOD NOT SUPPORTED | ONLY GET AND POST METHOD SUPPORTED!`})
    }
}

export default handle; // TESTING MODE
// export default VALIDATEUSER(handle); // PRODUCTION