const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const plantSchema = new Schema({

    commonName: {
        type: String,
        required: true,
        trim: true
    },

    scientificName: {
        type: String,
        required: true,
        trim: true
    },

    localName: {
        type: String,
        default: ""
    },

    ayushSystem: {
        type: String,
        enum: ["Ayurveda", "Siddha", "Unani", "Homeopathy", "Yoga", "Naturopathy"],
        default: "Ayurveda"
    },

    plantType: {
        type: String,
        enum: ["Herb", "Shrub", "Tree", "Climber", "Creeper", "Grass"],
        required: true
    },

    image: {
        url: {
            type: String,
            default: "/images/default-plant.jpg"
        },
        filename: {
            type: String,
            default: "default-plant"
        }
    },

    partsUsed: [
        {
            type: String
        }
    ],

    medicinalUses: {

        primaryUses: [
            {
                type: String
            }
        ],

        conditionsTreated: [
            {
                type: String
            }
        ]
    },

    howToUse: {

        method: {
            type: String
        },

        steps: [
            {
                type: String
            }
        ]
    },

    precautions: [
        {
            type: String
        }
    ],

    possibleSideEffects: {

        mild: [
            {
                type: String
            }
        ],

        overuse: [
            {
                type: String
            }
        ],

        allergicReactions: [
            {
                type: String
            }
        ]
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Plant", plantSchema);