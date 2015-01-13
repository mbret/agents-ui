
var VaccineStock = {

    // Enforce model schema in the case of schemaless databases
    //schema: true,
    tableName: 'stocks',

    attributes: {
        laboratory  : { model: 'laboratory',  required: true, columnName: 'idLabo' },
        vaccine  : { model: 'vaccine', required: true, columnName: 'idVaccin' }, // days
        createdAt  : { type: 'integer', required: true, columnName: 'dateCreation'}, // timestamp
        number  : { type: 'integer', required: true, columnName: 'nombre' },
        unitPrice: { type: 'integer', required:true, columnName: 'prixUnite'}
    }

};

module.exports = VaccineStock;
