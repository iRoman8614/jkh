import { types, flow, Instance, cast } from 'mobx-state-tree';
import MeterModel from './MeterModel';

const RootStore = types
  .model({
    meters: types.array(MeterModel),
    loading: types.boolean
  })
  .actions((self) => {
    const setMeters = (meters: Instance<typeof MeterModel>[]) => {
      self.meters = cast(meters);
    };

    const setLoading = (loading: boolean) => {
      self.loading = loading;
    };

    const fetchMeters = flow(function* () {
      self.loading = true;
      try {
        const response = yield fetch('http://showroom.eis24.me/api/v4/test/meters/?limit=20');
        console.log(response);
        const data = yield response.json();
        self.meters = cast(data.results);
      } catch (error) {
        console.error('Failed to fetch meters', error);
      } finally {
        self.loading = false;
      }
    });

    return { setMeters, setLoading, fetchMeters };
  });

export default RootStore;
