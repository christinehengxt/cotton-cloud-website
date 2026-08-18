export function isBirthdayMonth(user) {
  if (!user?.birthday) return false;
  const birthday = new Date(user.birthday);
  if (Number.isNaN(birthday.getTime())) return false;
  return birthday.getMonth() === new Date().getMonth();
}

export const VOUCHERS = [
  {
    code: 'WELCOME15',
    label: 'First order — 15% off',
    percent: 15,
    eligible: (user) => !!user && !user.hasOrdered,
  },
  {
    code: 'BIRTHDAY20',
    label: 'Birthday month treat — 20% off',
    percent: 20,
    eligible: (user) => isBirthdayMonth(user),
  },
];

export function getEligibleVouchers(user) {
  return VOUCHERS.filter((v) => v.eligible(user));
}

export function findVoucherByCode(code) {
  return VOUCHERS.find((v) => v.code.toLowerCase() === code.trim().toLowerCase());
}
