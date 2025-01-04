import logPlugin from "./logPlugin";
import GlobalMethods from "./globalMethods";
// 如果需要全局注册特定的功能，如 MessageBox、Message、Notification
import { ElMessageBox, ElMessage, ElNotification } from 'element-plus';

export default {
  install(app) {
    app.use(logPlugin);
    app.use(GlobalMethods);
    app.config.globalProperties.$msgbox = ElMessageBox;
    app.config.globalProperties.$message = ElMessage;
    app.config.globalProperties.$notify = ElNotification;
  },
};