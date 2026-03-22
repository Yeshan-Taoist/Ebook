import { defineConfig } from 'vitepress'
import { sidebar } from './sidebar'   // 导入自动生成的侧边栏

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base:'/Ebook/',
  title: "野山杂货铺",
  description: "一个用来记录个人思绪的地方",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '分类', link: '/categories' }
    ],

    sidebar,        // 直接使用导入的 sidebar

    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ]
  }
})
