import Select, { SingleValue } from 'react-select';
import { FiX } from 'react-icons/fi';

interface CategoryTagsProps {
  categories: OptionType[];
  selectedMainCategory: OptionType | null;
  setSelectedMainCategory: (option: SingleValue<OptionType>) => void;
  subCategories: OptionType[];
  selectedSubCategory: OptionType | null;
  setSelectedSubCategory: (option: SingleValue<OptionType>) => void;
  tags: string[];
  tagInput: string;
  setTagInput: (input: string) => void;
  handleAddTag: () => void;
  handleRemoveTag: (tag: string) => void;
}

interface OptionType {
  value: string;
  label: string;
}

const CategoryTags: React.FC<CategoryTagsProps> = ({
  categories,
  selectedMainCategory,
  setSelectedMainCategory,
  subCategories,
  selectedSubCategory,
  setSelectedSubCategory,
  tags,
  tagInput,
  setTagInput,
  handleAddTag,
  handleRemoveTag,
}) => (
  <div className="category-tags mt-6 rounded-lg bg-white p-6 shadow-md">
    <h3 className="text-xl font-bold">Category and Tags</h3>
    <p className="pb-4 pt-1 text-sm text-[#B6B6B7]">
      Set the category and tags for your product.
    </p>

    {/* Main Category Dropdown */}
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700">
        Main category
      </label>
      <Select
        options={categories}
        value={selectedMainCategory}
        onChange={option => {
          setSelectedMainCategory(option);
          setSelectedSubCategory(null); // Reset sub-category when main changes
        }}
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
          options={subCategories}
          value={selectedSubCategory}
          onChange={option => setSelectedSubCategory(option)}
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

export default CategoryTags;
