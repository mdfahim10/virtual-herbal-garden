const Plant = require("../models/plant");
const Disease = require("../models/disease");

// ======================================
// Universal Search
// ======================================

module.exports.search = async (req, res) => {

    const query = req.query.q?.trim();

    if (!query) {

        return res.render("search/index", {
            plants: [],
            diseases: [],
            query: ""
        });

    }

    const regex = new RegExp(query, "i");

    const plants = await Plant.find({

        $or: [

            { commonName: regex },

            { scientificName: regex },

            { localName: regex },

            { "medicinalUses.primaryUses": regex },

            { "medicinalUses.conditionsTreated": regex }

        ]

    });

    const diseases = await Disease.find({

        $or: [

            { diseaseName: regex },

            { description: regex },

            { symptoms: regex }

        ]

    });

    res.render("search/index", {

        plants,

        diseases,

        query

    });

};