import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const USERS_KEY = 'cc_users';
const SESSION_KEY = 'cc_session_email';

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const sessionEmail = localStorage.getItem(SESSION_KEY);
    if (!sessionEmail) return null;
    return loadUsers().find((u) => u.email === sessionEmail) ?? null;
  });

  const signUp = ({ name, email, password, birthday }) => {
    const users = loadUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { error: 'An account with this email already exists.' };
    }
    const newUser = {
      id: `u_${Date.now()}`,
      name,
      email,
      password,
      birthday,
      hasOrdered: false,
      createdAt: new Date().toISOString(),
    };
    saveUsers([...users, newUser]);
    localStorage.setItem(SESSION_KEY, newUser.email);
    setUser(newUser);
    return { user: newUser };
  };

  const logIn = ({ email, password }) => {
    const found = loadUsers().find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) return { error: 'Incorrect email or password.' };
    localStorage.setItem(SESSION_KEY, found.email);
    setUser(found);
    return { user: found };
  };

  const logOut = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const markOrdered = () => {
    setUser((current) => {
      if (!current) return current;
      const users = loadUsers().map((u) =>
        u.email === current.email ? { ...u, hasOrdered: true } : u
      );
      saveUsers(users);
      return { ...current, hasOrdered: true };
    });
  };

  const value = { user, signUp, logIn, logOut, markOrdered };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
