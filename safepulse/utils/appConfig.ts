import axios from 'axios';
import React from 'react';

/**
 * Utility functions for managing app configuration
 */

/**
 * Get a configuration value by key
 * @param key The configuration key
 * @returns The configuration value
 */
export async function getAppConfig(key: string): Promise<any> {
  try {
    const response = await axios.get(
      `/api/appconfig?key=${encodeURIComponent(key)}`
    );
    return response.data.value;
  } catch (error) {
    console.error(`Error fetching app config for key ${key}:`, error);
    return null;
  }
}

/**
 * Save a configuration value
 * @param key The configuration key
 * @param value The configuration value (will be JSON stringified)
 * @returns true if successful, false otherwise
 */
export async function setAppConfig(key: string, value: any): Promise<boolean> {
  try {
    await axios.post('/api/appconfig', { key, value });
    return true;
  } catch (error) {
    console.error(`Error saving app config for key ${key}:`, error);
    return false;
  }
}

/**
 * Hook for using app configuration in React components
 * @param key The configuration key
 * @returns [value, setValue, loading, error]
 */
export function useAppConfig(key: string) {
  const [value, setValue] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    let mounted = true;

    async function loadConfig() {
      try {
        const configValue = await getAppConfig(key);
        if (mounted) {
          setValue(configValue);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err as Error);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadConfig();

    return () => {
      mounted = false;
    };
  }, [key]);

  const updateValue = React.useCallback(
    async (newValue: any) => {
      try {
        const success = await setAppConfig(key, newValue);
        if (success) {
          setValue(newValue);
          setError(null);
        }
      } catch (err) {
        setError(err as Error);
      }
    },
    [key]
  );

  return [value, updateValue, loading, error] as const;
}
