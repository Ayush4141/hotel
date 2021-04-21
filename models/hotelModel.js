const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const hotelSchema = new mongoose.Schema({
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

	city: String,

	price: {
		type: Number,
		required: [true , "Price is required"]
	},

	deluxeRooms: {
		type: Number,
		//	required: true,
	},

	premiumRooms: {
		type: Number,
		//	required: true,
	},

	deluxePrice: {
		type: Number,
		//required: true,
	},

	premiumPrice: {
		type: Number,
		//required: true,
	},

	description: {
		type: String,
		default: 'Default Description',
	},
});

hotelSchema.pre('save', function (next) {
	this.slug = slugify(this.name, { lower: true });
	next();
});

hotelSchema.pre(/^find/, function (next) {
	this.populate('seller');
	next();
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
