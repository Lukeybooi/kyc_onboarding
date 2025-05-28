import { Message } from '../types/messages';

let mockMessages: Message[] = [];
let callbacks: Array<(messages: Message[]) => void> = [];

export const mockSendMessage = jest.fn(
  (deviceType: 'desktop' | 'mobile', message: string): Promise<void> => {
    const newMessage: Message = {
      id: Math.random().toString(),
      deviceType,
      message,
      timestamp: Date.now()
    };
    mockMessages = [...mockMessages, newMessage];
    callbacks.forEach(cb => cb(mockMessages));
    return Promise.resolve();
  }
);

export const mockSubscribeToMessages = jest.fn(
  (callback: (messages: Message[]) => void): (() => void) => {
    callback(mockMessages);
    callbacks.push(callback);
    return () => {
      callbacks = callbacks.filter(cb => cb !== callback);
    };
  }
);

export const clearMocks = () => {
  mockMessages = [];
  callbacks = [];
  jest.clearAllMocks();
};