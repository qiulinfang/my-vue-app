<template>
  <div style="position: relative; padding-top: 45px">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="Consistency" name="1">
        <el-tabs
          v-model="editableTabsValue"
          type="card"
          editable
          class="demo-tabs"
          @edit="handleTabsEdit"
        >
          <el-tab-pane
            v-for="item in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          >
            {{ item.content }}
          </el-tab-pane>
        </el-tabs>
        <el-alert
          title="Warning alert"
          type="warning"
          description="More text description"
          show-icon
        />
        <div
          style="position: absolute; top: 0; right: 0; z-index: 10"
          v-if="props.editType !== 'read'"
        >
          <el-select
            v-model="itemIdToAdd"
            placeholder="添加配置项"
            clearable
            filterable
            @change="addItemById"
            style="width: 280px"
            size="small"
          >
            <el-option
              v-for="item in availableItemsToAdd"
              :key="item[props.idKey]"
              :label="`【${item[props.idKey]}】${item.name}`"
              :value="item[props.idKey]"
              :disabled="isItemActive(item[props.idKey])"
            />
            <template #empty>
              <div style="text-align: center; color: #999; padding: 10px 0">
                {{
                  props.fieldList.length > tableDisplayData.length
                    ? "无更多可用配置项"
                    : "所有配置项已添加"
                }}
              </div>
            </template>
          </el-select>
        </div>

        <el-table
          :data="tableDisplayData"
          style="width: 100%"
          border
          stripe
          @selection-change="handleSelectionChange"
          ref="tableRef"
          :row-key="props.idKey"
        >
          <el-table-column
            type="selection"
            width="55"
            align="center"
            :selectable="isRowSelectable"
            fixed="left"
            reserve-selection
          />
          <el-table-column prop="name" label="名称" min-width="150" show-overflow-tooltip />
          <el-table-column :prop="props.idKey" label="ID" width="100" align="center" />
          <el-table-column label="值" min-width="180">
            <template #default="scope">
              <el-input
                v-model="scope.row.value"
                @change="() => validateInput(scope.row)"
                size="small"
                clearable
                placeholder="编辑值"
                :disabled="calculateInputDisabled(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column prop="description" label="说明" min-width="200" show-overflow-tooltip>
            <template #default="scope">
              <div style="display: flex; flex-direction: column; align-items: flex-start">
                <span>{{ scope.row.description || "---" }}</span>
                <el-tooltip
                  v-if="scope.row.imageUrl"
                  effect="dark"
                  placement="right"
                  :disabled="!scope.row.imageUrl"
                  popper-class="image-tooltip-popper"
                  :hide-after="0"
                >
                  <template #content>
                    <div style="display: flex; align-items: center; gap: 10px">
                      <img
                        :src="scope.row.imageUrl"
                        alt="说明图片"
                        style="
                          max-width: 150px;
                          max-height: 150px;
                          flex-shrink: 0;
                          border-radius: 4px;
                        "
                      />
                    </div>
                  </template>
                  <span style="color: #409eff; cursor: pointer; font-size: 12px; margin-top: 4px">
                    <el-icon style="vertical-align: middle"><Picture /></el-icon>
                    查看图片
                  </span>
                </el-tooltip>
                <span v-else style="font-size: 12px; color: #ccc; margin-top: 4px">(无图片)</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="100"
            align="center"
            fixed="right"
            v-if="props.editType !== 'read'"
          >
            <template #default="scope">
              <el-button
                v-if="!scope.row[props.mandatoryKey]"
                size="small"
                type="danger"
                :icon="Delete"
                @click="handleDelete(scope.row)"
                text
                bg
                >删除</el-button
              >
              <span v-else style="color: #aaa; font-size: 12px">(必选)</span>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script setup>
import { ref, reactive, nextTick, defineProps, defineEmits, watch, computed } from "vue";
import { Delete, Picture } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";

