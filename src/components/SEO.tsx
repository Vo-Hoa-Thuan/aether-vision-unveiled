import { useEffect } from 'react';
import { useTranslation } from "@/lib/i18n";

export function SEO() {
  const { language, t } = useTranslation();

  useEffect(() => {
    // Update title
    document.title = language === 'vi' 
      ? "AETHER Vision | Kính thực tế ảo thông minh thế hệ mới"
      : "AETHER Vision | The Next Generation Smart Glasses";

    // Update meta descriptions
    const desc = language === 'vi'
      ? "AETHER Vision hợp nhất chip neural tùy chỉnh, màn hình micro-OLED và cảm biến 12MP vào một khung kính nhẹ đến mức bạn quên đi sự hiện diện của nó."
      : "AETHER Vision fuses a custom neural chip, micro-OLED waveguide displays, and a 12MP sensor into a frame so light, you forget it's there.";
      
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', desc);
    setMeta('og:title', document.title, true);
    setMeta('og:description', desc, true);
    setMeta('og:locale', language === 'vi' ? 'vi_VN' : 'en_US', true);

    // Update hreflang links
    const updateHrefLang = (lang: string, href: string) => {
      let el = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', 'alternate');
        el.setAttribute('hreflang', lang);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    const baseUrl = window.location.origin;
    updateHrefLang('en', `${baseUrl}/`);
    updateHrefLang('vi', `${baseUrl}/`);
    updateHrefLang('x-default', `${baseUrl}/`);

  }, [language, t]);

  return null;
}
