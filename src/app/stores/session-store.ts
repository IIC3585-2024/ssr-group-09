import { createStore } from 'zustand/vanilla';

export type SessionState = {
  user: { id: number, username: string } | null;
}

export type SessionActions = {
  user: { id: number, username: string } | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export type SessionStore = SessionState & SessionActions;

export const defaultSessionState: SessionState = {
  user: {
    id: localStorage.getItem('userId') ? parseInt(localStorage.getItem('userId') as string) : 0,
    username: localStorage.getItem('username') || '',
  },
}

export const createSessionStore = (
  initialState = defaultSessionState
) => {
  return createStore<SessionActions>()((set) => ({
    ...initialState,
    login: async (username, password) => {
      const response = await fetch(`http://localhost:3001/users?username=${username}&password=${password}`);
      const users = await response.json();
      if (users.length > 0) {
        const user = users[0];
        localStorage.setItem('userId', user.id);
        localStorage.setItem('username', user.username);
        set({ user: user });
        return true;
      } else {
        return false;
      }
    },
    logout: () => {
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      set({ user: null });
    }
  }));
}