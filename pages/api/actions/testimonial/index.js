import DBCONNECT from '../../database/database.config';
import TESTIMONIAL_SCHEMA from '../../models/testimonial.schema';
// import VALIDATEUSER from '../../middleware/validatetoken';

DBCONNECT(); // IMPORTANT!!!

const handle = async (req, res) => {
    if(req.method === "GET"){
        try{
            let data = await TESTIMONIAL_SCHEMA.find().sort({createdAt: -1});
            res.send(data)
        } catch(error){
            res.status(500).json({ message: "THERE WAS AN ERROR!"})
        }
    } else if(req.method === "POST"){
        try{
            const { star, name, address, content, image } = req.body;

            // CHECK ALL FILEDS ARE NOT EMPTY
            if(!star || !name || !address || !content || !image) {
                return res.status(400).json({ message: "ALL FIELDS ARE REQUIRED!" });
            }
            
             // CREATING NEW BANNER FROM ADMIN SIDE
             const TESTIMONIAL = new TESTIMONIAL_SCHEMA({
                star: star,
                name: name,
                address: address,
                content: content,
                image: image
            });

            const SAVE_TESTIMONIAL = await TESTIMONIAL.save();
            res.send(SAVE_TESTIMONIAL)
        } catch(err){
            res.status(500).json({ message: "THERE WAS AN ERROR!"})
        }
    } else{
        res.status(500).json({ message: `${req.method} METHOD NOT SUPPORTED | ONLY GET AND POST METHOD SUPPORTED!`})
    }
}

export default handle; // TESTING MODE
// export default VALIDATEUSER(handle); // PRODUCTION