import { getInitials } from '@/utils/getInitials';
import React from 'react';

interface PostListProps {
  posts: {
    id: string;
    title: string;
    created_by: string;
    logo: string | null;
    isNew?: boolean;
    replies?: number;
    views?: number;
  }[];
  onPostClick: (postId: string) => void; // Expecting a string for `postId`
}

const PostList: React.FC<PostListProps> = ({ posts, onPostClick }) => {
  return (
    <div className="rounded-lg bg-white p-5">
      {posts.length > 0 ? (
        <ul>
          {posts.map(post => (
            <li
              key={post.id}
              className="mb-4 flex cursor-pointer items-center justify-between border-b border-gray-300 pb-4"
              onClick={() => onPostClick(post.id)} // Pass `id` as a string
            >
              {/* Left Section: Avatar and Post Details */}
              <div className="flex items-center">
                {/* Avatar */}
                {post.logo ? (
                  <img
                    src={post.logo}
                    alt={`${post.created_by}'s avatar`}
                    className="mr-4 h-12 w-12 rounded-full"
                  />
                ) : (
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-gray-500">
                    {getInitials(post.created_by)}
                  </div>
                )}
                {/* Post Details */}
                <div>
                  {/* Post Title */}
                  <h3 className="text-lg font-semibold text-[#19183A]">
                    {post.title}
                  </h3>
                  {/* Author and "New" Badge */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">
                      By {post.created_by}
                    </span>
                    {post.isNew && (
                      <span className="rounded-full bg-[#FFC107] px-2 py-1 text-xs font-semibold text-white">
                        New
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Section: Replies and Views */}
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  {post.replies || 0} replies
                </p>
                <p className="text-sm text-gray-500">{post.views || 0} views</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts to display.</p>
      )}
    </div>
  );
};

export default PostList;
