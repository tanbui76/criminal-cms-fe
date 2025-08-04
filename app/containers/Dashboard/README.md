# Dashboard - Thống kê phạm nhân

## Tính năng mới đã thêm

### 1. Card thống kê tổng số phạm nhân
- Hiển thị tổng số phạm nhân từ tất cả các loại hồ sơ
- Vị trí: Card thứ 4 trong hàng đầu tiên
- Icon: TeamOutlined
- Màu: #1890ff

### 2. Biểu đồ thống kê phạm nhân theo loại hồ sơ
- Hiển thị số lượng phạm nhân theo từng loại hồ sơ
- Vị trí: Cột bên phải của dashboard
- Loại biểu đồ: Bar Chart (Chart.js)
- Dữ liệu: 8 loại hồ sơ phạm nhân

### 3. Biểu đồ thiết bị
- Hiển thị thống kê thiết bị (Browser/OS)
- Vị trí: Cột bên trái của dashboard
- Loại biểu đồ: Pie Chart (Chart.js)
- Có thể chuyển đổi giữa Browser và OS

## Các loại hồ sơ phạm nhân

1. **Hồ sơ phạm nhân của người được tha tù trước thời hạn có điều kiện**
2. **Hồ sơ thi hành án phạt cải tạo không giam giữ**
3. **Hồ sơ thi hành án phạt cấm cư trú**
4. **Hồ sơ thi hành án phạt cấm đảm nhiệm chức vụ, cấm hành nghề hoặc làm công việc nhất định**
5. **Hồ sơ thi hành án phạt quản chế**
6. **Hồ sơ thi hành án phạt tước một số quyền công dân**
7. **Hồ sơ thi hành án treo**
8. **Hồ sơ thi hành quyết định hoãn chấp hành án phạt tù**

## API Endpoints

### Thống kê người dùng
- **URL**: `/dashboard/users`
- **Method**: GET
- **Response**: Object với format `{ total: number, active: number, inactive: number }`

### Thống kê thiết bị
- **URL**: `/dashboard/browser` hoặc `/dashboard/os`
- **Method**: GET
- **Response**: Array of objects với format `{ type: string, value: number }`

### Thống kê phạm nhân
- **URL**: `/dashboard/criminals`
- **Method**: GET
- **Response**: Object với format:
```json
{
  "total": 8,
  "byProfileType": [
    {
      "profileTypeName": "Hồ sơ phạm nhân của người được tha tù trước thời hạn có điều kiện",
      "count": 8
    }
  ],
  "byBirthplace": [
    {
      "birthplace": "Long An",
      "count": 1
    }
  ],
  "byYear": [
    {
      "year": 1995,
      "count": 1
    }
  ],
  "willBeReleasedThisMonth": [
    {
      "id": 124,
      "name": "Phạm Thị D",
      "description": "Phạm tội lừa đảo chiếm đoạt tài sản, đang chấp hành án quản chế 2 năm",
      "endExecuteDate": "2025-08-05"
    }
  ],
  "willBeReleasedNextMonth": [],
  "recentlyReleased": []
}
```

## Cấu trúc file

```
Dashboard/
├── index.js              # Component chính
├── actions.js            # Redux actions
├── constants.js          # Constants và enum
├── reducer.js            # Redux reducer
├── saga.js              # Redux saga
├── selectors.js         # Redux selectors
├── messages.js          # Internationalization
├── mockData.js          # Mock data cho testing
├── charts/
│   ├── deviceChart.js   # Biểu đồ thiết bị (Chart.js)
│   └── prisonerChart.js # Biểu đồ phạm nhân (Chart.js)
└── README.md            # Hướng dẫn này
```

## Cách sử dụng

1. **Truy cập dashboard**: `/dashboard`
2. **Xem thống kê**: Card thứ 4 hiển thị tổng số phạm nhân
3. **Xem biểu đồ thiết bị**: Biểu đồ tròn bên trái hiển thị thống kê Browser/OS
4. **Xem biểu đồ phạm nhân**: Biểu đồ cột bên phải hiển thị chi tiết theo loại hồ sơ

## Mock Data

Hiện tại đang sử dụng mock data trong file `mockData.js`. Khi API backend sẵn sàng, chỉ cần:
1. Xóa import mock data trong `saga.js`
2. Đảm bảo API endpoint `/dashboard/criminals` trả về đúng format

## Chart.js Features

### DeviceChart (Pie Chart)
- **Responsive**: Tự động điều chỉnh kích thước
- **Tooltip**: Hiển thị giá trị và phần trăm
- **Legend**: Hiển thị ở dưới biểu đồ
- **Colors**: 6 màu khác nhau cho các loại thiết bị

### PrisonerChart (Bar Chart)
- **Responsive**: Tự động điều chỉnh kích thước
- **Tooltip**: Hiển thị số lượng phạm nhân
- **Scales**: Trục Y bắt đầu từ 0, trục X xoay 45 độ nếu cần
- **Colors**: Màu xanh #1890ff với border radius

## Tùy chỉnh

### Thêm loại hồ sơ mới
1. Thêm vào `ProfileTypeEnum` trong `constants.js`
2. Thêm dữ liệu vào `mockData.js`
3. Cập nhật API backend

### Thay đổi giao diện
1. Chỉnh sửa `deviceChart.js` hoặc `prisonerChart.js` để thay đổi style biểu đồ
2. Chỉnh sửa `index.js` để thay đổi layout
3. Chỉnh sửa `messages.js` để thay đổi text

### Thay đổi màu sắc
- **DeviceChart**: Thay đổi `backgroundColor` array trong `chartData`
- **PrisonerChart**: Thay đổi `backgroundColor` và `borderColor` trong dataset 