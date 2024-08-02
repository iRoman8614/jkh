import { types, flow, cast } from 'mobx-state-tree';
import MeterModel from './MeterModel';

const RootStore = types
  .model({
    meters: types.array(MeterModel),
    loading: types.boolean,
    currentPage: types.optional(types.number, 1),
    totalPages: types.optional(types.number, 0)
  })
  .actions((self) => ({
    fetchMeters: flow(function* (page = 1) {
      self.loading = true;
      try {
        const limit = 20;
        const offset = (page - 1) * limit;
        const response = yield fetch(`http://showroom.eis24.me/api/v4/test/meters/?limit=${limit}&offset=${offset}`);
        const data = yield response.json();
        self.meters = cast(data.results);
        self.currentPage = page;
        self.totalPages = Math.ceil(data.count / limit);
      } catch (error) {
        console.error('Failed to fetch meters', error);
      } finally {
        self.loading = false;
      }
    }),

    deleteMeter: flow(function* (id: string) {
      try {
        yield fetch(`http://showroom.eis24.me/api/v4/test/meters/${id}`, {
          method: 'DELETE'
        });
        self.meters = cast(self.meters.filter(meter => meter.id !== id));
      } catch (error) {
        console.error('Failed to delete meter', error);
      }
    })
  }));

export default RootStore;
