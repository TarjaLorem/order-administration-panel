const numberFormat = new Intl.NumberFormat("uk-UA", { maximumFractionDigits: 2 });
const dateTimeFormat = new Intl.DateTimeFormat("uk-UA", { dateStyle: "medium", timeStyle: "short" });
const shortDateTimeFormat = new Intl.DateTimeFormat("uk-UA", { dateStyle: "short", timeStyle: "short" });
const dayMonthFormat = new Intl.DateTimeFormat("uk-UA", { day: "2-digit", month: "2-digit" });
const timeFormat = new Intl.DateTimeFormat("uk-UA", { timeStyle: "medium" });

export const formatNumber = (value: number) => numberFormat.format(value);

export const formatMoney = (amount: number, currency: string) => `${formatNumber(amount)} ${currency}`;

export const formatDateTime = (iso: string) => dateTimeFormat.format(new Date(iso));

export const formatShortDateTime = (iso: string) => shortDateTimeFormat.format(new Date(iso));

export const formatDayMonth = (iso: string) => dayMonthFormat.format(new Date(iso));

export const formatTime = (iso: string) => timeFormat.format(new Date(iso));
