import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getSortedPosts } from "@/utils/getSortedPosts";
import { getPostUrl } from "@/utils/getPostPaths";
import config from "@/config";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";

const parser = new MarkdownIt({
  html: true,      // 允许 Markdown 中的原始 HTML
  linkify: true,   // 自动识别链接
});

export async function GET() {
  const posts = await getCollection("posts");
  const sortedPosts = getSortedPosts(posts)
    // 过滤掉没有日期的文章，避免 Invalid Date
    .filter(({ data }) => data.pubDatetime || data.modDatetime);

  return rss({
    title: config.site.title,
    description: config.site.description,
    site: config.site.url,
    items: sortedPosts.map(({ data, id, filePath, body }) => ({
      link: getPostUrl(id, filePath, config.site.lang),
      title: data.title,
      description: data.description,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
      // 此处将 parser.render(body) 修改为 parser.render(body ?? "")
      content: sanitizeHtml(parser.render(body ?? ""), {
        allowedTags: sanitizeHtml.defaults.allowedTags,
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          code: ["class"],        // 保留代码块的语言类名（用于高亮）
          span: ["class", "style"], // 保留某些内联样式或类
        },
      }),
    })),
  });
}