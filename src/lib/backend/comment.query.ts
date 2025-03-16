import type { Category, Author, Post } from '$lib/utils';
import type {
	collection,
	serverTimestamp,
	addDoc,
	updateDoc,
	doc,
	increment,
	query,
	where,
	orderBy,
	getDocs,
	getDoc,
	deleteDoc
} from 'firebase/firestore';

// Add a comment
export const addComment = async (
	db: FirebaseFirestore,
	commentData: Omit<Comment, 'id' | 'createdAt' | 'updatedAt' | 'likes'>
) => {
	const commentsRef = collection(db, 'comments');

	const newComment = {
		...commentData,
		createdAt: serverTimestamp(),
		updatedAt: serverTimestamp(),
		likes: 0
	};

	const docRef = await addDoc(commentsRef, newComment);

	// Update post comment count
	await updateDoc(doc(db, 'posts', commentData.postId), {
		commentCount: increment(1)
	});

	return { id: docRef.id, ...newComment };
};

// Get comments for a post
export const getPostComments = async (db: FirebaseFirestore, postId: string) => {
	const commentsQuery = query(
		collection(db, 'comments'),
		where('postId', '==', postId),
		orderBy('createdAt', 'asc')
	);

	const querySnapshot = await getDocs(commentsQuery);

	const comments = querySnapshot.docs.map((doc) => ({
		id: doc.id,
		...(doc.data() as Comment)
	}));

	return comments;
};

// Update a comment
export const updateComment = async (db: FirebaseFirestore, commentId: string, content: string) => {
	const commentRef = doc(db, 'comments', commentId);

	await updateDoc(commentRef, {
		content,
		updatedAt: serverTimestamp()
	});

	return true;
};

// Delete a comment
export const deleteComment = async (db: FirebaseFirestore, commentId: string) => {
	const commentRef = doc(db, 'comments', commentId);
	const commentSnapshot = await getDoc(commentRef);

	if (!commentSnapshot.exists()) {
		throw new Error(`Comment with ID ${commentId} does not exist`);
	}

	const commentData = commentSnapshot.data() as Comment;

	// Update post comment count
	await updateDoc(doc(db, 'posts', commentData.postId), {
		commentCount: increment(-1)
	});

	// Delete the comment
	await deleteDoc(commentRef);

	return true;
};

// CATEGORIES QUERIES

// Create a new category
export const createCategory = async (
	db: FirebaseFirestore,
	categoryData: Omit<Category, 'id' | 'postCount'>
) => {
	const categoriesRef = collection(db, 'categories');

	// Check if slug already exists
	const slugQuery = query(categoriesRef, where('slug', '==', categoryData.slug));
	const slugSnapshot = await getDocs(slugQuery);

	if (!slugSnapshot.empty) {
		throw new Error(`Category with slug "${categoryData.slug}" already exists`);
	}

	const newCategory = {
		...categoryData,
		postCount: 0
	};

	const docRef = await addDoc(categoriesRef, newCategory);

	return { id: docRef.id, ...newCategory };
};

// Get all categories
export const getAllCategories = async (db: FirebaseFirestore) => {
	const categoriesQuery = query(collection(db, 'categories'), orderBy('name', 'asc'));

	const querySnapshot = await getDocs(categoriesQuery);

	const categories = querySnapshot.docs.map((doc) => ({
		id: doc.id,
		...(doc.data() as Category)
	}));

	return categories;
};

// Update a category
export const updateCategory = async (
	db: FirebaseFirestore,
	categoryId: string,
	categoryData: Partial<Omit<Category, 'id' | 'postCount'>>
) => {
	const categoryRef = doc(db, 'categories', categoryId);

	// If slug is being updated, check if new slug already exists
	if (categoryData.slug) {
		const categoriesRef = collection(db, 'categories');
		const slugQuery = query(categoriesRef, where('slug', '==', categoryData.slug));
		const slugSnapshot = await getDocs(slugQuery);

		if (!slugSnapshot.empty && slugSnapshot.docs[0].id !== categoryId) {
			throw new Error(`Category with slug "${categoryData.slug}" already exists`);
		}
	}

	await updateDoc(categoryRef, categoryData);

	return true;
};

// Delete a category
export const deleteCategory = async (db: FirebaseFirestore, categoryId: string) => {
	const categoryRef = doc(db, 'categories', categoryId);
	const categorySnapshot = await getDoc(categoryRef);

	if (!categorySnapshot.exists()) {
		throw new Error(`Category with ID ${categoryId} does not exist`);
	}

	const categoryData = categorySnapshot.data() as Category;

	if (categoryData.postCount > 0) {
		throw new Error(`Cannot delete category with ${categoryData.postCount} posts`);
	}

	await deleteDoc(categoryRef);

	return true;
};

// USER/AUTHOR QUERIES

// Create or update author profile
export const upsertAuthorProfile = async (
	db: FirebaseFirestore,
	authorId: string,
	authorData: Omit<Author, 'id'>
) => {
	const authorRef = doc(db, 'users', authorId);

	await updateDoc(authorRef, {
		...authorData,
		updatedAt: serverTimestamp()
	});

	return { id: authorId, ...authorData };
};

// Get author by ID
export const getAuthorById = async (db: FirebaseFirestore, authorId: string) => {
	const authorRef = doc(db, 'users', authorId);
	const authorSnapshot = await getDoc(authorRef);

	if (!authorSnapshot.exists()) return null;

	const authorData = authorSnapshot.data() as Author;

	return { id: authorId, ...authorData };
};

// Get all authors
export const getAllAuthors = async (db: FirebaseFirestore) => {
	const authorsQuery = query(collection(db, 'users'), orderBy('displayName', 'asc'));

	const querySnapshot = await getDocs(authorsQuery);

	const authors = querySnapshot.docs.map((doc) => ({
		id: doc.id,
		...(doc.data() as Author)
	}));

	return authors;
};

// ANALYTICS AND STATS

// Get blog statistics
export const getBlogStatistics = async (db: FirebaseFirestore) => {
	// Get post count
	const postsQuery = query(collection(db, 'posts'));
	const postsSnapshot = await getDocs(postsQuery);
	const totalPosts = postsSnapshot.size;

	const publishedPostsQuery = query(collection(db, 'posts'), where('published', '==', true));
	const publishedPostsSnapshot = await getDocs(publishedPostsQuery);
	const publishedPosts = publishedPostsSnapshot.size;

	// Get comment count
	const commentsQuery = query(collection(db, 'comments'));
	const commentsSnapshot = await getDocs(commentsQuery);
	const totalComments = commentsSnapshot.size;

	// Get total views and likes
	let totalViews = 0;
	let totalLikes = 0;

	postsSnapshot.forEach((doc) => {
		const data = doc.data() as Post;
		totalViews += data.viewCount || 0;
		totalLikes += data.likeCount || 0;
	});

	// Get category count
	const categoriesQuery = query(collection(db, 'categories'));
	const categoriesSnapshot = await getDocs(categoriesQuery);
	const totalCategories = categoriesSnapshot.size;

	return {
		totalPosts,
		publishedPosts,
		draftPosts: totalPosts - publishedPosts,
		totalComments,
		totalViews,
		totalLikes,
		totalCategories,
		commentsPerPost: totalPosts > 0 ? totalComments / totalPosts : 0,
		viewsPerPost: totalPosts > 0 ? totalViews / totalPosts : 0,
		likesPerPost: totalPosts > 0 ? totalLikes / totalPosts : 0
	};
};
