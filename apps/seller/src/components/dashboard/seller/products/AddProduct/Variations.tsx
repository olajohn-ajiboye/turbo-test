import Select, { SingleValue } from 'react-select';
import { FiTrash2, FiPlus, FiX } from 'react-icons/fi';
import { SketchPicker } from 'react-color';

interface OptionType {
  value: string;
  label: string;
}

interface Variation {
  id: string;
  name: OptionType | null;
  options: string[]; // Options for "Size" or hex color codes for "Color"
}

interface VariationsProps {
  variations: Variation[];
  currentColor: string;
  isColorPickerVisible: boolean;
  addVariation: () => void;
  removeVariation: (id: string) => void;
  handleVariationNameChange: (
    id: string,
    option: SingleValue<OptionType>
  ) => void;
  handleOptionChange: (id: string, index: number, value: string) => void;
  addOption: (id: string) => void;
  removeOption: (id: string, index: number) => void;
  setCurrentColor: (color: string) => void;
  setIsColorPickerVisible: (visible: boolean) => void;
  addColorOption: (id: string) => void;
  variationOptions: OptionType[];
}

const Variations: React.FC<VariationsProps> = ({
  variations,
  currentColor,
  isColorPickerVisible,
  addVariation,
  removeVariation,
  handleVariationNameChange,
  handleOptionChange,
  addOption,
  removeOption,
  setCurrentColor,
  setIsColorPickerVisible,
  addColorOption,
  variationOptions,
}) => (
  <div className="variations mt-6 rounded-lg bg-white p-6 shadow-md">
    <h3 className="text-xl font-bold">Variations</h3>
    <p className="pb-4 pt-1 text-sm text-[#B6B6B7]">
      Add available options like color or size.
    </p>

    {variations.length > 0 && (
      <div className="mb-4 space-y-4">
        {variations.map(variation => (
          <div key={variation.id} className="rounded-lg border bg-gray-50 p-4">
            <div className="mb-4 flex items-center justify-between">
              <Select
                options={variationOptions}
                value={variation.name}
                onChange={option =>
                  handleVariationNameChange(variation.id, option)
                }
                placeholder="Select variation (e.g., Size, Color)"
                className="mr-4 w-full"
              />
              <button
                type="button"
                className="text-red-500"
                onClick={() => removeVariation(variation.id)}
              >
                <FiTrash2 size={20} />
              </button>
            </div>

            {variation.name?.value === 'size' && (
              <div>
                {variation.options.map((option, index) => (
                  <div key={index} className="mb-3 flex items-center">
                    <input
                      type="text"
                      placeholder="Option (e.g. Small, Medium)"
                      value={option}
                      onChange={e =>
                        handleOptionChange(variation.id, index, e.target.value)
                      }
                      className="mr-4 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm sm:text-sm"
                    />
                    <button
                      type="button"
                      className="text-red-500"
                      onClick={() => removeOption(variation.id, index)}
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="flex items-center rounded-lg border border-[#030A70] px-4 py-2 text-[#030A70]"
                  onClick={() => addOption(variation.id)}
                >
                  <FiPlus size={16} className="mr-2" /> Add Option
                </button>
              </div>
            )}

            {variation.name?.value === 'color' && (
              <div>
                <div className="mb-3 flex flex-wrap">
                  {variation.options.map((color, index) => (
                    <div
                      key={index}
                      className="relative mb-2 mr-3 h-8 w-16 rounded-lg"
                      style={{ backgroundColor: color }}
                    >
                      <button
                        type="button"
                        className="absolute right-6 top-2 text-xs text-white"
                        onClick={() => removeOption(variation.id, index)}
                      >
                        <FiX size={15} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mb-3">
                  <button
                    type="button"
                    className="flex items-center rounded-lg border border-[#030A70] px-4 py-2 text-[#030A70]"
                    onClick={() =>
                      setIsColorPickerVisible(!isColorPickerVisible)
                    }
                  >
                    <FiPlus size={16} className="mr-2" /> Add color
                  </button>

                  {isColorPickerVisible && (
                    <SketchPicker
                      color={currentColor}
                      onChangeComplete={color => setCurrentColor(color.hex)}
                    />
                  )}
                </div>

                <button
                  type="button"
                  className="flex items-center rounded-lg border border-[#030A70] px-4 py-2 text-[#030A70]"
                  onClick={() => addColorOption(variation.id)}
                >
                  Add Selected Color
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    )}

    <button
      type="button"
      className="flex items-center rounded-lg border border-[#030A70] px-4 py-2 text-[#030A70]"
      onClick={addVariation}
    >
      <FiPlus size={16} className="mr-2" /> Add Variations
    </button>
  </div>
);

export default Variations;
