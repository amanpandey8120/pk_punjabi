import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Address } from '../types';
import { INITIAL_USER } from '../data/mockUserData';

interface AuthContextType {
  user: UserProfile;
  isAuthenticated: boolean;
  login: (email: string, phone: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<UserProfile>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  setPrimaryAddress: (id: string) => void;
  toggleVegOnly: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'pk_punjabi_user_profile_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_USER;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  const login = (email: string, phone: string) => {
    setUser((prev) => ({
      ...prev,
      email: email || prev.email,
      phone: phone || prev.phone,
    }));
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  const addAddress = (address: Omit<Address, 'id'>) => {
    const newAddr: Address = {
      ...address,
      id: `addr-${Date.now()}`,
    };
    setUser((prev) => ({
      ...prev,
      savedAddresses: [...prev.savedAddresses, newAddr],
    }));
  };

  const setPrimaryAddress = (id: string) => {
    setUser((prev) => ({
      ...prev,
      savedAddresses: prev.savedAddresses.map((a) => ({
        ...a,
        isPrimary: a.id === id,
      })),
    }));
  };

  const toggleVegOnly = () => {
    setUser((prev) => ({ ...prev, vegOnlyMode: !prev.vegOnlyMode }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        updateUser,
        addAddress,
        setPrimaryAddress,
        toggleVegOnly,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

