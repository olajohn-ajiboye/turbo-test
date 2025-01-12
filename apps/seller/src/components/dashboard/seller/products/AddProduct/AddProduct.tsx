import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import GeneralInformation from './GeneralInformation';
import CategoryTags from './CategoryTags';
import ProductMedia from './ProductMedia';
import PriceQuantity from './PriceQuantity';
import Variations from './Variations';
import { SingleValue } from 'react-select';
import { MdArrowBackIos } from 'react-icons/md';
import {
  useAppDispatch,
  useAppSelector,
} from '@/services/hooks/useAppDispatch';
import {
  fetchCategories,
  selectCategories,
} from '@/services/redux/slices/categoriesSlice';
import { addSellerProduct } from '@/services/redux/slices/sellers/productSlice';

interface AddProductFormValues {
  name: string;
  description: string;
  mainCategory: string;
  subCategory: string;
  tag: string[];
  price: number;
  discount: number;
  unit: string;
  quantity: number;
}

interface UploadedImage {
  id: string;
  file: File;
  url: string;
  progress: number;
}

interface OptionType {
  value: string;
  label: string;
}

interface Specifications {
  id: string;
  type: string;
  value: string;
}

interface Variation {
  id: string;
  name: OptionType | null;
  options: string[];
}

const unitOptions: OptionType[] = [
  { value: 'piece', label: 'Piece' },
  { value: 'kg', label: 'Kilogram' },
  { value: 'liter', label: 'Liter' },
];

const variationOptions: OptionType[] = [
  { value: 'size', label: 'Size' },
  { value: 'color', label: 'Color' },
];

