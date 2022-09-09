const database = require("../models");

class Services {
    constructor(modelName) {
        this.modelName = modelName;
    }

    async getAllRegisters() {
        return database[this.modelName].findAll();
    }

    async getRegister(id) {

    }

    async createRegister(data) {
        
    }

    async updateRegister(updatedData, id) {
        
    }

    async deleteRegister(id) {
        
    }
}

module.exports = Services;