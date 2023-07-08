import { describe, expect, it } from 'vitest';
import List from '../src/lib/list.js';

describe('List', () => {
  describe('constructor', () => {
    it('should only accept string as the argument', () => {
      expect(() => new List()).toThrow();
      expect(() => new List(1)).toThrow();
      expect(() => new List({})).toThrow();
      expect(() => new List([])).toThrow();
      expect(() => new List(() => { })).toThrow();
      expect(() => new List(null)).toThrow();
      expect(() => new List(undefined)).toThrow();
      expect(() => new List(true)).toThrow();
      expect(() => new List(BigInt(1))).toThrow();
      expect(() => new List(Symbol('test'))).toThrow();

      expect(() => new List('test')).not.toThrow();
    });

    it('should set the data property to an empty array', () => {
      const list = new List('test');

      expect(list.data).toEqual([]);
    });

    it('should store the data property in localStorage', () => {
      new List('test');
      const storedData = JSON.parse(localStorage.getItem('test'));

      expect(storedData).toEqual([]);
    });
  });

  describe('use', () => {
    it('should returns a List object with the same data as in the localStorage', () => {
      localStorage.clear();
      localStorage.setItem('test', '["data"]');
      const list = List.use('test');

      expect(list).toBeInstanceOf(List);
      expect(list.data).toEqual(["data"]);
    });
  });
});