const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const hotelSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			require: [true, 'A hotel must have a name'],
			trim: true,
			minlength: [3, 'Not less than three letters'],
		},
		seller: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: [true],
		},
		slug: String,

		ratingsAverage: {
			type: Number,
			default: 0,
			min: [0, 'Rating must be above 1'],
			max: [5, 'Ratings must be less than 5'],
			set: (val) => Math.round(val * 10) / 10,
		},

		ratingsQuantity: {
			type: Number,
			default: 0,
		},

		city: String,

		price: {
			type: Number,
			required: [true, 'Price is required'],
		},
		startLocation: {
			// GeoJSON
			type: {
				type: String,
				default: 'Point',
				enum: ['Point'],
			},
			coordinates: [Number],
			address: String,
			description: String,
		},
		rooms: {
			type: Number,
		},
		images: [String],


		description: {
			type: String,
			default: 'Default Description',
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

hotelSchema.virtual('reviews', {
	ref: 'Review',
	foreignField: 'hotel',
	localField: '_id',
});

hotelSchema.pre('save', function (next) {
	//console.log('Hii');
	this.slug = slugify(this.name, { lower: true });

	next();
});

hotelSchema.pre(/^find/, function (next) {
	this.populate('seller');
	next();
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
