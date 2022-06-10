const feira = require("../models/feiraModel.json");

const allBusiness = (req, res) => {
    res.status(200).json({
        "mensagem" : "Esses são os negócios cadastrados em nossa feira do código:",
        feira
    })
}

module.exports = {
    allBusiness
}