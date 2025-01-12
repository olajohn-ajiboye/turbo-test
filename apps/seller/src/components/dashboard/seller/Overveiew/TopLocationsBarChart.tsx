import { FiDownload } from 'react-icons/fi';
import { BarChart, Bar, Cell, ResponsiveContainer, XAxis } from 'recharts';

interface TopLocationsBarChartProps {
  data: { country: string; total_bought: number }[];
}

const TopLocationsBarchart: React.FC<TopLocationsBarChartProps> = ({
  data,
}) => {
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#FF8042', '#FFBB28'];

  console.log(data);

  return (
    <div className="relative rounded-md bg-white p-6 shadow-md">
      <div className="absolute right-4 top-4">
        <button className="rounded-full bg-gray-100 p-2">
          <FiDownload size={20} />
        </button>
      </div>
      <h2 className="text-lg font-bold text-[#19183A]">Top 5 locations</h2>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          layout="vertical"
          data={data.map(location => ({
            name: location.country,
            sales: location.total_bought,
          }))}
          margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
          barSize={15}
        >
          <XAxis type="number" hide />
          <Bar
            dataKey="sales"
            background={{ fill: '#f3f3f3' }}
            radius={[10, 10, 10, 10]}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Custom Legend */}
      <div className="mt-6 space-y-2 pl-7">
        {data.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center space-x-2">
            <div
              style={{
                backgroundColor: COLORS[index % COLORS.length],
              }}
              className="h-3 w-3 rounded-full"
            ></div>
            <span className="text-sm font-medium text-[#19183A]">
              {entry.country} ({entry.total_bought} sales)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopLocationsBarchart;
