/* eslint-disable ts/ban-ts-comment */
/* eslint-disable no-restricted-globals */

import '@testing-library/react-native/extend-expect';

// Mock react-native-mmkv (v4 runs on Nitro Modules, which have no native side in Jest).
// Same mock as the Obytes v9 template.
jest.mock('react-native-mmkv', () => ({
  MMKV: jest.fn(() => ({
    set: jest.fn(),
    getString: jest.fn(),
    getNumber: jest.fn(),
    getBoolean: jest.fn(),
    delete: jest.fn(),
    clearAll: jest.fn(),
    getAllKeys: jest.fn(() => []),
  })),
  useMMKVString: jest.fn((_key: string) => [undefined, jest.fn()]),
  useMMKVNumber: jest.fn((_key: string) => [undefined, jest.fn()]),
  useMMKVBoolean: jest.fn((_key: string) => [undefined, jest.fn()]),
  useMMKVObject: jest.fn((_key: string) => [undefined, jest.fn()]),
  createMMKV: jest.fn(() => ({
    set: jest.fn(),
    getString: jest.fn(),
    getNumber: jest.fn(),
    getBoolean: jest.fn(),
    remove: jest.fn(),
    delete: jest.fn(),
    clearAll: jest.fn(),
    getAllKeys: jest.fn(() => []),
  })),
}));

// react-hook form setup for testing
// @ts-expect-error
global.window = {};
// @ts-expect-error
global.window = global;
