// import React, { createContext, useContext, ReactNode } from 'react';
// import { Resend } from 'resend';

// const ResendContext = createContext<Resend | undefined>(undefined);

// interface ResendProviderProps {
//     children: ReactNode;
// }

// export const ResendProvider: React.FC<ResendProviderProps> = ({ children }) => {
//     const apiKey = import.meta.env.VITE_RESEND_API_KEY;
//     if (!apiKey) {
//         throw new Error('REACT_APP_RESEND_API_KEY must be set in environment variables');
//     }
//     const resend = new Resend(apiKey);

//     return (
//         <ResendContext.Provider value={resend}>
//             {children}
//         </ResendContext.Provider>
//     );
// };

// export const useResend = (): Resend => {
//     const context = useContext(ResendContext);
//     if (!context) {
//         throw new Error('useResend must be used within a ResendProvider');
//     }
//     return context;
// };

// export const sendEmail = (message: string) => {
//     const resend = useResend();
//     // Assuming `send` is a method on the `Resend` instance that sends an email
//     resend.send({ message });
// };
