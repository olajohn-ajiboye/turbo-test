import { useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { FiX } from 'react-icons/fi';

interface OptionType {
  value: string;
  label: string;
}

interface CategoryTagsProps {
  mainCategoryOptions: OptionType[];
  subCategoryOptions: Record<string, OptionType[]>;
  initialMainCategory: OptionType | null;
  initialSubCategory: OptionType | null;
  initialTags: string[];
}

const CategoryTags: React.FC<CategoryTagsProps> = ({
  mainCategoryOptions,
  subCategoryOptions,
  initialMainCategory,
  initialSubCategory,
  initialTags,
}) => {
  const [selectedMainCategory, setSelectedMainCategory] =
    useState<OptionType | null>(initialMainCategory);
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<OptionType | null>(initialSubCategory);
  const [tags, setTags] = useState<string[]>(initialTags);
  const [tagInput, setTagInput] = useState<string>('');

  // Handle adding a new tag
  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput(''); // Clear input after adding
    }
  };

  // Handle removing a tag
  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  // Handle main category change
  const handleMainCategoryChange = (option: SingleValue<OptionType>) => {
    setSelectedMainCategory(option);
    setSelectedSubCategory(null); // Reset sub-category when main category changes
  };

  // Handle sub-category change
  const handleSubCategoryChange = (option: SingleValue<OptionType>) => {
    setSelectedSubCategory(option);
  };

  return (
    <div className="category-tags mt-6 rounded-lg bg-white p-6 shadow-md">
      <h3 className="text-xl font-bold">Category and Tags</h3>
      <p className="pb-4 pt-1 text-sm text-[#B6B6B7]">
        Set the category and tags for your product. Makes it easier to find in
        search.
      </p>

      {/* Main Category Dropdown */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700">
          Main category
        </label>
        <Select
          options={mainCategoryOptions}
          value={selectedMainCategory}
          onChange={handleMainCategoryChange}
          placeholder="Select main category..."
          className="mt-1"
        />
      </div>

      {/* Sub-Category Dropdown */}
      {selectedMainCategory && (
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700">
            Sub-category
          </label>
          <Select
            options={subCategoryOptions[selectedMainCategory.value]}
            value={selectedSubCategory}
            onChange={handleSubCategoryChange}
            placeholder="Select sub-category..."
            className="mt-1"
          />
        </div>
      )}

      {/* Tags Input */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700">Tags</label>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center gap-1 rounded-lg bg-[#EDF1FB] px-3 py-2 text-sm text-[#19183A]"
            >
              {tag}
              <button type="button" onClick={() => handleRemoveTag(tag)}>
                <FiX className="ml-1" size={14} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-3 block items-center space-y-4">
          <input
            type="text"
            placeholder="Enter Tags..."
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            className="block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm sm:text-sm"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="rounded bg-[#030a70] px-4 py-2 text-sm text-white"
          >
            Add Tag
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryTags;
