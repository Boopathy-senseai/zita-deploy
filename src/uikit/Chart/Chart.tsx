import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

type Porps = {
  options: Highcharts.Options | any;
};
const Chart = ({ options }: Porps) => (
  <div>
    <HighchartsReact highcharts={Highcharts} options={options}    containerProps={{ style: { height: "340px" } }}/>
  </div>
);

export default Chart;
