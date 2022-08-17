import DBCONNECT from '../../database/database.config'; // IMPORTANT!
import UPLOADPROPERTY from '../../models/uploadproperty2.schema';

DBCONNECT(); // IMPORTANT!

export default async function handle(req, res) {
    if (req.method === "GET") {
        try {
            const arrdata = [];
            const queryType = req.query.type;
            const querySlug = req.query.slug;

            const search = await UPLOADPROPERTY.find({ type: new RegExp(queryType, 'i') });

            await Promise.all(search.map(check))

            function check(el) {
                if (el.slug !== querySlug) {
                    arrdata.push(el);
                }
            }

            res.send(arrdata);

        } catch (error) {
            res.status(500).json({ message: "THERE WAS AN ERROR!" })
        }
    } else {
        res.status(500).json({ message: `${req.method} METHOD NOT SUPPORTED | ONLY GET METHOD SUPPORTED!` })
    }
};