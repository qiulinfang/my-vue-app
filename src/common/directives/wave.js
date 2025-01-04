// wave.js
export default {
    mounted(el) {
      // 创建水波纹元素
      const waveElement = document.createElement('div');
      waveElement.style.position = 'absolute';
      waveElement.style.borderRadius = '50%';
      waveElement.style.pointerEvents = 'none';
      waveElement.style.transform = 'scale(0)';
      waveElement.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
      waveElement.style.zIndex = '999';
      el.style.position = 'relative';
  
      // 点击事件监听
      el.addEventListener('click', (e) => {
        // 获取点击位置
        const rect = el.getBoundingClientRect();
        const waveSize = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - waveSize / 2;
        const y = e.clientY - rect.top - waveSize / 2;
  
        // 设置波纹的样式
        waveElement.style.width = `${waveSize}px`;
        waveElement.style.height = `${waveSize}px`;
        waveElement.style.left = `${x}px`;
        waveElement.style.top = `${y}px`;
        waveElement.style.opacity = '0.5';
  
        // 使波纹展开
        waveElement.style.transform = 'scale(1)';
  
        // 添加波纹到目标元素
        el.appendChild(waveElement);
  
        // 动画结束后移除波纹元素
        waveElement.addEventListener('transitionend', () => {
          waveElement.remove();
        });
      });
    }
  };
  