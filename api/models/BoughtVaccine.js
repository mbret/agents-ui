/**
 * Created by Maxime on 12/01/2015.
 */

var BoughtVaccine = {

  // Enforce model schema in the case of schemaless databases
  schema: true,
  tableName: 'achatVaccins',
  autoPK: true,

  attributes: {
    sum  : { type: 'integer', columnName: 'somme' },
    number  : { type: 'integer', columnName: 'nombre' },
    date  : { type: 'integer', columnName: 'dateAchat' },
    laboratory  : { model: 'laboratory', columnName: 'laboratoire', primaryKey: true },
    vaccine  : { model: 'vaccine', columnName: 'vaccin' },
    organization: { model: 'organization', columnName: 'association' }
  }
}
module.exports = BoughtVaccine;
