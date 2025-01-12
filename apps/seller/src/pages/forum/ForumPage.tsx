import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector,
} from '@/services/hooks/useAppDispatch';
import {
  fetchPosts,
  selectForumPosts,
  selectForumLoading,
  selectForumError,
} from '@/services/redux/slices/forumSlice';
import Header from '@/components/Nav';
import TabsNav from '@/components/dashboard/buyer/TabsNav';
import PostList from '@/components/forum/PostList';
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
];

const ForumPage = () => {
  const [activeTab, setActiveTab] = useState<string>('community');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectForumPosts);
  const loading = useAppSelector(selectForumLoading);
  const error = useAppSelector(selectForumError);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const tabs = [
    { key: 'community', label: 'From the community' },
    ...Array.from(new Set(posts.map(post => post.user_type)))
      .filter(userType => userType)
      .map(userType => ({
        key: userType,
        label: `From ${userType[0].toUpperCase() + userType.slice(1)}`,
      })),
  ];

  const filteredPosts = posts
    .filter(post => {
      if (activeTab === 'community') return true;
      return post.user_type === activeTab;
    })
    .filter(post =>
      [post.title, post.content]
        .join(' ')
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );

  const handlePostClick = (postId: string) => {
    navigate(`/forum/${postId}`);
  };

  return (
    <>
      <Header />
      <div className="bg-[#EDF1FB] py-8 lg:px-16">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row items-center justify-between pb-5">
          <h2 className="text-2xl font-semibold text-[#030A70]">
            Community Forum
          </h2>
          <button
            className="mt-4 md:mt-0 rounded-md bg-[#030A70] px-5 py-3 text-white"
            onClick={() => navigate('/forum/new')}
          >
            Start a New Topic
          </button>
        </div>

        {/* Tabs Navigation */}
        <TabsNav
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          showSearch={false}
        />

        {/* Main Content Section */}
        <div className="mt-6 flex flex-col md:flex-row">
          {/* Main Content */}
          <div className="flex-1 md:pr-6">
            {loading ? (
              <p className="text-center text-gray-500">Loading posts...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : filteredPosts.length > 0 ? (
              <PostList posts={filteredPosts} onPostClick={handlePostClick} />
            ) : (
              <p className="text-center text-gray-500">
                No posts found for the selected tab or search query.
              </p>
            )}
          </div>

          {/* Right Sidebar */}
          <aside className="mt-10 w-full md:mt-0 md:w-1/4">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for topics, ideas etc..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 pl-10 text-sm"
                />
                <span className="absolute left-3 top-3 text-gray-400">
                  <LuSearch size={18} />
                </span>
              </div>
            </div>

            {/* Topic Cards */}
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

export default ForumPage;
