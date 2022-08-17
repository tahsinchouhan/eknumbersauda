import DBCONNECT from '../../database/database.config'; // IMPORTANT!
import UPLOADPROPERTY from '../../models/uploadproperty2.schema';
// import VALIDATEUSER from '../../middleware/validatetoken';

DBCONNECT(); // IMPORTANT!

const handle = async (req, res) => {
    const { id } = req.query

    if(req.method === "GET"){
        try{
            if(id){
                let data = await UPLOADPROPERTY.findById(id);
                res.send(data)
            }
        } catch(err){
            res.status(500).json({ message: "THERE WAS AN ERROR!"})
        }
    } else if(req.method === "PUT"){
        if(id){
            await UPLOADPROPERTY.findByIdAndUpdate({_id: id}, req.body)
            res.json({ message: "UPDATED!" });
        }
    } else if(req.method === "DELETE"){
        if(!id){
            res.status(500).json({ message: "NEED ID!"})
        }
        await UPLOADPROPERTY.findByIdAndDelete(id);
        res.json({ message: "DELETED!" });
    }
    else{
        res.status(500).json({ message: `${req.method} METHOD NOT SUPPORTED | ONLY GET AND PUT AND DELETE METHOD SUPPORTED!`})
    }
}

export default handle; // TESTING MODE
// export default VALIDATEUSER(handle); // PRODUCTION