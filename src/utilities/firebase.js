import { useCallback, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  connectDatabaseEmulator,
  onValue,
  ref,
  update,
} from "firebase/database";
import {
  connectAuthEmulator,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBgsuO-3XY7WLD4Z6C6YAXjj9QZuQnL__Y",
  authDomain: "react-tutorial-314.firebaseapp.com",
  databaseURL: "https://react-tutorial-314-default-rtdb.firebaseio.com",
  projectId: "react-tutorial-314",
  storageBucket: "react-tutorial-314.appspot.com",
  messagingSenderId: "283824128055",
  appId: "1:283824128055:web:137a81c1f7ecb67b6cbfb2",
  measurementId: "G-DE3Z437142",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

const auth = getAuth(firebase);

if (!window.EMULATION && import.meta.env.VITE_EMULATE) {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectDatabaseEmulator(database, "127.0.0.1", 9000);

  signInWithCredential(
    auth,
    GoogleAuthProvider.credential(
      '{"sub": "FA1FTH3e4LfhVf35hz3qCyuYR7qG", "email": "tester@gmail.com", "displayName":"Test User", "email_verified": true}'
    )
  );

  window.EMULATION = true;
}

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(
    () =>
      onValue(
        ref(database, path),
        (snapshot) => {
          setData(snapshot.val());
        },
        (error) => {
          setError(error);
        }
      ),
    [path]
  );

  return [data, error];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message =
    error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback(
    (value) => {
      update(ref(database, path), value)
        .then(() => setResult(makeResult()))
        .catch((error) => setResult(makeResult(error)));
    },
    [database, path]
  );

  return [updateData, result];
};

export const signInWithGoogle = () => {
  signInWithPopup(auth, new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useAuthState = () => {
  const [user, setUser] = useState();

  useEffect(() => onAuthStateChanged(getAuth(firebase), setUser));

  return [user];
};
