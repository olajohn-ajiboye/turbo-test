import { useState } from 'react';
import { IoImageOutline, IoVideocamOutline } from 'react-icons/io5';
import { FiTrash2 } from 'react-icons/fi';

interface UploadedImage {
  id: string;
  file: File;
  url: string;
}

const MAX_IMAGE_COUNT = 8;
const MAX_FILE_SIZE_MB = 5;

interface ProductMediaProps {
  initialImages: UploadedImage[];
  initialVideo: File | null;
}

const ProductMedia: React.FC<ProductMediaProps> = ({
  initialImages,
  initialVideo,
}) => {
  const [images, setImages] = useState<UploadedImage[]>(initialImages);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {}
  );
  const [video, setVideo] = useState<File | null>(initialVideo);
  const [thumbnailId, setThumbnailId] = useState<string | null>(
    initialImages[0]?.id || null
  );

  // Generate a unique ID for each image
  const generateUniqueId = () => '_' + Math.random().toString(36).substr(2, 9);

  // Handle Image Upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFiles = Array.from(files).slice(
        0,
        MAX_IMAGE_COUNT - images.length
      ); // Limit to 8 images

      selectedFiles.forEach(file => {
        const id = generateUniqueId();
        const fileReader = new FileReader();

        // Track progress using FileReader events
        fileReader.onloadstart = () => {
          setUploadProgress(prev => ({
            ...prev,
            [id]: 0,
          }));
        };

        fileReader.onprogress = event => {
          if (event.lengthComputable) {
            const percent = (event.loaded / event.total) * 100;
            setUploadProgress(prev => ({
              ...prev,
              [id]: percent,
            }));
          }
        };

        fileReader.onloadend = () => {
          setUploadProgress(prev => ({
            ...prev,
            [id]: 100,
          }));
          setImages(prev => [
            ...prev,
            { id, file, url: fileReader.result as string },
          ]);
        };

        fileReader.readAsDataURL(file);
      });
    }
  };

  // Handle Video Upload
  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.size <= MAX_FILE_SIZE_MB * 1024 * 1024) {
      setVideo(file);
    } else {
      alert('Video file size exceeds the limit of 5MB.');
    }
  };

  // Handle Removing an Image
  const removeImage = (imageId: string) => {
    setImages(images.filter(img => img.id !== imageId));
  };

  // Handle Removing the Video
  const removeVideo = () => {
    setVideo(null);
  };

  // Set Thumbnail
  const makeThumbnail = (imageId: string) => {
    setThumbnailId(imageId);
  };

  return (
    <div className="product-media mt-6 rounded-lg bg-white p-6 shadow-md">
      <h3 className="text-xl font-bold">Product Media</h3>
      <p className="pb-4 pt-1 text-sm text-[#B6B6B7]">
        Upload the photos and video of your product. Up to 8 photos and a video.
      </p>

      {/* Image Upload Section */}
      <div className="mb-6">
        <p className="mb-3 text-sm font-semibold text-[#19183A]">
          Product images (Max 8 photos. Max file size: 5mb)
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {/* Upload New Image Button */}
          {images.length < MAX_IMAGE_COUNT && (
            <label
              htmlFor="imageUpload"
              className="flex cursor-pointer items-center justify-center rounded-lg border border-dashed border-gray-300 bg-[#edf1fb] py-10"
            >
              <IoImageOutline size={32} className="text-[#030A70]" />
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                className="hidden"
                multiple
                onChange={handleImageUpload}
              />
            </label>
          )}

          {/* Uploaded Images */}
          {images.map(image => (
            <div
              key={image.id}
              className={`relative flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 py-10 ${
                thumbnailId === image.id ? 'border-4 border-[#030A70]' : ''
              }`}
            >
              {/* Show the image after progress is complete */}
              <img
                src={image.url}
                alt="Uploaded"
                className="h-24 w-full object-cover"
              />

              {/* Progress bar */}
              {uploadProgress[image.id] < 100 && (
                <div className="w-full rounded-full bg-gray-200">
                  <div
                    className="rounded-full bg-blue-500 p-0.5 text-center text-xs font-medium leading-none text-blue-100"
                    style={{ width: `${uploadProgress[image.id]}%` }}
                  >
                    {Math.round(uploadProgress[image.id])}%
                  </div>
                </div>
              )}

              <p className="text-xs text-gray-500">
                {(image.file.size / (1024 * 1024)).toFixed(1)}mb
              </p>

              {/* Thumbnail label */}
              {thumbnailId === image.id && (
                <div className="absolute bottom-2 left-2 rounded-lg bg-[#030A70] px-2 py-1 text-xs text-white">
                  Thumbnail
                </div>
              )}

              {/* Actions */}
              <div className="absolute bottom-2 right-2 flex space-x-2">
                {/* Make Thumbnail */}
                <button
                  className="rounded-lg bg-white px-2 py-1 text-blue-500 shadow"
                  onClick={() => makeThumbnail(image.id)}
                >
                  Make thumbnail
                </button>

                {/* Delete Image */}
                <button
                  className="rounded-lg bg-white px-2 py-1 text-red-500 shadow"
                  onClick={() => removeImage(image.id)}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Upload Section */}
      <div>
        <p className="mb-3 text-sm font-semibold text-[#19183A]">
          Product video
        </p>
        {!video ? (
          <label
            htmlFor="videoUpload"
            className="flex cursor-pointer items-center justify-center rounded-lg border border-dashed border-gray-300 bg-[#edf1fb] py-10"
          >
            <IoVideocamOutline size={32} className="text-[#030A70]" />
            <input
              id="videoUpload"
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleVideoUpload}
            />
          </label>
        ) : (
          <div className="relative flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-[#edf1fb] py-10">
            <p className="text-sm text-gray-700">{video.name}</p>
            <p className="text-xs text-gray-500">
              {(video.size / (1024 * 1024)).toFixed(1)}mb
            </p>
            <button
              className="absolute bottom-2 right-2 text-red-500"
              onClick={removeVideo}
            >
              <FiTrash2 />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductMedia;
