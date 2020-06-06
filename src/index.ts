#!/usr/bin/env node

import config from './config';
import { createServer } from './udpServer/server';

createServer().bind(config.udpServerPort);
