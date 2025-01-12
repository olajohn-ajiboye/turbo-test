import React, { useState, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Select from 'react-select';
import { State } from 'country-state-city';
import logo from '../../../assets/1_High_Resolution_Image.jpg';
import {
  fetchSellerProfile,
  updateSellerProfile,
  selectSellerProfile,
} from '@/services/redux/slices/sellers/sellerProfileSlice';
import { selectIsSellerAuthenticated } from '@/services/redux/slices/sellers/sellerAuthSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '@/services/hooks/useAppDispatch';
import { useNavigate } from 'react-router';

type FormData = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthDate: string;
  nationality: string;
  about: string;
  state: { label: string; value: string };
  city: string;
  country: string;
  zipCode: string;
  addressLine1: string;
  addressLine2: string;
  gender: string;
};

const ProfileCompletion: React.FC = () => {
  const { register, handleSubmit, control, setValue } = useForm<FormData>({
    defaultValues: { country: 'Nigeria' },
  });
  const [stateOptions, setStateOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsSellerAuthenticated);
  const sellerProfile = useAppSelector(selectSellerProfile);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    // Load states within Nigeria only
    const states = State.getStatesOfCountry('NG').map(state => ({
      value: state.isoCode,
      label: state.name,
    }));
    setStateOptions(states);
  }, []);

  const onSubmit: SubmitHandler<FormData> = async data => {
    try {
      await dispatch(
        updateSellerProfile({
          first_name: data.firstName,
          last_name: data.lastName,
          phone_number: data.phoneNumber,
          birth_date: data.birthDate,
          nationality: data.nationality,
          gender: data.gender,
          country: data.country,
          city: data.city,
          state: data.state?.value || '',
          zip_code: data.zipCode,
          address_1: data.addressLine1,
          address_2: data.addressLine2,
        })
      ).unwrap();
      navigate('/seller/shop-settings/');
    } catch (error) {
      console.error('Failed to update seller profile:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchSellerProfile());
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    if (sellerProfile) {
      setValue('firstName', sellerProfile.first_name || '');
      setValue('lastName', sellerProfile.last_name || '');
      setValue('phoneNumber', sellerProfile.phone_number || '');
      setValue('birthDate', sellerProfile.birth_date || '');
      setValue('nationality', sellerProfile.nationality || '');
      setValue('city', sellerProfile.city || '');
      setValue('zipCode', sellerProfile.zip_code || '');
      setValue('addressLine1', sellerProfile.address_1 || '');
      setValue('addressLine2', sellerProfile.address_2 || '');
      setValue('gender', sellerProfile.gender || '');
      setValue('country', sellerProfile.country || 'Nigeria');
      // Set state if available
      if (sellerProfile.state) {
        const state = stateOptions.find(s => s.value === sellerProfile.state);
        if (state)
          setValue('state', { value: state.value, label: state.label });
      }
    }
  }, [sellerProfile, setValue, stateOptions]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex min-h-screen flex-col items-center px-4 py-12"
    >
      <div className="mb-8">
        <div className="flex justify-center">
          <img src={logo} alt="logo" className="w-20 rounded-lg" />
        </div>
        <h2 className="pt-5 text-center text-2xl font-bold">
          Profile completion
        </h2>
        <div className="mt-5 flex items-center justify-center">
          <span className="rounded-full bg-[#FCC238] px-3 py-1 text-lg font-bold text-[#030A70]">
            1
          </span>
          <div className="h-1 w-20 bg-[#FCC230] md:w-60"></div>
          <span className="rounded-full bg-[#F6F6F6] px-3 py-1 text-lg font-bold text-[#030A70]">
            2
          </span>
          <div className="h-1 w-20 bg-gray-300 md:w-60"></div>
          <span className="rounded-full bg-[#F6F6F6] px-3 py-1 text-lg font-bold text-gray-400">
            3
          </span>
        </div>
        <div className="flex hidden justify-between">
          <div className="relative right-10">profile completion</div>
          <div className="relative right-2">Shop settings</div>
          <div className="relative left-10">Product listing</div>
        </div>
      </div>
      <div className="w-full max-w-6xl rounded-lg bg-[#FAFAFA] p-5 shadow-md md:p-8">
        <p className="text-sm text-[#7F8082]">Profile Completion</p>
        <h3 className="mb-6 pt-2 text-xl font-semibold text-gray-900">
          Basic Information
        </h3>
        <div className="user-details-form">
          {/* Notification */}
          <div className="mb-4 border-l-4 border-yellow-400 bg-yellow-50 p-3 text-yellow-800">
            <p className="text-sm">
              Please ensure your first and last name match the document that
              will be provided for verification.
            </p>
          </div>

          {/* Input Fields */}
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* First Name Field */}
            <div>
              <label htmlFor="firstName" className="block text-gray-700">
                First name
              </label>
              <input
                {...register('firstName')}
                placeholder="First name"
                className="input-field w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>

            {/* Last Name Field */}
            <div>
              <label htmlFor="lastName" className="block text-gray-700">
                Last name
              </label>
              <input
                {...register('lastName')}
                placeholder="Last name"
                className="input-field w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>

            {/* Phone Number Field */}
            <div>
              <label htmlFor="phoneNumber" className="block text-gray-700">
                Phone number
              </label>
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    {...field}
                    placeholder="Enter phone number"
                    country={'ng'} // Default to Nigeria
                    enableSearch
                    countryCodeEditable={false} // Ensures the country code is shown and not editable
                    inputStyle={{ width: '100%', height: '45px' }}
                  />
                )}
              />
            </div>

            {/* Birth Date Field */}
            <div>
              <label htmlFor="birthDate" className="block text-gray-700">
                Birth date
              </label>
              <input
                {...register('birthDate')}
                type="date"
                placeholder="Birth date"
                className="input-field w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="nationality" className="block text-gray-700">
            Nationality
          </label>
          <input
            {...register('nationality')}
            placeholder="Nigerian"
            className="input-field w-full px-3 py-3"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="about" className="block text-gray-700">
            About
          </label>
          <textarea
            {...register('about')}
            placeholder="Tell us about yourself?"
            className="input-field w-full px-3 py-3"
            rows={4}
          ></textarea>
        </div>

        <h3 className="mb-6 text-xl font-semibold text-gray-900">
          Address info
        </h3>
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <input type="hidden" {...register('country')} />

          <div className="mb-6">
            <label htmlFor="state" className="block text-gray-700">
              State
            </label>
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={stateOptions}
                  placeholder="Select state"
                  className="input-field w-full"
                />
              )}
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-gray-700">
              City
            </label>
            <input
              {...register('city')}
              placeholder="City"
              className="input-field w-full px-3 py-3"
            />
          </div>
          <div>
            <label htmlFor="zipCode" className="block text-gray-700">
              ZIP Code
            </label>
            <input
              {...register('zipCode')}
              placeholder="ZIP Code"
              className="input-field w-full px-3 py-3"
            />
          </div>
          <div>
            <label htmlFor="addressLine1" className="block text-gray-700">
              Address line 1
            </label>
            <input
              {...register('addressLine1')}
              placeholder="Address line 1"
              className="input-field w-full px-3 py-3"
            />
          </div>
          <div>
            <label htmlFor="addressLine2" className="block text-gray-700">
              Address line 2
            </label>
            <input
              {...register('addressLine2')}
              placeholder="Address line 2"
              className="input-field w-full px-3 py-3"
            />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="mb-2 text-xl font-semibold text-gray-900">Gender</h3>
          <div className="block md:flex md:space-x-4">
            <label className="mt-2 flex w-32 items-center bg-white px-2 py-3">
              <input
                type="radio"
                value="Male"
                {...register('gender')}
                className="mr-2"
              />
              Male
            </label>
            <label className="mt-2 flex w-32 items-center rounded-lg bg-white px-2 py-3">
              <input
                type="radio"
                value="Female"
                {...register('gender')}
                className="mr-2"
              />
              Female
            </label>
            <label className="mt-2 flex w-32 items-center rounded-lg bg-white px-2 py-3">
              <input
                type="radio"
                value="Non-binary"
                {...register('gender')}
                className="mr-2"
              />
              Non-binary
            </label>
          </div>
        </div>
      </div>

      <div className="mt-10 justify-center gap-5 md:flex">
        <button
          type="button"
          className="w-full rounded-md border border-gray-300 bg-white px-6 py-3 text-gray-700 transition hover:bg-gray-50 hover:shadow-md md:w-56"
          onClick={goBack}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="mt-4 w-full rounded-md bg-[#030A70] px-6 py-3 text-white shadow-md transition hover:bg-blue-800 md:mt-0 md:w-56"
        >
          Save and continue
        </button>
      </div>
    </form>
  );
};

export default ProfileCompletion;
