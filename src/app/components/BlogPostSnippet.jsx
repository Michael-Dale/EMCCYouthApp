import Link from "next/link";
import { Notebook, ChevronRight } from "lucide-react";

const BlogPostSnippet = ({ name, date, title, id }) => {
  return (
    // <div className="p-4 border rounded-md shadow-md mb-4 bg-white">
    //     <h2 className="text-xl font-bold">{title}</h2>
    //     <p className="text-gray-600">By {name} on {date}</p>
    //     <Link href={`/blog/testimonies/${id}`} className="text-blue-500 hover:underline">
    //         Read More
    //     </Link>
    // </div>
    <Link href={`/blog/testimonies/${id}`} className="hover:shadow-lg ">
      <div className="space-y-4">
        <div
          key={id}
          className="bg-white rounded-xl shadow-sm overflow-hidden border font-bold"
        >
          <div className="p-4 flex items-center mb-3">
            <div className="bg-black rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
              <span className="text-white items-center font-medium text-sm">
                {id}
              </span>
            </div>
            <div className="flex-grow">
              <h2 className="text-base font- text-gray-900 ">{title}</h2>
              <p className="text-sm text-gray-500 ">
                {name} • {new Date(date).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogPostSnippet;
