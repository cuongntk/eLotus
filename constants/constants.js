import { path404, pathLoginSSO } from 'services/path'
import { deleteCookie } from 'lib/cookie'

export const widthSideBar = 317
export const PAGE_SIZE = 50
export const POPULAR_WIDTH_SCREEN = 1366
export const BKAV_SSO = 'BkavSSO'
export const SUPER_PASS = 'SP_WEC'

export const OPTION_ALL_VALUE = ''
export const OPTION_ALL_LABEL = '- Tất cả -'

export const REGEX = {
  GUID: /(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}/g,
  PHONE_NUMBER: /((09|03|07|08|05)+([0-9]{8})\b)/g,
  EMAIL: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
}

export const MIN_MAX_CHAR = {
  maxChar255: 255,
  maxChar200: 200,
  maxChar100: 100,
  maxChar20: 20,
  maxChar50: 50,
  minChar15: 15,
  minChar2: 2,
  minChar5: 5,
  minChar6: 6,
  minChar10: 10,
}

export const PAGINATION = {
  current: 1,
  pageSize: 50,
  total: 0,
}

const extractStatus = (id, label, color) => ({
  id,
  label,
  color,
})

export const STATUS_WEC = {
  OUT_OF_DATE: {
    ID: 1,
    VALUE: 'outOfDate',
  },
  COMING_DATE: {
    ID: 2,
    VALUE: 'comingDate',
  },
  STILL_DATE: {
    ID: 3,
    VALUE: 'stillDate',
  },
  DONE: {
    ID: 4,
    VALUE: 'done',
  },
}

export const STATUS_AUTHORI = {
  IN_EFFECT: {
    ID: 2,
    VALUE: 'inEffect',
  },
  NOT_YET_EFFECT: {
    ID: 1,
    VALUE: 'notYetEffect',
  },
  ENDED: {
    ID: 3,
    VALUE: 'ended',
  },
  DELETED: {
    ID: 4,
    VALUE: 'deleted',
  },
}

export const BTN_STATUS_WEC = {
  HANDLING: 'handling',
  APPROVE: 'approve',
  CANCEL_APPROVE: 'cancelApprove',
  REPROCESSING_REQUEST: 'reProcessingRequest',
}

export const WEC_ACTION_NAME = {
  approve: { stt: 1, key: 'D', label: 'Duyệt', modal: 'APPROVE_LIST', status: 'APPROVE' },
  handling: { stt: 2, key: 'X', label: 'Xử lý', modal: 'HANDLE_LIST', status: 'HANDLING' },
  cancelApprove: { stt: 3, key: 'H', label: 'Hủy duyệt', modal: 'CANCEL_APPROVE_LIST', status: 'CANCEL_APPROVE' },
  reProcessingRequest: { stt: 4, key: 'Y', label: 'Yêu cầu XL lại', modal: 'REQUEST_REPROCESSING_LIST', status: 'REPROCESSING_REQUEST' },
}

export const STATUS_LIST_WEC = [
  extractStatus(STATUS_WEC.OUT_OF_DATE.VALUE, 'Quá hạn', '#FBEDED'),
  extractStatus(STATUS_WEC.COMING_DATE.VALUE, 'Sắp tới hạn', '#FDF9EB'),
  extractStatus(STATUS_WEC.STILL_DATE.VALUE, 'Còn hạn', '#FFFFFF'),
  extractStatus(STATUS_WEC.DONE.VALUE, 'Đã xong', '#F6F6F6'),
]

export const LIST_AUTHORI_NOTE = [
  extractStatus(STATUS_AUTHORI.IN_EFFECT.VALUE, 'Đang có hiệu lực', '#D0F6DB'),
  extractStatus(STATUS_AUTHORI.NOT_YET_EFFECT.VALUE, 'Chưa có hiệu lực', '#FDF9EB'),
  extractStatus(STATUS_AUTHORI.ENDED.VALUE, 'Đã kết thúc hiệu lực', '#FFFFFF'),
  extractStatus(STATUS_AUTHORI.DELETED.VALUE, 'Đã bị xóa', '#F6F6F6'),
]

export const EVENT_EMITTER = {
  LEFT_MENU_COLLAPSE: 'left-menu-collapse',
  LEFT_MENU_RESTORE: 'left-menu-restore',
  CLICK_LOGO: 'click_logo',
  FETCH_LIST_DELEGATE: 'fetch_list_delegate',
  SHOW_ALL_ROW: 'show_all_row',
  HIDE_ALL_ROW: 'hide_all_row',
}

