//const { Model } = require('mongoose');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');

exports.createOne = (Model) =>
	catchAsync(async (req, res, next) => {
		
		const doc = await Model.create(req.body);
		//console.log('Creating');
		res.status(201).json({
			status: 'success',
			data: {
				data: doc
			},
		});
	});

exports.getAll = (Model) =>
	catchAsync(async (req, res, next) => {
		//To allow nested GET Reviews on the tour route(hack)
		//console.log("Get all");
		let filter = {};
		if (req.params.hotelId) filter = { hotel: req.params.hotelId };
		// if (req.params.cityId)  filter = { city: req.params.cityId};

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
