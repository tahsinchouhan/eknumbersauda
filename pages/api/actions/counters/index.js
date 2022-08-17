import DBCONNECT from '../../database/database.config';
import COUNTERS from '../../models/counters.schema';
// import VALIDATEUSER from '../../middleware/validatetoken';

DBCONNECT(); // IMPORTANT!

const handle = async (req, res) => {
    const { method } = req;

    if(method === "GET"){
        try{
            let data = await COUNTERS.find().sort({createdAt: -1});
            res.send(data);
        } catch(err){
            res.status(500).json({ error: "There Was an Error!"})
        }
    } else if(method === "POST"){
        try{
            const { countNumber, countTitle } = req.body;

            // CHECK ALL FILEDS ARE NOT EMPTY
            if(!countNumber || !countTitle) {
                return res.status(400).json({ message: "All Fields are Required!" });
            }
            
             // CREATING NEW COUNTER FROM ADMIN SIDE
             const COUNTER = new COUNTERS({
                countNumber: countNumber,
                countTitle: countTitle
            });

            const SAVE_COUNTER = await COUNTER.save();
            res.send(SAVE_COUNTER)
        } catch(err){
            res.status(500).json({ error: "There Was an Error!"})
        }
    } else{
        res.status(500).json({ error: "METHOD NOT SUPPORTED!"})
    }
}

export default handle; // TESTING MODE
// export default VALIDATEUSER(handle); // PRODUCTION