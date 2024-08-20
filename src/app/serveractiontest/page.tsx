import { addPost, deltePost } from "@/lib/action";

const ServerActionTestPage = () => {
  return (
    <div>
      <form action={addPost}>
        <input type="text" name="title" placeholder="Title" />
        <input type="text" name="desc" placeholder="Description" />
        <input type="text" name="img" placeholder="Image URL" />
        <input type="text" name="slug" placeholder="Slug" />
        <input type="text" name="userId" placeholder="User ID" />
        <button type="submit">Add Post</button>
      </form>

      <form action={deltePost}>
        <input type="text" name="slug" placeholder="Slug" />
        <button>Delete Post</button>
      </form>
    </div>
  );
};

export default ServerActionTestPage;
