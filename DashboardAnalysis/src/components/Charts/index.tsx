import numeral from 'numeral';
import Bar from './Bar';
import ChartCard from './ChartCard';
import Field from './Field';
import Gauge from './Gauge';
import MiniArea from './MiniArea';
import Pie from './Pie';
import TagCloud from './TagCloud';
import TimelineChart from './TimelineChart';

const yuan = (val: number | string) => `¥ ${numeral(val).format('0,0')}`;

const Charts = {
  yuan,
  Bar,
  Pie,
  Gauge,
  MiniArea,
  ChartCard,
  Field,
  TagCloud,
  TimelineChart,
};

export {
  Charts as default,
  yuan,
  Bar,
  Pie,
  Gauge,
  MiniArea,
  ChartCard,
  Field,
  TagCloud,
  TimelineChart,
};
