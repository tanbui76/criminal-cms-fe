/*
 *
 * Mock data cho thống kê phạm nhân
 *
 */

// Mock data theo format API mới
export const mockCriminalsData = {
  total: 8,
  byProfileType: [
    {
      profileTypeName: "Hồ sơ phạm nhân của người được tha tù trước thời hạn có điều kiện",
      count: 8
    },
    {
      profileTypeName: "Hồ sơ thi hành án phạt cải tạo không giam giữ",
      count: 8
    },
    {
      profileTypeName: "Hồ sơ thi hành án phạt cấm cư trú",
      count: 8
    },
    {
      profileTypeName: "Hồ sơ thi hành án phạt cấm đảm nhiệm chức vụ, cấm hành nghề hoặc làm công việc nhất định",
      count: 8
    },
    {
      profileTypeName: "Hồ sơ thi hành án phạt quản chế",
      count: 8
    },
    {
      profileTypeName: "Hồ sơ thi hành án phạt tước một số quyền công dân",
      count: 8
    },
    {
      profileTypeName: "Hồ sơ thi hành án treo",
      count: 8
    },
    {
      profileTypeName: "Hồ sơ thi hành quyết định hoãn chấp hành án phạt tù",
      count: 8
    }
  ],
  byBirthplace: [
    {
      birthplace: "Long An",
      count: 1
    },
    {
      birthplace: "Hải Phòng",
      count: 1
    },
    {
      birthplace: "Hà Nội",
      count: 1
    },
    {
      birthplace: "TP.HCM",
      count: 1
    },
    {
      birthplace: "Đồng Nai",
      count: 1
    },
    {
      birthplace: "Đà Nẵng",
      count: 1
    },
    {
      birthplace: "Bình Dương",
      count: 1
    },
    {
      birthplace: "Cần Thơ",
      count: 1
    }
  ],
  byYear: [
    {
      year: 1995,
      count: 1
    },
    {
      year: 1992,
      count: 1
    },
    {
      year: 1990,
      count: 1
    },
    {
      year: 1988,
      count: 1
    },
    {
      year: 1987,
      count: 1
    },
    {
      year: 1985,
      count: 1
    },
    {
      year: 1980,
      count: 1
    },
    {
      year: 1975,
      count: 1
    }
  ],
  willBeReleasedThisMonth: [
    {
      id: 124,
      name: "Phạm Thị D",
      description: "Phạm tội lừa đảo chiếm đoạt tài sản, đang chấp hành án quản chế 2 năm",
      endExecuteDate: "2025-08-05"
    }
  ],
  willBeReleasedNextMonth: [],
  recentlyReleased: []
};