export const STATUS_ACTION_ID = {
  waitingForProgressing: 1,
  processed: 2,
  pending: 3,
  approved: 4,
  doNotBrowse: 5,
  reProcessingRequest: 6,
  notDone: 7,
}

export const TRANG_THAI_WEC = {
  notProcess: 1,
  processed: 2,
  waitingApprove: 3,
  approved: 4,
  notApprove: 5,
  reProcessingRequest: 6,
  notDone: 7,
  cancelApprove: 8,
}

export const STATUS_DELEGATE_ID = {
  undelete: 5,
  waitConfirm: 1,
  confirmed: 2,
  denied: 3,
  deleted: 4,
}

export const TINH_TRANG_UY_QUYEN_ID = {
  all: '0',
  inactive: 1,
  active: 2,
  end: 3,
}

export const COLOR_STATUS_WEC = {
  waitingForProgressing: '#EC7800',
  processed: '#097C3E',
  pending: '#AB47BC',
  approved: '#27AE60',
  doNotBrowse: '#EB5757',
  reProcessingRequest: '#EB5757',
}

export const extractStatusActionWec = (statusId) => {
  let status = {}
  switch (statusId) {
    case STATUS_ACTION_ID.waitingForProgressing:
      status = {
        action: { handling: true, viewHistory: true },
        id: statusId,
        color: COLOR_STATUS_WEC.waitingForProgressing,
        name: 'Chờ được xử lý',
      }
      break
    case STATUS_ACTION_ID.processed:
      status = {
        action: { handling: true, viewHistory: true },
        id: statusId,
        color: COLOR_STATUS_WEC.processed,
        name: 'Đã được xử lý',
      }
      break
    case STATUS_ACTION_ID.pending:
      status = {
        action: {
          approve: true,
          viewHistory: true,
        },
        id: statusId,
        color: COLOR_STATUS_WEC.pending,
        name: 'Chờ được duyệt',
      }
      break
    case STATUS_ACTION_ID.approved:
      status = {
        action: { handling: true, viewHistory: true },
        id: statusId,
        color: COLOR_STATUS_WEC.approved,
        name: 'Đã được duyệt',
      }
      break
    case STATUS_ACTION_ID.doNotBrowse:
      status = {
        action: { handling: true, viewHistory: true },
        id: statusId,
        color: COLOR_STATUS_WEC.doNotBrowse,
        name: 'Không được duyệt',
      }
      break
    case STATUS_ACTION_ID.reProcessingRequest:
      status = {
        action: { handling: true, viewHistory: true },
        id: statusId,
        color: COLOR_STATUS_WEC.reProcessingRequest,
        name: 'Được yêu cầu XL lại',
      }
      break
    default:
      break
  }
  return status
}

export const extractStatusActionManageWec = (statusId, objWec = null) => {
  let status = {}
  switch (statusId) {
    case STATUS_ACTION_ID.waitingForProgressing:
      status = {
        action: { handling: true, approve: objWec ? objWec.IsApproved : false, viewHistory: true },
        id: statusId,
        color: COLOR_STATUS_WEC.waitingForProgressing,
        name: 'Chờ được xử lý',
      }
      break
    case STATUS_ACTION_ID.processed:
      status = {
        action: { handling: true, reProcessingRequest: true, viewHistory: true },
        id: statusId,
        color: COLOR_STATUS_WEC.processed,
        name: 'Đã được xử lý',
      }
      break
    case STATUS_ACTION_ID.pending:
      status = {
        action: { handling: true, approve: true, viewHistory: true },
        id: statusId,
        color: COLOR_STATUS_WEC.pending,
        name: 'Chờ được duyệt',
      }
      break
    case STATUS_ACTION_ID.approved:
      status = {
        action: { handling: true, cancelApprove: true, viewHistory: true },
        id: statusId,
        color: COLOR_STATUS_WEC.approved,
        name: 'Đã được duyệt',
      }
      break
    case STATUS_ACTION_ID.doNotBrowse:
      status = {
        action: { handling: true, cancelApprove: true, viewHistory: true },
        id: statusId,
        color: COLOR_STATUS_WEC.doNotBrowse,
        name: 'Không được duyệt',
      }
      break
    case STATUS_ACTION_ID.reProcessingRequest:
      status = {
        action: { handling: true, viewHistory: true },
        id: statusId,
        color: COLOR_STATUS_WEC.reProcessingRequest,
        name: 'Được yêu cầu XL lại',
      }
      break
    default:
      break
  }
  return status
}

