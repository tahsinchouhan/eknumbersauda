import DBCONNECT from '../../database/database.config';
import COUNTERS from '../../models/counters.schema';
// import VALIDATEUSER from '../../middleware/validatetoken';

DBCONNECT(); // IMPORTANT!

const handle = async (req, res) => {
    const { method } = req;
    const { counterid } = req.query

    if(method === "GET"){
        try{
            // const { id } = req.body;
            if(counterid){
                let data = await COUNTERS.findById(counterid);
                res.send(data)
            }
        } catch(err){
            res.status(500).json({ error: "There Was an Error!"})
        }
    } else if(method === "PUT"){
        if(counterid){
            let data = await COUNTERS.findByIdAndUpdate(
                {_id: counterid}, req.body
            )
            res.send(data);
        }
    } else if(method === "DELETE"){
        if(!counterid){
            res.status(500).json({ error: "Need ID!"})
        }
        await COUNTERS.findByIdAndDelete(counterid);
        res.json({ message: "DELETED!" });
        
    }
    else{
        console.log("METHOD NOT SUPPORTED!")
    }
}

export default handle; // TESTING MODE
// export default VALIDATEUSER(handle); // PRODUCTION