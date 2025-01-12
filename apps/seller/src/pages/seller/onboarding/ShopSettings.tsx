import React, { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import logo from '../../../assets/1_High_Resolution_Image.jpg';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaXTwitter, FaTiktok } from 'react-icons/fa6';
import {
  useAppDispatch,
  useAppSelector,
} from '@/services/hooks/useAppDispatch';
import {
  fetchCategories,
  selectCategories,
} from '@/services/redux/slices/categoriesSlice';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/UI/select';
import { CiImageOn } from 'react-icons/ci';
import {
  fetchShopDetails,
  selectShopDetails,
  updateShopDetails,
} from '@/services/redux/slices/sellers/shopSlice';

type FormData = {
  accountType: string;
  shopName: string;
  shopTagline: string;
  shopDescription: string;
  mainCategory: string;
  subCategory: string;
  shopLogo: FileList;
  coverPhoto: FileList;
  phoneNumber: string;
  officialMail: string;
  facebook: string;
  instagram: string;
  twitter: string;
  tiktok: string;
};

const ShopSettings: React.FC = () => {
  const { register, handleSubmit, control, setValue, watch } =
    useForm<FormData>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const categories = useAppSelector(selectCategories);
  const shopDetails = useAppSelector(selectShopDetails);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    logo: null as File | null,
    cover_photo: null as File | null,
  });

   // Handle form submission
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const formDataToSend = new FormData();
    formDataToSend.append('shop_name', data.shopName);
    formDataToSend.append('shop_type', data.accountType);
    formDataToSend.append('tagline', data.shopTagline);
    formDataToSend.append('description', data.shopDescription);
    formDataToSend.append('main_category_id', data.mainCategory || '');
    formDataToSend.append('sub_category_id', data.subCategory || '');
    formDataToSend.append('shop_email', data.officialMail);
    formDataToSend.append('shop_phone_number', data.phoneNumber);
    formDataToSend.append('facebook', data.facebook);
    formDataToSend.append('instagram', data.instagram);
    formDataToSend.append('twitter', data.twitter);
    formDataToSend.append('tiktok', data.tiktok);

    if (formData.logo) {
      formDataToSend.append('logo', formData.logo);
    }
    if (formData.cover_photo) {
      formDataToSend.append('cover_photo', formData.cover_photo);
    }

    const resultAction = await dispatch(updateShopDetails(formDataToSend));
    if (updateShopDetails.fulfilled.match(resultAction)) {
      navigate('/seller/product-listing');
    }
  };

  // Handle file uploads and previews
  const handleFileUpload = (type: 'logo' | 'cover_photo', file: File | null) => {
    if (file) {
      const preview = URL.createObjectURL(file);
      if (type === 'logo') setLogoPreview(preview);
      if (type === 'cover_photo') setBannerPreview(preview);
      setFormData((prev) => ({ ...prev, [type]: file }));
    }
  };


  // Fetch categories on component mount
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchShopDetails());
  }, [dispatch]);

  // Populate form with existing shop details when they are available

  useEffect(() => {
    if (shopDetails) {
      setValue('shopName', shopDetails.shop_name || '');
      setValue('accountType', shopDetails.shop_type || '');
      setValue('shopTagline', shopDetails.tagline || '');
      setValue('shopDescription', shopDetails.description || '');
      setValue('mainCategory', shopDetails.main_category_id || '');
      setValue('subCategory', shopDetails.sub_category_id || '');
      setValue('phoneNumber', shopDetails.shop_phone_number || '');
      setValue('officialMail', shopDetails.shop_email || '');
      setValue('facebook', shopDetails.facebook || '');
      setValue('instagram', shopDetails.instagram || '');
      setValue('twitter', shopDetails.twitter || '');
      setValue('tiktok', shopDetails.tiktok || '');

      setLogoPreview(shopDetails.logo || null);
      setBannerPreview(shopDetails.cover_photo || null);
    }
  }, [shopDetails, setValue]);

  const mainCategory = watch('mainCategory');

  const handleMainCategoryChange = (value: string) => {
    setValue('mainCategory', value);
    setValue('subCategory', ''); // Clear subcategory when main category changes
  };

  const handleSubCategoryChange = (value: string) => {
    setValue('subCategory', value);
  };


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex min-h-screen flex-col items-center px-4 py-12"
    >
      <div className="mb-8">
        <div className="flex justify-center">
          <img src={logo} alt="logo" className="w-20 rounded-lg" />
        </div>
        <h2 className="pt-5 text-center text-2xl font-bold">Shop Settings</h2>
        <div className="mt-5 flex items-center justify-center">
          <span className="rounded-full bg-[#FCC238] px-3 py-1 text-lg font-bold text-[#030A70]">
            1
          </span>
          <div className="h-1 w-20 bg-[#FCC230] md:w-60"></div>
          <span className="rounded-full bg-[#FCC230] px-3 py-1 text-lg font-bold text-[#030A70]">
            2
          </span>
          <div className="h-1 w-20 bg-gray-300 md:w-60"></div>
          <span className="rounded-full bg-[#F6F6F6] px-3 py-1 text-lg font-bold text-gray-400">
            3
          </span>
        </div>
        <div className="flex hidden justify-between">
          <div className="relative right-10">profile completion</div>
          <div className="relative right-2">Shop settings</div>
          <div className="relative left-10">Product listing</div>
        </div>
      </div>
      <div className="w-full max-w-6xl rounded-lg bg-[#FAFAFA] p-5 shadow-md md:p-8">
        <div>
          <h3 className="mb-6 text-xl font-semibold text-gray-900">
            Shop basic details
          </h3>

          {/* Account Type */}
          <div className="mb-6 flex space-x-4">
            <label className="flex items-center rounded-lg bg-white px-3 py-2">
              <input
                type="radio"
                value="Individual"
                {...register('accountType')}
                className="mr-2"
              />
              Individual
            </label>
            <label className="flex items-center rounded-lg bg-white px-3 py-2">
              <input
                type="radio"
                value="Business"
                {...register('accountType')}
                className="mr-2"
              />
              Business
            </label>
          </div>

          {/* Shop Name */}
          <label
            className="mb-2 block font-medium text-gray-700"
            htmlFor="shopName"
          >
            Shop Name
          </label>
          <input
            {...register('shopName')}
            id="shopName"
            placeholder="Shop name"
            className="input-field mb-6 w-full px-3 py-3"
          />

          {/* Shop Tagline */}
          <label
            className="mb-2 block font-medium text-gray-700"
            htmlFor="shopTagline"
          >
            Shop Tagline / Motto
          </label>
          <input
            {...register('shopTagline')}
            id="shopTagline"
            placeholder="Shop Tagline / motto"
            className="input-field mb-6 w-full px-3 py-3"
          />

          {/* Shop Description */}
          <label
            className="mb-2 block font-medium text-gray-700"
            htmlFor="shopDescription"
          >
            Shop Description
          </label>
          <textarea
            {...register('shopDescription')}
            id="shopDescription"
            placeholder="Shop description"
            className="input-field mb-6 w-full px-3 py-3"
            rows={4}
          ></textarea>

          {/* Categories */}
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Main Category Dropdown */}
            <div className="mb-4">
              <label className="mb-2 block font-medium">Main Category</label>
              <Controller
                name="mainCategory"
                control={control}
                render={() => (
                  <Select
                    onValueChange={value => handleMainCategoryChange(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Main Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {mainCategory && (
              <div className="mb-4">
                <label className="mb-2 block font-medium">Subcategory</label>
                <Controller
                  name="subCategory"
                  control={control}
                  render={() => {
                    const subcategories =
                      categories.find(category => category.id === mainCategory)
                        ?.subcategories || [];
                    return (
                      <Select
                        onValueChange={value => handleSubCategoryChange(value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Subcategory" />
                        </SelectTrigger>
                        <SelectContent>
                          {subcategories.map(subcategory => (
                            <SelectItem
                              key={subcategory.id}
                              value={subcategory.id}
                            >
                              {subcategory.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    );
                  }}
                />
              </div>
            )}
          </div>

 {/* Profile Picture Upload Section */}
<div className="mb-8">
  <h4 className="mb-4 text-lg font-semibold text-[#19183A]">
    Upload shop profile picture
  </h4>
  <div className="flex items-center">
    <div className="mb-8">
      <label htmlFor="profile-picture-upload" className="cursor-pointer">
        {logoPreview ? (
          <img
            src={logoPreview}
            alt="Logo Preview"
            className="h-32 w-32 rounded-full border object-cover"
          />
        ) : (
          <div className="flex h-32 w-32 items-center justify-center border-2 border-dashed">
            <CiImageOn size={24} />
          </div>
        )}
      </label>
      <input
        type="file"
        id="profile-picture-upload"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileUpload('logo', e.target.files ? e.target.files[0] : null)}
      />
    </div>
    <div className="ml-4 text-sm text-[#B6B6B7]">
      <p>Recommended dimension: 500x500</p>
      <p>Max file size: 500kb</p>
    </div>
  </div>
</div>

{/* Banner Upload Section */}
<div className="mb-8">
  <h4 className="mb-4 text-lg font-semibold text-[#19183A]">
    Upload shop Banner
  </h4>
  <div className="mb-8">
    <label htmlFor="banner-upload" className="cursor-pointer">
      {bannerPreview ? (
        <img
          src={bannerPreview}
          alt="Banner Preview"
          className="h-56 w-full rounded-lg border object-cover"
        />
      ) : (
        <div className="flex h-56 w-full items-center justify-center border-2 border-dashed">
          <CiImageOn size={32} />
        </div>
      )}
    </label>
    <input
      type="file"
      id="banner-upload"
      accept="image/*"
      className="hidden"
      onChange={(e) => handleFileUpload('cover_photo', e.target.files ? e.target.files[0] : null)}
    />
  </div>
</div>


          {/* Shop Contact / Socials */}
          <h3 className="mb-6 text-xl font-semibold text-gray-900">
            Shop contact / socials
          </h3>
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label
                className="mb-2 block text-sm font-medium text-gray-700"
                htmlFor="phoneNumber"
              >
                Phone Number
              </label>
              <input
                {...register('phoneNumber')}
                id="phoneNumber"
                placeholder="Phone number"
                type="number"
                className="input-field w-full px-3 py-3"
              />
            </div>
            <div>
              <label
                className="mb-2 block text-sm font-medium text-gray-700"
                htmlFor="officialMail"
              >
                Shop’s Official Mail
              </label>
              <input
                {...register('officialMail')}
                id="officialMail"
                placeholder="Shop’s official mail"
                type="email"
                className="input-field w-full px-3 py-3"
              />
            </div>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label
                className="mb-2 block font-medium text-gray-700"
                htmlFor="facebook"
              >
                <span className="flex items-center gap-1 text-sm">
                  <FaFacebook color="#5893F9" size={20} />
                  Facebook
                </span>
              </label>
              <input
                {...register('facebook')}
                id="facebook"
                placeholder="Facebook"
                className="input-field w-full px-3 py-3"
              />
            </div>
            <div>
              <label
                className="mb-2 block font-medium text-gray-700"
                htmlFor="instagram"
              >
                <span className="instagram flex items-center gap-1 text-sm">
                  <FaInstagram size={20} color="pink" />
                  Instagram
                </span>
              </label>
              <input
                {...register('instagram')}
                id="instagram"
                placeholder="Instagram"
                className="input-field w-full px-3 py-3"
              />
            </div>
            <div>
              <label
                className="mb-2 block font-medium text-gray-700"
                htmlFor="twitter"
              >
                <span className="flex items-center gap-1 text-sm">
                  <FaXTwitter color="black" size={20} />X (Twitter)
                </span>
              </label>
              <input
                {...register('twitter')}
                id="twitter"
                placeholder="Twitter (X)"
                className="input-field w-full px-3 py-3"
              />
            </div>
            <div>
              <label
                className="mb-2 block font-medium text-gray-700"
                htmlFor="tiktok"
              >
                <span className="flex items-center gap-1 text-sm">
                  <FaTiktok color="black" size={20} />
                  TikTok
                </span>
              </label>
              <input
                {...register('tiktok')}
                id="tiktok"
                placeholder="TikTok"
                className="input-field w-full px-3 py-3"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-10 justify-center gap-5 md:flex">
        <button
          type="button"
          className="w-full rounded-md border border-gray-300 bg-white px-6 py-3 text-gray-700 transition hover:bg-gray-50 hover:shadow-md md:w-56"
          onClick={() => navigate(-1)}
        >
          Previous
        </button>

        <button
          type="submit"
          className="mt-4 w-full rounded-md bg-[#030A70] px-6 py-3 text-white transition hover:bg-blue-800 hover:shadow-md md:mt-0 md:w-56"
        >
          Save and continue
        </button>
      </div>
    </form>
  );
};

export default ShopSettings;
