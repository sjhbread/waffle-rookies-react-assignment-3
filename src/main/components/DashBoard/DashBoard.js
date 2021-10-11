import './DashBoard.css'
import {
	ResponsiveContainer,
	PolarAngleAxis,
	PolarRadiusAxis,
	PolarGrid,
  Legend,
  Tooltip,
  Pie,
  Customized,
  PieChart,
} from 'recharts';
import { useContext } from 'react';
import { NameListContext } from '../../../App';

const DashBoard = () => {
  const { nameList, setNameList } = useContext(NameListContext);
  const pieChartData = [
    {
      'grade': '1',
      'value': (nameList.filter((student) => student.grade === 1).length)
    },
    {
      'grade': '2',
      'value': (nameList.filter((student) => student.grade === 2).length)
    },
    {
      'grade': 3,
      'value': (nameList.filter((student) => student.grade === 3).length)
    }
  ];
  return (
      
    <div className = 'dash-board'>
       <PieChart width={750} height={150}>
        <Pie data={pieChartData} dataKey='value' nameKey='grade' cx='50%' cy='50%' fill='#8884d8' label />
      </PieChart> 
    </div>  
  );
}

export default DashBoard;