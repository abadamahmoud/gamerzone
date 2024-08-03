// src/context/UserContext.tsx
"use client"
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { User } from '@/types';

interface UserContextProps {
  user: User | null;
  loading: boolean;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextProps>({ user: null, loading: true });

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchUser = async () => {
      if (session?.user && session.user.email) {

        try {
          const response = await fetch(`/api/getUser?email=${session.user.email}`);
          const data = await response.json();
          
          if (response.ok) {
            setUser(data as User);
          } else {
            console.error('Error fetching user:', data.error);
            setUser(null);
          }
        } catch (error) {
          console.error('Error fetching user:', error);
          setUser(null);
        }
      }
      setLoading(false);
    };

    if (status !== 'loading') {
      fetchUser();
    }
  }, [session, status]);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
