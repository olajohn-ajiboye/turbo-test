import { UseFormRegister } from 'react-hook-form';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

interface Specifications {
  id: string;
  type: string;
  value: string;
}

interface GeneralInformationProps {
  register: UseFormRegister<any>;
  specifications: Specifications[];
  setSpecifications: React.Dispatch<React.SetStateAction<Specifications[]>>;
}

const GeneralInformation: React.FC<GeneralInformationProps> = ({
  register,
  specifications,
  setSpecifications,
}) => {
  const generateUniqueId = () => '_' + Math.random().toString(36).substr(2, 9);

  const addSpecification = () => {
    setSpecifications([
      ...specifications,
      { id: generateUniqueId(), type: '', value: '' },
    ]);
  };

  const removeSpecification = (id: string) => {
    setSpecifications(specifications.filter(spec => spec.id !== id));
  };

  const handleSpecificationChange = (
    id: string,
    field: 'type' | 'value',
    value: string
  ) => {
    setSpecifications(prevSpecifications =>
      prevSpecifications.map(spec =>
        spec.id === id ? { ...spec, [field]: value } : spec
      )
    );
  };

  return (
    <div className="general-information rounded-lg bg-white p-6 shadow-md">
      <h3 className="text-xl font-bold">General Information</h3>
      <p className="pb-4 pt-1 text-sm text-[#B6B6B7]">
        Tell the world all about your product.
      </p>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Product Title
        </label>
        <input
          type="text"
          {...register('name', { required: true })}
          placeholder="Enter product title here"
          className="mb-5 mt-1 block w-full rounded-md border px-4 py-2 shadow-sm sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Product Description
        </label>
        <textarea
          {...register('description', { required: true })}
          placeholder="Enter description here"
          rows={4}
          className="mb-5 mt-1 block w-full rounded-md border px-4 py-2 shadow-sm sm:text-sm"
        />
      </div>

      <div className="block items-center justify-between md:flex">
        <label className="block text-sm font-medium text-gray-700">
          Specifications
        </label>
        <button
          type="button"
          className="mt-1 flex items-center rounded-lg border px-4 py-2 text-sm text-blue-600 shadow-sm hover:bg-gray-50"
          onClick={addSpecification}
        >
          <FiPlus className="mr-2" size={20} />
          Add Specification
        </button>
      </div>

      {specifications.length > 0 && (
        <div className="mt-4">
          {specifications.map(spec => (
            <div
              key={spec.id}
              className="mb-4 flex items-center space-x-4 bg-gray-50 p-5"
            >
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Option Type
                </label>
                <input
                  type="text"
                  placeholder="e.g., Color"
                  value={spec.type}
                  onChange={e =>
                    handleSpecificationChange(spec.id, 'type', e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border px-4 py-2 shadow-sm sm:text-sm"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Option Value
                </label>
                <input
                  type="text"
                  placeholder="e.g., Red"
                  value={spec.value}
                  onChange={e =>
                    handleSpecificationChange(spec.id, 'value', e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border px-4 py-2 shadow-sm sm:text-sm"
                />
              </div>
              <button
                type="button"
                className="text-red-500"
                onClick={() => removeSpecification(spec.id)}
              >
                <FiTrash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GeneralInformation;
