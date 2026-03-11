export const firstLetterCapitalizer = (str: string) => {
  const letter = String(str).toLowerCase();
  return letter[0].toUpperCase() + str.slice(1).toLowerCase();
};
