import DBCONNECT from '../../database/database.config';
import AMENITIES_TYPE from '../../models/amenities.schema';
// import VALIDATEUSER from '../../middleware/validatetoken';

DBCONNECT(); // IMPORTANT!

const handle = async (req, res) => {
    const { method } = req;
    const { amenitiestypeid } = req.query

    if(method === "GET"){
        try{
            if(amenitiestypeid){
                let data = await AMENITIES_TYPE.findById(amenitiestypeid);
                res.send(data)
            }
        } catch(err){
            res.status(500).json({ error: "There Was an Error!"})
        }
    } else if(method === "PUT"){
        const { type } = req.body;

        if(!type){
            res.status(500).json({ message: "Filed are Not Filled Properly!"})
        }
        if(!amenitiestypeid){
            res.status(500).json({ error: "Need ID!"})
        }
        const data = await AMENITIES_TYPE.findByIdAndUpdate(
            amenitiestypeid,
            req.body
        );
        res.send(data);
    } else if(method === "DELETE"){
        if(!amenitiestypeid){
            res.status(500).json({ error: "Need ID!"})
        }
        await AMENITIES_TYPE.findByIdAndDelete(amenitiestypeid);
        res.json({ message: "DELETED!" });
    }
    else{
        console.log("METHOD NOT SUPPORTED!")
    }
}

export default handle; // TESTING MODE
// export default VALIDATEUSER(handle); // PRODUCTION