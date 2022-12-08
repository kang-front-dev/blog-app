import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAuahOHhMWEHOK0Au1nneBJ2EQDPHqUM70',
  authDomain: 'blog-app-kang.firebaseapp.com',
  projectId: 'blog-app-kang',
  storageBucket: 'blog-app-kang.appspot.com',
  messagingSenderId: '394365759381',
  appId: '1:394365759381:web:e2136ea572e7339e4fd09c',
  measurementId: 'G-XRPFFJ3S7F',
};
const storageUrl = 'gs://blog-app-kang.appspot.com';
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app, storageUrl);
const reviewsImgPath = 'reviews-img';
export async function uploadFile(file: File) {
  const hashName = hashCode(file.name);
  const imageRef = ref(storage, `/${reviewsImgPath}/${hashName}`);
  await uploadBytes(imageRef, file).then((snapshot) => {
    console.log('File is uploaded!');
  });
  const resultPath = await getDownloadURL(imageRef);

  return resultPath ? resultPath : '';
}

const hashCode = function (str: string) {
  var hash = 0,
    i,
    chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
