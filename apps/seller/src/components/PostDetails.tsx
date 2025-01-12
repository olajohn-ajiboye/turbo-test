import { getInitials } from '@/utils/getInitials';
import React, { useState } from 'react';
import { AiOutlineLike } from 'react-icons/ai';

interface Reply {
  content: string;
  author: string;
  timestamp: string;
}

interface PostDetailsProps {
  post: {
    id: string;
    title: string;
    created_by: string;
    content: string;
    replies: Reply[];
    logo?: string;
    timestamp: string;
    category?: string;
    total_likes: number;
  };
  onBackClick: () => void;
}

const PostDetails: React.FC<PostDetailsProps> = ({ post, onBackClick }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleReplyButtonClick = () => {
    setIsReplying(true);
  };

  const handleCancelReply = () => {
    setIsReplying(false);
    setReplyText(''); // Reset the input field
  };

  const handleSubmitReply = () => {
    console.log('Reply submitted:', replyText);
    // Reset after submission
    setIsReplying(false);
    setReplyText('');
  };

  return (
    <>
      <div className="rounded-xl bg-white p-6">
        {/* Go back button */}
        <button
          className="mb-4 text-[#030A70] hover:underline"
          onClick={onBackClick}
        >
          Go back to discussions
        </button>

        {/* Post Title */}
        <h2 className="mb-3 text-4xl font-bold text-[#19183A]">{post.title}</h2>

        {/* Author and metadata */}
        <div className="mb-4 flex items-center space-x-2 text-gray-500">
          <div className="flex items-center gap-2">
            {post.logo ? (
              <img
                src={post.logo}
                alt={post.created_by}
                className="h-10 w-10 rounded-full"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-500">
                {getInitials(post.created_by)}
              </div>
            )}
          </div>
          <div>
            <div className="font-semibold text-[#030A70]">
              By {post.created_by}
            </div>
            <span>{new Date(post.timestamp).toLocaleDateString()}</span>
            {post.category && (
              <>
                <span className="px-1">/</span>
                <span>{post.category}</span>
              </>
            )}
          </div>
        </div>

        <div className="my-5 border border-[#ECECEC]"></div>

        {/* Post Content */}
        <p className="mb-6 text-lg leading-relaxed text-gray-600">
          {post.content}
        </p>

        {/* Like post & Reply button */}
        <div className="mb-8 flex items-center justify-between">
          <button className="flex items-center space-x-2 font-semibold text-[#030A70]">
            <AiOutlineLike size={20} />
            <span>Like post ({post.total_likes})</span>
          </button>
          <button
            className="rounded-md bg-[#030A70] px-4 py-2 text-white"
            onClick={handleReplyButtonClick}
          >
            Reply
          </button>
        </div>
      </div>

      {/* Reply Input Section */}
      {isReplying && (
        <div className="mt-4 rounded-xl border-2 border-gray-200 p-4">
          <textarea
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            rows={4}
            placeholder="Write your reply..."
            className="w-full rounded-md border border-none bg-transparent p-3 focus:outline-none focus:ring-2 focus:ring-[#030A70]"
          />
          <div className="mt-3 flex justify-end space-x-2">
            <button
              onClick={handleCancelReply}
              className="rounded-md border border-[#030A70] px-4 py-2 text-[#030A70]"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitReply}
              className="rounded-md bg-[#030A70] px-4 py-2 text-white"
            >
              Reply
            </button>
          </div>
        </div>
      )}

      {/* Replies section */}
      <div className="mb-6 mt-5">
        <h3 className="text-xl font-semibold text-[#19183A]">
          {post.replies.length} replies
        </h3>
        <div className="mt-4 space-y-4">
          {post.replies.map((reply, index) => (
            <div
              key={index}
              className="rounded-xl border border-[#E5E7EB] bg-[#FFF] p-4"
            >
              {/* Author and metadata */}
              <div className="mb-4 flex items-center space-x-2 text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-500">
                    {getInitials(reply.author)}
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-[#030A70]">
                    By {reply.author}
                  </div>
                  <span>{new Date(reply.timestamp).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="my-5 border border-[#ECECEC]"></div>
              <p className="text-gray-600">{reply.content}</p>
              <div className="mt-2 flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-[#030A70]">
                  <AiOutlineLike />
                  <span>Like reply</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PostDetails;
