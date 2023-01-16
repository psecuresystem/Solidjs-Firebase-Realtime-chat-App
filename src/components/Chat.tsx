import { createEffect, createSignal, For, on } from 'solid-js';
import styles from '../App.module.css';
import useFirestore from '../hooks/useFirestore';
import { app } from '..';
import useAuth from '../hooks/useAuth';

export const Chat = () => {
  const { addData, getData } = useFirestore(app);
  const [messageTerm, setMessageTerm] = createSignal('');
  const data = getData('chats');
  const authState = useAuth(app);
  let submit_input: any;
  let container: any;

  function handleSubmit() {
    addData('chats', {
      message: messageTerm(),
    });
    submit_input.value = '';
  }

  createEffect(
    on(data, () => {
      container.scrollTop = container.scrollHeight;
    })
  );

  return (
    <div class={styles.App}>
      <h1>Message the Group</h1>
      <div class={styles.App__messages} ref={container}>
        <For each={data()}>
          {(message) => (
            <div
              class={
                message.from == authState?.user?.uid
                  ? styles.App__messageLocal
                  : styles.App__messageForeign
              }
            >
              {message.message}
            </div>
          )}
        </For>
      </div>
      <div class={styles.App__input}>
        <textarea
          placeholder='Message the group'
          onKeyUp={(e) => setMessageTerm(e.currentTarget.value)}
          ref={submit_input}
        />
        <button class={styles.App__button} onClick={handleSubmit}>
          Send
        </button>
      </div>
    </div>
  );
};