const AddProduct = () => {
  const { register, handleSubmit, watch } = useForm<AddProductFormValues>();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  // Local states for category and subcategory
  const [selectedMainCategory, setSelectedMainCategory] =
    useState<OptionType | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<OptionType | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [uploadProgress] = useState<Record<string, number>>({});
  const [video, setVideo] = useState<UploadedImage | null>(null);
  const [quantity, setQuantity] = useState<number>(30);
  const [selectedUnit, setSelectedUnit] = useState<OptionType | null>(null);
  const [specifications, setSpecifications] = useState<Specifications[]>([]);
  const [variations, setVariations] = useState<Variation[]>([]);
  const [currentColor, setCurrentColor] = useState<string>('#ffffff');
  const [isColorPickerVisible, setIsColorPickerVisible] =
    useState<boolean>(false);

  const navigate = useNavigate();
  const [isPublishing, setIsPublishing] = useState(false);

  // Fetch categories when the component mounts
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Map categories to react-select option format
  const categoryOptions: OptionType[] = categories.map(cat => ({
    value: cat.id,
    label: cat.name,
  }));

  // Map subcategories based on the selected main category
  const subCategoryOptions: OptionType[] =
    (selectedMainCategory &&
      categories
        .find(cat => cat.id === selectedMainCategory.value)
        ?.subcategories.map(sub => ({
          value: sub.id,
          label: sub.name,
        }))) ||
    [];

  // Handle form submission
  const onSubmit: SubmitHandler<AddProductFormValues> = async data => {
    const formData = new FormData();

    // Append required fields
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('category', selectedMainCategory?.value || '');
    formData.append('sub_category', selectedSubCategory?.value || '');
    formData.append('unit', selectedUnit?.value || '');
    formData.append('quantity', String(quantity));
    formData.append('price', String(data.price));
    formData.append('discount', String(data.discount || 0));
    // Filter out variations with no options or duplicate names
    const validVariations = variations.filter(
      (variation, index, self) =>
        variation.options.length > 0 &&
        self.findIndex(v => v.name?.value === variation.name?.value) === index
    );

    formData.append('variations', JSON.stringify(validVariations));

    // Append tags as an array
    tags.forEach(tag => formData.append('tag_input', tag));

    // Append specifications
    const formattedSpecifications = specifications.map(spec => ({
      option_type: spec.type,
      option_value: spec.value,
    }));

    formData.append('specifications', JSON.stringify(formattedSpecifications));

    // Append media files
    images.forEach(image => formData.append('media', image.file));
    if (video) formData.append('media', video.file);

    // Optional fields
    formData.append('is_featured', String(false));
    formData.append('is_published', String(isPublishing));

    // Log FormData for debugging
    console.log('FormData Entries:');
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const response = await dispatch(addSellerProduct(formData)).unwrap();
      console.log('Product added successfully:', response);
      navigate('/seller-dashboard/products');
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  // Tag handlers
  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };
  const handleRemoveTag = (tag: string) => setTags(tags.filter(t => t !== tag));

  // Handle image upload with progress tracking
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const id = `${Date.now()}-${file.name}`;
        const url = URL.createObjectURL(file);
        const newImage: UploadedImage = { id, file, url, progress: 0 };

        setImages(prev => [...prev, newImage]);

        // Simulate upload progress
        const interval = setInterval(() => {
          setImages(prev =>
            prev.map(img =>
              img.id === id
                ? { ...img, progress: Math.min(img.progress + 10, 100) }
                : img
            )
          );
        }, 300);

        setTimeout(() => {
          clearInterval(interval); // Stop progress simulation
        }, 3000); // Simulate a 3-second upload
      });
    }
  };

  // Handle video upload with progress tracking
  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const id = `${Date.now()}-${file.name}`;
      const url = URL.createObjectURL(file);
      const newVideo: UploadedImage = { id, file, url, progress: 0 };

      setVideo(newVideo);

      // Simulate upload progress
      const interval = setInterval(() => {
        setVideo(prev =>
          prev ? { ...prev, progress: Math.min(prev.progress + 10, 100) } : prev
        );
      }, 300);

      setTimeout(() => {
        clearInterval(interval); // Stop progress simulation
      }, 3000); // Simulate a 3-second upload
    }
  };

  const removeImage = (imageId: string) =>
    setImages(images.filter(img => img.id !== imageId));
  const removeVideo = () => setVideo(null);

  // Quantity and price handlers
  const incrementQuantity = () => setQuantity(prevQuantity => prevQuantity + 1);
  const decrementQuantity = () =>
    setQuantity(prevQuantity =>
      prevQuantity > 1 ? prevQuantity - 1 : prevQuantity
    );

  function generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // Variation handlers
  const addVariation = () =>
    setVariations([
      ...variations,
      { id: generateUniqueId(), name: null, options: [''] },
    ]);
  const removeVariation = (id: string) =>
    setVariations(variations.filter(variation => variation.id !== id));
  const handleVariationNameChange = (
    id: string,
    option: SingleValue<OptionType>
  ) => {
    setVariations(
      variations.map(variation =>
        variation.id === id ? { ...variation, name: option } : variation
      )
    );
  };
  const handleOptionChange = (id: string, index: number, value: string) => {
    setVariations(
      variations.map(variation =>
        variation.id === id
          ? {
              ...variation,
              options: variation.options.map((opt, i) =>
                i === index ? value : opt
              ),
            }
          : variation
      )
    );
  };
  const addOption = (id: string) =>
    setVariations(
      variations.map(variation =>
        variation.id === id
          ? { ...variation, options: [...variation.options, ''] }
          : variation
      )
    );
  const removeOption = (id: string, index: number) =>
    setVariations(
      variations.map(variation =>
        variation.id === id
          ? {
              ...variation,
              options: variation.options.filter((_, i) => i !== index),
            }
          : variation
      )
    );
  const addColorOption = (id: string) =>
    setVariations(
      variations.map(variation =>
        variation.id === id
          ? { ...variation, options: [...variation.options, currentColor] }
          : variation
      )
    );

  return (
    <div className="">
      <div className="flex items-center gap-3 pb-5">
        <button
          className="mb-4 rounded-lg bg-white px-3 py-2 text-sm text-gray-600 shadow-sm hover:shadow-md"
          onClick={() => navigate(-1)}
        >
          <MdArrowBackIos size={22} />
        </button>
        <h2 className="mb-4 text-2xl font-semibold text-[#19183A]">
          Add New Product
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <GeneralInformation
          register={register}
          specifications={specifications}
          setSpecifications={setSpecifications}
        />
        <CategoryTags
          categories={categoryOptions}
          selectedMainCategory={selectedMainCategory}
          setSelectedMainCategory={setSelectedMainCategory}
          subCategories={subCategoryOptions}
          selectedSubCategory={selectedSubCategory}
          setSelectedSubCategory={setSelectedSubCategory}
          tags={tags}
          tagInput={tagInput}
          setTagInput={setTagInput}
          handleAddTag={handleAddTag}
          handleRemoveTag={handleRemoveTag}
        />

        <ProductMedia
          images={images}
          video={video}
          uploadProgress={uploadProgress}
          handleImageUpload={handleImageUpload}
          handleVideoUpload={handleVideoUpload}
          removeImage={removeImage}
          removeVideo={removeVideo}
        />
        <PriceQuantity
          quantity={quantity}
          selectedUnit={selectedUnit}
          unitOptions={unitOptions}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
          setSelectedUnit={setSelectedUnit}
          register={register}
          watch={watch}
        />
        <Variations
          variations={variations}
          currentColor={currentColor}
          isColorPickerVisible={isColorPickerVisible}
          addVariation={addVariation}
          removeVariation={removeVariation}
          handleVariationNameChange={handleVariationNameChange}
          handleOptionChange={handleOptionChange}
          addOption={addOption}
          removeOption={removeOption}
          setCurrentColor={setCurrentColor}
          setIsColorPickerVisible={setIsColorPickerVisible}
          addColorOption={addColorOption}
          variationOptions={variationOptions}
        />

        <div className="grid gap-4 py-7 md:flex md:justify-between">
          <div className="flex gap-3">
            <button
              className="w-full rounded-md border border-[#030A70] px-10 py-3 text-[#030A70]"
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full rounded-md border border-[#030A70] px-10 py-3 text-[#030A70]"
            >
              Save
            </button>
          </div>
          <div className="">
            <button
              type="submit"
              className="w-full rounded-md bg-[#030A70] px-10 py-3 text-white"
              onClick={() => setIsPublishing(true)}
            >
              Publish
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
