import DBCONNECT from '../../database/database.config';
import BESTSERVICE from '../../models/bestservice.schema';
// import VALIDATEUSER from '../../middleware/validatetoken';

DBCONNECT(); // IMPORTANT!

const handle = async (req, res) => {
    const { method } = req;
    const { bestserviceid } = req.query

    if(method === "GET"){
        try{
            if(bestserviceid){
                let data = await BESTSERVICE.findById(bestserviceid);
                res.send(data)
            }
        } catch(err){
            res.status(500).json({ error: "There Was an Error!"})
        }
    } else if(method === "DELETE"){
        if(!bestserviceid){
            res.status(500).json({ error: "Need ID!"})
        }
        await BESTSERVICE.findByIdAndDelete(bestserviceid);
        res.json({ message: "DELETED!" });
        
    }
    else{
        console.log("METHOD NOT SUPPORTED!")
    }
}

export default handle; // TESTING MODE
// export default VALIDATEUSER(handle); // PRODUCTION