import DBCONNECT from '../../database/database.config'; // IMPORTANT!
import PROPERTY_TYPE from '../../models/propertytype.schema';
// import VALIDATEUSER from '../../middleware/validatetoken';

DBCONNECT(); // IMPORTANT!

const handle = async (req, res) => {
    const { id } = req.query

    if(req.method === "GET"){
        try{
            if(id){
                let data = await PROPERTY_TYPE.findById(id);
                res.send(data);
            }
        } catch(err){
            res.status(500).json({ message: "THERE WAS AN ERROR!"})
        }
    } else if(req.method === "PUT"){
        const { type } = req.body;

        if(!type){
            res.status(500).json({ message: "ALL FIELDS ARE REQUIRED!"})
        }
        if(!id){
            res.status(500).json({ message: "NEED ID!"})
        }
        const data = await PROPERTY_TYPE.findByIdAndUpdate(id,req.body);
        res.json({ message: "UPDATED!" });
    } else if(req.method === "DELETE"){
        if(!id){
            res.status(500).json({ message: "NEED ID!"})
        }
        await PROPERTY_TYPE.findByIdAndDelete(id);
        res.json({ message: "DELETED!" });
    }
    else{
        res.status(500).json({ message: `${req.method} METHOD NOT SUPPORTED | ONLY GET AND PUT AND DELETE METHOD SUPPORTED!`})
    }
}

export default handle; // TESTING MODE
// export default VALIDATEUSER(handle); // PRODUCTION