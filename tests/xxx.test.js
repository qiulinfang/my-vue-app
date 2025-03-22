//处理嵌套对象 (递归)
function sortObjectPropertiesRecursive(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj; // 如果不是对象或为 null，直接返回
  }

  if (Array.isArray(obj)) {
    // 如果是数组，递归处理每个元素
    return obj.map(sortObjectPropertiesRecursive);
  }

  return Object.keys(obj)
    .sort()
    .reduce((acc, key) => {
      acc[key] = sortObjectPropertiesRecursive(obj[key]); // 递归处理属性值
      return acc;
    }, {});
}

describe("sortObjectPropertiesRecursive", () => {
  it("should return non-object inputs directly", () => {
    expect(sortObjectPropertiesRecursive(42)).toBe(42);
    expect(sortObjectPropertiesRecursive("hello")).toBe("hello");
    expect(sortObjectPropertiesRecursive(true)).toBe(true);
    expect(sortObjectPropertiesRecursive(null)).toBe(null);
  });

  it("should sort array elements recursively", () => {
    const input = [3, 1, 2];
    const expected = [1, 2, 3];
    expect(sortObjectPropertiesRecursive(input)).toEqual(expected);
  });

  it("should sort object keys and values recursively", () => {
    const input = { b: 2, a: 1, c: { d: 4, c: 3 } };
    const expected = { a: 1, b: 2, c: { c: 3, d: 4 } };
    expect(sortObjectPropertiesRecursive(input)).toEqual(expected);
  });

  it("should handle nested objects correctly", () => {
    const input = { b: { d: 4, c: 3 }, a: 1 };
    const expected = { a: 1, b: { c: 3, d: 4 } };
    expect(sortObjectPropertiesRecursive(input)).toEqual(expected);
  });

  it("should handle mixed types within arrays", () => {
    const input = [3, { b: 2, a: 1 }, 1];
    const expected = [1, { a: 1, b: 2 }, 3];
    expect(sortObjectPropertiesRecursive(input)).toEqual(expected);
  });
});
function findDifferences(obj1, obj2, path = "") {
  const differences = [];

  function dfsTraverse(data1, data2, currentPath) {
    // 如果两个数据类型不一致，则直接记录差异
    if (typeof data1 !== typeof data2) {
      differences.push({ path: currentPath, value1: data1, value2: data2 });
      return;
    }

    // 如果两者都是数组，逐个元素进行比较
    if (Array.isArray(data1) && Array.isArray(data2)) {
      const maxLength = Math.max(data1.length, data2.length);
      for (let i = 0; i < maxLength; i++) {
        const nextPath = `${currentPath}[${i}]`;
        if (i >= data1.length || i >= data2.length) {
          differences.push({
            path: nextPath,
            value1: i >= data1.length ? undefined : data1[i],
            value2: i >= data2.length ? undefined : data2[i],
          });
        } else {
          dfsTraverse(data1[i], data2[i], nextPath);
        }
      }
    }
    // 如果两者都是对象，逐个属性进行比较
    else if (
      data1 !== null &&
      typeof data1 === "object" &&
      data2 !== null &&
      typeof data2 === "object"
    ) {
      const allKeys = new Set([...Object.keys(data1), ...Object.keys(data2)]);
      for (let key of allKeys) {
        const nextPath = currentPath ? `${currentPath}.${key}` : key;
        if (!(key in data1) || !(key in data2)) {
          differences.push({
            path: nextPath,
            value1: key in data1 ? data1[key] : undefined,
            value2: key in data2 ? data2[key] : undefined,
          });
        } else {
          dfsTraverse(data1[key], data2[key], nextPath);
        }
      }
    }
    // 对于基本数据类型，直接比较
    else if (data1 !== data2) {
      differences.push({ path: currentPath, value1: data1, value2: data2 });
    }
  }

  dfsTraverse(obj1, obj2, path);
  return differences;
}


