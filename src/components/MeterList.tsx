import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import store from '../models/index';

const MeterList: React.FC = observer(() => {
  useEffect(() => {
    store.fetchMeters();
  }, []);

  const formatType = (type: string[]) => {
    if (type.includes('ColdWaterAreaMeter')) return 'ХВС';
    if (type.includes('HotWaterAreaMeter')) return 'ГВС';
    return 'Неизвестно';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
  };

  if (store.loading) return <p>Загрузка...</p>;

  return (
    <div className="meter-list">
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Тип</th>
            <th>Дата установки</th>
            <th>Автоматический</th>
            <th>Текущие показания</th>
            <th>Адрес</th>
            <th>Примечание</th>
          </tr>
        </thead>
        <tbody>
          {store.meters.map((meter, index) => (
            <tr key={meter.id}>
              <td>{index + 1}</td>
              <td>{formatType(meter._type)}</td>
              <td>{formatDate(meter.installation_date)}</td>
              <td>{meter.is_automatic ? 'да' : 'нет'}</td>
              <td>{meter.initial_values[0]}</td>
              <td>{meter.area.id}</td>
              <td>{meter.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default MeterList;