// --- 定义 Props ---
const props = defineProps({
  modelValue: { type: Array, required: true, default: () => [] },
  fieldList: { type: Array, required: true, default: () => [] },
  editType: {
    type: String,
    validator: (v) => ["read", "add", "edit"].includes(v),
    default: "edit",
  },
  idKey: { type: String, default: "id" },
  mandatoryKey: { type: String, default: "isMandatory" },
});

// --- 定义 Emits ---
const emit = defineEmits(["update:modelValue"]);

// --- 响应式状态 ---
const tableRef = ref(null);
const itemIdToAdd = ref(null);
const deletedItemIds = ref(new Set());
const activeNames = ref("1");
const editableTabsValue = ref("2");
const editableTabs = ref([
  { title: "Tab 1", name: "1" },
  { title: "Tab 2", name: "2" },
]);
let tabIndex = 2;

// --- 计算属性 ---
const tableDisplayData = computed(() => {
  const valueMap = new Map(props.modelValue.map((item) => [item[props.idKey], item.value]));
  const visibleFieldList = props.fieldList.filter(
    (fieldItem) => !deletedItemIds.value.has(fieldItem[props.idKey])
  );
  return visibleFieldList.map((fieldItem) => ({
    ...fieldItem,
    [props.idKey]: fieldItem[props.idKey],
    value: valueMap.get(fieldItem[props.idKey]),
  }));
});

const availableItemsToAdd = computed(() => {
  const activeItemIds = new Set(props.modelValue.map((item) => item[props.idKey]));
  return props.fieldList.filter(
    (item) =>
      !activeItemIds.has(item[props.idKey]) &&
      !deletedItemIds.value.has(item[props.idKey])
  );
});

// --- 辅助方法 ---
const isItemActive = (id) => {
  return props.modelValue.some((item) => String(item[props.idKey]) === String(id));
};

const isRowSelectable = (row, index) => {
  return props.editType !== "read" && !row[props.mandatoryKey];
};

const calculateInputDisabled = (row) => {
  return props.editType === "read" || !isItemActive(row[props.idKey]);
};

// --- 更新逻辑封装为通用函数 ---
const updateModelValue = (idToUpdate, newValue) => {
  return props.modelValue.map((item) => {
    if (String(item[props.idKey]) === String(idToUpdate)) {
      return { ...item, value: newValue };
    }
    return item;
  });
};

// --- 其他方法 ---
const handleChange = (val) => {
  console.log("Collapse changed:", val);
};

const handleTabsEdit = (targetName, action) => {
  if (action === "add") {
    const newTabName = `${++tabIndex}`;
    editableTabs.value.push({
      title: "New Tab",
      name: newTabName,
      content: "New Tab content",
    });
    editableTabsValue.value = newTabName;
  } else if (action === "remove") {
    const tabs = editableTabs.value;
    let activeName = editableTabsValue.value;
    if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1];
          if (nextTab) {
            activeName = nextTab.name;
          }
        }
      });
    }
    editableTabsValue.value = activeName;
    editableTabs.value = tabs.filter((tab) => tab.name !== targetName);
  }
};

const handleSelectionChange = (selection) => {
  if (props.editType === "read") return;
  const currentValueMap = new Map(props.modelValue.map((item) => [item[props.idKey], item.value]));
  const newModelValue = selection
    .filter((row) => !row[props.mandatoryKey])
    .map((selectedRow) => {
      const id = selectedRow[props.idKey];
      const existingValue = currentValueMap.get(id) ?? selectedRow.initialValue ?? "";
      return { [props.idKey]: id, value: existingValue };
    });
  emit("update:modelValue", newModelValue);
};

// 使用封装的 updateModelValue 方法
const handleValueChange = (row, newValue) => {
  const idToUpdate = row[props.idKey];
  const newModelValue = updateModelValue(idToUpdate, newValue);
  emit("update:modelValue", newModelValue);
};

