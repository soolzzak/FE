// export const dateConvert = (date: string): string =>
//   new Date(date).toLocaleString('en-GB', {
//     day: 'numeric',
//     month: 'numeric',
//     year: 'numeric',
//     hour: 'numeric',
//     minute: 'numeric',
//   });

export const dateConvert = (date: string): string =>
  date.substring(0, 10).replace(/-/g, '.');
