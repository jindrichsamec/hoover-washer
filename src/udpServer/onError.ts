import { Socket } from 'dgram';
import { debug } from '../debug';

export const createOnErrorHandler = (socket: Socket) => (err: Error) => {
  socket.close();
  debug(`server error: ${err.message} \n${err.stack}`);
};
