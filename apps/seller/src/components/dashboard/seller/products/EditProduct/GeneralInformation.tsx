import { useState } from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { FiPlus, FiTrash2, FiEdit } from 'react-icons/fi';

interface Specification {
  id: string;
  type: string;
  value: string;
}

interface GeneralInformationProps {
  register: UseFormRegister<any>;
  specifications: Specification[];
  setSpecifications: React.Dispatch<React.SetStateAction<Specification[]>>;
  setValue: UseFormSetValue<any>;
  initialTitle: string;
  initialDescription: string;
}

const GeneralInformation: React.FC<GeneralInformationProps> = ({
  specifications,
  setSpecifications,
  initialTitle,
  initialDescription,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  // State to handle whether the fields are in edit mode
  const [isTitleEditable, setIsTitleEditable] = useState(false);
  const [isDescriptionEditable, setIsDescriptionEditable] = useState(false);

  // State to manage specifications editing
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editType, setEditType] = useState('');
  const [editValue, setEditValue] = useState('');

  // Add new specification
  const addSpecification = () => {
    const newSpec: Specification = {
      id: '_' + Math.random().toString(36).substr(2, 9),
      type: '',
      value: '',
    };
    setSpecifications([...specifications, newSpec]);
  };

  // Delete specification by ID
  const deleteSpecification = (id: string) => {
    setSpecifications(specifications.filter(spec => spec.id !== id));
  };

  // Start editing a specification
  const startEditing = (id: string, type: string, value: string) => {
    setIsEditing(id);
    setEditType(type);
    setEditValue(value);
  };

  // Save edited specification
  const saveSpecification = (id: string) => {
    setSpecifications(
      specifications.map(spec =>
        spec.id === id ? { ...spec, type: editType, value: editValue } : spec
      )
    );
    setIsEditing(null);
  };

  return (
    <div className="general-information rounded-lg bg-white p-6 shadow-md">
      <h3 className="text-xl font-bold">General Information</h3>
      <p className="pb-4 pt-1 text-sm text-[#B6B6B7]">
        Edit the details about your product.
      </p>

      {/* Product Title */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700">
          Product title
        </label>
        {isTitleEditable ? (
          <input
            type="text"
            className="shadow-s mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 sm:text-sm"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onBlur={() => setIsTitleEditable(false)} // Exit edit mode on blur
            autoFocus
          />
        ) : (
          <div
            className="flex cursor-pointer items-center justify-between border border-gray-300 p-5 py-2"
            onClick={() => setIsTitleEditable(true)}
          >
            <span>{title || 'Click to add title'}</span>
            <FiEdit size={20} className="text-gray-600" />
          </div>
        )}
      </div>

      {/* Product Description */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700">
          Product description
        </label>
        {isDescriptionEditable ? (
          <textarea
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm sm:text-sm"
            value={description}
            onChange={e => setDescription(e.target.value)}
            onBlur={() => setIsDescriptionEditable(false)} // Exit edit mode on blur
            rows={6}
            autoFocus
          />
        ) : (
          <div
            className="flex cursor-pointer items-center justify-between border border-gray-300 p-5 py-2"
            onClick={() => setIsDescriptionEditable(true)}
          >
            <p className="text-gray-700">
              {description || 'Click to add description'}
            </p>
            <FiEdit size={20} className="text-gray-600" />
          </div>
        )}
      </div>

      {/* Product Specifications */}
      <div className="mb-4 grid items-center justify-between md:flex">
        <h3 className="text-lg font-medium">Product Specifications</h3>
        <button
          type="button"
          className="flex items-center rounded-lg border border-[#030A70] px-4 py-2 text-[#030A70]"
          onClick={addSpecification}
        >
          <FiPlus size={16} className="mr-2" />
          Manage Specifications
        </button>
      </div>

      {/* Render Specifications */}
      {specifications.length > 0 && (
        <div className="mt-4">
          <table className="min-w-full divide-y divide-gray-200 border">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {specifications.map(spec => (
                <tr key={spec.id}>
                  <td className="whitespace-nowrap px-6 py-4">
                    {isEditing === spec.id ? (
                      <input
                        type="text"
                        className="w-full rounded-md border px-4 py-2"
                        value={editType}
                        onChange={e => setEditType(e.target.value)}
                      />
                    ) : (
                      spec.type
                    )}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {isEditing === spec.id ? (
                      <input
                        type="text"
                        className="w-full rounded-md border px-4 py-2"
                        value={editValue}
                        onChange={e => setEditValue(e.target.value)}
                      />
                    ) : (
                      spec.value
                    )}
                  </td>
                  <td className="flex gap-2 whitespace-nowrap px-6 py-4">
                    {isEditing === spec.id ? (
                      <>
                        <button
                          type="button"
                          className="text-blue-600"
                          onClick={() => saveSpecification(spec.id)}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="text-red-600"
                          onClick={() => setIsEditing(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="text-blue-600"
                          onClick={() =>
                            startEditing(spec.id, spec.type, spec.value)
                          }
                        >
                          <FiEdit />
                        </button>
                        <button
                          type="button"
                          className="text-red-600"
                          onClick={() => deleteSpecification(spec.id)}
                        >
                          <FiTrash2 />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GeneralInformation;
