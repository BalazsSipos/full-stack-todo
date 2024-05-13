import { QueryCache, QueryClient } from 'react-query';
import { createIDBPersister } from './cache/persist-with-indexeddb';
import { persistQueryClient } from 'react-query/persistQueryClient-experimental';
import { useEffect, useState } from 'react';

const queryCache = new QueryCache();
export const queryClient = new QueryClient({
  queryCache,
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24 * 2, // 24 hours
    },
  },
});

const clientCacheSetup = persistQueryClient({
  queryClient,
  persistor: createIDBPersister(),
  buster: '3',
});

export const useQueryCacheReady = () => {
  const [cacheReady, setCacheReady] = useState(false);

  useEffect(() => {
    if (!cacheReady) {
      clientCacheSetup.then(() => {
        setCacheReady(true);
      });
    }
  }, [cacheReady]);

  return cacheReady;
};
