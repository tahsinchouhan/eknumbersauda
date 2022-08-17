import DBCONNECT from '../../database/database.config';
import AMENITIES_TYPE from '../../models/amenities.schema';
// import VALIDATEUSER from '../../middleware/validatetoken';

DBCONNECT(); // IMPORTANT!!!

const handle = async (req, res) => {
    const { method } = req;

    if(method === "GET"){
        try{
            let data = await AMENITIES_TYPE.find().sort({createdAt: -1});
            res.send(data)
        } catch(error){
            res.status(500).json({ error: "There Was an Error!"})
        }
    } else if(method === "POST"){
        try{
            const { type, icon } = req.body;

            // CHECK ALL FILEDS ARE NOT EMPTY
            if(!type) {
                return res.status(400).json({ message: "All Fields are Required!" });
            }
            
             // CREATING NEW BANNER FROM ADMIN SIDE
             const AMENITIESTYPE = new AMENITIES_TYPE({
                type: type,
                icon: icon
            });

            const SAVE_AMENITIESTYPE = await AMENITIESTYPE.save();
            res.send(SAVE_AMENITIESTYPE)
        } catch(err){
            res.status(500).json({ error: "There Was an Error!"})
        }
    } else{
        console.log("METHOD NOT SUPPORTED!")
    }
}

export default handle; // TESTING MODE
// export default VALIDATEUSER(handle); // PRODUCTION