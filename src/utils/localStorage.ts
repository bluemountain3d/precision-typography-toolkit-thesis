export const setItem = (key: string, value: unknown) => {
  // Uses type `unknown` to be able to specify any data type that will then be made into a string in the function
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export const getItem = (key: string) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : undefined;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Safely removes an item from localStorage.
 * Includes a check for the browser environment to prevent SSR crashes.
 *
 * @param key - The key of the item to remove.
 */
export const removeLocalStorage = (key: string): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Error removing ${key} from localStorage:`, error);
  }
};
