import DBCONNECT from '../../database/database.config'; // IMPORTANT!
import USERPOSTPROPERTY from '../../models/userpostproperty.schema';
// import VALIDATEUSER from '../../middleware/validatetoken';

DBCONNECT(); // IMPORTANT!

const handle = async (req, res) => {
    const { id } = req.query

    if(req.method === "GET"){
        try{
            if(id){
                let data = await USERPOSTPROPERTY.findById(id);
                res.send(data)
            }
        } catch(err){
            res.status(500).json({ message: "THERE WAS AN ERROR!"})
        }
    } else if(req.method === "DELETE"){
        if(!id){
            res.status(500).json({ message: "NEED ID!"})
        }
        await USERPOSTPROPERTY.findByIdAndDelete(id);
        res.json({ message: "DELETED!" }); 
    }
    else{
        res.status(500).json({ message: `${req.method} METHOD NOT SUPPORTED | ONLY GET AND DELETE METHOD SUPPORTED!`})
    }
}

export default handle; // TESTING MODE
// export default VALIDATEUSER(handle); // PRODUCTION