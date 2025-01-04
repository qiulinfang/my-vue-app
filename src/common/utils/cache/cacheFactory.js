import { LocalStorageHelper } from './localStorage';
import { SessionStorageHelper } from './sessionStorage';
import { IndexedDBHelper } from './indexedDB';

export class CacheFactory {
    static createCache(type) {
      switch (type) {
        case 'localStorage':
          return new LocalStorageHelper();
        case 'sessionStorage':
          return new SessionStorageHelper();
        case 'indexedDB':
          return new IndexedDBHelper();
        default:
          throw new Error('Unsupported cache type');
      }
    }
  }
  