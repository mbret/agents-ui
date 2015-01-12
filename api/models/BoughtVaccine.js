/**
 * Created by Maxime on 12/01/2015.
 */

var BoughtVaccine = {

  // Enforce model schema in the case of schemaless databases
  //schema: true,
  tableName: 'achatVaccins',

  attributes: {
    sum  : { type: 'integer', columnName: 'somme' },
    number  : { type: 'integer', columnName: 'nombre' },
    date  : { type: 'date' },
    laboratory  : { model: 'laboratory' },
    vaccine  : { model: 'vaccine' },
    organization: { model: 'organization' }
  }
}
module.exports = BoughtVaccine;
