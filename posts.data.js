import { createContentLoader } from 'vitepress'

export default createContentLoader('docs/**/*.md', {
  transform(raw) {
    const categories = {}
    raw.forEach(({ url, frontmatter }) => {
      // 注意：url 已经包含了 base 前缀吗？测试一下
      // 在开发模式下，url 是相对于站点根目录（不含 base）的，例如 /docs/...
      // 但我们使用 <a :href="article.url"> 时，VitePress 会自动加上 base 前缀。
      // 所以直接使用 url 即可，不要手动加 base。
      const parts = url.split('/').filter(Boolean)
      let category = '未分类'
      // 假设你的文章都在 docs 下，分类为 docs 后的第一级目录
      if (parts.length >= 2 && parts[0] === 'docs') {
        category = parts[1]
      }
      const title = frontmatter.title || parts[parts.length - 1]
      const date = frontmatter.date
      if (!categories[category]) categories[category] = []
      categories[category].push({ url, title, date })
    })
    return { categories }
  }
})