import DBCONNECT from '../../database/database.config';
import PROPERTY_TYPE from '../../models/propertytype.schema';
// import VALIDATEUSER from '../../middleware/validatetoken';

DBCONNECT(); // IMPORTANT!!!

const handle = async (req, res) => {
    if(req.method === "GET"){
        try{
            let data = await PROPERTY_TYPE.find().sort({createdAt: -1});
            res.send(data)
        } catch(error){
            res.status(500).json({ message: "THERE WAS AN ERROR!"})
        }
    } else if(req.method === "POST"){
        try{
            const { type } = req.body;

            // CHECK ALL FILEDS ARE NOT EMPTY
            if(!type) {
                return res.status(400).json({ message: "ALL FIELDS ARE REQUIRED!" });
            }
            
             // CREATING NEW BANNER FROM ADMIN SIDE
             const PROPERTYTYPE = new PROPERTY_TYPE({
                type: type
            });

            const SAVE_PROPERTYTYPE = await PROPERTYTYPE.save();
            res.send(SAVE_PROPERTYTYPE)
        } catch(err){
            res.status(500).json({ message: "THERE WAS AN ERROR!"})
        }
    } else{
        res.status(500).json({ message: `${req.method} METHOD NOT SUPPORTED | ONLY GET AND POST METHOD SUPPORTED!`})
    }
}

export default handle; // TESTING MODE
// export default VALIDATEUSER(handle); // PRODUCTION