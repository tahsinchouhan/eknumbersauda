import DBCONNECT from '../../database/database.config';
import BANNER from '../../models/banner.schema';
// import VALIDATEUSER from '../../middleware/validatetoken';

DBCONNECT(); // IMPORTANT!!!

const handle = async (req, res) => {
    const { method } = req;

    if(method === "GET"){
        try{
            let data = await BANNER.find().sort({createdAt: -1});
            res.send(data)
        } catch(error){
            res.status(500).json({ error: "There Was an Error!"})
        }
    } else if(method === "POST"){
        try{
            const { bannername, url } = req.body;

            // CHECK ALL FILEDS ARE NOT EMPTY
            if(!bannername || !url) {
                return res.status(400).json({ message: "All Fields are Required!" });
            }
            
             // CREATING NEW BANNER FROM ADMIN SIDE
             const BANNERS = new BANNER({
                bannername: bannername,
                url: url
            });

            const SAVE_BANNER = await BANNERS.save();
            res.send(SAVE_BANNER)
        } catch(err){
            res.status(500).json({ error: "There Was an Error!"})
        }
    } else{
        console.log("METHOD NOT SUPPORTED!")
    }
}

export default handle; // TESTING MODE
// export default VALIDATEUSER(handle); // PRODUCTION