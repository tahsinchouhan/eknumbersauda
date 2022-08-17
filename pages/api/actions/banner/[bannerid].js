import DBCONNECT from '../../database/database.config';
import BANNER from '../../models/banner.schema';
// import VALIDATEUSER from '../../middleware/validatetoken';

DBCONNECT(); // IMPORTANT!

const handle = async (req, res) => {
    const { method } = req;
    const { bannerid } = req.query

    if(method === "GET"){
        try{
            if(bannerid){
                let data = await BANNER.findById(bannerid);
                res.send(data)
            }
        } catch(err){
            res.status(500).json({ error: "There Was an Error!"})
        }
    } else if(method === "PUT"){
        const { bannername, url } = req.body;

        if(!bannername || !url){
            res.status(500).json({ message: "Filed are Not Filled Properly!"})
        }
        if(!bannerid){
            res.status(500).json({ error: "Need ID!"})
        }
        const data = await BANNER.findByIdAndUpdate(
            bannerid,
            req.body
        );
        res.send(data);
    } else if(method === "DELETE"){
        if(!bannerid){
            res.status(500).json({ error: "Need ID!"})
        }
        await BANNER.findByIdAndDelete(bannerid);
        res.json({ message: "DELETED!" });
    }
    else{
        console.log("METHOD NOT SUPPORTED!")
    }
}

export default handle; // TESTING MODE
// export default VALIDATEUSER(handle); // PRODUCTION