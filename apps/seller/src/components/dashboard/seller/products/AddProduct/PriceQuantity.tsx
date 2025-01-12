import Select, { SingleValue } from 'react-select';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';

interface OptionType {
  value: string;
  label: string;
}

interface PriceQuantityProps {
  quantity: number;
  selectedUnit: OptionType | null;
  unitOptions: OptionType[];
  incrementQuantity: () => void;
  decrementQuantity: () => void;
  setSelectedUnit: (option: SingleValue<OptionType>) => void;
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
}

const PriceQuantity: React.FC<PriceQuantityProps> = ({
  quantity,
  selectedUnit,
  unitOptions,
  incrementQuantity,
  decrementQuantity,
  setSelectedUnit,
  register,
  watch,
}) => {
  // Use watch to track price and discount changes
  const price = watch('price');
  const discount = watch('discount');

  // Calculate the discount price
  const calculateDiscountPrice = () => {
    if (
      price !== undefined &&
      discount !== undefined &&
      price !== null &&
      discount !== null
    ) {
      return price - (price * discount) / 100;
    }
    return null;
  };

  return (
    <div className="price-quantity mt-6 rounded-lg bg-white p-6 shadow-md">
      <h3 className="text-xl font-bold">Price and quantity</h3>
      <p className="pb-4 pt-1 text-sm text-[#B6B6B7]">
        Set the price, quantity, and unit of your product.
      </p>

      {/* Quantity Input */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <p className="mr-4 text-sm font-medium text-gray-700">
            Available quantity
          </p>
          <div className="flex items-center rounded-md border border-gray-300">
            <button
              type="button"
              onClick={decrementQuantity}
              className="border-r border-gray-300 bg-gray-100 px-4 py-2 text-sm text-gray-700"
            >
              -
            </button>
            <div className="px-6 py-2 text-sm text-gray-700">{quantity}</div>
            <button
              type="button"
              onClick={incrementQuantity}
              className="border-l border-gray-300 bg-gray-100 px-4 py-2 text-sm text-gray-700"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Price, Discount, and Discount Price */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Price Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            placeholder="Enter price here"
            {...register('price', { required: true })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm sm:text-sm"
          />
        </div>

        {/* Discount Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Discount % (Optional)
          </label>
          <input
            type="number"
            placeholder="Enter discount % here"
            {...register('discount')}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm sm:text-sm"
          />
        </div>

        {/* Discount Price Display */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Discount price (Optional)
          </label>
          <div className="mt-1 flex items-center rounded-md border border-gray-300 bg-gray-100 px-4 py-2">
            <p className="text-sm text-gray-600">
              {calculateDiscountPrice() !== null
                ? `$${calculateDiscountPrice()?.toFixed(2)}`
                : 'Discount price shows here'}
            </p>
          </div>
        </div>
      </div>

      {/* Unit Selection */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700">Unit</label>
        <Select
          options={unitOptions}
          value={selectedUnit}
          onChange={setSelectedUnit}
          placeholder="Select unit"
          className="mt-1"
        />
      </div>
    </div>
  );
};

export default PriceQuantity;
