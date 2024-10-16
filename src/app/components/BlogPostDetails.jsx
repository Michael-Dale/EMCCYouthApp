import { useRouter } from 'next/router';

const BlogPostDetails = ({ posts }) => {
  const router = useRouter();
  const { id } = router.query;

  const post = posts.find(post => post.id === parseInt(id));

  if (!post) {
    return <div>Post not found!</div>;
  }

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-600 mb-4">By {post.name} on {post.date}</p>
      <p className="text-lg">{post.content}</p>
    </div>
  );
};

export default BlogPostDetails;
