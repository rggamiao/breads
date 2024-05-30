// Dependencies
const mongoose = require('mongoose')
const { Schema } = mongoose
const Bread = require('./bread')

// Schema
const bakerSchema = new Schema({
    name: {
        type: String,
        required: true,
        enum: ['Rachel', 'Monica', 'Joey', 'Chandler', 'Ross', 'Phoebe']
    },
    startDate: {
        type: Date,
        required: true
    },
    bio: String
}, { 
    toJSON: { virtuals: true }
});

// Virtual Schema
bakerSchema.virtual('breads', {
    ref: 'Bread',
    localField: '_id',
    foreignField: 'baker'
})

// Hooks Schema
bakerSchema.post('findOneAndDelete', function() {
    Bread.deleteMany({ baker: this._conditions._id })
        .then(deleteStatus => {
            console.log(deleteStatus)
        })
  })

// Model & Export
const Baker = mongoose.model('baker', bakerSchema)
module.exports = Baker
 