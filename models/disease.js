const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const diseaseSchema = new Schema({

    diseaseName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    description: {
        type: String,
        required: true
    },

    symptoms: [
        {
            type: String
        }
    ],

    recommendedPlants: [
        {
            type: Schema.Types.ObjectId,
            ref: "Plant"
        }
    ]

}, {
    timestamps: true
});

module.exports = mongoose.model("Disease", diseaseSchema);