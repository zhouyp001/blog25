import { readdirSync, statSync, writeFileSync, existsSync, readFileSync } from 'node:fs'
import { join, relative, sep, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const mdRoot = join(root, 'public', 'markdown')
const outFile = join(root, 'public', 'articles.json')

if (!existsSync(mdRoot)) {
  console.error(`[index] 未找到目录：${mdRoot}`)
  console.error('[index] 请把你的 .md 文件放到 public/markdown/ 下再运行')
  process.exit(1)
}

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

function stripMarkdown(text) {
  return text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*`~|\-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function makeExcerpt(text, max = 180) {
  const plain = stripMarkdown(text)
  return plain.length > max ? plain.slice(0, max) + '…' : plain
}

const articles = walk(mdRoot).map((full) => {
  const rel = relative(mdRoot, full).split(sep).join('/')
  const parts = rel.split('/')
  const title = parts[parts.length - 1].replace(/\.md$/i, '')
  const category = parts.length > 1 ? parts[0] : '未分类'
  const sub = parts.length > 2 ? parts[1] : ''
  
  // 对路径的每一段进行标准编码（中文变成 %E...，+ 号变成 %2B）
  const url = parts.map(encodeURIComponent).join('/')

  const localImgDir = join(dirname(full), 'img')
  const imagesAt = existsSync(localImgDir) ? 'local' : 'root'

  let content = ''
  try {
    content = readFileSync(full, 'utf8')
  } catch (e) {
    content = ''
  }
  const plain = stripMarkdown(content)
  const wordCount = plain.length
  const readingMinutes = Math.max(1, Math.ceil(wordCount / 400))
  const excerpt = makeExcerpt(content)

  return { title, category, sub, path: rel, url, imagesAt, wordCount, readingMinutes, excerpt }
})

articles.sort(
  (a, b) =>
    a.category.localeCompare(b.category, 'zh') ||
    a.sub.localeCompare(b.sub, 'zh') ||
    a.title.localeCompare(b.title, 'zh')
)

writeFileSync(outFile, JSON.stringify(articles, null, 2), 'utf8')
console.log(`[index] 已生成 ${articles.length} 篇文章索引 → public/articles.json`)