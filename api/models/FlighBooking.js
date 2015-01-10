var FlightBooking = {

  // Enforce model schema in the case of schemaless databases
  schema: true,
  tableName: 'reservation',

  attributes: {
    id  : { type: 'string', unique: true, primaryKey: true, columnName: 'id', autoIncrement: true },
  }

};

module.exports = FlightBooking;