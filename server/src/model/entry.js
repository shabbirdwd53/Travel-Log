const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const requiredString = {
    type: String,
    required:true,
};

const requiredNumber = {
    type: Number,
    required:true,
};

  var entrySchema = new Schema({
    title: requiredString,
    description: String,
    comments: String,
    rating: {
        type: Number,
        min: [1, 'Minimum 1'],
        max: [10,'Maximum 10'],
        default: 0,
    },
    image: String,
    latitute: {
        ...requiredNumber,
    min: -90,
    max: 90,
},
    longitude: {
        ...requiredNumber,
        min: -180,
        max: 180,
    },
    visitDate: { type: Date, default: Date.now, required:true },
  }, {timestamps: true, runValidators: true});

  const entry = mongoose.model('Entry', entrySchema);

  module.exports = entry;