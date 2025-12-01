import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@shopping_list_app';

export const storage = {

  async saveData(key: string, data: any): Promise<boolean> {
    try {
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(`${STORAGE_KEY}:${key}`, jsonData);
      return true;
    } catch (error) {
      console.error('Error saving data:', error);
      return false;
    }
  },

 
  async loadData(key: string): Promise<any | null> {
    try {
      const jsonData = await AsyncStorage.getItem(`${STORAGE_KEY}:${key}`);
      return jsonData ? JSON.parse(jsonData) : null;
    } catch (error) {
      console.error('Error loading data:', error);
      return null;
    }
  },

 
  async removeData(key: string): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(`${STORAGE_KEY}:${key}`);
      return true;
    } catch (error) {
      console.error('Error removing data:', error);
      return false;
    }
  },

 
  async clearAll(): Promise<boolean> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const appKeys = keys.filter(key => key.startsWith(STORAGE_KEY));
      await AsyncStorage.multiRemove(appKeys);
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  },
};