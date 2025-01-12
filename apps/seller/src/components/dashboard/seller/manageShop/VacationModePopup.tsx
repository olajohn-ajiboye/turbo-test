import React, { useState } from 'react';

interface VacationModePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (startDate: string, endDate: string, vacationNote: string) => void;
}

const VacationModePopup: React.FC<VacationModePopupProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [vacationNote, setVacationNote] = useState('');

  const handleSave = () => {
    if (startDate && endDate && vacationNote) {
      onSave(startDate, endDate, vacationNote); // Pass vacation note along with start and end dates
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose} // Closes the popup when the background is clicked
    >
      {/* The modal container */}
      <div
        className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg"
        onClick={e => e.stopPropagation()} // Prevents closing when clicking inside the modal
      >
        <h2 className="mb-4 text-2xl font-semibold">Set Vacation Mode</h2>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="mt-1 w-full rounded-md border px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="mt-1 w-full rounded-md border px-3 py-2"
          />
        </div>

        {/* Vacation Note Input */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Vacation Note
          </label>
          <textarea
            placeholder="Leave a message for your buyers while you're away..."
            value={vacationNote}
            onChange={e => setVacationNote(e.target.value)}
            className="mt-1 w-full rounded-md border px-3 py-2"
            rows={4}
          />
          {/* Descriptive Text */}
          <small className="mt-2 block text-gray-500">
            This note will be displayed to buyers on your store page while your
            shop is on vacation. It helps them understand why your products are
            temporarily unavailable.
          </small>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="w-1/2 rounded-md border border-[#030A70] px-4 py-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="w-1/2 rounded-md bg-[#030A70] px-4 py-2 text-white"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default VacationModePopup;
