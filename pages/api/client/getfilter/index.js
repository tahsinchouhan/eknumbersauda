// import DBCONNECT from '../../database/database.config'; // IMPORTANT!
import UPLOADPROPERTY from '../../models/uploadproperty2.schema';

// DBCONNECT(); // IMPORTANT!

export default async function handle(req, res) {
    if (req.method === "GET") {
        try {
            let query = [];
            const queryType = req.query.type;
            let queryPinAdd = req.query.address;
            let queryPropertyType = req.query.propertytype;
            let queryLowerRange = req.query.lowerrange;
            let queryHigherRange = req.query.higherrange;

            queryLowerRange = parseInt(queryLowerRange)
            queryHigherRange = parseInt(queryHigherRange)

            // queryPinAdd = queryPinAdd.toLowerCase();

            if (queryType) { query['$and'] = [{ type: { $regex: queryType, $options: '$i' } }] }

            if (queryPinAdd) {
                query['$and'] = [...query['$and'], {'$or': [
                    { title: { $regex: queryPinAdd, $options: '$i' } },
                    { location: { $regex: queryPinAdd, $options: '$i' } }
                ]}]
            }

            if(queryPropertyType) { query['$and'] = [ ...query['$and'], { property: { $regex: queryPropertyType, $options: '$i' } }] }

            if(queryLowerRange && queryHigherRange) { query['$and'] = [ ...query['$and'],
                { offerprice: { $gte: queryLowerRange } },
                { offerprice: { $lte: queryHigherRange } }
            ]}

            await UPLOADPROPERTY.find({ ...query }).sort({ createdAt: -1 }).then((data) => {
                res.send(data);
            })

        } catch (error) {
            res.status(500).json({ message: "THERE WAS AN ERROR!" })
        }
    } else {
        res.status(500).json({ message: `${req.method} METHOD NOT SUPPORTED | ONLY GET METHOD SUPPORTED!` })
    }
};