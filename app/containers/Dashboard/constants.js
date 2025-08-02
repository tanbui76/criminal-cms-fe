/*
 *
 * Dashboard constants
 *
 */

export const QUERY_USER_STATS = 'containers/Dashboard/QUERY_USER_STATS';
export const SET_USER_STATS = 'containers/Dashboard/SET_USER_STATS';
export const ASYNC_START = 'containers/Dashboard/ASYNC_START';
export const ASYNC_END = 'containers/Dashboard/ASYNC_END';
export const SET_DEVICE_TYPE = 'containers/Dashboard/SET_DEVICE_TYPE';
export const QUERY_DEVICE_STATS = 'containers/Dashboard/QUERY_DEVICE_STATS';
export const SET_DEVICE_CHART = 'containers/Dashboard/SET_DEVICE_CHART';

// Thêm constants cho thống kê phạm nhân
export const QUERY_PRISONER_STATS = 'containers/Dashboard/QUERY_PRISONER_STATS';
export const SET_PRISONER_STATS = 'containers/Dashboard/SET_PRISONER_STATS';
export const SET_RELEASE_DATA = 'containers/Dashboard/SET_RELEASE_DATA';
export const SET_TOTAL_PRISONERS = 'containers/Dashboard/SET_TOTAL_PRISONERS';

export const BROWSER = 'BROWSER';
export const OS = 'OS';

// Enum cho các loại hồ sơ phạm nhân
export const ProfileTypeEnum = {
  SUSPENDED_SENTENCE: 'Hồ sơ thi hành án treo',
  COMMUNITY_SERVICE: 'Hồ sơ thi hành án phạt cải tạo không giam giữ',
  RESIDENCE_BAN: 'Hồ sơ thi hành án phạt cấm cư trú',
  PROBATION: 'Hồ sơ thi hành án phạt quản chế',
  CIVIL_RIGHTS_REVOCATION: 'Hồ sơ thi hành án phạt tước một số quyền công dân',
  PROFESSIONAL_BAN: 'Hồ sơ thi hành án phạt cấm đảm nhiệm chức vụ, cấm hành nghề hoặc làm công việc nhất định',
  PRISON_SENTENCE_SUSPENSION: 'Hồ sơ thi hành quyết định hoãn chấp hành án phạt tù',
  PRISON_SENTENCE_SUSPENSION_TEMPORARY: 'Hồ sơ thi hành quyết định tạm đình chỉ chấp hành án phạt tù',
  CONDITIONAL_EARLY_RELEASE: 'Hồ sơ phạm nhân của người được tha tù trước thời hạn có điều kiện'
};
