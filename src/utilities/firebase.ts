import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref } from 'firebase/database';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBc9TL5IiM1ccKJe-4zLK9hi0mnlIXEsGA",
  authDomain: "react-challenges-dg.firebaseapp.com",
  databaseURL: "https://react-challenges-dg-default-rtdb.firebaseio.com",
  projectId: "react-challenges-dg",
  storageBucket: "react-challenges-dg.firebasestorage.app",
  messagingSenderId: "706944376388",
  appId: "1:706944376388:web:594ee5f1c75e2d7b5de611",
  measurementId: "G-EV9DDD529B"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useDataQuery = (path: string): [unknown, boolean, Error | undefined] => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setData(undefined);
    setLoading(true);
    setError(undefined);
    return onValue(ref(database, path), (snapshot) => {
        setData(snapshot.val());
        setLoading(false);
      }, (error) => {
        setError(error);
        setLoading(false);
      }
    );
  }, [path]);

  return [data, loading, error];
};