export const extractStatusActionPrevTKXL = (statusId, objWec = null) => {
  let status = {}
  switch (statusId) {
    case STATUS_ACTION_ID.processed:
      status = {
        action: { handling: true, viewHistory: true },
        id: statusId,
        color: COLOR_STATUS_WEC.processed,
        name: 'Đã được xử lý',
      }
      break
    case STATUS_ACTION_ID.pending:
      status = {
        action: {
          handling: true,
          viewHistory: true,
        },
        id: statusId,
        color: COLOR_STATUS_WEC.pending,
        name: 'Chờ được duyệt',
      }
      break
    default:
      break
  }
  return status
}

export const extractStatusDelegateWec = (statusId) => {
  let status = {}
  switch (statusId) {
    case STATUS_DELEGATE_ID.waitConfirm:
      status = {
        action: {
          handling: true,
          reProcessingRequest: true,
          viewHistory: true,
        },
        id: statusId,
        color: '#EC7800',
        name: 'Chờ được xác nhận',
      }
      break
    case STATUS_DELEGATE_ID.confirmed:
      status = {
        action: {
          handling: true,
          approve: true,
          viewHistory: true,
        },
        id: statusId,
        color: '#27AE60',
        name: 'Đã được xác nhận',
      }
      break
    case STATUS_DELEGATE_ID.denied:
      status = {
        action: { handling: true, viewHistory: true },
        id: statusId,
        color: '#EB5757',
        name: 'Đã bị từ chối',
      }
      break
    case STATUS_DELEGATE_ID.deleted:
      status = {
        action: { cancelApprove: true, viewHistory: true },
        id: statusId,
        color: '#828282',
        name: 'Đã bị xóa',
      }
      break
    default:
      break
  }
  return status
}

export const CREATE_DATE_OPTION = [
  {
    id: 'today',
    text: 'Trong hôm nay',
    value: 2,
  },
  {
    id: 'yesterday',
    text: 'Từ hôm qua',
    value: 3,
  },
  {
    id: '3_days_ago',
    text: 'Từ 3 ngày trước',
    value: 4,
  },
  {
    id: 'this_week',
    text: 'Từ tuần này',
    value: 5,
  },
  {
    id: 'last_week',
    text: 'Từ đầu tuần trước',
    value: 6,
  },
  {
    id: 'this_month',
    text: 'Từ đầu tháng này',
    value: 7,
  },
  {
    id: 'last_month',
    text: 'Từ đầu tháng trước',
    value: 8,
  },
  {
    id: '2_month_ago',
    text: 'Từ 2 tháng trước',
    value: 9,
  },
  {
    id: 'duration',
    text: 'Khoảng thời gian',
    value: 10,
  },
]

export const STATUS_WEC_DDL = [
  {
    id: STATUS_ACTION_ID.notDone,
    name: 'Chưa xong',
  },
  {
    id: STATUS_ACTION_ID.waitingForProgressing,
    name: 'Chờ được xử lý',
  },
  {
    id: STATUS_ACTION_ID.processed,
    name: 'Đã được xử lý',
  },
  {
    id: STATUS_ACTION_ID.pending,
    name: 'Chờ được duyệt',
  },
  {
    id: STATUS_ACTION_ID.approved,
    name: 'Đã được duyệt',
  },
  {
    id: STATUS_ACTION_ID.doNotBrowse,
    name: 'Không được duyệt',
  },
  {
    id: STATUS_ACTION_ID.reProcessingRequest,
    name: 'Được yêu cầu XL lại',
  },
]

export const STATUS_AUTHORI_DLL = [
  { id: 1, name: 'Chưa bị xoá' },
  {
    id: 2,
    name: 'Chờ được xác nhận',
  },
  {
    id: 3,
    name: 'Đã được xác nhận',
  },
  {
    id: 4,
    name: 'Đang bị từ chối',
  },
  {
    id: 5,
    name: 'Đã xoá',
  },
]

export const CONDITION_AUTHORI_DLL = [
  {
    id: 1,
    name: 'Ủy quyền chưa có hiệu lực',
  },
  {
    id: 2,
    name: 'Ủy quyền đang có hiệu lực',
  },
  { id: 3, name: 'Ủy quyền đã kết thúc' },
]

export const DELEGATE_TRANG_THAI = [
  { id: 5, name: 'Chưa bị xóa' },
  {
    id: 1,
    name: 'Chờ được xác nhận',
  },
  {
    id: 2,
    name: 'Đã được xác nhận',
  },
  { id: 3, name: 'Đã bị từ chối' },
  { id: 4, name: 'Đã bị xóa' },
]

