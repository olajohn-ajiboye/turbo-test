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
  onLike: () => void;
  onReply: (replyText: string) => void;
}

const PostDetails: React.FC<PostDetailsProps> = ({
  post,
  onLike,
  onReply,
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleReplyButtonClick = () => {
    setIsReplying(true);
  };

  const handleCancelReply = () => {
    setIsReplying(false);
    setReplyText('');
  };

  const handleSubmitReply = () => {
    if (replyText.trim()) {
      onReply(replyText);
      setIsReplying(false);
      setReplyText('');
    }
  };

  return (
    <>
      <div className="rounded-xl bg-white p-6 shadow-sm">
        {/* Post Header */}
        <h2 className="text-3xl font-bold text-[#19183A] mb-4">{post.title}</h2>
        <div className="flex items-center gap-4 mb-6">
          {post.logo ? (
            <img
              src={post.logo}
              alt={post.created_by}
              className="h-12 w-12 rounded-full"
            />
          ) : (
            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-200 text-gray-500">
              {getInitials(post.created_by)}
            </div>
          )}
          <div>
            <p className="font-semibold text-[#030A70]">By {post.created_by}</p>
            <p className="text-sm text-gray-500">
              {new Date(post.timestamp).toLocaleDateString()} /{' '}
              {post.category || 'Uncategorized'}
            </p>
          </div>
        </div>
        <div className="border-b border-[#ECECEC] mb-6"></div>

        {/* Post Content */}
        <p className="text-lg text-gray-600 mb-6">{post.content}</p>

        {/* Like and Reply Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={onLike}
            className="flex items-center gap-2 text-[#030A70] font-medium"
          >
            <AiOutlineLike size={20} />
            <span>Like post ({post.total_likes})</span>
          </button>
          <button
            onClick={handleReplyButtonClick}
            className="rounded-md bg-[#030A70] px-4 py-2 text-white"
          >
            Reply
          </button>
        </div>
      </div>

      {/* Reply Input Section */}
      {isReplying && (
        <div className="mt-4 bg-white rounded-xl border border-gray-300 p-4">
          <textarea
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            rows={4}
            placeholder="Write your reply..."
            className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-[#030A70]"
          />
          <div className="mt-3 flex justify-end gap-2">
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
              Submit Reply
            </button>
          </div>
        </div>
      )}

      {/* Replies Section */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-[#19183A] mb-4">
          {post.replies.length} replies
        </h3>
        <div className="space-y-4">
          {post.replies.map((reply, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-300 p-4"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-500">
                  {getInitials(reply.author)}
                </div>
                <div>
                  <p className="font-semibold text-[#030A70]">{reply.author}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(reply.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="text-gray-600">{reply.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PostDetails;
