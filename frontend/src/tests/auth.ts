import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail, User } from 'firebase/auth';

export const login = async (email: string, password: string): Promise<User> => {
  const auth = getAuth();
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const signup = async (email: string, password: string): Promise<User> => {
  const auth = getAuth();
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const logout = async (): Promise<void> => {
  const auth = getAuth();
  await signOut(auth);
};

export const resetPassword = async (email: string): Promise<void> => {
  const auth = getAuth();
  await sendPasswordResetEmail(auth, email);
};
