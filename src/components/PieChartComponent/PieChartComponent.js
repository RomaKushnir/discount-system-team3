import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.65;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function PieChartComponent({
  data, title, onCellClick, width, cursor
}) {
  return (
      <ResponsiveContainer>
        <PieChart width="100%" height="100%">
        <text x={width / 2} y={20} style={{ fontSize: 18 }} textAnchor="middle" dominantBaseline="top">{title}</text>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            dataKey="value"
            cursor = {cursor}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} onClick = {() => onCellClick(entry.id)}/>
            ))}
          </Pie>
          <Legend
          layout="horizontal"
          wrapperStyle={{
            lineHeight: '1.45'
          }}
          payload={data.map((item) => ({
            id: item.id,
            key: `item-${item.name}`,
            type: 'circle',
            color: item.color,
            value: `${item.value} - ${item.name}`
          }))}
          />
          <Tooltip />
        </PieChart>
  </ResponsiveContainer>
  );
}

export default PieChartComponent;
