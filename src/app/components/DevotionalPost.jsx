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
          {/* Add the DailyDevotional text */}
          <div className="text-gray-600 text-sm mt-1">@DailyDevotional</div>
        </div>
      </div>
      
      {/* Verse and Message */}
      <div className="verse text-grey-800 italic mb-2 text-xl">
        "{verse}"
      </div>
      <div className="message text-grey-800 text-xl">
        {message}
      </div>
    </div>
  );
};

export default DevotionalPost;
