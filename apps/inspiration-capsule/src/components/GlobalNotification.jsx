// src/components/GlobalNotification.jsx
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { message } from 'antd';
import { hideNotification } from '../features/ui/uiSlice';

function GlobalNotification() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui);
  
  // 使用 antd 的 message API
  const [messageApi, contextHolder] = message.useMessage();

  // 使用 useRef 防止 useEffect 在开发模式下因严格模式运行两次导致重复显示
  const notificationShown = useRef(false);

  useEffect(() => {
    if (notification.visible && !notificationShown.current) {
      messageApi.open({
        type: notification.type,
        content: notification.message,
        duration: 2.5, // 持续时间
        onClose: () => {
          dispatch(hideNotification());
          notificationShown.current = false;
        },
      });
      notificationShown.current = true;
    }
  }, [notification, dispatch, messageApi]);

  // contextHolder 是必须渲染的，用来挂载 message 实例
  return contextHolder;
}

export default GlobalNotification;