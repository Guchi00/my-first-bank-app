import supertest from 'supertest';
import fs from 'node:fs/promises';

import app from '../src/app';

const database = require("../src/database");

