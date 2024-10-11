import React from 'react';

const DevotionalPost = ({ verse, message, date, username, profilePic }) => {
  return (
    <div className="devotional-post border border-gray-300 rounded-lg p-4 shadow-md max-w-sm mx-auto my-4 bg-white transition-shadow duration-200 hover:shadow-lg">
      {/* Header with Profile Picture and Username */}
      <div className="flex items-center mb-3">
        <img
          src={profilePic}
          alt={`${username}'s profile`}
          className="w-20 h-20 rounded-full mr-3"
        />
        <div>
          <span className="text-gray-800 font-semibold text-xl">{username}</span>
          <span className="text-gray-500 text-sm ml-1">{date}</span>
        </div>
      </div>
      
      {/* Verse and Message */}
      <div className="verse text-gray-600 italic mb-2 text-xl">
        "{verse}"
      </div>
      <div className="message text-gray-800 text-lg">
        {message}
      </div>
    </div>
  );
};

export default DevotionalPost;
