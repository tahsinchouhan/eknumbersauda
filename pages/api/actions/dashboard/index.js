import DBCONNECT from '../../database/database.config';
import PROPERTY from '../../models/uploadproperty2.schema';
import SERVICES from '../../models/services.schema';
import CONTACT from '../../models/contact.schema';
import BOOK from '../../models/getintouch.schema';
import USERPOST from '../../models/userpostproperty.schema';
// import VALIDATEUSER from '../../middleware/validatetoken';

DBCONNECT(); // IMPORTANT!

const handle = async (req, res) => {
    const { method } = req;

    if(method === "GET"){
        try{
            let totalrent = await PROPERTY.find({type:'rent'}).count();
            let totalsell = await PROPERTY.find({type:'sell'}).count();
            let totalproject = await PROPERTY.find({propertyname:'project'}).count();
            let totalfeature = await PROPERTY.find({propertyname:'Featured-property'}).count();
            let totalservices = await SERVICES.find().count();
            let totalcontact = await CONTACT.find().count();
            let totalbookproperty = await BOOK.find().count();
            let totaluserpost = await USERPOST.find().count();

            res.send({
                "totalrent": totalrent,
                "totalsell": totalsell,
                "totalproject": totalproject,
                "totalfeatured": totalfeature,
                "totalservices": totalservices,
                "totalcontact": totalcontact,
                "totalbookproperty": totalbookproperty,
                "totaluserpost": totaluserpost
            });
        } catch(err){
            res.status(500).json({ error: "THERE WAS AN ERROR!"})
        }
    } else{
        res.status(500).json({ message: `${req.method} METHOD NOT SUPPORTED | ONLY GET METHOD SUPPORTED!` })
    }
}

export default handle; // TESTING MODE
// export default VALIDATEUSER(handle); // PRODUCTION