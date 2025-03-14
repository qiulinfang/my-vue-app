<template>
  <el-form :model="formData" :rules="rules" ref="formRef" label-width="120px">
    <div>
      <!-- 新增字段 -->
      <el-form-item label="省份" prop="province">
        <el-select v-model="formData.province" placeholder="请选择省份" @change="onProvinceChange">
          <el-option label="北京" value="beijing"></el-option>
          <el-option label="上海" value="shanghai"></el-option>
          <el-option label="广东" value="guangdong"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市" prop="city">
        <el-select v-model="formData.city" placeholder="请选择城市" :disabled="!formData.province">
          <el-option v-for="city in cities" :key="city.value" :label="city.label" :value="city.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="区县" prop="district">
        <el-select v-model="formData.district" placeholder="请选择区县" :disabled="!formData.city">
          <el-option v-for="district in districts" :key="district.value" :label="district.label" :value="district.value"></el-option>
        </el-select>
      </el-form-item>
    </div>
    <div>
      <el-form-item label="地址" prop="address">
        <el-input v-model="formData.address" placeholder="请输入地址"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="formData.phone" placeholder="请输入电话"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
    </div>
    <el-table :data="formData.tableData" stripe>
      <el-table-column prop="name" label="姓名" min-width="10%">
        <template #default="{ row, $index }">
          <el-form-item :prop="`tableData[${$index}].name`" :rules="row.nameRules">
            <el-input v-model="row.name" placeholder="请输入姓名" style="width: 100%;"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄" min-width="10%">
        <template #default="{ row, $index }">
          <el-form-item :prop="`tableData[${$index}].age`" :rules="row.ageRules">
            <el-input v-model="row.age" placeholder="请输入年龄" type="number" style="width: 100%;"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column prop="gender" label="性别" min-width="10%">
        <template #default="{ row, $index }">
          <el-form-item :prop="`tableData[${$index}].gender`" :rules="row.genderRules">
            <el-select v-model="row.gender" placeholder="请选择性别" style="width: 100%;">
              <el-option label="男" value="male"></el-option>
              <el-option label="女" value="female"></el-option>
            </el-select>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column prop="hobby" label="爱好" min-width="10%">
        <template #default="{ row, $index }">
          <el-form-item :prop="`tableData[${$index}].hobby`" :rules="row.hobbyRules">
            <el-input v-model="row.hobby" placeholder="请输入爱好" style="width: 100%;"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="10%">
        <template #default="{ row, $index }">
          <el-button v-if="!row.isEditing" @click="editRow(row)">编辑</el-button>
          <el-button v-if="row.isEditing" @click="saveRow(row, $index)">保存</el-button>
          <el-button v-if="row.isEditing" @click="cancelEdit(row)">取消</el-button>
          <el-button @click="deleteRow($index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-button @click="addRow">新增</el-button>
    <el-button @click="submitForm">提交</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        province: '',
        city: '',
        district: '',
        address: '',
        phone: '',
        email: '',
        tableData: [
        { 
          name: '张三', 
          age: 20, 
          gender: 'male',
          hobby: '篮球',
          isEditing: false,
          nameRules: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          ageRules: [
            { required: true, message: '请输入年龄', trigger: 'blur' },
            { type: 'number', message: '年龄必须为数字值', trigger: 'blur' }
          ],
          genderRules: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          hobbyRules: [
            { required: true, message: '请输入爱好', trigger: 'blur' }
          ]
        },
        { 
          name: '李四', 
          age: 25, 
          gender: 'female',
          hobby: '阅读',
          isEditing: false,
          nameRules: [
            { required: true, message: '必填姓名', trigger: 'blur' },
            { min: 2, message: '姓名至少 2 个字符', trigger: 'blur' }
          ],
          ageRules: [
            { required: true, message: '必填年龄', trigger: 'blur' },
            { type: 'number', min: 18, message: '年龄必须大于等于 18', trigger: 'blur' }
          ],
          genderRules: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          hobbyRules: [
            { required: true, message: '请输入爱好', trigger: 'blur' }
          ]
        }
      ]
      },
      cities: [],
      districts: [],
      formRef: null,
      rules: {
        province: [
          { required: true, message: '请选择省份', trigger: 'change' }
        ],
        city: [
          { required: true, message: '请选择城市', trigger: 'change' }
        ],
        district: [
          { required: true, message: '请选择区县', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          { pattern: /^[0-9]+$/, message: '电话必须为数字', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    onProvinceChange(value) {
      // 根据选择的省份更新城市列表
      if (value === 'beijing') {
        this.cities = [
          { label: '北京市', value: 'beijing' }
        ];
      } else if (value === 'shanghai') {
        this.cities = [
          { label: '上海市', value: 'shanghai' }
        ];
      } else if (value === 'guangdong') {
        this.cities = [
          { label: '广州市', value: 'guangzhou' },
          { label: '深圳市', value: 'shenzhen' }
        ];
      }
      this.formData.city = '';
      this.formData.district = '';
      this.districts = [];
    },
    onCityChange(value) {
      // 根据选择的城市更新区县列表
      if (value === 'beijing') {
        this.districts = [
          { label: '东城区', value: 'dongcheng' },
          { label: '西城区', value: 'xicheng' }
        ];
      } else if (value === 'shanghai') {
        this.districts = [
          { label: '黄浦区', value: 'huangpu' },
          { label: '徐汇区', value: 'xuhui' }
        ];
      } else if (value === 'guangzhou') {
        this.districts = [
          { label: '天河区', value: 'tianhe' },
          { label: '越秀区', value: 'yuexiu' }
        ];
      } else if (value === 'shenzhen') {
        this.districts = [
          { label: '南山区', value: 'nanshan' },
          { label: '福田区', value: 'futian' }
        ];
      }
      this.formData.district = '';
    },
    editRow(row) {
      row.isEditing = true;
    },
    saveRow(row, index) {
      this.$refs.formRef.validateField([`tableData[${index}].name`, `tableData[${index}].age`, `tableData[${index}].gender`, `tableData[${index}].hobby`], (errors) => {
        if (!errors) {
          row.isEditing = false;
        }
      });
    },
    cancelEdit(row) {
      row.isEditing = false;
    },
    deleteRow(index) {
      this.formData.tableData.splice(index, 1);
    },
    addRow() {
      this.formData.tableData.push({ 
        name: '', 
        age: null, 
        gender: '',
        hobby: '',
        isEditing: true,
        nameRules: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        ageRules: [
          { required: true, message: '请输入年龄', trigger: 'blur' },
          { type: 'number', message: '年龄必须为数字值', trigger: 'blur' }
        ],
        genderRules: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        hobbyRules: [
          { required: true, message: '请输入爱好', trigger: 'blur' }
        ]
      });
      this.$nextTick(() => {
        this.$refs.formRef.validate();
      });
    },
    submitForm() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          console.log('表单提交成功', this.tableData);
        } else {
          console.log('表单校验失败');
        }
      });
    }
  },
  watch: {
    'formData.city': 'onCityChange'
  }
};
</script>

<style scoped>
/* 可根据需要添加样式 */
</style>
