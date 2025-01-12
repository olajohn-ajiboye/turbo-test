import React, { useState, useEffect } from 'react';
import { CiImageOn } from 'react-icons/ci';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import './CustomizeShop.css';
import VacationModePopup from './VacationModePopup';
import {
  useAppDispatch,
  useAppSelector,
} from '@/services/hooks/useAppDispatch';
import {
  fetchShopDetails,
  selectShopDetails,
  updateShopDetails,
} from '@/services/redux/slices/sellers/shopSlice';
import 'react-toggle/style.css';

const CustomizeShop = () => {
  // State for image previews (currently, no need to store actual File objects unless necessary, comeback at integration phase)
  const [profilePicturePreview, setProfilePicturePreview] = useState<
    string | null
  >(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [aboutUsImagePreview, setAboutUsImagePreview] = useState<string | null>(
    null
  );

  // State for toggles
  const [featurePost, setFeaturePost] = useState(true);
  const [vacationMode, setVacationMode] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [vacationDates, setVacationDates] = useState<{
    startDate: string;
    endDate: string;
  } | null>(null);
  const [shopPolicy, setShopPolicy] = useState(false);

  // // State for social links
  // const [socialLinks, setSocialLinks] = useState({
  //   facebook: '',
  //   instagram: '',
  //   twitter: '',
  //   tiktok: '',
  // });

  const dispatch = useAppDispatch();
  const shopDetails = useAppSelector(selectShopDetails);

  // Local state for form data
  const [formData, setFormData] = useState<{
    logo: File | string | null;
    cover_photo: File | string | null;
    facebook: string;
    instagram: string;
    twitter: string;
    tiktok: string;
    shop_about: string;
  }>({
    logo: null,
    cover_photo: null,
    facebook: '',
    instagram: '',
    twitter: '',
    tiktok: '',
    shop_about: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  // Load shop details from Redux store
  useEffect(() => {
    dispatch(fetchShopDetails());
  }, [dispatch]);

  // Sync Redux data to local state
  useEffect(() => {
    if (shopDetails) {
      setFormData({
        ...formData,
        logo: shopDetails.logo || null,
        cover_photo: shopDetails.cover_photo || null,
        facebook: shopDetails.facebook || '',
        instagram: shopDetails.instagram || '',
        twitter: shopDetails.twitter || '',
        tiktok: shopDetails.tiktok || '',
        shop_about: shopDetails.shop_about || '',
      });

      setProfilePicturePreview(shopDetails.logo || null);
      setBannerPreview(shopDetails.cover_photo || null);
    }
  }, [shopDetails]);

  useEffect(() => {
    return () => {
      if (profilePicturePreview) URL.revokeObjectURL(profilePicturePreview);
      if (bannerPreview) URL.revokeObjectURL(bannerPreview);
    };
  }, [profilePicturePreview, bannerPreview]);

  // Handle image uploads and create preview
  const handleFileUpload = (
    type: 'logo' | 'cover_photo' | 'about_us_image',
    file: File | null
  ) => {
    if (file) {
      const preview = URL.createObjectURL(file);

      // Set preview and update form data
      if (type === 'logo') {
        setProfilePicturePreview(preview);
      } else if (type === 'cover_photo') {
        setBannerPreview(preview);
      } else if (type === 'about_us_image') {
        setAboutUsImagePreview(preview);
      }

      setFormData(prev => ({ ...prev, [type]: file }));
    }
  };

  // Handle social link changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const submissionData = new FormData();

    if (formData.logo instanceof File) {
      submissionData.append('logo', formData.logo);
    }

    if (formData.cover_photo instanceof File) {
      submissionData.append('cover_photo', formData.cover_photo);
    }

    submissionData.append('facebook', formData.facebook);
    submissionData.append('instagram', formData.instagram);
    submissionData.append('twitter', formData.twitter);
    submissionData.append('tiktok', formData.tiktok);
    submissionData.append('shop_about', formData.shop_about);

    const resultAction = await dispatch(updateShopDetails(submissionData));
    if (updateShopDetails.fulfilled.match(resultAction)) {
      setIsEditing(false);
    }
  };

  // Handle the vacation mode toggle
  const handleVacationToggle = () => {
    if (!vacationMode) {
      setIsPopupOpen(true);
    } else {
      setVacationMode(false); // Directly turn off vacation mode if toggling off
    }
  };

  // Handle saving vacation mode dates
  const handleSaveVacationMode = (startDate: string, endDate: string) => {
    setVacationMode(true);
    setVacationDates({ startDate, endDate });
    setIsPopupOpen(false); // Close the popup
  };
  // Handle canceling vacation mode without saving
  const handleCancelVacationMode = () => {
    setIsPopupOpen(false); // Close the popup
  };

  // Handle changes in the social media links
  // const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setSocialLinks(prevLinks => ({
  //     ...prevLinks,
  //     [name]: value,
  //   }));
  // };

  // Handle file uploads and create preview
  // const handleProfilePictureUpload = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   if (e.target.files && e.target.files[0]) {
  //     const file = e.target.files[0];
  //     setProfilePicturePreview(URL.createObjectURL(file));
  //   }
  // };

  // const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     const file = e.target.files[0];
  //     setBannerPreview(URL.createObjectURL(file));
  //   }
  // };

  const handleAboutUsImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAboutUsImagePreview(URL.createObjectURL(file));
    }
  };

  // // Toggle editing mode
  // const toggleEditMode = () => {
  //   setIsEditing(!isEditing);

  //   // If saving, ensure preview URLs are removed to prevent memory leaks
  //   if (isEditing) {
  //     if (profilePicturePreview) URL.revokeObjectURL(profilePicturePreview);
  //     if (bannerPreview) URL.revokeObjectURL(bannerPreview);
  //     if (aboutUsImagePreview) URL.revokeObjectURL(aboutUsImagePreview);
  //   }
  // };

  return (
    <section className="rounded-lg bg-white p-6 shadow-sm">
      {/* Vacation Mode Banner */}
      {vacationMode && (
        <div className="mb-4 rounded-lg bg-yellow-100 p-4 text-center">
          <p className="font-semibold text-yellow-800">
            You are currently on vacation! Your products won't be listed, and
            you won't receive new orders. Enjoy your break and have a happy
            vacation!
          </p>
        </div>
      )}
      {/* Header with Edit Button */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#19183A]">Customize shop</h2>
        {isEditing ? (
          <div className="space-x-4">
            <button
              className="rounded-md border border-[#030A70] px-4 py-2 text-[#030A70]"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
            <button
              className="rounded-md bg-[#030A70] px-4 py-2 text-white"
              onClick={handleSubmit}
            >
              Save changes
            </button>
          </div>
        ) : (
          <button
            className="rounded-md bg-[#030A70] px-4 py-2 text-white"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
      </div>

      {/* Profile Picture */}
      <div className="mb-8">
        <h4 className="mb-4 text-lg font-semibold text-[#19183A]">
          Shop Profile Picture
        </h4>
        <label htmlFor="profile-picture-upload" className="cursor-pointer">
          {profilePicturePreview ? (
            <img
              src={profilePicturePreview}
              alt="Profile Preview"
              className="h-32 w-32 rounded-full border-2 border-[#D3D7E5] object-cover"
            />
          ) : (
            <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-dashed">
              <CiImageOn size={24} />
            </div>
          )}
        </label>
        <input
          type="file"
          id="profile-picture-upload"
          accept="image/*"
          className="hidden"
          disabled={!isEditing}
          onChange={e =>
            handleFileUpload('logo', e.target.files ? e.target.files[0] : null)
          }
        />
      </div>

      {/* Banner Upload */}
      <div className="mb-8">
        <h4 className="mb-4 text-lg font-semibold text-[#19183A]">
          Shop Banner
        </h4>
        <label htmlFor="banner-upload" className="cursor-pointer">
          {bannerPreview ? (
            <img
              src={bannerPreview}
              alt="Banner Preview"
              className="h-56 w-full rounded-lg border-2 border-[#D3D7E5] object-cover"
            />
          ) : (
            <div className="flex h-56 w-full items-center justify-center rounded-lg border-2 border-dashed">
              <CiImageOn size={32} />
            </div>
          )}
        </label>
        <input
          type="file"
          id="banner-upload"
          accept="image/*"
          className="hidden"
          disabled={!isEditing}
          onChange={e =>
            handleFileUpload(
              'cover_photo',
              e.target.files ? e.target.files[0] : null
            )
          }
        />
      </div>

      {/* About Us Section */}
      {/* About Us Section */}
      <div className="mb-8">
        <h4 className="mb-4 text-lg font-semibold text-[#19183A]">
          About us section
        </h4>
        {isEditing ? (
          <textarea
            className="w-full rounded-md border p-3 text-sm"
            placeholder="Enter details about your shop..."
            name="shop_about"
            value={formData.shop_about}
            onChange={handleInputChange}
          ></textarea>
        ) : (
          <p className="w-full rounded-md border p-3 text-sm text-gray-700">
            {formData.shop_about || 'No details provided about your shop.'}
          </p>
        )}
      </div>

      {/* About Us Feature Image */}
      <div className="mb-8">
        <h4 className="mb-4 text-lg font-semibold text-[#19183A]">
          About us feature image
        </h4>
        <label htmlFor="about-us-upload" className="cursor-pointer">
          {aboutUsImagePreview ? (
            <img
              src={aboutUsImagePreview}
              alt="About Us Preview"
              className="h-56 w-full rounded-lg border-2 border-[#D3D7E5] object-cover"
            />
          ) : (
            <div className="flex h-56 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#D3D7E5] bg-[#EDF1FB]">
              <CiImageOn size={32} className="text-[#030A70]" />
              <p className="text-sm text-[#B6B6B7]">Click to upload image</p>
              <p className="text-sm text-[#B6B6B7]">
                Recommended dimension: 600x450 (4:3)
              </p>
              <p className="text-sm text-[#B6B6B7]">Max file size: 5mb</p>
            </div>
          )}
        </label>
        <input
          type="file"
          id="about-us-upload"
          accept="image/*"
          className="hidden"
          disabled={!isEditing}
          onChange={handleAboutUsImageUpload}
        />
      </div>

      {/* Social Media Links */}
      <div className="mt-8">
        <h4 className="mb-4 text-lg font-semibold">Social media links</h4>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 pb-2">
              <FaFacebook size={22} /> Facebook
            </label>
            <input
              type="text"
              name="facebook"
              value={formData.facebook}
              disabled={!isEditing}
              onChange={handleInputChange}
              className="w-full rounded border px-4 py-2"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 pb-2">
              <FaInstagram size={22} /> Instagram
            </label>
            <input
              type="text"
              name="instagram"
              value={formData.instagram}
              disabled={!isEditing}
              onChange={handleInputChange}
              className="w-full rounded border px-4 py-2"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 pb-2">
              <FaXTwitter size={22} /> Twitter
            </label>
            <input
              type="text"
              name="twitter"
              value={formData.twitter}
              disabled={!isEditing}
              onChange={handleInputChange}
              className="w-full rounded border px-4 py-2"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 pb-2">
              <FaTiktok size={22} /> TikTok
            </label>
            <input
              type="text"
              name="tiktok"
              value={formData.tiktok}
              disabled={!isEditing}
              onChange={handleInputChange}
              className="w-full rounded border px-4 py-2"
            />
          </div>
        </div>
      </div>
      <section className="pt-5">
        {/* Featured Post Section */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold text-[#19183A]">
              Featured post section
            </h4>
            <p className="max-w-96 text-sm text-gray-500">
              Enable feature posts. These appears on your seller profile. Max
              post 4
            </p>
          </div>
          <Toggle
            checked={featurePost}
            onChange={() => setFeaturePost(!featurePost)}
            icons={false}
          />
        </div>

        {/* Manage Vacation Mode Section */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold text-[#19183A]">
              Manage vacation mode
            </h4>
            <p className="max-w-96 text-sm text-gray-500">
              Vacation mode is {vacationMode ? 'on' : 'off'}. Buyers can
              {vacationMode
                ? ` not place orders until ${vacationDates?.endDate}.`
                : ' currently place orders.'}
            </p>
          </div>
          <Toggle
            checked={vacationMode}
            onChange={handleVacationToggle}
            icons={false}
          />
        </div>

        {/* Vacation Mode Popup */}
        {isPopupOpen && (
          <VacationModePopup
            isOpen={isPopupOpen}
            onClose={handleCancelVacationMode}
            onSave={handleSaveVacationMode}
          />
        )}

        {/* Turn on Shop Policy */}
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold text-[#19183A]">
              Turn on shop policy
            </h4>
            <p className="max-w-96 text-sm text-gray-500">
              This allows you to create new shop policy to set your own
              standards for your own shop.
            </p>
          </div>
          <Toggle
            checked={shopPolicy}
            onChange={() => setShopPolicy(!shopPolicy)}
            icons={false}
          />
        </div>
      </section>
    </section>
  );
};

export default CustomizeShop;
