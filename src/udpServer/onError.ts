import { Socket } from 'dgram';

export const createOnErrorHandler = (socket: Socket) => (err: Error) => {
  socket.close();
  console.log(`server error: ${err.message} \n${err.stack}`);
};
