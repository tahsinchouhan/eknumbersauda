import PROPERTY from '../models/uploadproperty2.schema';




const filter = async (req, res) => {
    let query = [];
    const searchType = req.query.type;
    let searchPrice = req.query.price || '';

    searchPrice = searchPrice.toLowerCase();

    if (searchType) {
        query['$and'] = [
            {
                type: { $regex: searchType, $options: '$i' },
            }
        ]
    }

    if (searchPrice == 'below50l') {
        query['$and'] = [
            ...query['$and'],
            {
                offerprice: { $lte: 5000000 },
            }
        ]
    }

    if (searchPrice == '50l1cr') {
        query['$and'] = [
            ...query['$and'],
            {
                offerprice: { $gte: 5000000 },
            },
            {
                offerprice: { $lte: 10000000 },
            }
        ]
    }

    if (searchPrice == 'above1cr') {
        query['$and'] = [
            ...query['$and'],
            {
                offerprice: { $gt: 10000000 },
            }
        ]
    }

    await PROPERTY.find({ ...query }).then((data) => {
        res.send(data);
    })
}

export default filter
