import { FiTrash2 } from 'react-icons/fi';
import { IoImageOutline, IoVideocamOutline } from 'react-icons/io5';

interface ProductMediaProps {
  images: UploadedImage[];
  video: UploadedImage | null;
  uploadProgress: Record<string, number>;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleVideoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (imageId: string) => void;
  removeVideo: () => void;
}

interface UploadedImage {
  id: string;
  file: File;
  url: string;
  progress: number;
}

const ProductMedia: React.FC<ProductMediaProps> = ({
  images,
  video,
  handleImageUpload,
  handleVideoUpload,
  removeImage,
  removeVideo,
}) => {
  return (
    <div className="product-media mt-6 rounded-lg bg-white p-6 shadow-md">
      <h3 className="text-xl font-bold">Product Media</h3>
      <p className="pb-4 pt-1 text-sm text-gray-600">
        Upload product photos and videos. Up to 8 photos and 1 video.
      </p>

      {/* Image Upload Section */}
      <div className="mb-6">
        <p className="mb-3 text-sm font-semibold text-gray-700">
          Upload product photos (Max 8 photos, 5MB each)
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {images.length < 8 && (
            <label
              htmlFor="imageUpload"
              className="flex cursor-pointer items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-100 py-10"
            >
              <IoImageOutline size={32} className="text-blue-600" />
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          )}

          {images.map(image => (
            <div
              key={image.id}
              className="relative flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-100 py-4"
            >
              {image.progress === 100 ? (
                <img
                  src={image.url}
                  alt="Uploaded"
                  className="h-44 w-full object-cover"
                />
              ) : (
                <p className="text-sm text-gray-700">{image.file.name}</p>
              )}
              <p className="text-xs text-gray-500">
                {(image.file.size / (1024 * 1024)).toFixed(1)}MB
              </p>

              {image.progress < 100 && (
                <div className="mt-2 h-1 w-full bg-gray-200">
                  <div
                    className="h-full bg-blue-600"
                    style={{ width: `${image.progress}%` }}
                  ></div>
                </div>
              )}

              <button
                className="absolute bottom-2 right-2 text-red-500"
                onClick={() => removeImage(image.id)}
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Video Upload Section */}
      <div>
        <p className="mb-3 text-sm font-semibold text-gray-700">
          Upload product video (Max 5MB)
        </p>
        {!video ? (
          <label
            htmlFor="videoUpload"
            className="flex cursor-pointer items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-100 py-10"
          >
            <IoVideocamOutline size={32} className="text-blue-600" />
            <input
              id="videoUpload"
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleVideoUpload}
            />
          </label>
        ) : (
          <div className="relative flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-100 py-10">
            {video.progress === 100 ? (
              <video
                controls
                className="h-24 w-full object-cover"
                src={video.url}
              />
            ) : (
              <p className="text-sm text-gray-700">{video.file.name}</p>
            )}
            <p className="text-xs text-gray-500">
              {(video.file.size / (1024 * 1024)).toFixed(1)}MB
            </p>

            {video.progress < 100 && (
              <div className="mt-2 h-1 w-full bg-gray-200">
                <div
                  className="h-full bg-blue-600"
                  style={{ width: `${video.progress}%` }}
                ></div>
              </div>
            )}

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
