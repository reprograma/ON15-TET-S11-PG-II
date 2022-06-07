const iniciativasModel = require("../models/iniciativasModel.json")

const allIniciativas = (req, res) => {
    res.status(200).json({
        "message": "Essas são todas as iniciativas",
        iniciativasModel
    })
}









module.exports = {
    allIniciativas,
}