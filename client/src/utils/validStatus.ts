export const isValidStatus = (status: number | undefined): boolean => {
  if (status) {
    if (status == 200 || status === 201) {
      return true;
    }
  }
  return false;
};
