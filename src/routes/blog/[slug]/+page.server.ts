import { Query } from "$lib/backend/query.js";
import { Post } from "$lib/types.ts";

export const load = async ({ params }) => {
  const post = await new Query<Post>("posts").whereEqualTo("slug", params.slug)
    .get();
  return { post };
};
