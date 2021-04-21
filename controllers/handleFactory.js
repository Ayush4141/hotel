const {Model} = require("mongoose");
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');

exports.createOne = (Model) => catchAsync(async (req , res , next) =>{
    const doc = await Model.create(req.body);

    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        },
    })
    
})




exports.getAll = (Model) =>
	catchAsync(async (req, res, next) => {
		//To allow nested GET Reviews on the tour route(hack)
		let filter = {};
		if (req.params.tourId) filter = { tour: req.params.tourId };

		const features = new APIFeatures(Model.find(filter), req.query).filter().sort().limitFields().paginate();
		const doc = await features.query;
		//          const doc = await features.query.explain();
		res.status(200).json({
			status: 'success',
			results: doc.length,
			data: {
				data: doc,
			},
		});
	});