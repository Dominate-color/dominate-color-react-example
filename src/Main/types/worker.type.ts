export type WorkerError = {
  type: 'error';
  value: string;
};

export type WorkerSuccess = {
  type: 'success';
  value: string[];
};

export type MessageEventWorker = MessageEvent<ArrayBuffer>;

export type WorkerTypeColor = WorkerError | WorkerSuccess;
