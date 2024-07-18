import { types } from 'mobx-state-tree';

const AddressModel = types.model({
  id: types.identifier,
  street: types.string,
  house: types.string,
  apartment: types.string
});

export default AddressModel;
