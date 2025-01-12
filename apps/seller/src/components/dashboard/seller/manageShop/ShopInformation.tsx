import React, { useState, useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '@/services/hooks/useAppDispatch';
import {
  fetchShopDetails,
  selectShopDetails,
  updateShopDetails,
} from '@/services/redux/slices/sellers/shopSlice';
import { FiEdit } from 'react-icons/fi';
import { State } from 'country-state-city';
import Select, { SingleValue } from 'react-select';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const ShopInformation = () => {
  const dispatch = useAppDispatch();
  const shopDetails = useAppSelector(selectShopDetails);

  // Local state to manage form data
  const [formData, setFormData] = useState(shopDetails);
  const [isEditing, setIsEditing] = useState(false);
  const [states, setStates] = useState<{ label: string; value: string }[]>([]);

  // Load shop details from Redux store
  useEffect(() => {
    dispatch(fetchShopDetails());
  }, [dispatch]);

  // Sync local form data with Redux state
  useEffect(() => {
    setFormData(shopDetails);
  }, [shopDetails]);

  // Fetch states of Nigeria
  useEffect(() => {
    const stateOptions = State.getStatesOfCountry('NG').map(state => ({
      label: state.name,
      value: state.isoCode,
    }));
    setStates(stateOptions);
  }, []);

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle state selection change
  const handleStateChange = (
    selectedState: SingleValue<{ label: string; value: string }>
  ) => {
    setFormData(prevData => ({
      ...prevData,
      state: selectedState ? selectedState.value : null, // Save only the value
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare data for API request
    const normalizedData = {
      shop_name: formData.shop_name,
      shop_type: formData.shop_type,
      shop_about: formData.shop_about,
      tagline: formData.tagline,
      description: formData.description,
      facebook: formData.facebook,
      instagram: formData.instagram,
      tiktok: formData.tiktok,
      twitter: formData.twitter,
      shop_currency: formData.shop_currency,
      shop_phone_number: formData.shop_phone_number,
      country: formData.country,
      state: formData.state,
      city: formData.city,
      zip_code: formData.zip_code,
      address_1: formData.address_1,
      address_2: formData.address_2,
      shop_email: formData.shop_email,
    };

    console.log('Normalized Data:', normalizedData); // Debugging log

    dispatch(updateShopDetails(normalizedData));
    setIsEditing(false);
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm md:p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[#19183A] md:text-lg">
          Shop Information
        </h2>
        <button
          className="flex items-center rounded-md bg-[#EDF1FB] px-4 py-2 text-sm text-[#030A70] transition-colors hover:bg-[#D1D8F7] lg:text-lg"
          onClick={() => setIsEditing(!isEditing)}
        >
          <FiEdit className="mr-2" />
          {isEditing ? 'Cancel Edit' : 'Edit Shop Information'}
        </button>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Shop Name */}
        <div>
          <label className="mb-1 block text-sm font-medium text-[#19183A]">
            Shop Name
          </label>
          <input
            type="text"
            name="shop_name"
            value={formData.shop_name || ''}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm"
          />
        </div>

        {/* Shop Tagline */}
        <div>
          <label className="mb-1 block text-sm font-medium text-[#19183A]">
            Shop Tagline
          </label>
          <input
            type="text"
            name="tagline"
            value={formData.tagline || ''}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm"
          />
        </div>

        {/* Shop Description */}
        <div>
          <label className="mb-1 block text-sm font-medium text-[#19183A]">
            Shop Description
          </label>
          <textarea
            name="description"
            value={formData.description || ''}
            onChange={handleInputChange}
            disabled={!isEditing}
            rows={4}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm"
          />
        </div>

        {/* Shop Currency */}
        <div>
          <label className="mb-1 block text-sm font-medium text-[#19183A]">
            Shop Currency
          </label>
          <select
            name="shop_currency"
            value={formData.shop_currency || ''}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm"
          >
            <option value="Nigerian Naira">Nigerian Naira</option>
          </select>
        </div>

        {/* Shop Email */}
        <div>
          <label className="mb-1 block text-sm font-medium text-[#19183A]">
            Shop Email
          </label>
          <input
            type="email"
            name="shop_email"
            value={formData.shop_email || ''}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm"
          />
        </div>

        {/* Shop Phone Number */}
        <div>
          <label className="mb-1 block text-sm font-medium text-[#19183A]">
            Shop Phone Number
          </label>
          <PhoneInput
            country={'ng'}
            value={formData.shop_phone_number || ''}
            disabled={!isEditing}
            enableSearch
            countryCodeEditable={false}
            inputStyle={{ width: '100%', height: '42px' }}
            onChange={phone =>
              setFormData(prev => ({ ...prev, shop_phone_number: phone }))
            }
          />
        </div>

        {/* Shop Address */}
        <div>
          <label className="mb-1 block text-sm font-medium text-[#19183A]">
            Shop Address
          </label>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* State */}
            <div>
              <label className="mb-1 block text-sm text-gray-600">State</label>
              <Select
                options={states}
                value={
                  states.find(state => state.value === formData.state) || null
                }
                isDisabled={!isEditing}
                onChange={handleStateChange}
                className="w-full pt-1"
              />
            </div>

            {/* City */}
            <div>
              <label className="mb-1 block text-sm text-gray-600">City</label>
              <input
                type="text"
                name="city"
                value={formData.city || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm"
              />
            </div>

            {/* ZIP Code */}
            <div>
              <label className="mb-1 block text-sm text-gray-600">
                ZIP Code
              </label>
              <input
                type="text"
                name="zip_code"
                value={formData.zip_code || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm"
              />
            </div>
          </div>

          {/* Address Line 1 */}
          <div className="mt-4">
            <input
              type="text"
              name="address_1"
              value={formData.address_1 || ''}
              onChange={handleInputChange}
              placeholder="Address line 1"
              disabled={!isEditing}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm"
            />
          </div>

          {/* Address Line 2 */}
          <div className="mt-4">
            <input
              type="text"
              name="address_2"
              value={formData.address_2 || ''}
              onChange={handleInputChange}
              placeholder="Address line 2"
              disabled={!isEditing}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm"
            />
          </div>
        </div>

        {/* Submit Button */}
        {isEditing && (
          <button
            type="submit"
            className="mt-4 rounded-lg bg-[#030A70] px-6 py-3 text-white"
          >
            Save Changes
          </button>
        )}
      </form>
    </div>
  );
};

export default ShopInformation;
