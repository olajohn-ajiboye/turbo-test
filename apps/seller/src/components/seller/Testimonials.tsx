import React from 'react';
import sellerAvatar from '../../assets/whysellgiri/avatar.png';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      title: 'Transformative Platform!',
      content:
        'GiriToday revolutionized my business operations! With its intuitive interface and powerful marketing tools, I expanded my reach globally. The responsive support team ensured a smooth transition, leading to a significant increase in sales. Highly recommended for any seller looking to thrive in the global marketplace!',
      author: 'Africa decor store',
      avatar: sellerAvatar,
    },
    {
      title: 'Game-changer for Brand Expansion!',
      content:
        'GiriToday has been instrumental in elevating my brand’s presence on the market. Its comprehensive suite of features, including easy order management and proactive support, has streamlined my operations and facilitated a notable increase in revenue. Thanks to GiriToday, my brand has achieved unprecedented growth and visibility.',
      author: 'Africa decor store',
      avatar: sellerAvatar,
    },
    {
      title: 'Unparalleled Sales Growth!',
      content:
        'GiriToday’s platform has been a game-changer for my business! With its effective marketing tools and efficient order management system, I’ve experienced exponential sales growth. GiriToday is truly indispensable for any seller aspiring to thrive in the competitive marketplace.',
      author: 'Africa decor store',
      avatar: sellerAvatar,
    },
  ];

  return (
    <section className="bg-[#EDF1FB] py-12">
      <div className="mx-auto px-10 py-10 text-center lg:px-20">
        <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
          Hear from other sellers
        </h2>
        <p className="mb-8 text-lg text-gray-700 sm:px-20 md:px-24 lg:px-96">
          Experience the voices of success firsthand! Dive into inspiring
          testimonials from our vibrant community of sellers on GiriToday.
        </p>
        <div className="flex flex-col justify-between gap-8 lg:flex-row">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col rounded-lg bg-white p-6 text-left shadow-md"
            >
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                {testimonial.title}
              </h3>
              <p className="mb-4 text-gray-700">{testimonial.content}</p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={`${testimonial.author} avatar`}
                  className="mr-4 h-10 w-10 rounded-full"
                />
                <p className="font-medium text-gray-900">
                  {testimonial.author}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
