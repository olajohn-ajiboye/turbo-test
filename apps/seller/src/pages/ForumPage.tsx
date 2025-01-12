import { useEffect, useState } from 'react';
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
import { LuSearch } from 'react-icons/lu';
import PostDetails from '@/components/PostDetails';
import PostList from '@/components/PostList';
import PostForm from '@/components/PostForm';

// Define tabs for the forum
// const forumTabs = [
//   { key: 'community', label: 'From the community' },
//   { key: 'buyers', label: 'From Buyers' },
//   { key: 'sellers', label: 'From Sellers' },
// ];

// Right-side cards data
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
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectForumPosts);
  const loading = useAppSelector(selectForumLoading);
  const error = useAppSelector(selectForumError);

  // Fetch posts on component mount
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // Generate tabs dynamically based on `user_type` in the posts
  const tabs = [
    { key: 'community', label: 'From the community' },
    ...Array.from(new Set(posts.map(post => post.user_type)))
      .filter(userType => userType) // Ensure user_type exists
      .map(userType => ({
        key: userType,
        label: `From ${userType[0].toUpperCase() + userType.slice(1)}`, // Capitalize the tab name
      })),
  ];

  // Filter posts based on active tab and search query
  const filteredPosts = posts
    .filter(post => {
      if (activeTab === 'community') return true; // Show all posts in "community"
      return post.user_type === activeTab; // Match posts with the tab's user_type
    })
    .filter(post =>
      [post.title, post.content]
        .join(' ')
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );

  const selectedPost = posts.find(post => post.id === selectedPostId);

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <>
      <Header />

      <div className="bg-[#EDF1FB] p-5 lg:px-16">
        {/* Tabs Navigation */}
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">Community forum</h2>
          <button
            className="rounded-md bg-[#030A70] px-3 py-2 text-white"
            onClick={() => setShowForm(true)}
          >
            Start new topic
          </button>
        </div>
        <TabsNav
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          showSearch={false}
        />

        {/* Content Section */}
        <div className="mt-5 flex flex-col md:flex-row">
          {/* Main Content */}
          <div className="flex-1 md:pr-6">
            <h3 className="pb-5 text-3xl font-semibold">Discussions</h3>
            {loading ? (
              <p>Loading posts...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : showForm ? (
              <PostForm onCancel={handleCancel} />
            ) : selectedPostId ? (
              <PostDetails
                post={selectedPost!}
                onBackClick={() => setSelectedPostId(null)}
              />
            ) : filteredPosts.length > 0 ? (
              <PostList posts={filteredPosts} onPostClick={setSelectedPostId} />
            ) : (
              <p>No posts found for the selected tab or search query.</p>
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
