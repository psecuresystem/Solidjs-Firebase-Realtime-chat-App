import { createSignal } from 'solid-js';

export const [messages] = createSignal([
  {
    from: 'vision',
    message: 'Hi all',
  },
  {
    from: 'visions',
    message: 'Hi bro',
  },
  {
    from: 'vision',
    message: 'Whats up',
  },
  {
    from: 'visions',
    message: `So I was here minding my business jellyfishing.
            Then I saw a bug in the code below:
            \`\`\`
            .App {
                max-width: 500px;
                margin: 0 auto;
                height: 100vh;
                overflow-y: hidden;
                scroll-behavior: smooth;
            }
            \`\`\``,
  },
]);
