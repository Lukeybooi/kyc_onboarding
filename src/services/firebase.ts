import { initializeApp } from 'firebase/app';
import {
  Database,
  ref as dbRef,
  getDatabase,
  off,
  onValue,
  push
} from 'firebase/database';
import {
  FirebaseStorage,
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytes
} from 'firebase/storage';
import { Message } from '../types/messages';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const database: Database = getDatabase(app);
const storage: FirebaseStorage = getStorage(app);

export const sendMessage = (deviceType: 'desktop' | 'mobile', message: string): Promise<void> => {
  const messagesRef = dbRef(database, 'messages');
  return push(messagesRef, {
    deviceType,
    message,
    timestamp: Date.now()
  }).then(() => {});
};

export const subscribeToMessages = (
  callback: (messages: Message[]) => void
): (() => void) => {
  const messagesRef = dbRef(database, 'messages');
  const listener = onValue(messagesRef, (snapshot) => {
    const messages: Message[] = [];
    snapshot.forEach((childSnapshot) => {
      messages.push({
        id: childSnapshot.key as string,
        ...childSnapshot.val()
      } as Message);
    });
    callback(messages);
  });

  return () => off(messagesRef, listener as any);
};

export const uploadFile = async (file: File): Promise<string> => {
  try {
    const fileRef = storageRef(storage, `uploads/${Date.now()}_${file.name}`);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  } catch (error) {
    throw error;
  }
};

export { database, storage };

