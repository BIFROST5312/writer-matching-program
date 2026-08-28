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

  const matchedAuthorNames = {
    1: '이상', 2: '나쓰메 소세키', 3: '아쿠타가와 류노스케', 4: '미겔 데 세르반테스',
    5: '레프 톨스토이', 6: '프란츠 카프카', 7: '헤르만 헤세', 8: '알베르 카뮈',
    9: '단테 알리기에리', 10: '루쉰', 11: '나관중', 12: '표도르 도스토옙스키',
    13: '제인 오스틴', 14: '호르헤 루이스 보르헤스', 16: '에밀리 브론테', 17: '요한 볼프강 폰 괴테'
  };
  const englishAuthorNames = {
    1: 'Yi Sang', 2: 'Natsume Sōseki', 3: 'Ryūnosuke Akutagawa', 4: 'Miguel de Cervantes',
    5: 'Leo Tolstoy', 6: 'Franz Kafka', 7: 'Hermann Hesse', 8: 'Albert Camus',
    9: 'Dante Alighieri', 10: 'Lu Xun', 11: 'Luo Guanzhong', 12: 'Fyodor Dostoevsky',
    13: 'Jane Austen', 14: 'Jorge Luis Borges', 16: 'Emily Brontë', 17: 'Johann Wolfgang von Goethe'
  };
  const resultId = url.pathname.match(/\/_([0-9]+)\/code\.html$/)?.[1];
  const publicDomainPortraits = {
    1: 'Leesang.jpg',
    2: 'Natsume Soseki photo.jpg',
    3: 'Akutagawa.ryunosuke.jpg',
    4: 'Miguel de Cervantes Saavedra 01.jpg',
    5: 'Leo Tolstoy 1908 Portrait (3x4 cropped).jpg',
    6: 'Kafka1906 cropped.jpg',
    7: 'Hermann Hesse 1946.jpg',
    8: 'Camus.JPG',
    9: 'Italian Dante Alighieri.jpg',
    10: '鲁迅 1909年摄于杭州.jpg',
    11: '繡像三國志全傳 巻1 p11.jpg',
    12: 'Dostoevsky 1872.jpg',
    13: 'JaneAusten, by Cassandra Austen.jpg',
    14: 'Jorge Luis Borges 1951, by Grete Stern.jpg',
    16: 'Emily Brontë by Patrick Branwell Brontë restored.jpg',
    17: 'Johann Wolfgang von Goethe 1817.jpg'
  };
  const heroImage = document.getElementById('hero-image');
  if (heroImage && publicDomainPortraits[resultId]) {
    const filename = encodeURIComponent(publicDomainPortraits[resultId]);
    heroImage.style.backgroundImage = `url("https://commons.wikimedia.org/wiki/Special:FilePath/${filename}?width=1600")`;
    heroImage.dataset.alt = 'Public-domain historical portrait from Wikimedia Commons';
  }
  const matchHeading = Array.from(document.querySelectorAll('header span')).find((element) => {
    return element.textContent.replace(/\s+/g, '').startsWith('매칭결과');
  });
  if (matchHeading && matchedAuthorNames[resultId]) {
    matchHeading.textContent = `매칭결과: ${matchedAuthorNames[resultId]}`;
  }

  const matchTabLink = document.querySelector('nav [data-path="match-discovery"]');
  if (matchTabLink && resultId) {
    const homeUrl = new URL('../_15/code.html', window.location.href);
    if (language === 'en') homeUrl.searchParams.set('lang', 'en');
    matchTabLink.href = homeUrl.toString();
  }

  if (url.searchParams.get('from') === 'library') {
    const matchTab = document.querySelector('nav [data-path="match-discovery"]');
    const libraryTab = document.querySelector('nav [data-path="library"]');
    if (matchTab && libraryTab) {
      matchTab.classList.remove('text-primary', 'font-bold');
      matchTab.classList.add('text-on-surface-variant');
      matchTab.removeAttribute('aria-current');
      libraryTab.classList.remove('text-on-surface-variant');
      libraryTab.classList.add('text-primary', 'font-bold');
      libraryTab.setAttribute('aria-current', 'page');
    }
    if (matchHeading) {
      const libraryUrl = new URL('../_library/code.html', window.location.href);
      if (language === 'en') libraryUrl.searchParams.set('lang', 'en');
      const profileTitleLink = document.createElement('a');
      profileTitleLink.href = libraryUrl.toString();
      profileTitleLink.className = matchHeading.className;
      profileTitleLink.textContent = "Writer's Profile";
      profileTitleLink.setAttribute('aria-label', '작가 목록으로 돌아가기');
      matchHeading.replaceWith(profileTitleLink);
      const backButton = document.createElement('a');
      backButton.href = libraryUrl.toString();
      backButton.setAttribute('aria-label', '라이브러리로 돌아가기');
      backButton.className = 'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-on-surface transition-colors hover:bg-surface-variant/30';
      backButton.innerHTML = '<span class="material-symbols-outlined text-[22px]">arrow_back</span>';
      profileTitleLink.parentElement.prepend(backButton);
    }
  }

  document.querySelectorAll('button, a').forEach((element) => {
    if (!element.textContent.replace(/\s+/g, '').includes('작가더보기')) return;
    element.addEventListener('click', (event) => {
      event.preventDefault();
      const libraryUrl = new URL('../_library/code.html', window.location.href);
      if (language === 'en') libraryUrl.searchParams.set('lang', 'en');
      window.location.href = libraryUrl.toString();
    });
  });

  const mobileScrollStyle = document.createElement('style');
  mobileScrollStyle.textContent = 'html, body { min-height: 100%; overflow-y: auto; -webkit-overflow-scrolling: touch; }';
  document.head.appendChild(mobileScrollStyle);

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
    const translated = data[0].map((part) => part[0]).join('');
    // 자동 번역된 문구는 문장/구의 시작을 대문자로 표기합니다.
    return translated.replace(/^(\s*(?:["'“‘(\[]\s*)*)([a-z])/, (match, prefix, letter) => {
      return `${prefix}${letter.toUpperCase()}`;
    });
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

    if (englishAuthorNames[resultId]) {
      const authorName = englishAuthorNames[resultId];
      const mainTitle = document.querySelector('main h1');
      if (mainTitle) mainTitle.textContent = authorName;
      if (url.searchParams.get('from') !== 'library' && matchHeading) {
        matchHeading.textContent = `Match result: ${authorName}`;
      }
    }

    document.querySelectorAll('#author-list a[href]').forEach((link) => {
      const authorId = link.href.match(/\/_([0-9]+)\/code\.html/)?.[1];
      const authorLabel = link.querySelectorAll('span')[1];
      if (authorId && authorLabel && englishAuthorNames[authorId]) {
        authorLabel.textContent = englishAuthorNames[authorId];
      }
    });

    if (url.pathname.endsWith('/_15/code.html')) {
      const homeQuote = document.getElementById('main-quote');
      const homeTitle = document.querySelector('main h1');
      if (homeQuote) homeQuote.innerHTML = 'Meet the sound of<br>souls on paper';
      if (homeTitle) homeTitle.innerHTML = 'Find your literary<br>companion';
    }
  }

  translatePage();
})();
