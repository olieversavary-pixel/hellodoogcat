import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://hellodoogcat-iota.vercel.app/",
    title: "Hellodoogcat",
    description: "Grateful to the world, and proud of myself",
    author: "savary",
    profile: "https://github.com/olieversavary-pixel",
    lang: "zh-CN",
    ogImage: "default-og.jpg",
    timezone: "Asia/Shanghai",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: true,
      // 请将 REPO_NAME 替换为您的 GitHub 仓库名
      url: "https://github.com/olieversavary-pixel/REPO_NAME/edit/main/src/content/posts/",
    },
    search: "pagefind",
  },
  socials: [
    { name: "github", url: "https://github.com/olieversavary-pixel" },
    { name: "x", url: "https://x.com/username" },        // 请替换为真实 X 账号
    { name: "linkedin", url: "https://www.linkedin.com/in/username/" }, // 请替换
    { name: "mail", url: "mailto:olieversavary@gmail.com" }, // 已修正为 mailto:
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x", url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "pinterest", url: "https://pinterest.com/pin/create/button/?url=" },
    { name: "mail", url: "mailto:?subject=See%20this%20post&body=" },
  ],
});