import React from 'react';

interface CardProps {
  icon: string;
  title: string;
  value: string | number;
  className?: string;
}

const Card: React.FC<CardProps> = ({ icon, title, value, className }) => {
  return (
    <div className={`rounded-lg bg-[#FFF] p-4 shadow-md ${className}`}>
      <div className="flex items-center justify-center gap-4 md:pt-8">
        <div className="rounded-full bg-[#EDF1FB] p-3">
          <img src={icon} alt={title} className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <h3 className="text-2xl font-bold text-[#19183A]">{value}</h3>
        </div>
      </div>
    </div>
  );
};

export default Card;
