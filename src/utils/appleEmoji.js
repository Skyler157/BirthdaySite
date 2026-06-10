const APPLE_CDN =
  "https://cdn.jsdelivr.net/gh/iamcal/emoji-data@master/img-apple-64";

export function toUnified(emoji) {
  const points = [];
  for (let i = 0; i < emoji.length; ) {
    const cp = emoji.codePointAt(i);
    points.push(cp.toString(16).toLowerCase());
    i += cp > 0xffff ? 2 : 1;
  }
  return points.join("-");
}

export function getAppleEmojiUrl(emoji) {
  return `${APPLE_CDN}/${toUnified(emoji)}.png`;
}

export function loadAppleEmoji(emoji) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => {
      const withoutFe0f = toUnified(emoji.replace(/\uFE0F/g, ""));
      if (withoutFe0f !== toUnified(emoji)) {
        const fallback = new Image();
        fallback.crossOrigin = "anonymous";
        fallback.onload = () => resolve(fallback);
        fallback.onerror = reject;
        fallback.src = `${APPLE_CDN}/${withoutFe0f}.png`;
      } else {
        reject(new Error(`Emoji not found: ${emoji}`));
      }
    };
    img.src = getAppleEmojiUrl(emoji);
  });
}
