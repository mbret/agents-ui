var Flight = {

  // Enforce model schema in the case of schemaless databases
  //schema: true,
  tableName: 'vol',

  attributes: {
    //id  : { type: 'string', unique: true, primaryKey: true, columnName: 'id', autoIncrement: true },
    company: { model: 'company', columnName: 'compagnie', required: true },
    departureDateReal: { type: 'integer', columnName: 'dateDepart' }, // timestamp
    arrivalDate: { type: 'integer', columnName: 'dateArrivee' }, // timestamp
    'gazole': { type: 'integer', required: true, columnName: 'qteCarburant' },
    'gazolePrice': { type: 'integer', required: true, columnName: 'prixCarburant' },
    airportFees: { type: 'integer', columnName: 'taxeAeroport'},
    pricePerLot: { type: 'integer', required: true, columnName: 'prixUnitaire' },
    capacityOccupied: {type:'integer', columnName: 'capaciteOccupee'},
    capacityMax: {type:'integer', columnName: 'capaciteMax'},

    //plane: { model: 'plane', columnName: 'avion', required: true },
    isCharter: { type: 'boolean', columnName: 'isCharter', required: true },
    //minProfit: { type: 'integer', required: true, columnName: 'margeMinimum' },
    //totalProfit: { type: 'integer', required: true, columnName: 'margeTotale' },
    //arrivalCity: { model: 'city', columnName: 'villeArrivee' },
    bookings: { collection: 'flightBooking', via: 'organization' }
  },

  beforeCreate: function (values, cb) {
    values.foo = new Date();
    return cb();
  },

  beforeUpdate: function (valuesToUpdate, cb) {
    valuesToUpdate.foo = new Date();
    return cb();
  }

};

module.exports = Flight;
