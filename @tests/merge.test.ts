import merge from '../src';

describe('EasyWebWorker', () => {
  beforeEach(() => {});

  describe('merge', () => {
    it('should merge simple strings', () => {
      expect(merge('a', 'b', 'c')).toBe('a b c');
    });

    it('should filter simple strings', () => {
      expect(merge('a', 'b', 'c', () => () => false)).toBe('');
    });

    it('should filter with simple exclusion', () => {
      expect(merge('a', 'b', 'c', () => ['b'])).toBe('a c');
    });

    it('should merge string arrays', () => {
      expect(merge(['a', 'b', 'c'])).toBe('a b c');
      expect(merge(['a', 'b', 'c'], ['d', 'e', 'f'])).toBe('a b c d e f');
    });

    it('should not have duplicates', () => {
      expect(merge(['a', 'b', 'c'], ['a', 'b', 'c'])).toBe('a b c');
    });

    it('should merge objects', () => {
      expect(merge({ a: true, b: false, c: true })).toBe('a c');
    });

    it('should merge objects with arrays', () => {
      expect(merge({ a: true, b: false, c: true }, ['d', 'e', 'f'])).toBe(
        'a c d e f'
      );
    });

    it('should merge objects with arrays and filter', () => {
      expect(
        merge({ a: true, b: false, c: true }, ['d', 'e', 'f'], () => ['d'])
      ).toBe('a c e f');
    });

    it('should merge groups with their own filters', () => {
      expect(merge(['a', 'b', 'c', () => ['a', 'b']], ['d', 'e', 'f'])).toBe(
        'c d e f'
      );

      expect(
        merge(['a', 'b', 'c', () => ['a', 'b']], ['d', 'e', 'f'], () => [
          'd',
          'e',
        ])
      ).toBe('c f');
    });

    it('should merge groups with their own filters and objects', () => {
      expect(
        merge(
          ['a', 'b', 'c', () => ['a', 'b']],
          ['d', 'e', 'f'],
          { a: true, b: false, c: true },
          /// c d e f a
          () => ['d', 'e']
        )
      ).toBe('c f a');

      expect(
        merge(
          ['a', 'b', () => ['b']],
          ['c', 'd', () => ['d']],
          [
            {
              e: true,
              f: true,
            },
            () => ['e'],
          ]
        )
      ).toBe('a c f');
    });

    it('should merge everything', () => {
      expect(
        merge(
          '1',
          '2',
          ['a', 'b', () => ['b']],
          ['c', 'd', () => ['d']],
          [
            {
              e: true,
              f: true,
            },
            () => ['e'],
          ],
          { h: true, i: true },
          () => (value) => value !== '1'
        )
      ).toBe('2 a c f h i');
    });

    it('should exclude the whole group', () => {
      expect(merge('a', ['b', 'c', false])).toBe('a');
    });

    it('should preserve the whole group', () => {
      expect(merge('a', ['b', 'c', true])).toBe('a b c');
    });
  });
});
