import React from "react";
import AuthProvider from "./AuthProvider";
import NotificationProvider from "./NotificationProvider";
import ThemeProvider from "./ThemeProvider";
import DeveloperProvider from "./developerProvider";



export default function ContextProviders({ children }) {
  return (
    
    <NotificationProvider>
      <AuthProvider>
        <DeveloperProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </DeveloperProvider>
      </AuthProvider>
    </NotificationProvider>
  );
}