export const DELEGATE_TINH_TRANG = [
  {
    id: 1,
    name: 'Ủy quyền chưa có hiệu lực',
  },
  {
    id: 2,
    name: 'Ủy quyền đang có hiệu lực',
  },
  { id: 3, name: 'Ủy quyền đã kết thúc hiệu lực' },
]

export const CONFIG_STATUS = [
  {
    id: 1,
    name: 'Đang hoạt động',
    value: true,
  },
  {
    id: 2,
    name: 'Ngừng hoạt động',
    value: false,
  },
]

export const ROLE_GROUP_STATUS = [
  {
    id: 1,
    name: 'Đang sử dụng',
    value: true,
  },
  {
    id: 0,
    name: 'Không sử dụng',
    value: false,
  },
]

export const USER_STATUS = [
  {
    id: 1,
    name: 'Đang hoạt động',
    value: true,
  },
  {
    id: 0,
    name: 'Không hoạt động',
    value: false,
  },
]

export const TAB_LIST_WEC = [
  { key: '1', name: 'Của tôi' },
  { key: '2', name: 'Của nhân viên khác' },
]

export const HANDLING_WEC = [
  extractStatus('UQ', 'Bạn được ủy quyền xử lý WEC này', '#1574F6'),
  extractStatus('XLH', 'Bạn được cấu hình xử lý hộ WEC này', '#27AE60'),
]

export const goToLoginSSO = (home = false) => {
  const { pathname, href, origin, hostname } = window.location
  const url = pathname === path404 || home ? origin : href
  if (hostname === 'localhost') return
  deleteCookie(BKAV_SSO)
  window.location.replace(pathLoginSSO(url))
}

export const getImageBase64 = (img) => (img ? `data:image/png;base64,${img}` : null)

export const CONTENT_HANDLE_WEC = {
  PROCESSED_CONTENT: 'ProcessedContent',
  AGREE: 'Agree',
  ACTION_CONTENT: 'ActionContent',
  REASON: 'Reason',
  QUANTITY_KQKL: 'Quantity_KQKL',
  SEND_REPORT: 'SendReport',
  SEND_REPORT_APPROVE: 'SendReportApprove',
  SEND_REPORT_HANDLE: 'SendReportHandle',
  CHANGE: 'IsChange',
  SEND: 'IsSend',
  CONFIRM: 'IsConfirm',
  PERFORM: 'IsPerform',
  MEETING: 'IsMeeting',
  ACCOUNT: 'Account',
  HANDLE_KQKL: 'HandleKQKL',
}

export const MODAL_APPROVE = {
  APPROVE: 'Approve',
  CANCEL_APPROVE: 'CancelApprove',
  REQUEST_REPROCESSING: 'RequestReprocessing',
  APPROVE_LIST: 'ApproveList',
  CANCEL_APPROVE_LIST: 'CancelApproveList',
  REQUEST_REPROCESSING_LIST: 'RequestReprocessingList',
  PROCESS_MULTI: 'ProcessMulti',
}

export const RADIO_VALUE = {
  APPROVE: 'approve',
  CANCEL_APPROVE: 'cancelApprove', // ko duyet
}

export const THEME_SETTING = {
  COLOR: {
    BLUE: 1,
    GREEN: 2,
  },
}

export const WEC_IS_OF = {
  OWNER: 0,
  EMPLOYEE: 1,
  BOSS: 2,
}

export const UC_PROPS = {
  THEME: 'theme',
  COLOR: 'color',
}

export const SPV_PROPS = {
  LEFT_MENU: 'leftMenu',
  COLLAPSE: 'collapse',

  AS_WEC: 'asWec',
  ES_WEC: 'esWec',
  MR_CONTENT_WEC: 'mrContentWec',

  AS_DELEGATE: 'asDelegate',
  AS_CONFIG_XL: 'asConfigXL',
  AS_CONFIG_KXL: 'asConfigKXL',
  AS_AUTHORIZATION: 'authorization',
}

export const SPV_TYPES = {
  SPV: 'SPV',
  UC: 'UC',
}

export const ROLEIDNAME = {
  UQ_INSERT: 'UQ_INSERT',
  UQ_ACCOUNT_OTHER: 'UQ_ACCOUNT_OTHER',
  NQ_INSERT: 'NQ_INSERT',
  NQ_UPDATE: 'NQ_UPDATE',
  NQ_DELETE: 'NQ_DELETE',
  PQ_INSERT: 'PQ_INSERT',
}

export const TOKEN_SUPER_PASS = '20434FAE-1BA8-4CFB-A3B9-D5EDD70A4741'
