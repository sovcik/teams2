import { logger } from './logger';

describe('logger', () => {
  it('should work', () => {
    expect(logger('')).toContain('debug');
  });
});
