import BlogPostSnippet from '../../components/BlogPostSnippet ';

const posts = [
    { id: 1, name: 'John Doe', date: '2024-10-16', title: 'My First Blog Post', content: 'This is the full content of the first post.' },
    { id: 2, name: 'Jane Doe', date: '2024-10-15', title: 'Another Blog Post', content: 'This is the full content of another post.' }
];

export default function Home() {
    return (
        <div className="container mx-auto p-6">
            {posts.map(post => (
                <BlogPostSnippet key={post.id} {...post} />
            ))}
        </div>
    );
}
