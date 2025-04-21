// DynamicActionsComponentLocalData.jsx (Consider renaming the file/component)

import { defineComponent, ref, computed } from 'vue';
import {
  ElButton,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElIcon,
  ElSpace // For layout
} from 'element-plus';
import { MoreFilled, Edit, Delete, Share, Upload, Setting, Plus, CircleCheck } from '@element-plus/icons-vue'; // Import needed icons
import 'element-plus/dist/index.css';
import { ElMessage, ElMessageBox } from 'element-plus'; // Import for handling actions directly

export default defineComponent({
  name: 'DynamicActionsComponentLocalData', // Renamed component
  props: {
    // Max number of actions to show directly as buttons (still a prop)
    maxVisible: {
      type: Number,
      default: 2,
    },
    // Optional prop to control spacing in ElSpace
    spaceSize: {
        type: [String, Number], // Allow string ('small', 'large') or number (pixels)
        default: 8
    }
  },
  emits: ['action'], // Still can emit if parent needs notification

  setup(props, { emit }) {

    // --- LOCAL DATA SOURCE ---
    // Define actionConfigs directly inside setup using ref
    const actionConfigs = ref([
        { id: 'edit1', command: 'editItem', label: 'Edit', icon: Edit, type: 'primary', customData: { itemId: 123 } },
        { id: 'share2', command: 'shareItem', label: 'Share', icon: Share },
        { id: 'upload3', command: 'uploadFile', label: 'Upload', icon: Upload, disabled: false },
        { id: 'delete4', command: 'deleteItem', label: 'Delete', icon: Delete, type: 'danger', divided: true },
        { id: 'settings5', command: 'openSettings', label: 'Settings', icon: Setting, disabled: true },
        { id: 'approve6', command: 'approveDoc', label: 'Approve', icon: CircleCheck, type: 'success' },
    ]);
    // -------------------------

    // Computed properties now depend on the local 'actionConfigs' ref
    const visibleItems = computed(() => actionConfigs.value.slice(0, props.maxVisible));
    const hiddenItems = computed(() => actionConfigs.value.slice(props.maxVisible));

    // Central handler for all actions
    const handleAction = (configItem) => {
      if (configItem.disabled) {
        console.warn(`Action '${configItem.command}' is disabled.`);
        // Optionally show a disabled message
        // ElMessage.warning(`Action '${configItem.label}' is disabled.`);
        return;
      }
      console.log(`Local Action triggered: Command='${configItem.command}', Label='${configItem.label}'`);

      // --- Handle Action Logic Directly Within Component ---
      // (Since data is local, it makes sense to handle logic here too)
      switch(configItem.command) {
        case 'editItem':
          ElMessage.info(`Editing item with ID: ${configItem.customData?.itemId}`);
          // Add actual edit logic here
          break;
        case 'shareItem':
           ElMessage.success(`Sharing '${configItem.label}'...`);
           // Add actual share logic
           break;
        case 'uploadFile':
           ElMessage.info(`Initiating upload for '${configItem.label}'...`);
           // Add upload logic
           break;
        case 'deleteItem':
          ElMessageBox.confirm(
            `Are you sure you want to delete "${configItem.label}"?`,
            'Warning',
            {
              confirmButtonText: 'Yes, Delete',
              cancelButtonText: 'Cancel',
              type: 'warning',
            }
          ).then(() => {
            // --- Example: Modify local data ---
            actionConfigs.value = actionConfigs.value.filter(item => item.id !== configItem.id);
            // ------------------------------------
            ElMessage.success(`"${configItem.label}" deleted.`);
            console.log('Item deleted, new config:', actionConfigs.value);
          }).catch(() => {
            ElMessage.info('Delete canceled.');
          });
          break;
        case 'approveDoc':
            ElMessage.success(`Document "${configItem.label}" approved!`);
            // Add approve logic
            break;
        // Add other cases...
        default:
           ElMessage(`Action "${configItem.label}" executed (Command: ${configItem.command}).`);
      }
      // ----------------------------------------------------

      // Emit event *after* handling, in case parent wants to react
      emit('action', configItem);
    };

     // ----------------------------------------------------------------------

     // --- Render Function (No changes needed here) ---
    return () => (
      <div class="dynamic-actions-container"> {/* Added a wrapper div */}
        <ElSpace wrap size={props.spaceSize}>
          {/* 1. Render Directly Visible Buttons */}
          {visibleItems.value.map(item => (
            <ElButton
              key={item.id}
              type={item.type || 'default'}
              disabled={item.disabled}
              icon={item.icon}
              onClick={() => handleAction(item)}
            >
              {item.label}
            </ElButton>
          ))}

          {hiddenItems.value.length > 0 && (
            <ElDropdown
               onCommand={(command) => {
                 const item = hiddenItems.value.find(i => i.command === command);
                 if (item) { handleAction(item); }
               }}
            >
              {{ // JSX Slot Syntax
                default: () => (
                  <ElButton>
                     More
                     <ElIcon class="el-icon--right"><MoreFilled /></ElIcon>
                  </ElButton>
                ),
                dropdown: () => (
                  <ElDropdownMenu>
                    {hiddenItems.value.map(item => (
                      <ElDropdownItem
                        key={item.id}
                        command={item.command}
                        disabled={item.disabled}
                        divided={item.divided}
                        icon={item.icon}
                      >
                         {item.label}
                      </ElDropdownItem>
                    ))}
                  </ElDropdownMenu>
                )
              }}
            </ElDropdown>
          )}
        </ElSpace>
      </div> // End wrapper div
    );
  }
});