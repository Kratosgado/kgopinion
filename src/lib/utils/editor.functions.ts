import { error } from '@sveltejs/kit';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from './firebase';
import type { Post } from './types';

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
