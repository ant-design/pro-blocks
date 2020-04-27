import numeral from 'numeral';
import ChartCard from './ChartCard';
import Field from './Field';
import Pie from './Pie';

const yuan = (val: number | string) => `¥ ${numeral(val).format('0,0')}`;

const Charts = {
  yuan,
  Pie,
  ChartCard,
  Field
};

export {
  Charts as default,
  yuan,
  Pie,
  ChartCard,
  Field
};
