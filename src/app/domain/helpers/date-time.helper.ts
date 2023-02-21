import { format, formatDistanceToNow, parse } from 'date-fns';


export const formatLastPlayedDistance = (date: Date) => format(date, 'HH:mm');
export const formatPurchaseDate = (date: Date) => format(date, 'dd.MM.yyyy');
export const formatPurchaseDateForm = (date: Date) => format(date, 'dd/MM/yyyy');
export const parsePurchaseDateString = (dateString: string) => parse(dateString, 'dd/MM/yyyy', new Date());
export const formatLastTimePlayed = (date: Date) => format(date, 'dd.MM.yyyy HH:mm');
export const formatLastTimePlayedForm = (date: Date) => format(date, 'dd/MM/yyyy HH:mm');
export const parseLastTimePlayedString = (dateString: string) => parse(dateString, 'dd/MM/yyyy HH:mm', new Date());
