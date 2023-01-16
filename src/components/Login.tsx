import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Component } from 'solid-js';
import { app } from '..';

export const Login: Component<{}> = (props) => {
  const signIn = () => signInWithPopup(getAuth(app), new GoogleAuthProvider());

  return <button onClick={signIn}>Sign In with Google</button>;
};
