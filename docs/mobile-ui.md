# 移动端界面重构

## 使用

运行 `npm run dev`，打开终端显示的本地地址。在宽度不超过 900px 的浏览器中展示新版移动端。桌面端继续使用原有页面。

页面：`/#/`、`/#/projects`、`/#/projects/liteshop`、`/#/projects/flowagent`、`/#/tech-stack`、`/#/resume`、`/#/contact`。

## 内容与布局

以用户提供的五屏移动端设计图为排版参考，采用浅蓝背景、蓝色主按钮、白色圆角卡片、三列技术总览及固定五栏导航。无需在网页内绘制手机外壳或系统状态栏。

真实内容来源于 `public/assets/resume/liuweihong-resume.png`。人物资料、技术分组和两个项目统一保存在 `src/data/profile.js`，保留简历原始 GitHub 地址。没有为移动端添加未经验证的 Star 数、项目时间、在线演示链接、微信账号或实习到岗承诺。

入口为 `src/components/MobilePortfolio.vue`，图标为 `src/components/PortfolioIcon.vue`，移动端样式为 `src/styles/mobile.css`。支持项目筛选、关键词搜索、直接下载 PDF、系统分享或复制链接，以及页面不存在时的返回入口。底部导航留出安全区；页面可以正常滚动；窄屏与平板均有适配。

## 交互动效

| 场景 | 表现 |
| --- | --- |
| 顶部导航 | 五个主栏目共用页眉。首页始终吸顶，其余四栏向下滚动时向上收起，向上滚动时滑回，过渡为 220ms。「进入导航」跳转到首页快捷入口。 |
| 首页和栏目切换 | 标题、操作按钮和首批内容依次淡入并轻抬，单段 280ms，间隔 45ms。首页、项目详情和联系页的主插图在 400ms 内就位。 |
| 项目列表与详情 | 从列表进入详情时，内容从右侧 18px 处进入；返回列表时从左侧进入。详情页继续归属「项目导航」，底栏标记保持在该栏。 |
| 底栏与按压 | 选中标记在 280ms 内滑到新栏位，选中图标轻抬 2px。按钮和链接按下时在 100ms 内缩至 97%。 |
| 菜单、搜索与筛选 | 菜单开合、搜索框展开、筛选选中和新结果淡入使用 180ms 反馈。已有结果换位时平滑移动。 |
| 分享提示与减少动态效果 | 分享提示从底栏上方浮入和淡出。系统开启「减少动态效果」时直接呈现最终状态，保留选中标记，页面定位采用即时滚动。 |

## 插图与加载优化

使用内置 imagegen 工具生成两张透明背景插图。项目中保留页面使用的 WebP 版本：

- `public/assets/mobile/optimized/liteshop.webp`
- `public/assets/mobile/optimized/flowagent.webp`

另外复用项目已有的开发者、联系页及技术图标素材。移动端 19 张配图生成 WebP 版本，保留透明通道，总大小从 20.81 MB 降到 0.82 MB（减少 96.1%）；简历原图保持原始清晰度并延迟加载。未新增生产依赖。

### LiteShop 生成提示词

Use case: stylized-concept. Asset type: transparent project illustration for a mobile developer portfolio. Primary request: a charming premium 3D isometric miniature AI-powered restaurant storefront, blue and white striped awning, warm amber interior, small order tablet, tiny connected blue cloud server cubes floating over roof, green leafy plants and miniature trees around base. The single storefront sign reads exactly 'LiteShop'. Soft rounded clay-like materials, detailed polished 3D animation movie style, cobalt blue and sky blue with fresh green foliage and warm cream highlights. Composition: centered entire building on small oval landscape island, three-quarter perspective, landscape 4:3 composition, minimal empty padding, no UI or frame. Transparent background, no watermark, no extra text. Must stay legible as small card art, attractive friendly atmosphere. Save as project illustration.

### FlowAgent 生成提示词

Use case: stylized-concept. Asset type: transparent 3D project illustration for mobile portfolio matching a blue toy-like isometric restaurant illustration. Primary request: an adorable white and cobalt blue AI helper robot wearing a small headset, at a miniature customer service desk with a floating holographic blue ticket card bearing a check mark and two small chat bubbles, a tiny stack of cloud server cubes, fresh little green plants. Polished high quality soft rounded 3D clay animation style, cobalt blue, pastel sky blue, white, small violet and emerald accents, warm soft studio illumination and ambient occlusion. Composition: centered cohesive miniature island scene, three-quarter isometric perspective, landscape 4:3, minimal empty padding, all components clearly connected, suitable for small project thumbnail and large hero. No letters or words, no watermark, no UI layout or border. Genuinely transparent background.

## 验证

- `npm run build`：通过。
- Vue SFC 与模板编译检查：通过；没有未绑定的模板变量。
- 移动端素材路径、PDF 文件头、项目 ID 与仓库地址：检查通过。
- 微服务 / AI 分类数据及 pgvector 关键词检索数据：检查通过。
- Chrome 在 320、390 和 768px 移动视口中验证通过，覆盖首页吸顶、其余四栏的滚动收放、菜单关闭、「进入导航」锚点、项目详情往返和减少动态效果。1200px 视口仍使用桌面页眉。

