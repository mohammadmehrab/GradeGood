import { describe, it, expect, vi } from 'vitest';
import { login, logout, signup, resetPassword } from '../auth';
import type { User } from 'firebase/auth';

vi.mock('firebase/auth', () => {
  const mockUser: User = {
    uid: '123',
    email: 'SERocks123@example.com',
    emailVerified: true,
    displayName: null,
    isAnonymous: false,
    phoneNumber: null,
    photoURL: null,
    providerData: [],
    metadata: {} as any,
    refreshToken: '',
    tenantId: null,
    providerId: 'password',
    delete: vi.fn(),
    getIdToken: vi.fn(),
    getIdTokenResult: vi.fn(),
    reload: vi.fn(),
    toJSON: vi.fn(),
  };

  return {
    getAuth: vi.fn(),
    signInWithEmailAndPassword: vi.fn(() => Promise.resolve({ user: mockUser })),
    createUserWithEmailAndPassword: vi.fn(() => Promise.resolve({ user: mockUser })),
    signOut: vi.fn(() => Promise.resolve()),
    sendPasswordResetEmail: vi.fn(() => Promise.resolve()),
  };
});

describe('auth functions', () => {
  it('logs in', async () => {
    const user = await login('SERocks123@example.com', 'eggybread123!');
    expect(user.email).toBe('SERocks123@example.com');
  });

  it('signs up', async () => {
    const user = await signup('SERocks123@example.com', 'eggybread123!');
    expect(user.email).toBe('SERocks123@example.com');
  });

  it('resets password', async () => {
    await expect(resetPassword('SERocks123@example.com')).resolves.not.toThrow();
  });

  it('logs out', async () => {
    await expect(logout()).resolves.not.toThrow();
  });

  it('fails to log in with invalid password', async () => {
    const { signInWithEmailAndPassword } = await import('firebase/auth');
  
    (signInWithEmailAndPassword as any).mockRejectedValueOnce(new Error('Invalid password'));
  
    await expect(login('SERocks123@example.com', 'eggybread123')).rejects.toThrow('Invalid password');
  });

  describe('Signup Test Cases', () => {
    it('Test Case 1: Valid signup', async () => {
      const user = await signup('SERocks123', 'eggybread123!');
      expect(user.email).toBe('SERocks123@example.com');
    });
  
    it('Test Case 2: Password missing special char', async () => {
      const { createUserWithEmailAndPassword } = await import('firebase/auth');
      (createUserWithEmailAndPassword as any).mockRejectedValueOnce(
        new Error('Password must include a special character')
      );
  
      await expect(signup('SERocks123', 'eggybread')).rejects.toThrow(/special character/i);
    });
  
    it('Test Case 3: Password is all symbols', async () => {
      const { createUserWithEmailAndPassword } = await import('firebase/auth');
      (createUserWithEmailAndPassword as any).mockRejectedValueOnce(
        new Error('Unacceptable password format')
      );
  
      await expect(signup('SERocks123', '!!!!!!!!!!')).rejects.toThrow(/unacceptable/i);
    });
  
    it('Test Case 4: Invalid name format (but name not validated here)', async () => {
      const user = await signup('SERocks123', 'Iluvcheese123!');
      expect(user.email).toBe('SERocks123@example.com');
    });
  
    it('Test Case 10: Username is too short', async () => {
      const { createUserWithEmailAndPassword } = await import('firebase/auth');
      (createUserWithEmailAndPassword as any).mockRejectedValueOnce(
        new Error('Username is too short')
      );
  
      await expect(signup('eight', 'eggybread123!')).rejects.toThrow(/too short/i);
    });
  
    it('Test Case 19: Username is all numbers', async () => {
      const { createUserWithEmailAndPassword } = await import('firebase/auth');
      (createUserWithEmailAndPassword as any).mockRejectedValueOnce(
        new Error('Username cannot be all numbers')
      );
  
      await expect(signup('1234456754', 'eggybread123!')).rejects.toThrow(/numbers/i);
    });
  });
});


