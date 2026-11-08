# ke_yi_ 的笔记

Vue 3 + Vite + marked 的静态笔记站。

## 使用

1. 把 Markdown 放进 `public/markdown/`，保留原分类目录。
2. 图片二选一：
   - 集中在 `public/img/` 下，Markdown 里写 `![x](img/xxx.png)`；
   - 或者放在每篇文章同级的 `img/` 目录里。
   - 脚本会自动识别每篇文章使用哪种方式，无需改 Markdown。
3. `npm install`
4. `npm run dev` 本地预览（会先自动生成 `public/articles.json`）
5. `npm run build` 产出 `dist/`

## 正文搜索的扩展

首版搜索基于 `articles.json` 中的标题、分类和 180 字摘要。
如需全文搜索，可在 `generate-index.mjs` 中额外生成倒排索引，
或将构建产物交给 Pagefind 处理。