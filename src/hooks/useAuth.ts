import { FirebaseApp } from 'firebase/app';
import { getAuth, signInAnonymously, User } from 'firebase/auth';
import { createStore, produce } from 'solid-js/store';

interface IAuthState {
  user: null | User;
  error: null | Error;
  loading: boolean;
}

export default function useAuth(app: FirebaseApp) {
  const [authState, setAuthState] = createStore<IAuthState>({
    user: null,
    error: null,
    loading: true,
  });
  const auth = getAuth(app);
  // Setup Listeners
  auth.onAuthStateChanged(
    (user) => {
      user &&
        setAuthState(
          produce((state) => {
            state.user = user;
            state.loading = false;
          })
        );
    },
    (error) => {
      error &&
        setAuthState(
          produce((state) => {
            state.error = error;
            state.loading = false;
          })
        );
    },
    () => {
      setAuthState(
        produce((state) => {
          state.loading = false;
        })
      );
    }
  );
  // Sign in if not already signed in
  signInAnonymously(auth).then((data) => {
    setAuthState(
      produce((state) => {
        state.user = data.user;
      })
    );
  });
  return authState;
}
