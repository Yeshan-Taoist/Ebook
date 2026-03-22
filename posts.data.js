import { createContentLoader } from 'vitepress'

export default createContentLoader('docs/**/*.md', {
  transform(raw) {
    // 按分类分组
    const categories = {}
    raw.forEach(({ url, frontmatter }) => {
      const cat = frontmatter.category || '未分类'
      if (!categories[cat]) categories[cat] = []
      categories[cat].push({ url, title: frontmatter.title, date: frontmatter.date })
    })
    return { categories }
  }
})