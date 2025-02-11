import { db } from '$lib/firebase';
import {
	collection,
	getDocs,
	limit,
	orderBy,
	query,
	QueryDocumentSnapshot
} from 'firebase/firestore';

export const load = async () => {
	try {
		const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(3));
		const querySnapshot = await getDocs(q);

		const posts = querySnapshot.docs.map((doc: QueryDocumentSnapshot) => {
			const data = doc.data();
			return {
				...data,
				createdAt: data.createdAt.toDate(),
				updatedAt: data.updatedAt.toDate()
			};
		});
		console.info(posts);
		return { posts };
	} catch (err) {
		console.log(err);
		return {};
	}
};
