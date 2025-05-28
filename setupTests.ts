import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Add these global mocks
global.TextEncoder = TextEncoder;
// @ts-ignore
global.TextDecoder = TextDecoder;

// Mock window.matchMedia which is used by Material-UI
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};