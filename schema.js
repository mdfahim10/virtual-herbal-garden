const Joi = require("joi");

// ======================================
// Plant Validation Schema
// ======================================

module.exports.plantSchema = Joi.object({
    plant: Joi.object({

        commonName: Joi.string().required(),

        scientificName: Joi.string().required(),

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

        image: Joi.object({
            url: Joi.string().allow("", null),
            filename: Joi.string().allow("", null),
        }).optional(),

        partsUsed: Joi.array().items(
            Joi.string()
        ),

        medicinalUses: Joi.object({

            primaryUses: Joi.array().items(
                Joi.string()
            ),

            conditionsTreated: Joi.array().items(
                Joi.string()
            )

        }),

        howToUse: Joi.object({

            method: Joi.string().allow("", null),

            steps: Joi.array().items(
                Joi.string()
            )

        }),

        precautions: Joi.array().items(
            Joi.string()
        ),

        possibleSideEffects: Joi.object({

            mild: Joi.array().items(
                Joi.string()
            ),

            overuse: Joi.array().items(
                Joi.string()
            ),

            allergicReactions: Joi.array().items(
                Joi.string()
            )

        })

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