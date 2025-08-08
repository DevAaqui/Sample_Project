import { UserSettings } from '@/contexts/SidebarSettingsContext';

/**
 * Updates the cached user settings in localStorage
 * @param newSettings The new settings to cache
 */
export const updateCachedSettings = (newSettings: UserSettings): void => {
  try {
    localStorage.setItem('cachedUserSettings', JSON.stringify(newSettings));
  } catch (error) {
    console.error('Failed to update cached settings:', error);
  }
};

/**
 * Retrieves the cached user settings from localStorage
 * @returns The cached user settings or null if not found
 */
export const getCachedSettings = (): UserSettings | null => {
  try {
    const cachedSettings = localStorage.getItem('cachedUserSettings');
    if (cachedSettings) {
      return JSON.parse(cachedSettings);
    }
  } catch (error) {
    console.error('Failed to get cached settings:', error);
  }
  return null;
};

/**
 * Clears the cached user settings from localStorage
 */
export const clearCachedSettings = (): void => {
  try {
    localStorage.removeItem('cachedUserSettings');
  } catch (error) {
    console.error('Failed to clear cached settings:', error);
  }
};

/**
 * Updates a specific property in the cached user settings
 * @param property The property path (dot notation) to update
 * @param value The new value for the property
 */
export const updateCachedProperty = (property: string, value: any): void => {
  try {
    const cachedSettings = getCachedSettings();
    if (!cachedSettings) return;

    // Handle nested properties (e.g., 'current_environment.show_explo_link')
    const properties = property.split('.');
    let current = cachedSettings as any;

    // Navigate to the parent object
    for (let i = 0; i < properties.length - 1; i++) {
      if (!current[properties[i]]) {
        current[properties[i]] = {};
      }
      current = current[properties[i]];
    }

    // Set the value on the parent object
    current[properties[properties.length - 1]] = value;

    // Save the updated settings
    updateCachedSettings(cachedSettings);
  } catch (error) {
    console.error(`Failed to update cached property ${property}:`, error);
  }
};
