import { readdirSync, statSync, writeFileSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const mdRoot = join(root, 'public', 'markdown')

function walk(dir) {
  const out = []
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    const st = statSync(full)
    if (st.isDirectory()) out.push(...walk(full))
    else if (name.toLowerCase().endsWith('.md')) out.push(full)
  }
  return out
}

const articles = walk(mdRoot).map((full) => {
  const rel = relative(mdRoot, full).split(sep).join('/')
  const parts = rel.split('/')
  const category = parts.length > 1 ? parts[0] : '未分类'
  const title = parts[parts.length - 1].replace(/\.md$/i, '')
  // url 按段编码，处理中文、空格、+ 等字符
  const url = parts.map(encodeURIComponent).join('/')
  return { title, category, path: rel, url }
})

articles.sort(
  (a, b) =>
    a.category.localeCompare(b.category, 'zh') ||
    a.title.localeCompare(b.title, 'zh')
)

writeFileSync(
  join(root, 'public', 'articles.json'),
  JSON.stringify(articles, null, 2),
  'utf8'
)
console.log(`生成 articles.json：${articles.length} 篇`)