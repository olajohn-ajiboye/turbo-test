import React from 'react';
import SalesChannelsPieChart from './SalesChannelsPieChart';
import TopProductsBarChart from './TopProductsBarChart';
import TopLocationsBarchart from './TopLocationsBarChart';

interface AnalyticsProps {
  topProducts: { name: string; total_sold: number }[];
  topLocations: { country: string; total_bought: number }[];
}

const Analytics: React.FC<AnalyticsProps> = ({ topProducts, topLocations }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {/* Top Products */}
      <TopProductsBarChart data={topProducts} />

      {/* Top Sales Channels */}
      <SalesChannelsPieChart />

      {/* Top Locations */}
      <TopLocationsBarchart data={topLocations} />
    </div>
  );
};

export default Analytics;
