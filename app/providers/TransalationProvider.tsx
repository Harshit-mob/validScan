import React, { createContext, useEffect, useState, ReactNode } from 'react';

import i18n, { initializeLanguage, changeLanguage } from '../utils/i18nUtils';

interface TranslationContextProps {
    language: string;
    setAppLanguage: (lang: string) => Promise<void>;
    t: (key: string, options?: Record<string, unknown>) => string;
}

export const TranslationContext = createContext<TranslationContextProps>({
    language: 'en',
    setAppLanguage: async () => {},
    t: (key) => key,
});

const TranslationProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<string>(i18n.locale);

    // Initialize language when the app loads
    useEffect(() => {
        const setupLanguage = async () => {
            const detectedLang = await initializeLanguage();
            setLanguage(detectedLang);
        };

        setupLanguage();
    }, []);

    // Function to change the language and persist it
    const setAppLanguage = async (lang: string) => {
        await changeLanguage(lang);
        setLanguage(lang);
    };

    return (
        <TranslationContext.Provider
            value={{
                language,
                setAppLanguage,
                t: (key, options) => i18n.t(key, options),
            }}
        >
            {children}
        </TranslationContext.Provider>
    );
};

export default TranslationProvider;
