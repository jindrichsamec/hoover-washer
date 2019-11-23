import * as dgram from 'dgram';
import { createOnErrorHandler } from './onError';
import { onMessage } from './onMessage';
import { createOnListeningHandler } from './onListening';

export const createServer = () => {
  const socket = dgram.createSocket('udp4');
  socket.on('error', createOnErrorHandler(socket));
  socket.on('message', onMessage);
  socket.on('listening', createOnListeningHandler(socket));
  return socket;
};
