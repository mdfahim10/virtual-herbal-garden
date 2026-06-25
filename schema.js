const Joi = require("joi");

// ======================================
// Plant Validation Schema
// ======================================

module.exports.plantSchema = Joi.object({

    plant: Joi.object({

        commonName: Joi.string().trim().required(),

        scientificName: Joi.string().trim().required(),

        localName: Joi.string().allow("", null),

        ayushSystem: Joi.string()
            .valid(
                "Ayurveda",
                "Siddha",
                "Unani",
                "Homeopathy",
                "Yoga",
                "Naturopathy"
            )
            .required(),

        plantType: Joi.string()
            .valid(
                "Herb",
                "Shrub",
                "Tree",
                "Climber",
                "Creeper",
                "Grass"
            )
            .required(),

        // Form fields

        partsUsed: Joi.array().items(Joi.string()),

        primaryUses: Joi.array().items(Joi.string()),

        conditionsTreated: Joi.array().items(Joi.string()),

        method: Joi.string().allow("", null),

        steps: Joi.array().items(Joi.string()),

        precautions: Joi.array().items(Joi.string()),

        mild: Joi.array().items(Joi.string()),

        overuse: Joi.array().items(Joi.string()),

        allergic: Joi.array().items(Joi.string()),

    }).required()

});

// ======================================
// Disease Validation Schema
// ======================================

module.exports.diseaseSchema = Joi.object({

    disease: Joi.object({

        diseaseName: Joi.string().required(),

        description: Joi.string().required(),

        symptoms: Joi.array().items(
            Joi.string()
        ),

        recommendedPlants: Joi.array().items(
            Joi.string()
        )

    }).required()

});