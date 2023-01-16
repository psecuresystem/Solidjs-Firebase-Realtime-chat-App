import { Component, createSignal, For, Match, onMount, Switch } from 'solid-js';

import { v4 as uuidv4 } from 'uuid';
import { app } from '.';
import { Chat } from './components/Chat';
import { Login } from './components/Login';
import useAuth from './hooks/useAuth';

const App: Component = () => {
  const authState = useAuth(app);

  return (
    <Switch>
      <Match when={authState.loading}>
        <p>Loading...</p>
      </Match>
      <Match when={authState.error}>
        <p>Error</p>
      </Match>
      <Match when={authState.user}>
        <Chat />
      </Match>
    </Switch>
  );
};

export default App;
