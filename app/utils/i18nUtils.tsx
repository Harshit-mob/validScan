import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import en from '../transalations/en.json'
import zh from '../transalations/zh.json'
import ja from '../transalations/ja.json'
import ko from '../transalations/ko.json'
// import { getStoredLanguage, storeLanguage } from '../database'; // SQLite helpers

// Create a new instance of I18n
const i18n = new I18n({
    en,
    zh,
    ja,
    ko,
});

// Configure fallbacks
i18n.enableFallback = true;

// Set the default locale
i18n.defaultLocale = 'en';

// Set the initial locale based on the device's settings
i18n.locale = Localization.locale.split('-')[0]; // For example, "en-US" becomes "en"


// Initialize language from storage or device settings
export const initializeLanguage = async (): Promise<string> => {
    // const storedLang = await getStoredLanguage(); // Retrieve language from SQLite
    // const detectedLang = storedLang || i18n.locale; // Use stored language or detected locale
    const detectedLang =  i18n.locale; // Use stored language or detected locale
    i18n.locale = detectedLang;
    return detectedLang;
};

// Change language and persist it in storage
export const changeLanguage = async (lang: string): Promise<void> => {
    i18n.locale = lang;
    // await storeLanguage(lang); // Save language in SQLite
};

export default i18n;
