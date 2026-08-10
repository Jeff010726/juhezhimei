# 聚核智媒官网

React + Vite + TypeScript 企业官网，包含首页、服务、案例、关于和联系页面。

## 本地运行

```bash
pnpm install
pnpm dev
```

## 生产构建

```bash
pnpm build
pnpm preview
```

## 上线前配置

1. 将页面中的英文名称、官网、电话、邮箱和地址占位内容替换为正式信息。
2. 复制 `.env.example` 为 `.env.production`，填写 `VITE_CONTACT_ENDPOINT`。
3. 确认案例数据和图片可以由“聚核智媒”主体对外使用。
4. 获得正式域名后补充 canonical、Open Graph 图片和 sitemap。

联系表单以 JSON POST 到 `VITE_CONTACT_ENDPOINT`，未配置时会显示明确状态，不会虚假提示提交成功。
