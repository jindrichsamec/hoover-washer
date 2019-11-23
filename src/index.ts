import config from './config'
import { createServer } from './udpServer/server';

createServer().bind(config.udpServerPort)
