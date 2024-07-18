import { types } from 'mobx-state-tree';

const MeterModel = types.model({
  id: types.identifier,
  _type: types.array(types.string),
  installation_date: types.string,
  is_automatic: types.maybe(types.boolean),
  initial_values: types.array(types.number),
  description: types.string,
  area: types.model({
    id: types.identifier
  })
});

export default MeterModel;