const addItemById = (selectedId) => {
  if (selectedId === null || selectedId === undefined || selectedId === "") return;
  if (props.modelValue.some((item) => String(item[props.idKey]) === String(selectedId))) {
    ElMessage.warning("该配置项已在表格中");
    itemIdToAdd.value = null;
    return;
  }

  if (deletedItemIds.value.has(selectedId)) {
    deletedItemIds.value.delete(selectedId);
  }

  const configToAdd = props.fieldList.find(
    (item) => String(item[props.idKey]) === String(selectedId)
  );
  const initialValue = configToAdd?.initialValue ?? "";
  const newItem = { [props.idKey]: selectedId, value: initialValue };
  const newModelValue = [...props.modelValue, newItem];
  emit("update:modelValue", newModelValue);

  nextTick(() => {
    if (tableRef.value) {
      const rowInTable = tableDisplayData.value.find(
        (item) => String(item[props.idKey]) === String(selectedId)
      );
      if (rowInTable) {
        tableRef.value.toggleRowSelection(rowInTable, true);
      } else {
        console.warn(
          "Could not find added row in tableDisplayData immediately for selection toggle."
        );
      }
    }
  });

  ElMessage.success(`已添加并勾选配置项 "${configToAdd?.name || selectedId}"`);
  itemIdToAdd.value = null;
};

const handleDelete = (row) => {
  const idToDelete = row[props.idKey];
  ElMessageBox.confirm(
    `确定要删除此条目 (ID: ${idToDelete}) 吗？这也会取消其勾选状态，并从当前视图移除。`,
    "警告",
    { confirmButtonText: "确定删除", cancelButtonText: "取消", type: "warning" }
  )
    .then(() => {
      const newModelValue = props.modelValue.filter(
        (item) => String(item[props.idKey]) !== String(idToDelete)
      );
      if (newModelValue.length !== props.modelValue.length) {
        emit("update:modelValue", newModelValue);
      }
      deletedItemIds.value.add(idToDelete);
      ElMessage.success("删除成功!");
    })
    .catch(() => {
      ElMessage.info("已取消删除");
    });
};

watch(
  () => props.modelValue,
  (newSelectedItems) => {
    if (!tableRef.value || props.editType === "read") return;
    const newSelectedIds = new Set(newSelectedItems.map((item) => item[props.idKey]));
    nextTick(() => {
      if (!tableRef.value) return;
      tableDisplayData.value.forEach((row) => {
        const rowId = row[props.idKey];
        const shouldBeSelected = newSelectedIds.has(rowId);
        tableRef.value.toggleRowSelection(row, shouldBeSelected);
      });
    });
  },
  { deep: true }
);

watch(
  () => props.fieldList,
  (newFieldList) => {
    if (deletedItemIds.value.size === 0) return;
    const newFieldSet = new Set(newFieldList.map((item) => item[props.idKey]));
    const idsToRemoveFromDeleted = [];
    for (const deletedId of deletedItemIds.value) {
      if (!newFieldSet.has(deletedId)) {
        idsToRemoveFromDeleted.push(deletedId);
      }
    }
    if (idsToRemoveFromDeleted.length > 0) {
      idsToRemoveFromDeleted.forEach((id) => deletedItemIds.value.delete(id));
      console.log("Cleaned up deletedItemIds:", idsToRemoveFromDeleted);
    }
  },
  { deep: true }
);

function isValidUrl(string) {
  if (typeof string !== "string") return false;
  try {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))?(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return !!pattern.test(string);
  } catch (_) {
    return false;
  }
}

function isValidEmail(string) {
  if (typeof string !== "string") return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(string);
}

