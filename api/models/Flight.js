var Flight = {

  // Enforce model schema in the case of schemaless databases
  //schema: true,
  tableName: 'vol',

  attributes: {
    //id  : { type: 'string', unique: true, primaryKey: true, columnName: 'id', autoIncrement: true },
    company: { model: 'company', columnName: 'compagnie', required: true },
    plane: { model: 'plane', columnName: 'avion', required: true },
    type: { type: 'string', columnName: 'type', required: true, enum: ['charter', 'regular'] },
    minProfit: { type: 'integer', required: true },
    totalProfit: { type: 'integer', required: true },
    pricePerLot: { type: 'integer', required: true },
    departureDatePlanned: { type: 'integer' }, // timestamp
    departureDateReal: { type: 'integer' }, // timestamp
    arrivalDate: { type: 'integer' }, // timestamp
    arrivalCity: { model: 'city' },
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
