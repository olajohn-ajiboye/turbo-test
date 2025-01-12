import React, { useState } from 'react';

const ShopNav: React.FC = () => {
  // State to manage the active tab
  const [activeTab, setActiveTab] = useState<string>('Shop');

  // Function to handle tab click and scroll to section
  const handleTabClick = (tab: string, sectionId: string) => {
    setActiveTab(tab);
    // Scroll to the respective section
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="my-5 border-b border-gray-200 bg-[#F6F6F6] md:mx-10">
      <div className="scrollbar-hidden flex flex-nowrap items-center justify-start overflow-auto">
        {[
          { name: 'Shop', sectionId: 'shop-section' },
          { name: 'Reviews', sectionId: 'reviews-section' },
          { name: 'About', sectionId: 'about-section' },
          { name: 'Announcements/Posts', sectionId: 'announcements-section' },
          { name: 'Shop policies', sectionId: 'policies-section' },
        ].map(tab => (
          <button
            key={tab.name}
            onClick={() => handleTabClick(tab.name, tab.sectionId)}
            className={`px-4 py-3 text-sm font-semibold md:text-base ${
              activeTab === tab.name
                ? 'rounded-t-md border-b-2 border-[#030A70] bg-[#EDF1FB] text-[#030A70]'
                : 'text-gray-500 hover:text-[#030A70]'
            } transition-colors duration-200 ease-in-out`}
          >
            {tab.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShopNav;
