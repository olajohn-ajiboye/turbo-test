import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Select from 'react-select';
import { Country } from 'country-state-city';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { PersonalInfo } from '@/types/types';
import {
  useAppDispatch,
  useAppSelector,
} from '@/services/hooks/useAppDispatch';
import {
  fetchUserProfile,
  selectUserProfile,
  updateUserProfile,
} from '@/services/redux/slices/buyers/profileSlice';
import {
  fetchSellerProfile,
  selectSellerProfile,
  updateSellerProfile,
} from '@/services/redux/slices/sellers/sellerProfileSlice';
import { selectIsAuthenticated as selectIsBuyerAuthenticated } from '@/services/redux/slices/buyers/authSlice';
import { selectIsSellerAuthenticated } from '@/services/redux/slices/sellers/sellerAuthSlice';

const PersonalInformation: React.FC = () => {
  const dispatch = useAppDispatch();

  // Determine if the user is a buyer or seller
  const isSellerAuthenticated = useAppSelector(selectIsSellerAuthenticated);
  const isBuyerAuthenticated = useAppSelector(selectIsBuyerAuthenticated);

  const userProfile = isBuyerAuthenticated
    ? useAppSelector(selectUserProfile)
    : useAppSelector(selectSellerProfile);

  // Initial data fetched from Redux or API call, default to empty strings if no data
  const initialData: PersonalInfo = {
    firstName: userProfile?.first_name || '',
    lastName: userProfile?.last_name || '',
    phoneNumber: userProfile?.phone_number || '',
    email: userProfile?.email || '',
    gender: userProfile?.gender || '',
    birthDate: userProfile?.birth_date || '',
    country: userProfile?.country
      ? { label: userProfile.country, value: userProfile.country }
      : { label: '', value: '' },
  };

  const { register, handleSubmit, control, reset } = useForm<PersonalInfo>({
    defaultValues: initialData,
  });

  const [isEditing, setIsEditing] = useState(false);

  // Fetch user profile on component mount
  useEffect(() => {
    if (isBuyerAuthenticated) {
      dispatch(fetchUserProfile());
    } else if (isSellerAuthenticated) {
      dispatch(fetchSellerProfile());
    }
  }, [dispatch, isBuyerAuthenticated, isSellerAuthenticated]);

  // Reset form to initial data on edit cancel
  const handleCancel = () => {
    reset(initialData);
    setIsEditing(false);
  };

  // Toggle editing mode
  const toggleEdit = () => setIsEditing(!isEditing);

  const onSubmit: SubmitHandler<PersonalInfo> = async data => {
    const updatedData = {
      first_name: data.firstName,
      last_name: data.lastName,
      phone_number: data.phoneNumber,
      email: data.email,
      gender: data.gender,
      birth_date: data.birthDate,
      country: data.country?.label,
    };

    if (isBuyerAuthenticated) {
      await dispatch(updateUserProfile(updatedData));
    } else if (isSellerAuthenticated) {
      await dispatch(updateSellerProfile(updatedData));
    }

    setIsEditing(false);
  };

  return (
    <div className="mx-auto rounded-lg bg-white p-8 shadow-md">
      <h2 className="mb-6 text-2xl font-bold">Personal Information</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {/* First Name */}
        <div>
          <label className="mb-2 block">First name</label>
          <input
            {...register('firstName', { required: 'First name is required' })}
            type="text"
            disabled={!isEditing}
            className="w-full rounded-lg border border-gray-300 p-2"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="mb-2 block">Last name</label>
          <input
            {...register('lastName', { required: 'Last name is required' })}
            type="text"
            disabled={!isEditing}
            className="w-full rounded-lg border border-gray-300 p-2"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="mb-2 block">Phone number</label>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <PhoneInput
                country={'ng'}
                value={field.value}
                onChange={phone => field.onChange(phone)}
                disabled={!isEditing}
                inputStyle={{ width: '100%', height: '42px' }}
              />
            )}
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block">Email address</label>
          <input
            {...register('email', { required: 'Email is required' })}
            type="email"
            disabled={!isEditing}
            className="w-full rounded-lg border border-gray-300 p-2"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="mb-2 block">Gender</label>
          <input
            {...register('gender')}
            type="text"
            disabled={!isEditing}
            className="w-full rounded-lg border border-gray-300 p-2"
          />
        </div>

        {/* Birth Date */}
        <div>
          <label className="mb-2 block">Birth date</label>
          <input
            {...register('birthDate')}
            type="date"
            disabled={!isEditing}
            className="w-full rounded-lg border border-gray-300 p-2"
          />
        </div>

        {/* Country */}
        <div>
          <label className="mb-2 block">Country/Region</label>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={Country.getAllCountries().map(country => ({
                  label: country.name,
                  value: country.isoCode,
                }))}
                isDisabled={!isEditing}
                className="w-full"
              />
            )}
          />
        </div>

        {/* Buttons */}
        <div className="col-span-2 mt-6 flex justify-start space-x-4">
          {isEditing ? (
            <>
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
                Save
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={toggleEdit}
              className="rounded-lg bg-[#030A70] px-10 py-2 text-white"
            >
              Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PersonalInformation;
