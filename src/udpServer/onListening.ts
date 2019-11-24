import { Socket } from 'dgram';
import { debug } from '../debug';

export const createOnListeningHandler = (server: Socket) => () => {
  const address = server.address();
  const listeningAddress =
    typeof address === 'string'
      ? address
      : `${address.address}:${address.port}`;
  debug(`server listening ${listeningAddress}`);
};
