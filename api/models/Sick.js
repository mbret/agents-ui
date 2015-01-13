var Sick = {

    // Enforce model schema in the case of schemaless databases
    //schema: true,
    tableName: 'malade',

    attributes: {
        //id  : { type: 'string', unique: true, primaryKey: true, columnName: 'id', autoIncrement: true },
        lastName: { type: 'string', required: true, columnName: 'nom' },
        firstName: { type: 'string', required: true, columnName: 'prenom' },
        country: { model: 'country', required: true, columnName: 'pays' },
        infectedDay: { type: 'integer', required: true, columnName: 'jourInfection' }, // timestamp
        vaccinatedDay: { type: 'integer', columnName: 'jourVaccination', defaultsTo: null } // timestamp
    }

};

module.exports = Sick;
