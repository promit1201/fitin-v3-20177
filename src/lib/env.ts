// Environment variable validation
export const getEnvVar = (key: string): string => {
  const value = import.meta.env[key];
  
  if (!value) {
    console.error(`Missing environment variable: ${key}`);
    throw new Error(`Environment variable ${key} is not defined. Please check your .env file.`);
  }
  
  return value;
};

export const validateEnv = () => {
  try {
    getEnvVar('VITE_SUPABASE_URL');
    getEnvVar('VITE_SUPABASE_PUBLISHABLE_KEY');
    return true;
  } catch (error) {
    console.error('Environment validation failed:', error);
    return false;
  }
};
