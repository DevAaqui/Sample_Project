import moment from 'moment';
import { store } from '@/redux/store';

/**
 * Formats a date according to the user's preferred format from Redux
 * @param date Date to format (Date object, string, or Moment object)
 * @param includeTime Whether to include time in the formatted date
 * @param fallbackFormat Optional fallback format if Redux state is not available
 * @returns Formatted date string
 */
export const formatDate = (
  date: Date | string | moment.Moment,
  includeTime: boolean = false,
  fallbackFormat: string = 'YYYY-MM-DD'
): string => {
  if (!date) return '';

  let momentDate: moment.Moment;

  if (moment.isMoment(date)) {
    momentDate = date;
  } else {
    momentDate = moment(date);
  }

  if (!momentDate.isValid()) {
    return 'Invalid date';
  }

  try {
    // Get the date format from Redux store
    const { dateFormat } = store.getState().userSettings;
    return momentDate.format(includeTime ? `${dateFormat} HH:mm` : dateFormat);
  } catch (error) {
    // Fallback if Redux store is not available
    console.warn(
      'Could not access Redux store for date format, using fallback',
      error
    );
    return momentDate.format(
      includeTime ? `${fallbackFormat} HH:mm` : fallbackFormat
    );
  }
};

/**
 * Parses a date string according to the user's preferred format from Redux
 * @param dateString Date string to parse
 * @returns Moment object
 */
export const parseDate = (dateString: string): moment.Moment => {
  try {
    const { dateFormat } = store.getState().userSettings;
    return moment(dateString, dateFormat || 'YYYY-MM-DD');
  } catch (error) {
    console.warn(
      'Could not access Redux store for date format, using fallback',
      error
    );
    return moment(dateString);
  }
};
