import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { FiDownload } from 'react-icons/fi';

// Example sales channels data
const data = [
  { name: 'WhatsApp', value: 400, color: '#00C49F' },
  { name: 'Instagram', value: 300, color: '#C4C6F3' },
  { name: 'Direct store visit', value: 300, color: '#FFBB28' },
  { name: 'Facebook', value: 200, color: '#0088FE' },
];

// Render the Pie Chart Component
const SalesChannelsPieChart = () => {
  return (
    <div className="relative rounded bg-white p-4 shadow-md">
      <div className="absolute right-4 top-4">
        <button className="rounded-full bg-gray-100 p-2">
          <FiDownload size={20} />
        </button>
      </div>
      <h2 className="text-lg font-bold text-[#19183A]">Top 5 sales channels</h2>
      <div className="mt-4">
        {/* Pie chart container */}
        <div className="w-2/3">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Tooltip />
              <Pie
                data={data}
                cx="60%"
                cy="40%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={0}
                dataKey="value"
                nameKey="name"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Custom legend */}
        <div className="w-1/3">
          <ul className="space-y-1 pl-2">
            {data.map((entry, index) => (
              <li key={`item-${index}`} className="flex items-center">
                <span
                  className="mr-2 inline-block h-3 w-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                ></span>
                <span className="text-sm font-medium text-[#19183A]">
                  {entry.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SalesChannelsPieChart;
