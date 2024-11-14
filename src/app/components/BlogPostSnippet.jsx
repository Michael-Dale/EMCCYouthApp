import Link from 'next/link';

const BlogPostSnippet = ({ name, date, title, id }) => {
    return (
        <div className="p-4 border rounded-md shadow-md mb-4 bg-white">
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-gray-600">By {name} on {date}</p>
            <Link href={`/blog/testimonies/${id}`} className="text-blue-500 hover:underline">
                Read More
            </Link>
        </div>
    );
};

export default BlogPostSnippet;
