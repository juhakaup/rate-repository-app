import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const rawToken = await AsyncStorage.getItem(
      `${this.namespace}:token`
      );
    return rawToken ? JSON.parse(rawToken) : '';
  }

  async setAccessToken(accessToken) {
    try {
      await AsyncStorage.setItem(
        `${this.namespace}:token`, JSON.stringify(accessToken)
      );
    } catch (error) {
      console.log(error);
    }
    
  }

  async removeAccessToken() {
    try {
      await AsyncStorage.removeItem(`${this.namespace}:token`);
    } catch (error) {
      console.log(error);
    }
  }
}

export default AuthStorage;