import { formatMessageTimestamp } from './dateUtils';

describe('formatMessageTimestamp', () => {
  beforeAll(() => {
    // Mock console.error to avoid polluting test output
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    // Restore original implementation
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    console.error.mockRestore();
  });

  it('should return an empty string for undefined', () => {
    expect(formatMessageTimestamp(undefined as unknown as number)).toBe('');
  });

  it('should return an empty string for null', () => {
    expect(formatMessageTimestamp(null as unknown as number)).toBe('');
  });

  it('should return an empty string for NaN', () => {
    expect(formatMessageTimestamp(NaN)).toBe('');
  });

  it('should return an empty string for non-number input', () => {
    expect(formatMessageTimestamp('not-a-number' as unknown as number)).toBe('');
    expect(formatMessageTimestamp({} as number)).toBe('');
    expect(formatMessageTimestamp([] as unknown as number)).toBe('');
  });

  it('should return empty string when Date constructor throws error', () => {
    // Simulate invalid date that might throw in Date constructor
    jest.spyOn(global, 'Date').mockImplementationOnce(() => {
      throw new Error('Invalid date');
    });

    expect(formatMessageTimestamp(1234567890)).toBe('');
  });
});