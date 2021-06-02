const mongoose = require('mongoose');
const Hotel = require('./../models/hotelModel');

const reviewSchema = new mongoose.Schema(
	{
		review: {
			type: String,
			require: [true, ' Review cannot be empty'],
		},
		rating: {
			type: Number,
			min: 1,
			max: 5,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		hotel: {
			type: mongoose.Schema.ObjectId,
			ref: 'Hotel',
			required: [true, 'Review Must belong to a hotel'],
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			require: [true, 'Review must belong to a user'],
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

reviewSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'hotel',
		// select: 'name'
	}).populate({
		path: 'user',
		// select: 'name photo'
	});

	// this.populate({
	// 	path: 'user',
	// 	select: 'name photo',
	// });
	next();
});

reviewSchema.statics.calcAverageRatings = async function (hotelId) {
	//console.log(hotelId);
	const stats = await this.aggregate([
		{
			$match: { hotel: hotelId },
		},
		{
			$group: {
				_id: '$hotel',
				nRating: { $sum: 1 },
				avgRating: { $avg: '$rating' },
			},
		},
	]);

	if (stats.length > 0) {
		await Hotel.findByIdAndUpdate(hotelId, {
			ratingsQuantity: stats[0].nRating,
			ratingsAverage: stats[0].avgRating,
		});
	} else {
		await Hotel.findByIdAndUpdate(hotelId, {
			ratingsQuantity: 0,
			ratingsAverage: 0,
		});
	}
};

reviewSchema.post('save', function () {
	//This points to current review
	//console.log('POST');
	this.constructor.calcAverageRatings(this.hotel);
	//	next();
});

// reviewSchema.pre(/^findOneAnd/, async function (next) {
// 	this.r = await this.findOne();
// 	next();
// });

// reviewSchema.post(/^findOneAnd/, async function () {
// 	//await this.findOne will not work here as query has already executed
// 	await this.r.constructor.calcAverageRatings(this.r.hotel);
// 	//   next();
// });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
