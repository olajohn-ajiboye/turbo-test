import React, { useState, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Select from 'react-select';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Country, State } from 'country-state-city';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from '@/services/hooks/useAppDispatch';
import {
  addAddress,
  updateAddress,
} from '@/services/redux/slices/buyers/addressBookSlice';

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  country: { label: string; value: string };
  state: { label: string; value: string };
  city: string;
  postalCode: string;
  addressLine1: string;
  addressLine2: string;
  defaultShipping: boolean;
}

const AddressForm: React.FC = () => {
  const { register, handleSubmit, control, watch, setValue } =
    useForm<FormData>();
  const [countries, setCountries] = useState<
    { label: string; value: string }[]
  >([]);
  const [states, setStates] = useState<{ label: string; value: string }[]>([]);
  const selectedCountry = watch('country')?.value;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if editing an existing address
  const addressData = location.state?.address || null;
  const isEditing = !!addressData;

  useEffect(() => {
    // Populate country and state options
    const countryOptions = Country.getAllCountries().map(country => ({
      label: country.name,
      value: country.isoCode,
    }));
    setCountries(countryOptions);

    if (isEditing && addressData) {
      // Set initial form values if editing
      setValue('firstName', addressData.first_name);
      setValue('lastName', addressData.last_name);
      setValue('phoneNumber', addressData.phone_number);
      setValue('addressLine1', addressData.address_line_1);
      setValue('addressLine2', addressData.address_line_2 || '');
      setValue('city', addressData.city);
      setValue('state', { label: addressData.state, value: addressData.state });
      setValue('country', {
        label: addressData.country,
        value: addressData.country,
      });
      setValue('postalCode', addressData.postal_code);
      setValue('defaultShipping', addressData.is_default);
    }
  }, [isEditing, addressData, setValue]);

  useEffect(() => {
    if (selectedCountry) {
      const stateOptions = State.getStatesOfCountry(selectedCountry).map(
        state => ({
          label: state.name,
          value: state.isoCode,
        })
      );
      setStates(stateOptions);
    } else {
      setStates([]);
    }
  }, [selectedCountry]);

  const onSubmit: SubmitHandler<FormData> = async data => {
    const addressPayload = {
      first_name: data.firstName,
      last_name: data.lastName,
      phone_number: data.phoneNumber,
      address_line_1: data.addressLine1,
      address_line_2: data.addressLine2,
      city: data.city,
      state: data.state.label,
      country: data.country.label,
      postal_code: data.postalCode,
      is_default: data.defaultShipping,
    };

    try {
      if (isEditing) {
        await dispatch(
          updateAddress({ id: addressData.id, updatedAddress: addressPayload })
        ).unwrap();
      } else {
        await dispatch(addAddress(addressPayload)).unwrap();
      }
      navigate('/dashboard/address-book');
    } catch (error) {
      console.error(
        isEditing ? 'Failed to update address' : 'Failed to add address',
        error
      );
    }
  };

  const handleCancel = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto rounded-lg bg-white p-8 shadow-md"
    >
      <h2 className="mb-6 text-2xl font-bold">
        {isEditing ? 'Edit Address' : 'Add New Address'}
      </h2>

      {/* Contact Info */}
      <p className="mb-4 font-semibold">Contact info</p>
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block">First name</label>
          <input
            {...register('firstName')}
            placeholder="Enter first name"
            className="w-full rounded-lg border border-gray-300 p-2"
            required
          />
        </div>
        <div>
          <label className="mb-2 block">Last name</label>
          <input
            {...register('lastName')}
            placeholder="Enter last name"
            className="w-full rounded-lg border border-gray-300 p-2"
            required
          />
        </div>
        <div>
          <label className="mb-2 block">Phone number</label>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <PhoneInput
                {...field}
                country={'ng'}
                placeholder="Enter phone number"
                enableSearch={true}
                countryCodeEditable={false}
                inputStyle={{ width: '100%', height: '42px' }}
              />
            )}
          />
        </div>
        <div>
          <label className="mb-2 block">Email address</label>
          <input
            {...register('email')}
            placeholder="Enter email address"
            className="w-full rounded-lg border border-gray-300 p-2"
            type="email"
            required
          />
        </div>
      </div>

      {/* Address Info */}
      <p className="mb-4 font-semibold">Address info</p>
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block">Country</label>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={countries}
                placeholder="Select country"
                className="w-full"
              />
            )}
          />
        </div>
        <div>
          <label className="mb-2 block">State</label>
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={states}
                placeholder="Select state"
                isDisabled={!selectedCountry}
                className="w-full"
              />
            )}
          />
        </div>
        <div>
          <label className="mb-2 block">City</label>
          <input
            {...register('city')}
            placeholder="Enter city"
            className="w-full rounded-lg border border-gray-300 p-2"
          />
        </div>
        <div>
          <label className="mb-2 block">Postal code</label>
          <input
            {...register('postalCode')}
            placeholder="Enter postal code"
            className="w-full rounded-lg border border-gray-300 p-2"
          />
        </div>
        <div>
          <label className="mb-2 block">Address line 1</label>
          <input
            {...register('addressLine1')}
            placeholder="Enter address line 1"
            className="w-full rounded-lg border border-gray-300 p-2"
          />
        </div>
        <div>
          <label className="mb-2 block">Address line 2</label>
          <input
            {...register('addressLine2')}
            placeholder="Enter address line 2"
            className="w-full rounded-lg border border-gray-300 p-2"
          />
        </div>
      </div>

      {/* Default Address Toggle */}
      <div className="mb-6 flex items-center">
        <Controller
          name="defaultShipping"
          control={control}
          render={({ field }) => (
            <input
              type="checkbox"
              checked={field.value}
              onChange={e => field.onChange(e.target.checked)}
            />
          )}
        />
        <label className="ml-2">Set as default shipping address</label>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={handleCancel}
          className="rounded-lg border border-[#030A70] px-10 py-2 text-[#030A70] hover:bg-[#EDF1FB]"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-lg bg-[#030A70] px-10 py-2 text-white"
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
