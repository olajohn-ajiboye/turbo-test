import { useEffect } from 'react';
import { RootState } from '@/services/redux/store';
import {
  useAppDispatch,
  useAppSelector,
} from '@/services/hooks/useAppDispatch';
import { Link } from 'react-router-dom';
import {
  fetchUserProfile,
  selectUserProfile,
} from '@/services/redux/slices/buyers/profileSlice';
import {
  fetchAddresses,
  selectDefaultAddress,
} from '@/services/redux/slices/buyers/addressBookSlice';

const OverviewSection = () => {
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector((state: RootState) =>
    selectUserProfile(state)
  );
  const defaultAddress = useAppSelector((state: RootState) =>
    selectDefaultAddress(state)
  );

  useEffect(() => {
    if (!userProfile) {
      dispatch(fetchUserProfile());
    }
    dispatch(fetchAddresses());
  }, [dispatch, userProfile]);

  return (
    <div className="flex flex-col justify-between gap-4 bg-[#EDF1FB] lg:flex-row">
      {/* Total Orders Made Card */}
      <div className="flex w-full flex-col gap-5 rounded-lg bg-[#EDF1FB] lg:w-1/3">
        <div className="flex items-center rounded-lg bg-white p-6 shadow-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EDF1FB]">
            <p className="text-xl font-semibold text-[#19183A]">
              {userProfile?.total_orders}
            </p>
          </div>
          <div className="ml-4">
            <p className="text-base font-medium text-[#19183A]">
              Total Orders Made
            </p>
          </div>
        </div>

        <div className="flex items-center rounded-lg bg-white p-6 shadow-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EDF1FB]">
            <p className="text-xl font-semibold text-[#19183A]">
              {userProfile?.pending_orders}
            </p>
          </div>
          <div className="ml-4">
            <p className="text-base font-medium text-[#19183A]">
              Pending Orders
            </p>
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <div className="w-full rounded-lg bg-white p-6 shadow-md lg:max-w-md">
        <div className="mb-4 flex items-start justify-between">
          <h2 className="text-lg font-semibold text-[#19183A]">Profile</h2>
          <Link to="./account-settings">
            <button className="text-sm font-medium text-[#030A70]">EDIT</button>
          </Link>
        </div>

        {/* Profile Information */}
        {userProfile ? (
          <div className="grid grid-cols-2 gap-y-4">
            <div>
              <p className="text-sm font-semibold text-[#030A70]">Name</p>
              <p className="text-sm text-gray-500">{`${userProfile.first_name} ${userProfile.last_name}`}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#030A70]">
                Email address
              </p>
              <p className="text-sm text-gray-500">{userProfile.email}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#030A70]">Phone</p>
              <p className="text-sm text-gray-500">
                {userProfile.phone_number}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#030A70]">Password</p>
              <p className="text-sm text-gray-500">********</p>
            </div>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>

      {/* Address Card */}
      <div className="w-full rounded-lg bg-white p-6 shadow-md lg:max-w-md">
        <div className="mb-4 flex items-start justify-between">
          <h2 className="text-lg font-semibold text-[#19183A]">Address</h2>
          <Link to="./address-book">
            <button className="text-sm font-medium text-[#030A70]">EDIT</button>
          </Link>
        </div>

        <div className="mb-4">
          <p className="text-sm font-semibold text-[#030A70]">
            Your default shipping address:
          </p>
          {defaultAddress ? (
            <p className="mt-2 text-sm text-gray-500">
              {`${defaultAddress.first_name} ${defaultAddress.last_name}, ${defaultAddress.address_line_1}, ${
                defaultAddress.address_line_2
                  ? `${defaultAddress.address_line_2}, `
                  : ''
              }${defaultAddress.city}, ${defaultAddress.state}, ${defaultAddress.country} ${defaultAddress.postal_code}`}
            </p>
          ) : (
            <p className="mt-2 text-sm text-gray-500">
              No default address set.
            </p>
          )}
        </div>

        <Link
          to="./address-book/add"
          className="text-sm font-medium text-[#030A70]"
        >
          Add new address
        </Link>
      </div>
    </div>
  );
};

export default OverviewSection;
