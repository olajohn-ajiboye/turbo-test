import React, { useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

const SecuritySettings: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State to hold password data
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Handle field changes in form
  const handleInputChange = (field: string, value: string) => {
    setPasswordData({
      ...passwordData,
      [field]: value,
    });
  };

  // Toggle edit mode
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Save and exit edit mode
  const handleSave = () => {
    // Save logic will be added here
    setIsEditing(false);
  };

  // Cancel editing and reset to default state
  const handleCancel = () => {
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-lg rounded-lg bg-white p-8 shadow-md">
      <h2 className="mb-6 text-2xl font-bold">Change password</h2>

      {!isEditing ? (
        <>
          {/* No password is shown here, just astericks😉*/}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-semibold">
              Current password
            </label>
            <p className="w-full rounded-lg border border-gray-300 p-2">
              ************
            </p>
          </div>

          {/* Edit Button */}
          <div className="flex">
            <button
              onClick={handleEdit}
              className="rounded-lg bg-[#030A70] px-10 py-2 text-white"
            >
              Edit
            </button>
          </div>
        </>
      ) : (
        <form>
          <div className="mb-6">
            <label
              className="mb-2 block text-sm font-semibold"
              htmlFor="currentPassword"
            >
              Current password
            </label>
            <input
              type="password"
              id="currentPassword"
              value={passwordData.currentPassword}
              onChange={e =>
                handleInputChange('currentPassword', e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 p-2 pl-4"
              placeholder="Enter current password"
            />
          </div>

          {/* New Password */}
          <div className="mb-6">
            <label
              className="mb-2 block text-sm font-semibold"
              htmlFor="newPassword"
            >
              New password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                id="newPassword"
                value={passwordData.newPassword}
                onChange={e => handleInputChange('newPassword', e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2 pl-4"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {showNewPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="mb-6">
            <label
              className="mb-2 block text-sm font-semibold"
              htmlFor="confirmPassword"
            >
              Confirm new password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={e =>
                  handleInputChange('confirmPassword', e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 p-2 pl-4"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {showConfirmPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
              </button>
            </div>
          </div>

          {/* Save and Cancel Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-lg border border-[#030A70] px-10 py-2 text-[#030A70] hover:bg-[#EDF1FB]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="rounded-lg bg-[#030A70] px-10 py-2 text-white"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SecuritySettings;
