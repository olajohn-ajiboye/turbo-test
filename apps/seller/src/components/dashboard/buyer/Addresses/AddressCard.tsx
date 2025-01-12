import React from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import { AddressCardProps } from '@/types/types';

const AddressCard: React.FC<AddressCardProps> = ({
  name,
  address,
  city,
  state,
  zip,
  isDefault,
  onEdit,
  onDelete,
  onSetDefault,
}) => {
  return (
    <div className="flex flex-col justify-between rounded-lg border bg-white p-4 shadow-md">
      {/* Badge for Default Address */}
      <div className="mb-4 flex items-center justify-between">
        {isDefault ? (
          <span className="rounded-lg bg-[#EDF1FB] px-2 py-2 text-sm text-[#030A70]">
            Default address
          </span>
        ) : (
          <>
            <span className="text-gray-600">
              Set as default shipping address
            </span>
            <Toggle
              checked={isDefault}
              onChange={!isDefault ? onSetDefault : undefined}
              className="ml-4"
              icons={false}
            />
          </>
        )}
      </div>
      {/* Top border */}
      <div className="mb-4 border-t border-gray-300"></div>

      {/* Address details */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-[#35006E]">{name}</h3>
        <p className="text-[#B6B6B7]">
          {address}, <br /> {city}, <br /> {state}, {zip}
        </p>
      </div>

      {/* Bottom border */}
      <div className="mb-4 border-t border-gray-300"></div>

      {/* Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={onEdit}
          className="w-1/2 rounded-lg border border-[#030A70] px-4 py-2 text-[#030A70] hover:bg-[#EDF1FB]"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="w-1/2 rounded-lg bg-[#030A70] px-4 py-2 text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AddressCard;
