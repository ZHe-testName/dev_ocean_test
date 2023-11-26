export const nameRules = [
  (value: string) => {
    if (value) return true

    return 'Name is required.'
  },
  (value: string) => {
    if (value?.length <= 10) return true

    return 'Name must be less than 10 characters.'
  },
];

export const emailRules = [
  (value: string) => {
    if (value) return true

    return 'E-mail is required.'
  },
  (value: string) => {
    if (/.+@.+\..+/.test(value)) return true

    return 'E-mail must be valid.'
  },
]; 