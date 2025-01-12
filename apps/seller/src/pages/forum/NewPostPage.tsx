import { useNavigate } from 'react-router-dom';
import PostForm from '@/components/forum/PostForm';
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
      { name: 'Marketing Techniques', count: '4.6k' },
      { name: 'Marketplace Updates', count: '7.6k' },
    ],
  },
  {
    title: "Buyer's topics",
    items: [
      { name: 'Events & News', count: '16.9k' },
      { name: 'Buyer-Seller Tips & Tricks', count: '10.9k' },
      { name: 'New Product Launches', count: '5.2k' },
      { name: 'Marketing Techniques', count: '4.6k' },
      { name: 'Marketplace Updates', count: '7.6k' },
    ],
  },
];

const NewPostPage = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/forum');
  };

  return (
    <>
      <Header />
      <div className="bg-[#EDF1FB] py-8 px-5 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1 bg-white rounded-xl p-6 shadow-sm">
            <div className="mb-6">
              <button
                className="text-[#030A70] hover:underline"
                onClick={() => navigate('/forum')}
              >
                Back to forum
              </button>
            </div>
            <h2 className="text-3xl font-bold text-[#030A70] mb-4">
              Start a New Topic
            </h2>
            <PostForm onCancel={handleCancel} />
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-1/4">
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

export default NewPostPage;
