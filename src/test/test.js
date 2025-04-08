const complexArray1 = [
  {
    id: 1,
    name: "张三",
    age: 25,
    address: {
      city: "北京",
      street: "长安街",
      zipCode: "100000",
      details: {
        building: "A座",
        unit: "1单元",
        floor: 10,
        apartment: 1001,
        neighbors: [
          { name: "李四", relation: "朋友" },
          { name: "王五", relation: "同事" },
        ],
      },
    },
    hobbies: ["阅读", "编程", "旅行"],
    education: {
      degree: "硕士",
      university: "北京大学",
      major: "计算机科学",
      graduationYear: 2020,
      courses: [
        { name: "数据结构", grade: "A" },
        { name: "算法设计", grade: "B+" },
        { name: "操作系统", grade: "A-" },
      ],
    },
    employment: {
      company: "阿里巴巴",
      position: "软件工程师",
      projects: [
        { name: "项目A", role: "开发", duration: "2020-2021" },
        { name: "项目B", role: "测试", duration: "2021-2022" },
      ],
    },
  },
  {
    id: 2,
    name: "李四",
    age: 30,
    address: {
      city: "上海",
      street: "南京路",
      zipCode: "200000",
      details: {
        building: "B座",
        unit: "2单元",
        floor: 12,
        apartment: 1202,
        neighbors: [
          { name: "赵六", relation: "邻居" },
          { name: "孙七", relation: "同学" },
        ],
      },
    },
    hobbies: ["音乐", "绘画", "摄影"],
    education: {
      degree: "本科",
      university: "复旦大学",
      major: "经济学",
      graduationYear: 2015,
      courses: [
        { name: "微观经济学", grade: "A+" },
        { name: "宏观经济学", grade: "A" },
        { name: "统计学", grade: "B" },
      ],
    },
    employment: {
      company: "腾讯",
      position: "产品经理",
      projects: [
        { name: "项目C", role: "产品设计", duration: "2016-2018" },
        { name: "项目D", role: "项目管理", duration: "2018-2020" },
      ],
    },
  },
  {
    id: 3,
    name: "王五",
    age: 28,
    address: {
      city: "广州",
      street: "天河路",
      zipCode: "510000",
      details: {
        building: "C座",
        unit: "3单元",
        floor: 15,
        apartment: 1503,
        neighbors: [
          { name: "周八", relation: "室友" },
          { name: "吴九", relation: "同事" },
        ],
      },
    },
    hobbies: ["健身", "烹饪", "电影"],
    education: {
      degree: "博士",
      university: "中山大学",
      major: "生物学",
      graduationYear: 2018,
      courses: [
        { name: "分子生物学", grade: "A" },
        { name: "细胞生物学", grade: "A-" },
        { name: "遗传学", grade: "B+" },
      ],
    },
    employment: {
      company: "百度",
      position: "数据分析师",
      projects: [
        { name: "项目E", role: "数据分析", duration: "2018-2020" },
        { name: "项目F", role: "数据挖掘", duration: "2020-2022" },
      ],
    },
  },
];

const complexArray2 = [
  {
    id: 1,
    name: "张三",
    age: 25,
    address: {
      city: "北京",
      street: "长安街",
      zipCode: "100000",
      details: {
        building: "A座",
        unit: "1单元",
        floor: 10,
        apartment: 1001,
        neighbors: [
          { name: "李四", relation: "朋友" },
          { name: "王五", relation: "同事" },
        ],
      },
    },
    hobbies: ["阅读", "编程", "旅行"],
    education: {
      degree: "硕士",
      university: "北京大学",
      major: "计算机科学",
      graduationYear: 2020,
      courses: [
        { name: "数据结构", grade: "A" },
        { name: "算法设计", grade: "B+" },
        { name: "操作系统", grade: "A-" },
      ],
    },
    employment: {
      company: "阿里巴巴",
      position: "软件工程师",
      projects: [
        { name: "项目A", role: "开发", duration: "2020-2021" },
        { name: "项目B", role: "测试", duration: "2021-2022" },
      ],
    },
  },
  {
    id: 2,
    name: "李四",
    age: 30,
    address: {
      city: "上海",
      street: "南京路",
      zipCode: "200000",
      details: {
        building: "B座",
        unit: "2单元",
        floor: 12,
        apartment: 1202,
        neighbors: [
          { name: "赵六", relation: "邻居" },
          { name: "孙七", relation: "同学" },
        ],
      },
    },
    hobbies: ["音乐", "绘画", "摄影"],
    education: {
      degree: "本科",
      university: "复旦大学",
      major: "经济学",
      graduationYear: 2015,
      courses: [
        { name: "微观经济学", grade: "A+" },
        { name: "宏观经济学", grade: "A" },
        { name: "统计学", grade: "B" },
      ],
    },
    employment: {
      company: "腾讯",
      position: "产品经理",
      projects: [
        { name: "项目C", role: "产品设计", duration: "2016-2018" },
        { name: "项目D", role: "项目管理", duration: "2018-2020" },
      ],
    },
  },
  {
    id: 3,
    name: "王五",
    age: 28,
    address: {
      city: "广州",
      street: "天河路",
      zipCode: "510000",
      details: {
        building: "C座",
        unit: "3单元",
        floor: 15,
        apartment: 1503,
        neighbors: [
          { name: "周八", relation: "室友" },
          { name: "吴九", relation: "同事" },
        ],
      },
    },
    hobbies: ["健身", "烹饪", "电影"],
    education: {
      degree: "博士",
      university: "中山大学",
      major: "生物学",
      graduationYear: 2018,
      courses: [
        { name: "分子生物学", grade: "A" },
        { name: "细胞生物学", grade: "A-" },
        { name: "遗传学", grade: "B+" },
      ],
    },
    employment: {
      company: "百度",
      position: "数据分析师",
      projects: [
        { name: "项目E", role: "数据分析", duration: "2018-2020" },
        { name: "项目F", role: "数据挖掘", duration: "2020-2022" },
      ],
    },
  },
];

// 假设 complexArray2 中的一个字段被修改了
complexArray2[2].education.courses[1].grade = "A-";
complexArray2[2].education.courses[2].name = "遗传学1";

function findDifferences(obj1, obj2, path = "") {
  const differences = [];

  if (obj1 === obj2) {
    return differences;
  }

  if (typeof obj1 !== "object" || typeof obj2 !== "object") {
    if (obj1 !== obj2) {
      differences.push(path);
    }
    return differences;
  }

  for (let key in obj1) {
    if (!(key in obj2)) {
      differences.push(`${path}.${key}`);
      continue;
    }

    const currentPath = path ? `${path}.${key}` : key;
    const subDifferences = findDifferences(obj1[key], obj2[key], currentPath);
    differences.push(...subDifferences);
  }

  for (let key in obj2) {
    if (!(key in obj1)) {
      differences.push(`${path}.${key}`);
    }
  }

  return differences;
}

// 比较两个数组中的对象
const differences = [];
for (let i = 0; i < complexArray1.length; i++) {
  const diff = findDifferences(complexArray1[i], complexArray2[i]);
  if (diff.length > 0) {
    differences.push(...diff);
  }
}

console.log(differences); // 输出差异字段路径
