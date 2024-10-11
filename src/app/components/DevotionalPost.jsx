import React from 'react';

const DevotionalPost = ({ verse, message,date }) => {
  return (
    <div className="devotional-post border border-gray-300 rounded-lg p-4 shadow-md max-w-sm mx-auto my-4 bg-white transition-shadow duration-200 hover:shadow-lg">
      <div className="verse text-gray-600 italic mb-2 text-lg">
        "{verse}"
      </div>
      <div className="message text-gray-800 text-base">
        {message}
      </div>
      <div className="footer text-gray-500 text-sm mt-4">
        <span>— {date}</span>
      </div>
    </div>
  );
};

export default DevotionalPost;
