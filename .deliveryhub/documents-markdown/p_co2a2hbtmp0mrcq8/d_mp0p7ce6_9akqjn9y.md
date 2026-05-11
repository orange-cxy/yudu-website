# 渔渡官网新手使用指南

## 1. 快速开始
### 1.1 环境要求
- Node.js >= 18
- npm >= 9

### 1.2 安装与运行
```bash
# 克隆项目
git clone <仓库地址>
cd yudu-website

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 2. 开发指南
### 2.1 添加新页面
1. 在 `src/views/` 下创建 `.vue` 文件
2. 在 `src/router/index.js` 中添加路由配置
3. 在导航栏组件中添加菜单项

### 2.2 修改全局样式
编辑 `src/style.css` 中的 CSS 变量，如 `--color-primary`。

### 2.3 添加静态数据
在 `src/data/` 目录下创建 JSON 文件，然后在组件中导入使用。

## 3. 常见问题
### 3.1 如何修改网站标题？
在 `index.html` 中修改 `<title>` 标签，或在路由守卫中动态设置。

### 3.2 如何更换 Logo？
替换 `public/favicon.svg` 文件，并在导航栏组件中更新引用。

### 3.3 如何部署到自定义域名？
修改 `vite.config.js` 中的 `base` 配置，并在 DNS 中设置 CNAME 记录。

## 4. 贡献指南
- 遵循 Vue 3 官方风格指南
- 组件使用 PascalCase 命名
- 提交信息使用约定式提交（如 `feat: add contact form`）