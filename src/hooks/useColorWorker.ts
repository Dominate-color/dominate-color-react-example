import { useEffect, useRef, useState } from 'react';
import { WorkerTypeColor } from '../Main/types/worker.type';
import { useBrowser } from './useBrowser';

export const useColorWorker = (srcToWorker: string | URL) => {
  const [loading, isLoading] = useState(false);
  const [error, setError] = useState<null | { message: string }>(null);
  const [colors, setColors] = useState<Array<string>>([]);
  const workerRef = useRef<Worker | null>(null);
  const borwser = useBrowser();

  const hanlder = async (fileImage: File) => {
    isLoading(true);

    fileImage
      .arrayBuffer()
      .then((arrayBuffer) => {
        if (workerRef.current === null) {
          throw new Error('worker is not initialized');
        }
        workerRef.current.postMessage(arrayBuffer);
      })
      .catch((error) => {
        setError({ message: `${error}` });
        isLoading(false);
      });
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
      const worker = new Worker(srcToWorker, { type: 'module' });
      worker.addEventListener('message', workerEvent);
      workerRef.current = worker;

      return () => {
        worker.removeEventListener('message', workerEvent);
        worker.terminate();
      };
    }
  }, []);

  return {
    hanlder,
    colors,
    loading,
    error,
    setColors,
  };
};
