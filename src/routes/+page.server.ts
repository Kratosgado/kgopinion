import { db } from '$lib/firebase';
import {
	collection,
	query,
	orderBy,
	getDocs,
	QueryDocumentSnapshot,
	limit,
	Timestamp
} from 'firebase/firestore';

export const load = async () => {
	// const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), { limit: 3 });
	try {
		const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(3));
		const querySnapshot = await getDocs(q);

		const posts = querySnapshot.docs.map((doc: QueryDocumentSnapshot) => ({
			id: doc.id,
			...doc.data(),
			createdAt: new Date()
		}));
		console.info(posts);
		return { posts };
	} catch (err) {
		console.log(err);
		return {};
	}
};
