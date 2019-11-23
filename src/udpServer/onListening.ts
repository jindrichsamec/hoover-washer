import { Socket } from 'dgram';

export const createOnListeningHandler = (server: Socket) => () => {
  const address = server.address();
  const listeningAddress =
    typeof address === 'string'
      ? address
      : `${address.address}:${address.port}`;
  console.log(`server listening ${listeningAddress}`);
};
