import { LuSearch } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

interface Tab {
  key: string;
  label: string;
  route?: string; // Optional route for navigation
}

interface TabsNavProps {
  searchQuery?: string; // Optional search query prop
  setSearchQuery?: (query: string) => void; // Optional setter for search query
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: Tab[];
  searchPlaceholder?: string; // Optional search placeholder
  showSearch?: boolean;
  title?: string;
}

const TabsNav: React.FC<TabsNavProps> = ({
  searchQuery = '',
  setSearchQuery,
  activeTab,
  setActiveTab,
  tabs,
  searchPlaceholder = 'Search...',
  showSearch = true, // Default is true, but it can be toggled off
  title,
}) => {
  const navigate = useNavigate();

  // Function to handle tab click
  const handleTabClick = (tabKey: string, route?: string) => {
    setActiveTab(tabKey);
    if (route) {
      navigate(route); // Navigate to the route if provided
    }
  };

  return (
    <div className="rounded-lg bg-[#EDF1FB]">
      {/* Header with optional Search */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-[#19183A]">{title}</h2>

        {/* Search Bar for Desktop - Only show if enabled */}
        {showSearch && setSearchQuery && (
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-80 rounded-lg border border-gray-300 px-4 py-2 pl-10 text-sm"
            />
            <span className="absolute left-3 top-2 text-gray-400">
              <LuSearch size={18} />
            </span>
          </div>
        )}
      </div>

      {/* Search Bar for Mobile - Only show if enabled */}
      {showSearch && setSearchQuery && (
        <div className="relative mb-4 md:hidden">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 text-sm"
          />
          <span className="absolute left-4 top-2.5 text-gray-400">
            <LuSearch size={18} />
          </span>
        </div>
      )}

      {/* Dynamic Tabs */}
      <div className="scrollbar-hidden relative overflow-x-auto border-b border-white">
        <div className="flex min-w-max items-center">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => handleTabClick(tab.key, tab.route)}
              className={`whitespace-nowrap px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'border-b-2 border-[#030A70] text-[#030A70]'
                  : 'text-[#19183A]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabsNav;
