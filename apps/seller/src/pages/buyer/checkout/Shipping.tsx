import React, { useState, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Select from 'react-select';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Country, State } from 'country-state-city';
import Header from '@/components/Nav';
import { useDispatch } from 'react-redux';
import { setShippingDetails } from '../../../services/redux/slices/buyers/shippingSlice';
import { useNavigate } from 'react-router';

// Define the form data types
interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  note: string;
  country: { label: string; value: string };
  state: { label: string; value: string };
  city: string;
  postalCode: string;
  addressLine1: string;
  addressLine2: string;
  giftWrapping: boolean;
  sameAsShipping: boolean;
}

const ShippingForm: React.FC = () => {
  const { register, handleSubmit, control, watch } = useForm<FormData>();
  const [countries, setCountries] = useState<
    { label: string; value: string }[]
  >([]);
  const [states, setStates] = useState<{ label: string; value: string }[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedCountry = watch('country')?.value;

  useEffect(() => {
    // Fetch all countries using country-state-city library
    const countryOptions = Country.getAllCountries().map(country => ({
      label: country.name,
      value: country.isoCode,
    }));
    setCountries(countryOptions);
  }, []);

  useEffect(() => {
    // Fetch states when a country is selected
    if (selectedCountry) {
      const stateOptions = State.getStatesOfCountry(selectedCountry).map(
        state => ({
          label: state.name,
          value: state.isoCode,
        })
      );
      setStates(stateOptions);
    } else {
      setStates([]); // Reset states if no country is selected
    }
  }, [selectedCountry]);

  const onSubmit: SubmitHandler<FormData> = data => {
    dispatch(setShippingDetails(data));
    navigate('/payment');
  };

  return (
    <>
      <Header />
      <div className="my-12">
        <h2 className="pt-5 text-center text-2xl font-bold">Shipping</h2>
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
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-6xl">
        <div className="rounded-xl bg-[#FAFAFA] p-8 shadow-md">
          <h2 className="mb-4 font-semibold">Shipping information</h2>
          {/* Contact Info */}
          <p className="mb-3 font-semibold">Contact Info</p>
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block">First name</label>
              <input
                {...register('firstName')}
                placeholder="Enter first name"
                className="input-field w-full px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="mb-2 block">Last name</label>
              <input
                {...register('lastName')}
                placeholder="Enter last name"
                className="input-field w-full px-3 py-2"
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
                className="input-field w-full px-3 py-2"
                type="email"
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block">Optional note</label>
              <textarea
                {...register('note')}
                placeholder="Enter details here"
                className="input-field w-full px-3 py-2"
                rows={3}
              />
            </div>
          </div>

          {/* Address Info */}
          <p className="mb-3 font-semibold">Address info</p>
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block">Country</label>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={countries}
                    className="w-full"
                    placeholder="Select country"
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
                    className="w-full"
                    placeholder="Select state"
                    isDisabled={!selectedCountry}
                  />
                )}
              />
            </div>
            <div>
              <label className="mb-2 block">City</label>
              <input
                {...register('city')}
                placeholder="Enter city"
                className="input-field w-full px-3 py-2"
              />
            </div>
            <div>
              <label className="mb-2 block">Postal code</label>
              <input
                {...register('postalCode')}
                placeholder="Enter postal code"
                className="input-field w-full px-3 py-2"
              />
            </div>
            <div>
              <label className="mb-2 block">Address line 1</label>
              <input
                {...register('addressLine1')}
                placeholder="Enter details here"
                className="input-field w-full px-3 py-2"
              />
            </div>
            <div>
              <label className="mb-2 block">Address line 2</label>
              <input
                {...register('addressLine2')}
                placeholder="Enter details here"
                className="input-field w-full px-3 py-2"
              />
            </div>
          </div>
        </div>
        {/* Send as a gift */}
        <div className="mt-5 rounded-xl bg-[#FAFAFA] px-5 py-5 shadow-md">
          <p className="font-semibold">Send as a gift? (gift wrapping)</p>
          <label className="mt-5 flex items-center">
            <input
              type="checkbox"
              {...register('giftWrapping')}
              className="mr-2"
            />
            <span className="text-sm">
              Use same information as shipping information
            </span>
          </label>
        </div>

        {/* Billing Information */}
        <div className="mb-8 mt-5 rounded-xl bg-[#FAFAFA] px-5 py-5 shadow-md">
          <p className="font-semibold">Billing information</p>
          <label className="mt-5 flex items-center">
            <input
              type="checkbox"
              {...register('sameAsShipping')}
              className="mr-2"
              defaultChecked
            />
            <span>Use same information as shipping information</span>
          </label>
        </div>

        <div className="mb-10 flex justify-center">
          <button
            type="submit"
            className="w-1/2 rounded-lg bg-[#030A70] py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Proceed to payment
          </button>
        </div>
      </form>
    </>
  );
};

export default ShippingForm;
