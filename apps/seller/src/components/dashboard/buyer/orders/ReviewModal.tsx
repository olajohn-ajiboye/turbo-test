import React, { useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useForm, Controller } from 'react-hook-form';
import Spinner from '@/components/UI/Spinner';
import { ReviewFormData, ReviewModalProps } from '@/types/types';

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const { register, handleSubmit, control, setValue } = useForm<ReviewFormData>(
    {
      defaultValues: {
        reviewText: '',
        file: null,
        rating: 0,
      },
    }
  );

  const [rating, setRating] = useState(0); // Local state for rating
  const [preview, setPreview] = useState<string | null>(null); // Image preview state
  const [isLoading, setIsLoading] = useState(false); // Loading state for image upload

  if (!isOpen) return null; // Don't render if modal is not open

  // Handle form submission
  const onSubmitHandler = (data: ReviewFormData) => {
    onSubmit({ ...data, rating }); // Pass the form data along with the rating
    onClose(); // Close the modal after submission
  };

  // Handle rating change
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    setValue('rating', newRating); // Set value in form state
  };

  // Handle image upload with preview and loading state
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setValue('file', file);
      setPreview(URL.createObjectURL(file)); // Preview the uploaded image
      setIsLoading(true);

      // Simulate an image upload with a delay to show the spinner
      setTimeout(() => {
        setIsLoading(false); // Remove the loading state after "upload" is done
      }, 2000); // Simulating 2-second upload delay
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        {/* Close button (Cancel button) in the top-right corner */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-2xl font-semibold text-gray-500"
        >
          &times;
        </button>

        {/* Header */}
        <h2 className="mb-2 text-center text-lg font-bold">Write a Review</h2>

        {/* Meaningful text centered */}
        <p className="mb-4 text-center text-sm text-gray-500">
          How would you rate your experience with this product?
        </p>

        {/* Star Rating */}
        <div className="mb-4 flex justify-center">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              onClick={() => handleRatingChange(star)}
              className="text-2xl text-yellow-400"
            >
              {rating >= star ? <AiFillStar /> : <AiOutlineStar />}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          {/* Review Text Area */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-semibold">
              Write review of product here
            </label>
            <textarea
              className="w-full rounded-lg border border-gray-300 p-3"
              placeholder="Enter review details here..."
              {...register('reviewText', { required: 'Review is required' })}
              rows={4}
            />
          </div>

          {/* File Upload with Preview */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-semibold">
              Upload a photo
            </label>
            <div className="relative rounded-lg border-2 border-dashed border-gray-300 p-4 text-center hover:bg-gray-100">
              <Controller
                name="file"
                control={control}
                render={() => (
                  <input
                    type="file"
                    className="absolute inset-0 cursor-pointer opacity-0"
                    onChange={handleFileChange}
                  />
                )}
              />
              <span className="inline-block font-semibold text-[#030A70]">
                <svg
                  className="mr-2 inline-block"
                  fill="currentColor"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M14 2H10v4H3v16h18V6h-7zM9 0h6v6H9V0zM7 8h10v2H7V8zm0 4h10v2H7v-2zm0 4h10v2H7v-2z" />
                </svg>
                Upload a photo
              </span>
            </div>

            {/* Show loading spinner or image preview */}
            {isLoading ? (
              <div className="mt-4 flex justify-center">
                <Spinner />
              </div>
            ) : preview ? (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="h-40 w-full rounded-md object-cover"
                />
              </div>
            ) : null}
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="grid gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#030A70] px-10 py-3 text-[#030A70] hover:bg-[#EDF1FB]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#030A70] px-10 py-3 text-white hover:bg-blue-700"
            >
              Submit review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
