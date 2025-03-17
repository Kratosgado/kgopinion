import { getDoc } from 'firebase/firestore';
import { getDocRef } from './helpers';
import type { Author } from '$lib/utils';

export async function getAuthor(id: string) {
	const authorDoc = await getDoc(getDocRef('admins', id));
	if (authorDoc.exists()) {
		return authorDoc.data() as Author;
	}
	return undefined;
}
