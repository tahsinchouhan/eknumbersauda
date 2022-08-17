import DBCONNECT from '../../database/database.config'; // IMPORTANT!
import UPLOADPROPERTY from '../../models/uploadproperty2.schema';
// import VALIDATEUSER from '../../middleware/validatetoken';
import slugify from 'slugify';

DBCONNECT(); // IMPORTANT!

const handle = async (req, res) => {
    if (req.method === "GET") {
        try {
            let data = await UPLOADPROPERTY.find().sort({ createdAt: -1 });
            res.send(data)
        } catch (err) {
            res.status(500).json({ message: "THERE WAS AN ERROR!" })
        }
    } else if (req.method === "POST") {
        try {
            const { title, minprice, maxprice, realprice, offerprice, address, description, location, type, propertyname, amenities, images, ownername, owneraddress, ownerphone, property, whychoose1, whychoose2, whychoose3, whychoose4, whychoose5, iframe, sqft, ratepersqft, rera } = req.body;

            const slugtitle = slugify(title, { replacement: '-', lower: true, strict: true, locale: 'vi', trim: true })

            const UPLOAD_PROPERTY = new UPLOADPROPERTY({
                title: title,
                minprice: minprice,
                maxprice: maxprice,
                realprice: realprice,
                offerprice, offerprice,
                address: address,
                description: description,
                location: location,
                type: type,
                propertyname: propertyname,
                amenities: amenities,
                images: images,
                ownername: ownername,
                owneraddress: owneraddress,
                ownerphone: ownerphone,
                property: property,
                whychoose1: whychoose1,
                whychoose2: whychoose2,
                whychoose3: whychoose3,
                whychoose4: whychoose4,
                whychoose5: whychoose5,
                iframe: iframe,
                sqft: sqft,
                ratepersqft: ratepersqft,
                rera: rera,
                slug: slugtitle
            });

            const SAVE_UPLOAD = await UPLOAD_PROPERTY.save();
            res.send(SAVE_UPLOAD);
        } catch (err) {
            res.status(500).json({ message: "THERE WAS AN ERROR!" })
        }
    } else {
        res.status(500).json({ message: `${req.method} METHOD NOT SUPPORTED | ONLY GET AND POST METHOD SUPPORTED!` })
    }
}

export default handle; // TESTING MODE
// export default VALIDATEUSER(handle); // PRODUCTION