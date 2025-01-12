import React from 'react';

// Define the type for the props
interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  change: string;
  comparison: string;
  isIncrease: boolean;
}

// A reusable card component for displaying stats
const StatCard: React.FC<StatCardProps> = ({
  icon,
  title,
  value,
  change,
  comparison,
  isIncrease,
}) => {
  const renderArrow = (isIncrease: boolean) => {
    return isIncrease ? (
      <span className="text-sm text-green-500">▲</span>
    ) : (
      <span className="text-sm text-red-500">▼</span>
    );
  };

  return (
    <div className="w-[280px] rounded-lg bg-white p-6 shadow-md">
      <div className="mb-6 flex items-center">
        <div className="rounded-full bg-[#EDF1FB] p-3">{icon}</div>
        <div className="ml-4">
          <p className="text-sm text-gray-500">{title}</p>
          <h4 className="text-3xl font-bold">{value}</h4>
        </div>
      </div>
      <div className="flex items-center text-sm text-gray-500">
        {renderArrow(isIncrease)} <span className="ml-1">{change}</span>{' '}
        <span className="ml-1">{comparison}</span>
      </div>
    </div>
  );
};

export default StatCard;
