import React from 'react';

interface BadgeProps {
  classname?: string;
  text: string;
}

const Badge: React.FC<BadgeProps> = ({ classname = '', text }) => {
  return <div className={`${classname}`}>{text}</div>;
};

export default Badge;
