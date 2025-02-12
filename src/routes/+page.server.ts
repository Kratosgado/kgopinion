import { Query } from "$lib/backend";
import { db } from "$lib/firebase";
import { Post } from "$lib/types";

export const load = async () => {
  try {
    const posts = await new Query<Post>("posts")
      .orderBy(
        "createdAt",
        "desc",
      ).limit(6)
      .get<Post[]>();

    return { posts };
  } catch (err) {
    console.log(err);
    return {};
  }
};

