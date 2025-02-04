// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// import dotenv from 'dotenv';

// dotenv.config();
// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDhsg8Ws-Ut0ieDtVnWtnGXs15AU2Oiw8Y',
	authDomain: 'zomujo-emr.firebaseapp.com',
	projectId: 'zomujo-emr',
	storageBucket: 'zomujo-emr.appspot.com',
	messagingSenderId: '738500577753',
	appId: '1:738500577753:web:281a74ebb801f9de4a71c8'
};

let app;

if (getApps().length === 0) {
	app = initializeApp(firebaseConfig);
} else {
	app = getApps()[0];
}

// Initialize Firebase
export const db = initializeFirestore(app, { experimentalAutoDetectLongPolling: false });
export const auth = getAuth(app);
export const storage = getStorage(app);
