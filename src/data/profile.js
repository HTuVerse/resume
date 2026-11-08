const baseUrl = import.meta.env?.BASE_URL ?? '/'

// Resume facts are sourced from public/assets/resume/liuweihong-resume.pdf.
// Keep project claims, skills and links aligned with the downloadable resume.
export const profile = {
  name: '刘伟鸿',
  role: 'Java 开发工程师',
  phone: '15180192491',
  email: '2252478650@qq.com',
  github: 'https://github.com/HTuVerse',
  school: '江西应用科技学院',
  major: '软件工程（本科）',
  educationPeriod: '2023.09–2027.07',
  grade: 'GPA 3.9/5.0 · 班级排名 2/52 · 学院前 5%',
  introduction: '专注 Java 后端、微服务与 AI 应用开发，用技术连接业务，在实践中持续成长。',
  certificates: ['软件设计师（中级软考资格）', '人工智能训练师（高级工）', 'CET-6', '三好学生', '优秀学生干部'],
  internship: {
    employer: '云端问京（北京）科技有限责任公司',
    role: '软件开发实习生',
    period: '2025.06–2025.09',
    summary: '参与智能访客管理系统开发，负责访客预约、员工审批及访客记录模块的前后端开发，并基于 Spring AI 实现预约信息提取、表单回填与来访须知问答。',
  },
}

const githubUrl = new URL(profile.github)
export const profileContacts = [
  { label: '手机', value: profile.phone, href: `tel:${profile.phone}`, illustration: 'phone' },
  { label: '邮箱', value: profile.email, href: `mailto:${profile.email}`, illustration: 'mail' },
  { label: 'GitHub', value: githubUrl.host + githubUrl.pathname, href: profile.github, illustration: 'github', external: true },
  { label: '在读院校', value: profile.school, illustration: 'school' },
]

export const homeHero = {
  src: `${baseUrl}assets/mobile/optimized/home-hero.webp`,
  alt: '穿蓝色卫衣的开发者在城市与绿植间使用笔记本编程',
  width: 960,
  height: 1200,
}

