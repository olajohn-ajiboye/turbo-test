import { useState } from 'react';
import Select, { SingleValue } from 'react-select';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

interface OptionType {
  value: string;
  label: string;
}

interface StatusProps {
  initialStatus: OptionType | null;
  initialIsFeatured: boolean;
}

const statusOptions: OptionType[] = [
  { value: 'published', label: 'Published' },
  { value: 'unpublished', label: 'Unpublished' },
];

const Status: React.FC<StatusProps> = ({
  initialStatus,
  initialIsFeatured,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<OptionType | null>(
    initialStatus
  );
  const [isFeatured, setIsFeatured] = useState<boolean>(initialIsFeatured);

  // Handle Status Change
  const handleStatusChange = (option: SingleValue<OptionType>) => {
    setSelectedStatus(option);
  };

  // Handle Featured Toggle
  const handleToggleChange = () => {
    setIsFeatured(!isFeatured);
  };

  return (
    <div className="status mt-6 rounded-lg bg-white p-6 shadow-md">
      <h3 className="text-xl font-bold">Status</h3>
      <p className="pb-4 pt-1 text-sm text-[#B6B6B7]">
        Set the status of your product. Published or Unpublished.
      </p>

      {/* Product Status Dropdown */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700">
          Product status (optional)
        </label>
        <Select
          options={statusOptions}
          value={selectedStatus}
          onChange={handleStatusChange}
          placeholder="Select status..."
          className="mt-1"
        />
      </div>

      {/* Featured Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium text-gray-700">
            Make a featured product
          </h4>
          <p className="text-sm text-[#B6B6B7]">
            Featured products take the top spots on your shop page.
          </p>
        </div>
        <Toggle
          checked={isFeatured}
          onChange={handleToggleChange}
          className="ml-4"
        />
      </div>
    </div>
  );
};

export default Status;
