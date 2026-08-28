(function () {
  const url = new URL(window.location.href);
  const language = url.searchParams.get('lang') === 'en' ? 'en' : 'ko';
  const target = document.querySelector('#lang-toggle') || Array.from(document.querySelectorAll('button')).find((button) => {
    return button.textContent.replace(/\s+/g, '').toUpperCase() === 'KR/EN';
  });

  const controls = document.createElement('div');
  controls.className = 'notranslate inline-flex items-center rounded-full border border-black/10 bg-white/80 p-1 text-xs font-semibold shadow-sm backdrop-blur';
  controls.setAttribute('aria-label', 'Language selection');
  controls.innerHTML = '<button class="rounded-full px-2 py-1 transition hover:bg-black/5" type="button" data-language="ko">KR</button><button class="rounded-full px-2 py-1 transition hover:bg-black/5" type="button" data-language="en">EN</button>';

  function moveToLanguage(nextLanguage) {
    const nextUrl = new URL(window.location.href);
    if (nextLanguage === 'en') nextUrl.searchParams.set('lang', 'en');
    else nextUrl.searchParams.delete('lang');
    window.location.href = nextUrl.toString();
  }

  controls.addEventListener('click', (event) => {
    const button = event.target.closest('[data-language]');
    if (button) moveToLanguage(button.dataset.language);
  });

  if (target) target.replaceWith(controls);
  else {
    const header = document.querySelector('header');
    if (header) {
      controls.classList.add('absolute', 'right-24', 'top-5');
      header.appendChild(controls);
    }
  }

  // 모든 내부 화면 이동은 현재 탭에서 이어집니다. 미리보기 환경에서도 새 창을 만들지 않습니다.
  document.querySelectorAll('a[href]').forEach((link) => {
    const linkUrl = new URL(link.href, window.location.href);
    if (linkUrl.origin === window.location.origin) link.target = '_self';
  });

  const heroImage = document.getElementById('hero-image');
  if (heroImage && window.matchMedia('(min-aspect-ratio: 1 / 1)').matches) {
    heroImage.parentElement.style.aspectRatio = '16 / 6';
    heroImage.parentElement.style.minHeight = '360px';
  }

  if (language !== 'en') {
    document.documentElement.lang = 'ko';
    return;
  }

  document.documentElement.lang = 'en';
  document.querySelectorAll('a[href]').forEach((link) => {
    const linkUrl = new URL(link.href, window.location.href);
    if (linkUrl.origin === window.location.origin) {
      linkUrl.searchParams.set('lang', 'en');
      link.href = linkUrl.toString();
    }
  });

  const textNodes = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      if (parent.closest('script, style, .notranslate')) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  while (walker.nextNode()) textNodes.push(walker.currentNode);

  async function translate(text) {
    const endpoint = new URL('https://translate.googleapis.com/translate_a/single');
    endpoint.search = new URLSearchParams({ client: 'gtx', sl: 'ko', tl: 'en', dt: 't', q: text }).toString();
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error('Translation request failed');
    const data = await response.json();
    return data[0].map((part) => part[0]).join('');
  }

  async function translatePage() {
    const queue = [...textNodes];
    const workers = Array.from({ length: 6 }, async () => {
      while (queue.length) {
        const node = queue.shift();
        try { node.nodeValue = await translate(node.nodeValue); } catch { /* Keep the Korean original if a request fails. */ }
      }
    });
    await Promise.all(workers);
  }

  translatePage();
})();