const validateInput = (row) => {
  const fieldConfig = props.fieldList.find(
    (item) => String(item[props.idKey]) === String(row[props.idKey])
  );

  if (!fieldConfig) return;

  const value = row.value;
  const label = fieldConfig.name || `字段 ${row[props.idKey]}`;

  // 必填校验
  if (fieldConfig.validationRequired && (!value || String(value).trim() === '')) {
    ElMessage.error(`${label} 不能为空`);
    return false;
  }

  // 正则校验
  if (fieldConfig.validationRegex && !fieldConfig.validationRegex.test(value)) {
    ElMessage.error(fieldConfig.validationMessage || `${label} 格式不正确`);
    return false;
  }

  // 类型校验
  if (fieldConfig.validationType) {
    let isValid = true;
    switch (fieldConfig.validationType.toLowerCase()) {
      case 'url':
        isValid = isValidUrl(value);
        break;
      case 'email':
        isValid = isValidEmail(value);
        break;
      case 'number':
        isValid = !isNaN(parseFloat(value)) && isFinite(value);
        break;
      default:
        isValid = true;
    }
    if (!isValid) {
      ElMessage.error(fieldConfig.validationMessage || `${label} 类型不合法`);
      return false;
    }
  }

  // 校验通过后更新 modelValue
  const newModelValue = props.modelValue.map((item) =>
    String(item[props.idKey]) === String(row[idKey]) ? { ...item, value } : item
  );
  emit('update:modelValue', newModelValue);

  return true;
};

const validate = () => {
  return new Promise((resolve, reject) => {
    const errors = [];
    const fieldConfigMap = new Map(props.fieldList.map((field) => [field[props.idKey], field]));

    for (const selectedItem of props.modelValue) {
      const id = selectedItem[props.idKey];
      const value = selectedItem.value;
      const config = fieldConfigMap.get(id);

      if (config) {
        const label = config.name || `ID ${id}`;
        const message = config.validationMessage || `${label} 输入无效`;

        if (
          config.validationRequired &&
          (value === null || value === undefined || String(value).trim() === "")
        ) {
          errors.push({ id, name: label, error: config.validationMessage || `${label} 不能为空` });
          continue;
        }

        if (value !== null && value !== undefined && String(value).trim() !== "") {
          if (config.validationRegex && !config.validationRegex.test(value)) {
            errors.push({ id, name: label, error: message });
            continue;
          }

          if (config.validationType) {
            let isValidType = true;
            switch (config.validationType.toLowerCase()) {
              case "url":
                isValidType = isValidUrl(value);
                break;
              case "email":
                isValidType = isValidEmail(value);
                break;
              case "number":
                isValidType = !isNaN(parseFloat(value)) && isFinite(value);
                break;
            }
            if (!isValidType) {
              errors.push({ id, name: label, error: message });
              continue;
            }
          }
        }
      }
    }

    if (errors.length > 0) {
      console.error("表格数据校验失败:", errors);
      reject(errors);
    } else {
      console.log("表格数据校验成功");
      resolve(true);
    }
  });
};

defineExpose({
  validate,
});
</script>
<style>
/* 全局样式 (或放在父组件/全局 CSS 中) 用于 Tooltip */
.image-tooltip-popper.el-tooltip__popper {
  padding: 0 !important;
  border: none;
  background: none;
  box-shadow: none;
}
.image-tooltip-popper.el-tooltip__popper .el-tooltip__content {
  background-color: rgba(0, 0, 0, 0.7);
  padding: 5px;
  border-radius: 4px;
  color: white;
}
</style>

<style>
/* Tooltip 全局样式 */
.image-tooltip-popper.el-tooltip__popper { padding: 0 !important; border: none; background: none; box-shadow: none; }
.image-tooltip-popper.el-tooltip__popper .el-tooltip__content { background-color: rgba(0, 0, 0, 0.7); padding: 5px; border-radius: 4px; color: white; }
</style>

<style scoped>
/* 组件内部样式 */
.el-button .el-icon { margin-right: 5px; }
.el-table .el-input, .el-table .el-icon { vertical-align: middle; }
/* 调整 tabs 样式 (如果需要) */
.demo-tabs > .el-tabs__content { padding: 15px; }
</style>