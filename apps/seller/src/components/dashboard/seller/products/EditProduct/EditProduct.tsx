import { useState } from 'react';
import { useForm } from 'react-hook-form';
import GeneralInformation from './GeneralInformation';
import CategoryTags from './CategoryTags';
import ProductMedia from './ProductMedia';
import { SingleValue } from 'react-select';
import Variations from './Variations';
import Status from './Status';
import PriceQuantity from './PriceQuantity';
import { MdArrowBackIos } from 'react-icons/md';
import { useNavigate } from 'react-router';

interface Specification {
  id: string;
  type: string;
  value: string;
}

interface UploadedImage {
  id: string;
  file: File;
  url: string;
}

interface OptionType {
  value: string;
  label: string;
}

interface Variation {
  id: string;
  name: OptionType | null;
  options: string[];
}

const variationOptions: OptionType[] = [
  { value: 'size', label: 'Size' },
  { value: 'color', label: 'Color' },
];

const mainCategoryOptions = [
  { value: 'artworks', label: 'Artworks' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'furniture', label: 'Furniture' },
];

const subCategoryOptions = {
  artworks: [
    { value: 'paintings', label: 'Paintings' },
    { value: 'sculptures', label: 'Sculptures' },
  ],
  electronics: [
    { value: 'phones', label: 'Phones' },
    { value: 'computers', label: 'Computers' },
  ],
  furniture: [
    { value: 'tables', label: 'Tables' },
    { value: 'chairs', label: 'Chairs' },
  ],
};

const EditProduct: React.FC = () => {
  const { register, handleSubmit, setValue } = useForm();

  const initialVariations: Variation[] = [
    {
      id: '1',
      name: { value: 'size', label: 'Size' },
      options: ['Small', 'Medium', 'Large'],
    },
    {
      id: '2',
      name: { value: 'color', label: 'Color' },
      options: ['#FF0000', '#00FF00'],
    },
  ];

  const [variations, setVariations] = useState<Variation[]>(initialVariations);
  const [currentColor, setCurrentColor] = useState('#FFFFFF');
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);
  const initialStatus: OptionType = { value: 'published', label: 'Published' };
  const initialIsFeatured: boolean = true;

  const initialTags = ['oil paint', 'frame', 'red paint'];
  const navigate = useNavigate();

  const initialImages: UploadedImage[] = [
    {
      id: 'img1',
      file: new File([''], 'image1.jpg', { type: 'image/jpeg' }),
      url: '/path/to/image1.jpg',
    },
    {
      id: 'img2',
      file: new File([''], 'image2.jpg', { type: 'image/jpeg' }),
      url: '/path/to/image2.jpg',
    },
  ];

  const initialVideo: File | null = null; // Set to null if no initial video

  const initialQuantity = 30;
  const initialPrice = 230;
  const initialDiscount = 5;
  const initialUnit: OptionType | null = { value: 'kg', label: 'kg' };

  const unitOptions: OptionType[] = [
    { value: 'piece', label: 'Piece' },
    { value: 'kg', label: 'Kilogram' },
    { value: 'liter', label: 'Liter' },
  ];

  const [specifications, setSpecifications] = useState<Specification[]>([
    { id: '1', type: 'Color', value: 'Multicolor' },
    { id: '2', type: 'Medium', value: 'Acrylic' },
    { id: '3', type: 'Style', value: 'Abstract' },
    { id: '4', type: 'Framing', value: 'Black wooden frame' },
  ]);

  const addVariation = () => {
    setVariations([
      ...variations,
      { id: Math.random().toString(), name: null, options: [] },
    ]);
  };

  const removeVariation = (id: string) => {
    setVariations(variations.filter(v => v.id !== id));
  };

  const handleVariationNameChange = (
    id: string,
    option: SingleValue<OptionType>
  ) => {
    setVariations(
      variations.map(v => (v.id === id ? { ...v, name: option } : v))
    );
  };

  const handleOptionChange = (id: string, index: number, value: string) => {
    setVariations(
      variations.map(v =>
        v.id === id
          ? {
              ...v,
              options: v.options.map((opt, i) => (i === index ? value : opt)),
            }
          : v
      )
    );
  };

  const addOption = (id: string) => {
    setVariations(
      variations.map(v =>
        v.id === id ? { ...v, options: [...v.options, ''] } : v
      )
    );
  };

  const removeOption = (id: string, index: number) => {
    setVariations(
      variations.map(v =>
        v.id === id
          ? {
              ...v,
              options: v.options.filter((_, i) => i !== index),
            }
          : v
      )
    );
  };

  const addColorOption = (id: string) => {
    setVariations(
      variations.map(v =>
        v.id === id ? { ...v, options: [...v.options, currentColor] } : v
      )
    );
  };

  const onSubmit = (data: any) => {
    console.log('Form Submitted:', data);
    console.log('Specifications:', specifications);
  };

  return (
    <div className="edit-product-page">
      <div className="flex items-center gap-3 pb-5">
        <button
          className="mb-4 rounded-lg bg-white px-3 py-2 text-sm text-gray-600"
          onClick={() => navigate(-1)}
        >
          <MdArrowBackIos size={22} />
        </button>
        <h2 className="mb-4 text-2xl font-semibold text-[#19183A]">
          Edit Product
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <GeneralInformation
          register={register}
          specifications={specifications}
          setSpecifications={setSpecifications}
          setValue={setValue}
          initialTitle="Pattern African Exquisite Collage Art on Stretched Canvas"
          initialDescription="Elevate your space with a vibrant celebration of African culture..."
        />
        <CategoryTags
          mainCategoryOptions={mainCategoryOptions}
          subCategoryOptions={subCategoryOptions}
          initialMainCategory={mainCategoryOptions[0]}
          initialSubCategory={subCategoryOptions['artworks'][0]}
          initialTags={initialTags}
        />
        <ProductMedia
          initialImages={initialImages}
          initialVideo={initialVideo}
        />
        <PriceQuantity
          initialQuantity={initialQuantity}
          initialPrice={initialPrice}
          initialDiscount={initialDiscount}
          initialUnit={initialUnit}
          unitOptions={unitOptions}
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
        <Status
          initialStatus={initialStatus}
          initialIsFeatured={initialIsFeatured}
        />

        <button
          type="submit"
          className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-white"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
