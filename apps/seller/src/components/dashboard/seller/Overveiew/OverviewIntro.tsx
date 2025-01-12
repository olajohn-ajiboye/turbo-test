import React, { useState } from 'react';
import { BsCartCheck } from 'react-icons/bs';
import { IoMdPricetag } from 'react-icons/io';
import { FaUsers } from 'react-icons/fa';
import { AiOutlineEye } from 'react-icons/ai';
import { FaMoneyBillWave } from 'react-icons/fa';
import StatCard from './StatCard';
import Select from 'react-select';

const OverviewIntro: React.FC<{
  totalOrders: number;
  totalProductsSold: number;
  newCustomers: number;
  totalSales: number;
  totalVisitors: number;
}> = ({
  totalOrders,
  totalProductsSold,
  newCustomers,
  totalSales,
  totalVisitors,
}) => {
  const overviewData = {
    ordersReceived: {
      value: totalOrders,
      change: '2.9%',
      comparison: 'vs 209 last month',
      isIncrease: true,
    },
    productsSold: {
      value: totalProductsSold,
      change: '2.9%',
      comparison: 'vs 330 last month',
      isIncrease: false,
    },
    newCustomers: {
      value: newCustomers,
      change: '2.9%',
      comparison: 'vs 209 last month',
      isIncrease: true,
    },
    storeVisitors: {
      value: totalVisitors,
      change: '2.9%',
      comparison: 'vs 209 last month',
      isIncrease: true,
    },
    totalSales: {
      value: totalSales,
      change: '4.5%',
      comparison: 'vs ₦4,800 last month',
      isIncrease: true,
    },
  };

  const [selectedOption, setSelectedOption] = useState({
    label: 'This month',
    value: 'this_month',
  });

  // Options for the Select dropdown
  const options = [
    { label: 'This month', value: 'this_month' },
    { label: 'Last month', value: 'last_month' },
    { label: 'Last 3 months', value: 'last_3_months' },
    { label: 'This year', value: 'this_year' },
  ];

  return (
    <div className="pb-6">
      <div className="mb-4 grid items-center md:flex md:justify-between">
        <h3 className="text-2xl font-semibold">Quick business overview</h3>
        <div className="relative w-40">
          <Select
            value={selectedOption}
            onChange={option =>
              setSelectedOption(option as { label: string; value: string })
            }
            options={options}
            classNamePrefix="react-select"
          />
        </div>
      </div>

      <div className="scrollbar-hidden relative overflow-x-auto whitespace-nowrap">
        <div className="animate-scroll inline-flex gap-6">
          {/* Orders Received Card */}
          <StatCard
            icon={<BsCartCheck className="text-2xl text-[#030A70]" />}
            title="Orders received"
            value={overviewData.ordersReceived.value}
            change={overviewData.ordersReceived.change}
            comparison={overviewData.ordersReceived.comparison}
            isIncrease={overviewData.ordersReceived.isIncrease}
          />

          {/* Products Sold Card */}
          <StatCard
            icon={<IoMdPricetag className="text-2xl text-[#030A70]" />}
            title="Products sold"
            value={overviewData.productsSold.value}
            change={overviewData.productsSold.change}
            comparison={overviewData.productsSold.comparison}
            isIncrease={overviewData.productsSold.isIncrease}
          />

          {/* New Customers Card */}
          <StatCard
            icon={<FaUsers className="text-2xl text-[#030A70]" />}
            title="New customers"
            value={overviewData.newCustomers.value}
            change={overviewData.newCustomers.change}
            comparison={overviewData.newCustomers.comparison}
            isIncrease={overviewData.newCustomers.isIncrease}
          />

          {/* Store Visitors Card */}
          <StatCard
            icon={<AiOutlineEye className="text-2xl text-[#030A70]" />}
            title="Store visitors"
            value={overviewData.storeVisitors.value}
            change={overviewData.storeVisitors.change}
            comparison={overviewData.storeVisitors.comparison}
            isIncrease={overviewData.storeVisitors.isIncrease}
          />

          {/* Total Sales Card */}
          <StatCard
            icon={<FaMoneyBillWave className="text-2xl text-[#030A70]" />}
            title="Total Sales"
            value={overviewData.totalSales.value}
            change={overviewData.totalSales.change}
            comparison={overviewData.totalSales.comparison}
            isIncrease={overviewData.totalSales.isIncrease}
          />
        </div>
      </div>
    </div>
  );
};

export default OverviewIntro;
