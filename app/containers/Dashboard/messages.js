/*
 * Dashboard Messages
 *
 * This contains all the text for the LoginPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'containers.Dashboard';

export default defineMessages({
  totalUser: {
    id: `${scope}.totalUser`,
    defaultMessage:
      'Total {count, plural, =0 {user} one { user} other { users}}',
  },
  activeUser: {
    id: `${scope}.activeUser`,
    defaultMessage:
      'Active {count, plural, =0 {user} one { user} other { users}}',
  },
  inActiveUser: {
    id: `${scope}.inActiveUser`,
    defaultMessage:
      'In-active {count, plural, =0 {user} one { user} other { users}}',
  },
  deviceChart: {
    id: `${scope}.deviceChart`,
    defaultMessage: 'Devices',
  },
  prisonerChart: {
    id: `${scope}.prisonerChart`,
    defaultMessage: 'Prisoner Statistics by Profile Type',
  },
  totalPrisoners: {
    id: `${scope}.totalPrisoners`,
    defaultMessage: 'Tổng số người đang thi hành án',
  },
  prisonerCount: {
    id: `${scope}.prisonerCount`,
    defaultMessage: 'Số lượng phạm nhân',
  },
  releaseThisMonth: {
    id: `${scope}.releaseThisMonth`,
    defaultMessage: 'Phạm nhân được thả tháng này',
  },
  prisonerName: {
    id: `${scope}.prisonerName`,
    defaultMessage: 'Tên phạm nhân',
  },
  releaseDate: {
    id: `${scope}.releaseDate`,
    defaultMessage: 'Ngày thả',
  },
  loadingData: {
    id: `${scope}.loadingData`,
    defaultMessage: 'Đang tải dữ liệu...',
  },
  noData: {
    id: `${scope}.noData`,
    defaultMessage: 'Không có dữ liệu',
  },
  noReleaseThisMonth: {
    id: `${scope}.noReleaseThisMonth`,
    defaultMessage: 'Không có phạm nhân nào được thả trong tháng này',
  },
  countLabel: {
    id: `${scope}.countLabel`,
    defaultMessage: 'Số lượng',
  },
  descriptionColumn: {
    id: `${scope}.descriptionColumn`,
    defaultMessage: 'Mô tả',
  },
});
