import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// 获取当前文件所在目录（ESM 中 __dirname 需要自己构建）
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 配置项
const POSTS_DIR = path.resolve(__dirname, '../docs')   // 文章根目录
const OUTPUT_FILE = path.resolve(__dirname, '../.vitepress/sidebar.js') // 输出文件

// 递归读取目录，生成侧边栏结构
function generateSidebar(dir, basePath = '') {
  const items = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  // 先处理文件（文章）
  const files = entries.filter(entry => entry.isFile() && entry.name.endsWith('.md'))
  files.forEach(file => {
    const filePath = path.join(dir, file.name)
    const relativePath = path.join(basePath, file.name.replace(/\.md$/, ''))
    // 尝试从 frontmatter 中读取标题，如果没有则用文件名
    let title = file.name.replace(/\.md$/, '')
    const content = fs.readFileSync(filePath, 'utf-8')
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1]
      const titleMatch = frontmatter.match(/title:\s*(.+)/)
      if (titleMatch) title = titleMatch[1].trim()
    }
    items.push({
      text: title,
      link: `/${relativePath.replace(/\\/g, '/')}`
    })
  })

  // 再处理子目录（分类）
  const dirs = entries.filter(entry => entry.isDirectory())
  dirs.forEach(subDir => {
    const subDirPath = path.join(dir, subDir.name)
    const subBasePath = path.join(basePath, subDir.name)
    const subItems = generateSidebar(subDirPath, subBasePath)
    if (subItems.length > 0) {
      items.push({
        text: subDir.name,      // 分类名称
        collapsed: false,       // 是否默认折叠，可改为 true
        items: subItems
      })
    }
  })

  return items
}

// 生成侧边栏配置对象
function buildSidebarConfig() {
  const sidebar = {}
  const categories = fs.readdirSync(POSTS_DIR, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)

  for (const cat of categories) {
    const catPath = path.join(POSTS_DIR, cat)
    const items = generateSidebar(catPath, `docs/${cat}`)
    if (items.length > 0) {
      sidebar[`/docs/${cat}/`] = [
        {
          text: cat,
          items: items
        }
      ]
    }
  }
  return sidebar
}

// 将侧边栏配置写入文件
function writeSidebarFile(sidebar) {
  const content = `export const sidebar = ${JSON.stringify(sidebar, null, 2)}`
  fs.writeFileSync(OUTPUT_FILE, content, 'utf-8')
  console.log(`✅ Sidebar configuration written to ${OUTPUT_FILE}`)
}

// 主函数
function main() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.error(`❌ Posts directory not found: ${POSTS_DIR}`)
    process.exit(1)
  }
  const sidebar = buildSidebarConfig()
  writeSidebarFile(sidebar)
}

main()