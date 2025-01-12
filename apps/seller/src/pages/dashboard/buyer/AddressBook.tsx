import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import AddressCard from '../../../components/dashboard/buyer/Addresses/AddressCard';
import {
  deleteAddress,
  fetchAddresses,
  selectAddresses,
  selectAddressLoading,
  setDefaultAddress,
} from '../../../services/redux/slices/buyers/addressBookSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '@/services/hooks/useAppDispatch';
import { Address } from '@/services/redux/slices/buyers/addressBookSlice'; // Import the Address type

const AddressBook: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const addresses = useAppSelector(selectAddresses);
  const loading = useAppSelector(selectAddressLoading);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const handleEdit = (address: Address) => {
    navigate('/dashboard/address-book/add', { state: { address } });
  };

  const handleAdd = () => {
    navigate('/dashboard/address-book/add');
  };

  const handleDelete = async (id: number) => {
    try {
      await dispatch(deleteAddress(id)).unwrap();
      console.log(`Address with ID ${id} deleted.`);
    } catch (error) {
      console.error('Failed to delete address:', error);
    }
  };

  const handleSetDefault = async (id: number) => {
    try {
      await dispatch(setDefaultAddress(id)).unwrap();
      console.log(`Address with ID ${id} set as default.`);
    } catch (error) {
      console.error('Failed to set default address:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="grid items-center justify-between md:flex">
        <h1 className="mb-4 text-2xl font-bold">Address Book</h1>
        <button
          className="mb-6 rounded-lg bg-[#030A70] px-5 py-3 text-white"
          onClick={handleAdd}
        >
          Add new address
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {addresses.map(address => (
          <AddressCard
            key={address.id}
            name={`${address.first_name} ${address.last_name}`}
            address={`${address.address_line_1} ${address.address_line_2 || ''}`}
            city={address.city}
            state={address.state}
            zip={address.postal_code}
            isDefault={address.is_default}
            onEdit={() => handleEdit(address)}
            onDelete={() => handleDelete(address.id)}
            onSetDefault={() => handleSetDefault(address.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default AddressBook;
