// import DBCONNECT from '../../database/database.config'; // IMPORTANT!
import UPLOADPROPERTY from '../../models/uploadproperty2.schema';

// DBCONNECT(); // IMPORTANT!

export default async function handle(req, res) {
    if (req.method === "GET") {
        try {
            let query = [];
            const queryType = req.query.type;
            let queryPrice = req.query.price || '';

            queryPrice = queryPrice.toLowerCase();

            if(queryType) { query['$and'] = [{ type: { $regex: queryType, $options: '$i' } }] }

            if(queryPrice == 'below50l') { query['$and'] = [ ...query['$and'], 
                    { offerprice: { $lte: 5000000 } } 
                ]}

            if(queryPrice == '50l1cr') { query['$and'] = [ ...query['$and'],
                    { offerprice: { $gte: 5000000 } },
                    { offerprice: { $lte: 10000000 } }
                ]}

            if(queryPrice == 'above1cr') { query['$and'] = [ ...query['$and'],
                    { offerprice: { $gt: 10000000 } }
                ]}

            await UPLOADPROPERTY.find({ ...query }).sort({createdAt: -1}).then((data) => {
                res.send(data);
            })

        } catch (error) {
            res.status(500).json({ message: "THERE WAS AN ERROR!" })
        }
    } else {
        res.status(500).json({ message: `${req.method} METHOD NOT SUPPORTED | ONLY GET METHOD SUPPORTED!` })
    }
};