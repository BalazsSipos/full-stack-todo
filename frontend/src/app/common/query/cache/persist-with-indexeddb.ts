import { PersistedClient, Persistor } from 'react-query/persistQueryClient-experimental';
import { del, get, set } from 'idb-keyval';

let persistableClient: PersistedClient | undefined;

export const persistReactQueryIndexedDBStorage = async () => {
  if (!persistableClient) {
    return;
  }
  await set('reactQuery', JSON.stringify(persistableClient)).catch((error) => {
    console.group('IndexedDB persister');
    console.error(error);
    console.log(persistableClient);
    console.groupEnd();
  });
  persistableClient = undefined;
};

setInterval(persistReactQueryIndexedDBStorage, 1000);

/**
 * Creates an Indexed DB persister
 * @see https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
 */
export function createIDBPersister(idbValidKey: IDBValidKey = 'reactQuery') {
  return {
    persistClient: async (client: PersistedClient) => {
      persistableClient = client;
    },
    restoreClient: async () => {
      const raw = await get<string>(idbValidKey);
      if (!raw) {
        return undefined;
      }
      return JSON.parse(raw) as PersistedClient;
    },
    removeClient: () => del(idbValidKey),
  } as Persistor;
}
