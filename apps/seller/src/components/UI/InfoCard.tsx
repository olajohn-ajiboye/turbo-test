import React from 'react';
import { RiMagicFill } from 'react-icons/ri';

interface InfoCardProps {
  heading: string;
  text: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ heading, text }) => {
  return (
    <div className="rounded-2xl bg-white p-6 font-archivo shadow-md">
      <div className="relative flex items-center">
        <div className="absolute left-1 top-4 rounded-full bg-[#EDF1FB] p-3">
          <RiMagicFill size={24} color="#030A70" />
        </div>
      </div>
      <div className="px-1 pt-20">
        <h2 className="text-xl font-semibold text-[#19183A]">{heading}</h2>
        <p className="mt-2 text-[#717274]">{text}</p>
      </div>
    </div>
  );
};

export default InfoCard;
