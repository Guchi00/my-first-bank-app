import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(__dirname, '/database.json');

export const initializeDB = (): void => {
  try {
    fs.readFileSync(DB_PATH, { encoding: "utf8", flag: "r" });
  } catch (error) {
    const emptyDB = {
      transactions: [],
      balances: []
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(emptyDB));
  }
}

//function to write to the data base
export const writeToTable = (table: string, data: unknown): void => {
  const db = readDB();
  db[table] = data;
  fs.writeFileSync(DB_PATH, JSON.stringify(db)); //it replaces it with the new data when we write to the file database.JSON
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const readDB = (): { [key: string]: any } => {
  const rawDb = fs.readFileSync(DB_PATH, { encoding: "utf8", flag: "r" });
  const db = JSON.parse(rawDb);
  return db;
};

//read from a data base function
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const readTable = (table: string): { [key: string]: any } => {
  const rawDb = fs.readFileSync(DB_PATH, { encoding: "utf8", flag: "r" });
  const db = JSON.parse(rawDb);
  return db[table];
};
