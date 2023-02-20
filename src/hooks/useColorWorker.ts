import { useEffect, useRef, useState } from 'react';
import { WorkerTypeColor } from '../Main/types/worker.type';
import { useBrowser } from './useBrowser';

export const useColorWorker = (srcToWorker: string | URL) => {
  const [loading, isLoading] = useState(false);
  const [error, setError] = useState<null | { message: string }>(null);
  const [colors, setColors] = useState<Array<string>>([]);
  const worker = useRef(new Worker(srcToWorker, { type: 'module' })).current;
  const borwser = useBrowser();

  const hanlder = (urlToImage: string) => {
    isLoading(true);
    worker.postMessage(urlToImage);
  };

  useEffect(() => {
    if (borwser === 'MSIE' || borwser === 'Firefox') {
      setError({
        message: 'your browser does not support the part of the technology that this script uses',
      });
    } else {
      const workerEvent = (event: MessageEvent<WorkerTypeColor>) => {
        if (event.data.type === 'success') {
          setColors(event.data.value);
        } else if (event.data.type === 'error') {
          setError({ message: `${event.data.value}` });
        }
        isLoading(false);
      };

      worker.addEventListener('message', workerEvent);

      return () => {
        worker.removeEventListener('message', workerEvent);
      };
    }
  }, []);

  return {
    hanlder,
    colors,
    loading,
    error,
  };
};