export const resumeProjects = [
  {
    id: 'liteshop', type: 'core', filters: ['core', 'java', 'cloud', 'ai'],
    badge: '核心项目', title: 'LiteShop · AI 智能餐饮 SaaS', shortName: 'LiteShop',
    fullTitle: 'LiteShop — 基于微服务架构的 AI 智能连锁餐饮 SaaS 平台',
    note: '个人独立全栈开发', categoryLabel: '微服务 / 企业级 SaaS',
    description: '面向连锁餐饮多品牌、多门店运营场景，构建支持多租户隔离、分布式事务与 AI 经营分析的微服务平台。',
    tags: ['Java', 'Spring Cloud', 'Spring AI', 'Redis', 'RabbitMQ', 'Docker'],
    allTags: ['Java', 'Spring Boot', 'Spring Cloud', 'Spring AI', 'Nacos', 'Gateway', 'OpenFeign', 'MySQL', 'Redis', 'RabbitMQ', 'Docker', 'Vue', 'uni-app'],
    status: '个人独立全栈开发', update: '微服务 · AI 应用',
    image: `${baseUrl}assets/mobile/optimized/liteshop.webp`, mobileImage: `${baseUrl}assets/mobile/optimized/liteshop.webp`,
    detailTo: '/projects/liteshop', repo: 'https://github.com/HTuVerse/LiteShop-boot-microservices',
    highlights: [
      { title: '多租户架构', description: '共享与独立数据库结合，基于租户元数据中心实现动态数据源路由与租户级隔离。' },
      { title: '分布式事务', description: '通过 Saga 补偿模式与 Transactional Outbox，保障订单、支付、库存等跨服务交易的最终一致性。' },
      { title: '多级缓存', description: 'Caffeine + Redis 分层缓存菜单、商品与租户权益等热点数据，优化高峰交易链路。' },
      { title: 'AI 经营分析', description: '基于 Spring AI Tool Calling，将订单、营收与门店指标封装为受控业务查询工具。' },
    ],
  },
  {
    id: 'flowagent', type: 'java', filters: ['core', 'java', 'ai'],
    badge: 'AI 应用', title: 'FlowAgent · 智能工单 Agent', shortName: 'FlowAgent',
    fullTitle: 'FlowAgent — 基于 Spring AI 的智能工单处理 Agent 系统',
    note: '个人独立全栈开发', categoryLabel: 'AI Agent / RAG',
    description: '面向企业客服与内部工单管理，融合 RAG 知识检索、工具调用与多轮会话，实现工单创建、查询与辅助诊断。',
    tags: ['Spring AI', 'pgvector', 'Redis', 'SSE'],
    allTags: ['Java', 'Spring Boot', 'Spring AI', 'MySQL', 'Redis', 'PostgreSQL', 'pgvector', 'SSE', 'Docker'],
    status: '个人独立全栈开发', update: 'RAG · Tool Calling',
    image: `${baseUrl}assets/mobile/optimized/flowagent.webp`, mobileImage: `${baseUrl}assets/mobile/optimized/flowagent.webp`,
    detailTo: '/projects/flowagent', repo: 'https://github.com/HTuVerse/LiteShop-SaaS-admin',
    highlights: [
      { title: 'Agent 工具调用', description: '基于 Spring AI Tool Calling，将工单创建、状态查询与历史记录检索封装为标准化工具。' },
      { title: 'RAG 知识检索', description: '使用 Spring AI 与 pgvector 构建知识库，实现文档切分、Embedding 向量化与语义相似度检索。' },
      { title: '多轮会话管理', description: 'Redis 缓存会话上下文与历史消息，结合滑动窗口及摘要机制控制上下文长度。' },
      { title: '流式响应', description: '通过 SSE 实现大模型流式响应，支持业务咨询与问题辅助诊断。' },
    ],
  },
]

export const skillGroups = [
  { title: 'Java 后端开发', description: 'Java、Spring Boot、Spring MVC、MyBatis-Plus；RESTful API、IoC / AOP 与业务分层设计。', image: `${baseUrl}assets/technology/backend.webp` },
  { title: '微服务与数据', description: 'Spring Cloud、Nacos、Gateway、OpenFeign；MySQL、Redis、RabbitMQ 与异步调用。', image: `${baseUrl}assets/technology/microservices.webp` },
  { title: 'AI 与工程化', description: 'Spring AI、大模型 API、Prompt、多轮对话；RAG / Tool Calling 与 Docker。', image: `${baseUrl}assets/technology/ai-engineering.webp` },
]

export const technologies = [
  { name: 'Java', image: `${baseUrl}assets/mobile/optimized/tech-java.webp`, hasEmbeddedLabel: true },
  { name: 'Spring Boot', image: `${baseUrl}assets/mobile/optimized/tech-spring.webp`, hasEmbeddedLabel: true },
  { name: 'MySQL', image: `${baseUrl}assets/mobile/optimized/tech-mysql.webp`, hasEmbeddedLabel: true },
  { name: 'Redis', image: `${baseUrl}assets/mobile/optimized/tech-redis.webp`, hasEmbeddedLabel: true },
  { name: 'RabbitMQ', image: `${baseUrl}assets/mobile/optimized/tech-rabbitmq.webp`, hasEmbeddedLabel: true },
  { name: 'Spring Cloud', image: `${baseUrl}assets/technology/spring-cloud.webp` },
  { name: 'Spring AI', image: `${baseUrl}assets/technology/spring-ai.webp` },
  { name: 'Docker', image: `${baseUrl}assets/mobile/optimized/tech-docker.webp`, hasEmbeddedLabel: true },
  { name: 'pgvector', image: `${baseUrl}assets/technology/pgvector.webp` },
]
