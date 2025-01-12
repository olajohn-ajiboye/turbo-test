function FloatingComponent() {
  return (
    <div className="absolute right-4 top-72 flex items-center rounded-md bg-white px-4 py-2 shadow-md">
      <img
        src="" // Replace with the actual path to the avatar image
        alt="Store Avatar"
        className="mr-2 h-8 w-8 rounded-full"
      />
      <div>
        <p className="text-sm font-semibold text-gray-900">
          Africa decor store
        </p>
        <p className="text-sm text-gray-500">Clay decors - pots</p>
        <div className="flex items-center text-yellow-500">
          {/* Star Rating */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
            className="h-4 w-4"
          >
            <path d="M9.049 2.927C9.318 2.027 10.682 2.027 10.951 2.927l1.333 4.09a1 1 0 00.95.69h4.318c1.02 0 1.451 1.31.66 1.854l-3.485 2.535a1 1 0 00-.362 1.118l1.333 4.09c.269.9-.688 1.645-1.51 1.118L10 14.521l-3.485 2.535c-.822.527-1.779-.218-1.51-1.118l1.333-4.09a1 1 0 00-.362-1.118L2.492 9.57c-.791-.544-.36-1.854.66-1.854h4.318a1 1 0 00.95-.69l1.333-4.09z" />
          </svg>
          {/* Add more stars as needed */}
          <span className="ml-2 text-gray-700">5.0 (230 reviews)</span>
        </div>
      </div>
    </div>
  );
}

export default FloatingComponent;
