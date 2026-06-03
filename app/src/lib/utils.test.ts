import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
  it('should merge class names correctly', () => {
    expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white');
  });

  it('should filter out falsy values', () => {
    const isTextWhite = false;
    expect(cn('bg-red-500', isTextWhite && 'text-white', null, undefined, 'p-4')).toBe('bg-red-500 p-4');
  });

  it('should resolve Tailwind CSS conflicts', () => {
    expect(cn('px-2 py-1', 'p-4')).toBe('p-4');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });
});
