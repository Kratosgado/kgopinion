import prisma from "@/lib/prisma";

const getPosts = async () => {
  const posts = await prisma.post.findMany();
  return posts;
};

export default async function Page() {
  const posts = await getPosts();

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
