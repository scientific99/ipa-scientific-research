// AuthContext.tsx
import React, { ReactNode, createContext, useContext, useState } from 'react';

interface AuthContextType {
    isLogin: boolean;
    prefix: String;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
    setPrefix: React.Dispatch<React.SetStateAction<string>>;
}
interface AuthProviderProps {
    children: ReactNode;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [prefix, setPrefix] = useState<string>("/");

    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin, prefix, setPrefix }}>
            {children}
        </AuthContext.Provider>
    );
};
