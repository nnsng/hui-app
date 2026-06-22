type EnvName =
  | 'EXPO_PUBLIC_NOTION_API_KEY'
  | 'EXPO_PUBLIC_NOTION_CYCLE_DATA_SOURCE_ID'
  | 'EXPO_PUBLIC_NOTION_ROUND_DATA_SOURCE_ID';

export const getEnv = (name: EnvName) => {
  const value = process.env[name] ?? '';
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
};

export const env = {
  EXPO_PUBLIC_NOTION_API_KEY: getEnv('EXPO_PUBLIC_NOTION_API_KEY'),
  EXPO_PUBLIC_NOTION_CYCLE_DATA_SOURCE_ID: getEnv('EXPO_PUBLIC_NOTION_CYCLE_DATA_SOURCE_ID'),
  EXPO_PUBLIC_NOTION_ROUND_DATA_SOURCE_ID: getEnv('EXPO_PUBLIC_NOTION_ROUND_DATA_SOURCE_ID'),
};
