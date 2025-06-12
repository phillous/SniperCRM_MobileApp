import Colors, { BadgeColors } from '@/constants/Colors';
import {
  endOfMonth,
  endOfToday,
  endOfWeek,
  format,
  startOfMonth,
  startOfToday,
  startOfWeek,
  subWeeks,
} from 'date-fns';
import { Status } from './types';

export const getPeriodRange = (period: string, referenceDate = new Date()) => {
  switch (period) {
    case 'Today':
      return {
        start: format(startOfToday(), 'HH:mma'),
        end: format(endOfToday(), 'HH:mma'),
      };
    case 'This Week':
      return {
        start: format(startOfWeek(referenceDate, { weekStartsOn: 0 }), 'MMM do'),
        end: format(endOfWeek(referenceDate, { weekStartsOn: 0 }), 'MMM do'),
      };
    case 'Last Week':
       
      const lastWeekDate = subWeeks(referenceDate, 1);
      return {
        start: format(startOfWeek(lastWeekDate, { weekStartsOn: 0 }), 'MMM do'),
        end: format(endOfWeek(lastWeekDate, { weekStartsOn: 0 }), 'MMM do'),
      };
    case 'This Month':
      return {
        start: format(startOfMonth(referenceDate), 'MMM do'),
        end: format(endOfMonth(referenceDate), 'MMM do'),
      };
  }
};

export const getStatusColor = (status: Status) => {
  switch (status) {
    case 'Pending':
      return BadgeColors.orange; // Light Orange
    case 'Cancelled':
      return BadgeColors.red; // Light Red
    case 'Delivered':
      return BadgeColors.green; // Light Green
    case 'Shipped':
      return BadgeColors.blue; // Light Blue
    case 'Awaiting':
      return BadgeColors.amber; // Amber/Yellow
    // ... Add all other statuses
    case 'Not Picking Calls':
      return BadgeColors.deepOrange; //Deep Orange
    case 'Cash Remitted':
      return BadgeColors.lightGreen;
    case 'After-Sale Call':
      return BadgeColors.purple;
    case 'Banned':
      return BadgeColors.black;
    case 'Cart Abandonment':
      return BadgeColors.orange;
    case 'Deleted':
      return BadgeColors.grayBlue;
    case 'Switched Off':
      return BadgeColors.gray;
    case 'Failed':
      return BadgeColors.darkRed;
    case 'Imported Orders':
      return BadgeColors.brown;
    case 'Optin Records':
      return BadgeColors.indigo;
    case 'Confirmed':
      return BadgeColors.green;
    case 'Commitment Fee Required':
      return BadgeColors.yellow;
    case 'Orders Added By Forms':
      return BadgeColors.teal;
    case 'Returned':
      return BadgeColors.pink;
    case 'Scheduled':
      return BadgeColors.yellow;
    default:
      return Colors.grey; // Fallback
  }
};
