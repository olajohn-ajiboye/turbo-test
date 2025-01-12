import { useParams, useNavigate } from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector,
} from '@/services/hooks/useAppDispatch';
import {
    replyToPost,
  selectForumPosts,
  toggleLikePost,
} from '@/services/redux/slices/forumSlice';
import PostDetails from '@/components/forum/PostDetails';
import Header from '@/components/Nav';
import { LuSearch } from 'react-icons/lu';

const topicCategories = [
  {
    title: 'Popular community categories',
    items: [
      { name: 'Events & News', count: '16.9k' },
      { name: 'Buyer-Seller Tips & Tricks', count: '10.9k' },
      { name: 'New Product Launches', count: '5.2k' },
      { name: 'Marketing Techniques', count: '4.6k' },
      { name: 'Marketplace Updates', count: '7.6k' },
    ],
  },
  {
    title: "Seller's topics",
    items: [
      { name: 'Events & News', count: '16.9k' },
      { name: 'Buyer-Seller Tips & Tricks', count: '10.9k' },
      { name: 'New Product Launches', count: '5.2k' },
    ],
  },
  {
    title: "Buyer's topics",
    items: [
      { name: 'Marketing Techniques', count: '4.6k' },
      { name: 'Marketplace Updates', count: '7.6k' },
    ],
  },
];

const PostShowPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const posts = useAppSelector(selectForumPosts);
  const dispatch = useAppDispatch();

  const post = posts.find(post => post.id === postId);

  const handleLikePost = async () => {
    if (post) {
      await dispatch(toggleLikePost({ topicId: post.id }));
    }
  };

  const handleReply = async (replyText: string) => {
    if (post && replyText) {
      try {
        await dispatch(replyToPost({ topicId: post.id, content: replyText }));
      } catch (error) {
        console.error('Failed to reply:', error);
      }
    }
  };

  if (!post) {
    return <p>Post not found!</p>;
  }

  return (
    <>
      <Header />
      <div className="bg-[#EDF1FB] py-8 px-5 lg:px-16">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <button
                className="text-[#030A70] hover:underline"
                onClick={() => navigate('/forum')}
              >
                Go to dashboard
              </button>
            </div>

            <PostDetails
              post={post}
              onBackClick={() => navigate('/forum')}
              onLike={handleLikePost}
              onReply={handleReply}
            />
          </div>

          {/* Right Sidebar */}
          <aside className="w-full md:w-1/4">
            <div className='flex justify-end'>
              <button
                className="rounded-md mb-5 bg-[#030A70] px-4 py-2 text-white"
                onClick={() => navigate('/forum/new')}
              >
                Start new topic
              </button>
            </div>
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for topics, ideas etc..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 pl-10 text-sm"
                />
                <span className="absolute left-3 top-3 text-gray-400">
                  <LuSearch size={18} />
                </span>
              </div>
            </div>

            {/* Topic Categories */}
            {topicCategories.map((category, index) => (
              <div
                key={index}
                className="mb-6 rounded-lg bg-white p-5 shadow-sm"
              >
                <h4 className="mb-3 text-lg font-semibold text-[#19183A]">
                  {category.title}
                </h4>
                <ul>
                  {category.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="mb-2 flex justify-between text-sm text-gray-600"
                    >
                      <span>{item.name}</span>
                      <span>{item.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </>
  );
};

export default PostShowPage;