describe('findDifferences', () => {
  it('should return an empty array for identical objects', () => {
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = { a: 1, b: { c: 2 } };
    expect(findDifferences(obj1, obj2)).toEqual([]);
  });

  it('should return differences for different types', () => {
    const obj1 = 1;
    const obj2 = '1';
    expect(findDifferences(obj1, obj2)).toEqual([{ path: '', value1: 1, value2: '1' }]);
  });

  it('should return differences for arrays of different lengths', () => {
    const obj1 = [1, 2];
    const obj2 = [1, 2, 3];
    expect(findDifferences(obj1, obj2)).toEqual([{ path: '[2]', value1: undefined, value2: 3 }]);
  });

  it('should return differences for arrays with different elements', () => {
    const obj1 = [1, 2];
    const obj2 = [1, 3];
    expect(findDifferences(obj1, obj2)).toEqual([{ path: '[1]', value1: 2, value2: 3 }]);
  });

  it('should return differences for nested objects', () => {
    const obj1 = { a: { b: 1 } };
    const obj2 = { a: { b: 2 } };
    expect(findDifferences(obj1, obj2)).toEqual([{ path: 'a.b', value1: 1, value2: 2 }]);
  });

  it('should return differences for missing properties in objects', () => {
    const obj1 = { a: 1 };
    const obj2 = { b: 2 };
    expect(findDifferences(obj1, obj2)).toEqual([
      { path: 'a', value1: 1, value2: undefined },
      { path: 'b', value1: undefined, value2: 2 }
    ]);
  });

  it('should return differences for empty objects and arrays', () => {
    const obj1 = {};
    const obj2 = [];
    expect(findDifferences(obj1, obj2)).toEqual([{ path: '', value1: {}, value2: [] }]);
  });
});

describe('findDifferences', () => {
  it('should handle extremely complex objects', () => {
    const obj1 = {
      name: "Alice",
      age: 30,
      address: {
        street: "123 Main St",
        city: "Wonderland",
        coordinates: [40.7128, -74.0060]
      },
      hobbies: ["reading", "hiking", "coding"],
      education: [
        {
          degree: "BSc",
          major: "Computer Science",
          year: 2015,
          university: "Wonderland University"
        },
        {
          degree: "MSc",
          major: "Software Engineering",
          year: 2017,
          university: "Wonderland University"
        }
      ],
      skills: {
        programming: {
          languages: ["JavaScript", "Python", "Java"],
          frameworks: ["React", "Vue", "Angular"]
        },
        tools: ["Git", "Docker", "Jenkins"]
      },
      isEmployed: true,
      salary: 120000,
      projects: [
        {
          name: "Project A",
          description: "A web application for managing tasks",
          technologies: ["React", "Node.js", "MongoDB"],
          team: ["Alice", "Bob", "Charlie"]
        },
        {
          name: "Project B",
          description: "A mobile app for social networking",
          technologies: ["React Native", "Firebase"],
          team: ["Alice", "David"]
        }
      ]
    };

    const obj2 = {
      name: "Alice",
      age: 31, // Different age
      address: {
        street: "456 Elm St", // Different street
        city: "Wonderland",
        coordinates: [40.7128, -74.0060]
      },
      hobbies: ["reading", "hiking", "coding", "photography"], // Added new hobby
      education: [
        {
          degree: "BSc",
          major: "Computer Science",
          year: 2015,
          university: "Wonderland University"
        },
        {
          degree: "MSc",
          major: "Software Engineering",
          year: 2018, // Different year
          university: "Wonderland University"
        }
      ],
      skills: {
        programming: {
          languages: ["JavaScript", "Python", "Java"],
          frameworks: ["React", "Vue", "Angular"]
        },
        tools: ["Git", "Docker", "Jenkins", "Kubernetes"] // Added new tool
      },
      isEmployed: true,
      salary: 130000, // Different salary
      projects: [
        {
          name: "Project A",
          description: "A web application for managing tasks",
          technologies: ["React", "Node.js", "MongoDB"],
          team: ["Alice", "Bob", "Charlie"]
        },
        {
          name: "Project B",
          description: "A mobile app for social networking",
          technologies: ["React Native", "Firebase"],
          team: ["Alice", "David", "Eve"] // Added new team member
        },
        {
          name: "Project C", // New project
          description: "A chatbot for customer support",
          technologies: ["Python", "Django"],
          team: ["Alice", "Frank"]
        }
      ]
    };

    const expectedDifferences = [
      { path: 'age', value1: 30, value2: 31 },
      { path: 'address.street', value1: '123 Main St', value2: '456 Elm St' },
      { path: 'hobbies[3]', value1: undefined, value2: 'photography' },
      { path: 'education[1].year', value1: 2017, value2: 2018 },
      { path: 'skills.tools[3]', value1: undefined, value2: 'Kubernetes' },
      { path: 'salary', value1: 120000, value2: 130000 },
      { path: 'projects[1].team[2]', value1: undefined, value2: 'Eve' },
      { path: 'projects[2]', value1: undefined, value2: { name: 'Project C', description: 'A chatbot for customer support', technologies: ['Python', 'Django'], team: ['Alice', 'Frank'] } }
    ];

    expect(findDifferences(obj1, obj2)).toEqual(expectedDifferences);
  });
});