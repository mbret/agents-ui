var Flight = {

  // Enforce model schema in the case of schemaless databases
  //schema: true,
  tableName: 'vol',

  attributes: {
    //id  : { type: 'string', unique: true, primaryKey: true, columnName: 'id', autoIncrement: true },
    company: { model: 'company', columnName: 'compagnie', required: true },
    //plane: { model: 'plane', columnName: 'avion', required: true },
    type: { type: 'string', columnName: 'type', required: true, enum: ['charter', 'regular'] },
    minProfit: { type: 'integer', required: true, columnName: 'margeMinimum' },
    totalProfit: { type: 'integer', required: true, columnName: 'margeTotale' },
    pricePerLot: { type: 'integer', required: true, columnName: 'prixParLot' },
    departureDatePlanned: { type: 'integer', columnName: 'dateDepartPrevu' }, // timestamp
    departureDateReal: { type: 'integer', columnName: 'dateDepartReel' }, // timestamp
    arrivalDate: { type: 'integer', columnName: 'dateArrivee' }, // timestamp
    arrivalCity: { model: 'city', columnName: 'villeArrivee' },
    bookings: { collection: 'flightBooking', via: 'organization' },
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
