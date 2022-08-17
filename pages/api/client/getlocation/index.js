import DBCONNECT from '../../database/database.config';
import UPLOADPROPERTY from '../../models/uploadproperty2.schema';

DBCONNECT(); // IMPORTANT!

export default async function handle(req, res) {
    if (req.method === "GET") {
        try {
            const arraydata = [];
            const queryLocation = req.query.location.toLowerCase();

            const search = await UPLOADPROPERTY.find({
                $or: [
                    { title: new RegExp(queryLocation, 'i') },
                    { location: new RegExp(queryLocation, 'i') },
                ]
            }, { _id: 0, location: 1, title: 1 }).limit(5);

            await Promise.all(search.map(check))

            function check(el) {
                if (el.title.toLowerCase().indexOf(queryLocation) !== -1) {
                    arraydata.push(el.title);
                }
                if (el.location.toLowerCase().indexOf(queryLocation) !== -1) {
                    arraydata.push(el.location);
                }
            }

            let uniqueChars = [...new Set(arraydata)];

            if (arraydata.length > 0) {
                res.send(uniqueChars);
            } else {
                res.send({ message: 'NO PROPERTY!' })
            }

        } catch (error) {
            res.status(500).json({ message: "THERE WAS AN ERROR!" })
        }
    } else {
        res.status(500).json({ message: `${req.method} METHOD NOT SUPPORTED | ONLY POST METHOD SUPPORTED!` })
    }
};