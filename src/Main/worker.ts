import { colorDetection } from '@dominate-color-js/core';
import { WorkerError, WorkerSuccess, MessageEventWorker } from './types/worker.type';

type error = { stack: string };

try {
  // eslint-disable-next-line no-restricted-globals
  const ctx = self;

  ctx.addEventListener('message', (event: MessageEventWorker) => {
    console.log('work');
    colorDetection(event.data, 'fast', 5)
      .then((colors) => {
        const colorsString = colors.map((color) => `rgb(${color[0]},${color[1]},${color[2]})`);
        const message: WorkerSuccess = {
          type: 'success',
          value: colorsString,
        };
        postMessage(message);
      })
      .catch((error: error) => {
        const message: WorkerError = {
          type: 'error',
          value: JSON.stringify(error),
        };
        postMessage(message);
      });
  });
} catch (e) {
  const message: WorkerError = {
    type: 'error',
    value: `error: ${e}`,
  };
  postMessage(message);
}
