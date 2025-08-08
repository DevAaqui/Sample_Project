import axios from 'axios';

/**
 * Service to fetch configuration values from the API
 * This provides access to process.env.QUAD_CONFIG_* variables
 */
class ConfigService {
  private cache: Record<string, any> = {};

  /**
   * Fetch a configuration value by name
   * @param configName The name of the configuration (with QUAD_CONFIG_ prefix)
   * @returns The configuration value
   */
  async getConfig(configName: string): Promise<any> {
    try {
      // Check if the value is already in cache
      if (this.cache[configName] !== undefined) {
        return this.cache[configName];
      }

      // Fetch the value from the API
      const response = await axios.get(`/api/config/${configName}`);

      // Cache the value
      this.cache[configName] = response.data.value;

      return response.data.value;
    } catch (error) {
      console.error(`Error fetching config ${configName}:`, error);
      return null;
    }
  }

  /**
   * Parse a JSON configuration value
   * @param configName The name of the configuration
   * @returns The parsed JSON value
   */
  async getJsonConfig(configName: string): Promise<any> {
    const value = await this.getConfig(configName);
    if (!value) return null;

    try {
      return JSON.parse(value);
    } catch (error) {
      console.error(`Error parsing JSON config ${configName}:`, error);
      return null;
    }
  }

  /**
   * Get a boolean configuration value
   * @param configName The name of the configuration
   * @returns The boolean value
   */
  async getBooleanConfig(configName: string): Promise<boolean> {
    const value = await this.getConfig(configName);
    return value === 'true';
  }

  /**
   * Get a comma-separated string as an array
   * @param configName The name of the configuration
   * @returns Array of strings
   */
  async getArrayConfig(configName: string): Promise<string[]> {
    const value = await this.getConfig(configName);
    if (!value) return [];

    return value.split(',').map((item: string) => item.trim());
  }
}

// Export a singleton instance
const configService = new ConfigService();
export default configService;
