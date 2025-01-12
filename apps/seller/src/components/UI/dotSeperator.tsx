import React from 'react';

interface DotSeparatorProps {
  color?: string;
  size?: string;
}

const DotSeparator: React.FC<DotSeparatorProps> = ({
  color = '#B6B6B7',
  size = '0.25',
}) => {
  return (
    <div className="flex items-center justify-center">
      <span
        className={`rounded-full`}
        style={{
          width: `${size}rem`,
          height: `${size}rem`,
          backgroundColor: color,
        }}
      ></span>
    </div>
  );
};

export default DotSeparator;
