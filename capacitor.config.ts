import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'proba.app',
  appName: 'proba-app',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
