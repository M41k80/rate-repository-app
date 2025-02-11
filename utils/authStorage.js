import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  // get the access token from storage
  async getAccessToken() {
    // Recuperamos el token de acceso del almacenamiento
    const accessToken = await AsyncStorage.getItem(
      `${this.namespace}:accessToken`
    );

    // If it exists, we return it (it may need to be parsed if it was stored as JSON)
    return accessToken ? JSON.parse(accessToken) : null;
  }

  // store the access token in storage
  async setAccessToken(accessToken) {
    // Store the access token in storage
    await AsyncStorage.setItem(
      `${this.namespace}:accessToken`,
      JSON.stringify(accessToken) // Convert the token to a JSON string
    );
  }

  // remove the access token from storage
  async removeAccessToken() {
    // Remove the access token from storage
    await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
  }
}

export default AuthStorage;  