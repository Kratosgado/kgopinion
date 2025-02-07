import { collection, addDoc, serverTimestamp, doc, setDoc, getDoc } from 'firebase/firestore';
import { db, storage } from '$lib/firebase';
import type { Post } from '$lib/types';
import { error } from '@sveltejs/kit';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export async function savePostOrUpdate(post: Post): Promise<string> {
	try {
		const slug = generateSlug(post.title);
		// Update existing document.
		const postRef = doc(db, 'posts', slug);
		await setDoc(
			postRef,
			{
				...post,
				slug,
				createdAt: post.createdAt || serverTimestamp(),
				updatedAt: serverTimestamp()
			},
			{ merge: true }
		);
		return 'post updated successfully';
	} catch (error) {
		console.error('Error saving post:', error);
		return (error as any).message;
	}
}

export async function uploadImage(file: File, path: string): Promise<string> {
	try {
		const storageRef = ref(storage, path);
		await uploadBytes(storageRef, file);
		const downloadUrl = await getDownloadURL(storageRef);
		return downloadUrl;
	} catch (error) {
		console.error('Error uploading image:', error);
		throw error;
	}
}
export async function getPost(postId: string): Promise<Post | null> {
	try {
		console.log('finding post ' + postId);
		const postRef = doc(db, 'posts', postId);
		const docSnap = await getDoc(postRef);
		if (docSnap.exists()) {
			const data = docSnap.data()
			return {
				...data,
				createdAt: data.createdAt.toDate(),
				updatedAt: data.updatedAt.toDate()
			} as Post;
		} else {
			return null;
		}
	} catch (error) {
		console.error('Error retrieving post:', error);
		throw error;
	}
}

export async function togglePublish(id: string, publish: boolean) {
	try {
		await setDoc(doc(db, 'post', id), {
			published: publish
		});
		console.log('Post published');
	} catch (err) {
		console.error('Error publishing post', error);
		throw err;
	}
}

export function formatDate(date: Date): string {
	return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(date);
}

function generateSlug(title: string) {
	return title
		.toLowerCase()
		.replace(/[^\w\s-]/g, '') // Remove special characters
		.replace(/\s+/g, '-') // Replace spaces with hyphens
		.trim();
}
