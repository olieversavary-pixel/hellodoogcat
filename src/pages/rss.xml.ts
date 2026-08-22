import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getSortedPosts } from "@/utils/getSortedPosts";
import { getPostUrl } from "@/utils/getPostPaths";
import config from "@/config";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";

const parser = new MarkdownIt({
  html: true,      // 允許 Markdown 中的原始 HTML
  linkify: true,   // 自動識別鏈結
});

export async function GET() {
  const posts = await getCollection("posts");
  const sortedPosts = getSortedPosts(posts)
    // 過濾掉沒有日期的文章，避免 Invalid Date
    .filter(({ data }) => data.pubDatetime || data.modDatetime);

  return rss({
    title: config.site.title,
    description: config.site.description,
    site: config.site.url,
    items: sortedPosts.map(({ data, id, filePath, body }) => {
      // 獲取 Frontmatter 中的音頻資訊（需在 content schema 中允許 audio 與 audio_bytes）
      const audioUrl = data.audio;
      const audioBytes = data.audio_bytes ?? 0;

      return {
        link: getPostUrl(id, filePath, config.site.lang),
        title: data.title,
        description: data.description,
        pubDate: new Date(data.modDatetime ?? data.pubDatetime),

        // 1. 如果 Frontmatter 有 audio，自動生成 RSS 標準 <enclosure> 標籤
        ...(audioUrl && {
          enclosure: {
            url: new URL(audioUrl, config.site.url).toString(),
            type: "audio/mpeg",
            length: audioBytes,
          },
        }),

        // 2. 修正 sanitizeHtml 設定，放行音頻標籤與播放器屬性
        content: sanitizeHtml(parser.render(body ?? ""), {
          allowedTags: [
            ...sanitizeHtml.defaults.allowedTags,
            "audio",
            "source", // 新增放行音頻標籤
          ],
          allowedAttributes: {
            ...sanitizeHtml.defaults.allowedAttributes,
            code: ["class"],
            span: ["class", "style"],
            // 允許播放器所需的必要屬性
            audio: ["controls", "preload", "style", "class", "src"],
            source: ["src", "type"],
          },
        }),
      };
    }),
  });
}