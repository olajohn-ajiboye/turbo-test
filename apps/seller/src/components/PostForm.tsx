import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from '@/services/hooks/useAppDispatch';
import { addPost } from '@/services/redux/slices/forumSlice';

interface PostFormProps {
  onCancel: () => void;
}

interface FormValues {
  title: string;
  body: string;
  category: string;
}

const PostForm: React.FC<PostFormProps> = ({ onCancel }) => {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormValues> = async data => {
    console.log('Form Data:', data);
    try {
      const newPost = {
        title: data.title,
        content: data.body,
        category: data.category,
      };

      console.log('Dispatching addPost with:', newPost);
      const resultAction = await dispatch(addPost(newPost));

      if (addPost.fulfilled.match(resultAction)) {
        console.log('Post added successfully:', resultAction.payload);
        reset(); // Reset the form after successful submission
        onCancel(); // Close the form
      } else {
        console.error('Failed to add post:', resultAction.payload);
      }
    } catch (error) {
      console.error('Error in form submission:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-lg font-semibold text-gray-700">
          Title
        </label>
        <input
          type="text"
          {...register('title', { required: true })}
          className="mt-1 block w-full rounded-md border-2 border-gray-300 bg-transparent py-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter post title"
        />
      </div>

      <div>
        <label className="block text-lg font-semibold text-gray-700">
          Body
        </label>
        <textarea
          {...register('body', { required: true })}
          rows={6}
          className="mt-1 block w-full rounded-md border-2 border-gray-300 bg-transparent shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Write your post here"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-[#030A70] px-4 py-2 text-sm font-medium text-white"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default PostForm;
