const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const diseaseSchema = new Schema(
{
    diseaseName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    symptoms: [
        {
            type: String,
            trim: true,
        },
    ],
    causes: [
        {
            type: String,
            trim: true,
        },
    ],
    prevention: [
        {
            type: String,
            trim: true,
        },
    ],
    image: {
        url: {
            type: String,
            default: "/images/default-disease.jpg",
        },
        filename: {
            type: String,
            default: "default-disease",
        },
    },
    recommendedPlants: [
        {
            type: Schema.Types.ObjectId,
            ref: "Plant",
        },
    ],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
},
{
    timestamps: true,
});
module.exports = mongoose.model("Disease", diseaseSchema);