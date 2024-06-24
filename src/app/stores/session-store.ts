import { createStore } from 'zustand/vanilla';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

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
    id: parseInt(getCookie('userId')?? '') || 0,
    username: getCookie('username') || ''
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
        setCookie('userId', user.id.toString());
        setCookie('username', user.username);
        set({ user: user });
        return true;
      } else {
        return false;
      }
    },
    logout: () => {
      deleteCookie('userId');
      deleteCookie('username');
      set({ user: { id: 0, username: '' } });
    }
  }));
}