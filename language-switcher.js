(function () {
  // Vercel Web Analytics for this static site. Remove any personal query
  // parameters before page views or events are sent to Vercel.
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  window.va('beforeSend', (event) => {
    const eventUrl = new URL(event.url, window.location.origin);
    ['name', 'birthdate', 'displayName'].forEach((key) => eventUrl.searchParams.delete(key));
    return { ...event, url: eventUrl.toString() };
  });
  if (!document.getElementById('vercel-analytics-script')) {
    const analyticsScript = document.createElement('script');
    analyticsScript.id = 'vercel-analytics-script';
    analyticsScript.defer = true;
    analyticsScript.src = '/_vercel/insights/script.js';
    document.head.appendChild(analyticsScript);
  }

  const url = new URL(window.location.href);
  const matchingName = url.searchParams.get('name')?.trim() || '';
  const languagePreferenceKey = 'writer-matching-language';
  const requestedLanguage = url.searchParams.get('lang');
  let savedLanguage = null;
  try {
    savedLanguage = window.localStorage.getItem(languagePreferenceKey);
  } catch { /* Keep Korean as the fallback when storage is unavailable. */ }
  const language = requestedLanguage === 'en' || (requestedLanguage !== 'ko' && savedLanguage === 'en') ? 'en' : 'ko';

  // 주소에서 영어로 들어온 경우에도 이후 화면에서 같은 언어를 유지합니다.
  if (requestedLanguage === 'en' || requestedLanguage === 'ko') {
    try { window.localStorage.setItem(languagePreferenceKey, language); } catch { /* Ignore storage errors. */ }
  }
  const target = document.querySelector('#lang-toggle') || Array.from(document.querySelectorAll('button')).find((button) => {
    return button.textContent.replace(/\s+/g, '').toUpperCase() === 'KR/EN';
  });

  const controls = document.createElement('div');
  controls.className = 'notranslate inline-flex items-center rounded-full border border-black/10 bg-white/80 p-1 text-xs font-semibold shadow-sm backdrop-blur';
  controls.setAttribute('aria-label', 'Language selection');
  controls.innerHTML = '<button class="rounded-full px-2 py-1 transition hover:bg-black/5" type="button" data-language="ko">KR</button><button class="rounded-full px-2 py-1 transition hover:bg-black/5" type="button" data-language="en">EN</button>';

  function moveToLanguage(nextLanguage) {
    try { window.localStorage.setItem(languagePreferenceKey, nextLanguage); } catch { /* Ignore storage errors. */ }
    const nextUrl = new URL(window.location.href);
    if (nextLanguage === 'en') nextUrl.searchParams.set('lang', 'en');
    else nextUrl.searchParams.set('lang', 'ko');
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
  const englishProfiles = {
    1: { tags: ['modernism', 'urban_solitude', 'experimentation'], role: 'Your modernist rebel', works: 'Crow’s-Eye View, Wings, and The Diary of a Rainy Day', theme: 'A voice that turns fractured city life into daring new forms.', traits: ['Formal experimentation', 'Urban sensibility', 'Inner conflict'], bio: 'A Korean modernist whose compressed, inventive writing captured the anxiety and speed of a changing era.' },
    2: { tags: ['introspection', 'modern_japan', 'human_nature'], role: 'Your quiet observer', works: 'I Am a Cat, Botchan, and Kokoro', theme: 'A calm gaze on the distance between the self and the world.', traits: ['Psychological insight', 'Gentle irony', 'Modern selfhood'], bio: 'A defining voice of modern Japanese literature, known for subtle portraits of solitude, friendship, and moral uncertainty.' },
    3: { tags: ['short_stories', 'moral_ambiguity', 'modernism'], role: 'Your sharp-eyed storyteller', works: 'Rashomon, In a Grove, and Kappa', theme: 'A story can reveal more than one truth at once.', traits: ['Moral ambiguity', 'Precise narration', 'Social satire'], bio: 'A master of the Japanese short story whose work tests the borders between fact, motive, and imagination.' },
    4: { tags: ['adventure', 'satire', 'idealism'], role: 'Your wandering idealist', works: 'Don Quixote and Exemplary Novels', theme: 'The imagination can make even an ordinary road feel immense.', traits: ['Comic vision', 'Idealism', 'Narrative invention'], bio: 'The Spanish novelist whose comic, humane imagination shaped the modern novel.' },
    5: { tags: ['realism', 'ethics', 'society'], role: 'Your moral realist', works: 'War and Peace, Anna Karenina, and The Death of Ivan Ilyich', theme: 'A life becomes clearer when we look honestly at love, duty, and death.', traits: ['Ethical reflection', 'Epic scale', 'Social observation'], bio: 'A Russian novelist celebrated for expansive stories that bring private conscience and public life into the same frame.' },
    6: { tags: ['absurdity', 'existentialism', 'kafkaesque'], role: 'Your literary shadow', works: 'The Metamorphosis, The Trial, and The Castle', theme: 'A lucid imagination for the strange rules that shape ordinary lives.', traits: ['Absurdist feeling', 'Existential anxiety', 'Symbolic narrative'], bio: 'A pioneer of modern literature whose surreal worlds explore alienation, bureaucracy, and the uncertainty of being human.' },
    7: { tags: ['self_discovery', 'spirituality', 'inner_life'], role: 'Your inward traveler', works: 'Siddhartha, Steppenwolf, and Demian', theme: 'The path inward is often the beginning of a new world.', traits: ['Inner insight', 'Symbolic narrative', 'Spiritual quest'], bio: 'A German-Swiss writer whose novels follow the search for wholeness, freedom, and an authentic self.' },
    8: { tags: ['existentialism', 'absurdity', 'rebellion'], role: 'Your literary rebel', works: 'The Stranger, The Plague, and The Myth of Sisyphus', theme: 'Even in an absurd world, solidarity and resistance still matter.', traits: ['Existential rebellion', 'Sense of the absurd', 'Ethical reflection'], bio: 'A French writer and philosopher who explored how people can meet meaninglessness with clarity, courage, and care for others.' },
    9: { tags: ['poetry', 'journey', 'afterlife'], role: 'Your guide through the unknown', works: 'The Divine Comedy, Vita Nuova, and De Monarchia', theme: 'A journey through darkness can become a map toward understanding.', traits: ['Poetic imagination', 'Moral vision', 'Symbolic journey'], bio: 'The Italian poet whose visionary journey through the afterlife remains one of world literature’s great imaginative achievements.' },
    10: { tags: ['social_critique', 'modern_china', 'awakening'], role: 'Your clear-eyed critic', works: 'A Madman’s Diary, The True Story of Ah Q, and Call to Arms', theme: 'To see a society clearly is the first step toward changing it.', traits: ['Social critique', 'Satirical edge', 'Human insight'], bio: 'A foundational modern Chinese writer whose fiction confronted social injustice, habit, and collective denial.' },
    11: { tags: ['history', 'strategy', 'epic'], role: 'Your strategist of stories', works: 'Romance of the Three Kingdoms and Su Ho Zhuan', theme: 'Ambition, loyalty, and strategy reveal themselves most clearly under pressure.', traits: ['Epic storytelling', 'Strategic vision', 'Historical imagination'], bio: 'A central figure of Chinese classical fiction, celebrated for sweeping tales of conflict, loyalty, and political intrigue.' },
    12: { tags: ['psychology', 'faith', 'moral_conflict'], role: 'Your explorer of conscience', works: 'Crime and Punishment, The Brothers Karamazov, and Notes from Underground', theme: 'The deepest conflicts are often the ones we carry within.', traits: ['Psychological depth', 'Moral conflict', 'Philosophical inquiry'], bio: 'A Russian novelist whose intense characters confront guilt, faith, freedom, and the need for redemption.' },
    13: { tags: ['romance', 'wit', 'society'], role: 'Your witty companion', works: 'Pride and Prejudice, Sense and Sensibility, and Emma', theme: 'A sharp eye and a warm heart can make social life far more interesting.', traits: ['Social wit', 'Emotional insight', 'Character comedy'], bio: 'An English novelist admired for elegant stories about love, class, judgment, and the intelligence of everyday life.' },
    14: { tags: ['labyrinths', 'infinity', 'imagination'], role: 'Your maker of labyrinths', works: 'Ficciones, The Aleph, and Labyrinths', theme: 'Every library can open into an infinite universe.', traits: ['Philosophical fantasy', 'Intellectual maze', 'Metaphysical inquiry'], bio: 'An Argentine writer whose stories transform mirrors, libraries, time, and memory into dazzling philosophical puzzles.' },
    16: { tags: ['gothic', 'passion', 'nature'], role: 'Your wild romantic', works: 'Wuthering Heights and Poems by Emily Brontë', theme: 'Passion and landscape can speak with the same fierce intensity.', traits: ['Emotional intensity', 'Gothic atmosphere', 'Natural imagery'], bio: 'An English novelist and poet remembered for the elemental power, haunting mood, and fierce emotion of Wuthering Heights.' },
    17: { tags: ['humanism', 'philosophy', 'classicism'], role: 'Your seeker of horizons', works: 'Faust, The Sorrows of Young Werther, and Wilhelm Meister’s Apprenticeship', theme: 'A restless mind can turn learning, longing, and action into a life’s work.', traits: ['Philosophical depth', 'Humanist insight', 'Classical beauty'], bio: 'A German writer, thinker, and scientist whose work embraces emotion, reason, art, and the lifelong pursuit of growth.' }
  };
  const koreanProfileRoles = {
    1: '당신의 모더니스트 반항아', 2: '당신의 조용한 관찰자', 3: '당신의 예리한 이야기꾼', 4: '당신의 방랑하는 이상주의자',
    5: '당신의 도덕적 사실주의자', 6: '당신의 문학적 그림자', 7: '당신의 내면의 여행자', 8: '당신의 문학적 반항아',
    9: '당신의 미지의 안내자', 10: '당신의 명료한 비평가', 11: '당신의 이야기 전략가', 12: '당신의 양심의 탐험가',
    13: '당신의 재치 있는 동반자', 14: '당신의 미로의 창조자', 16: '당신의 야생의 낭만주의자', 17: '당신의 지평을 찾는 이'
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
  const suhoZhuanWorks = resultId === '11'
    ? Array.from(document.querySelectorAll('main p')).find((element) => element.textContent.includes('수호전'))
    : null;
  if (heroImage && publicDomainPortraits[resultId]) {
    const filename = encodeURIComponent(publicDomainPortraits[resultId]);
    heroImage.style.backgroundImage = `url("https://commons.wikimedia.org/wiki/Special:FilePath/${filename}?width=1600")`;
    heroImage.dataset.alt = 'Public-domain historical portrait from Wikimedia Commons';
  }
  const matchHeading = Array.from(document.querySelectorAll('header span')).find((element) => {
    return element.textContent.replace(/\s+/g, '').startsWith('매칭결과');
  });
  if (matchHeading && matchedAuthorNames[resultId]) {
    matchHeading.replaceChildren(
      document.createTextNode('매칭결과:'),
      document.createElement('br'),
      document.createTextNode(matchedAuthorNames[resultId])
    );
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
  // In embedded mobile webviews the document itself may not receive swipe
  // events. Give every screen its own explicit, touch-scrollable main area.
  mobileScrollStyle.textContent = `
    html, body { height: 100%; max-height: 100%; overflow: hidden !important; }
    main {
      height: 100vh !important;
      max-height: 100vh !important;
      height: 100dvh !important;
      max-height: 100dvh !important;
      min-height: 0 !important;
      overflow-x: hidden !important;
      overflow-y: scroll !important;
      overscroll-behavior-y: contain;
      -webkit-overflow-scrolling: touch;
      touch-action: pan-y;
    }
    /* Keep quotations visually calm: balance lines at word boundaries instead
       of allowing a single short final line on narrow screens. */
    [data-view="match-result"] > div:nth-child(2) > div:first-child > p:first-of-type {
      max-width: min(100%, 30ch);
      margin-inline: auto;
      text-wrap: balance;
      word-break: keep-all;
      overflow-wrap: normal;
    }
    .library-scroll-main {
      height: var(--library-scroll-height) !important;
      max-height: var(--library-scroll-height) !important;
    }
  `;
  document.head.appendChild(mobileScrollStyle);

  // The library header is part of the normal layout while its bottom menu is
  // fixed. Reserve exactly their combined height so the final writer card can
  // always scroll fully above the menu.
  const libraryMain = document.querySelector('main:has(#author-list)');
  const libraryHeader = document.querySelector('header');
  const libraryNav = document.querySelector('nav');
  if (libraryMain && libraryHeader && libraryNav) {
    const resizeLibraryScrollArea = () => {
      const availableHeight = Math.max(160, window.innerHeight - libraryHeader.offsetHeight - libraryNav.offsetHeight);
      libraryMain.style.setProperty('--library-scroll-height', `${availableHeight}px`);
    };
    libraryMain.classList.add('library-scroll-main');
    resizeLibraryScrollArea();
    window.addEventListener('resize', resizeLibraryScrollArea, { passive: true });
    window.visualViewport?.addEventListener('resize', resizeLibraryScrollArea, { passive: true });
  }

  if (heroImage && window.matchMedia('(min-aspect-ratio: 1 / 1)').matches) {
    heroImage.parentElement.style.aspectRatio = '16 / 6';
    heroImage.parentElement.style.minHeight = '360px';
  }

  function normalizeHashtags() {
    document.querySelectorAll('[aria-label="Tags"] span').forEach((tag) => {
      tag.textContent = tag.textContent
        .trim()
        .replace(/^#\s*/, '#')
        .replace(/\s+/g, '_')
        .toLowerCase();
    });
  }

  function setupBirthdateInput() {
    const birthdateInput = document.getElementById('birthdate');
    if (!birthdateInput) return;

    // Device-native date pickers format values differently by locale. Use one
    // consistent four-digit year / two-digit month / two-digit day field.
    birthdateInput.type = 'text';
    birthdateInput.placeholder = 'YYYY-MM-DD';
    birthdateInput.inputMode = 'numeric';
    birthdateInput.maxLength = 10;
    birthdateInput.pattern = '\\d{4}-\\d{2}-\\d{2}';
    birthdateInput.setAttribute('aria-label', language === 'en' ? 'Birthdate (YYYY-MM-DD)' : '생년월일 (YYYY-MM-DD)');
    birthdateInput.addEventListener('input', (event) => {
      const digits = birthdateInput.value.replace(/\D/g, '').slice(0, 8);
      const isDeleting = event.inputType?.startsWith('delete');
      let formatted = digits.slice(0, 4);
      if (digits.length >= 4 && !(isDeleting && digits.length === 4)) formatted += '-';
      if (digits.length > 4) formatted += digits.slice(4, 6);
      if (digits.length >= 6 && !(isDeleting && digits.length === 6)) formatted += '-';
      if (digits.length > 6) formatted += digits.slice(6, 8);
      birthdateInput.value = formatted;

      const parsed = new Date(`${formatted}T00:00:00Z`);
      const isValid = /^\d{4}-\d{2}-\d{2}$/.test(formatted)
        && !Number.isNaN(parsed.getTime())
        && parsed.toISOString().slice(0, 10) === formatted;
      birthdateInput.setCustomValidity(formatted && !isValid
        ? (language === 'en' ? 'Please use a valid date in YYYY-MM-DD format.' : 'YYYY-MM-DD 형식의 올바른 날짜를 입력해 주세요.')
        : '');
    });
  }

  function setupNameInput() {
    const nameInput = document.getElementById('displayName');
    if (!nameInput) return;
    if (language === 'en') nameInput.placeholder = 'Enter your name';
  }

  setupBirthdateInput();
  setupNameInput();

  if (language !== 'en') {
    document.documentElement.lang = 'ko';
    const koreanHeroParagraphs = document.querySelector('[data-view="match-result"]')?.children[0]?.querySelectorAll('p');
    if (matchingName && matchedAuthorNames[resultId] && url.searchParams.get('from') !== 'library') {
      if (koreanHeroParagraphs?.[0]) {
        koreanHeroParagraphs[0].replaceChildren(
          document.createTextNode(`${matchingName}님과 가장 잘 맞는 작가는`),
          document.createElement('br'),
          document.createTextNode(`${matchedAuthorNames[resultId]}입니다.`)
        );
      }
    } else if (koreanHeroParagraphs?.[0] && koreanProfileRoles[resultId]) {
      koreanHeroParagraphs[0].textContent = koreanProfileRoles[resultId].replace(/^당신의 /, '당신은 ');
    }
    normalizeHashtags();
    return;
  }

  document.documentElement.lang = 'en';

  // Keep the main journey usable even if the automatic translation service is
  // slow or unavailable in an embedded browser.
  function applyEnglishCoreCopy() {
    const coreCopy = new Map([
      ['시작하기', 'Start'],
      ['이름', 'Name'],
      ['이름을 입력해 주세요', 'Enter your name'],
      ['대표작:', 'Major works:'],
      ['매칭 결과 보기', 'View match result'],
      ['이름과 생년월일 정보는 저장되지 않습니다.', 'Name and birthdate information will not be saved.'],
      ['문학적 DNA를 읽는 중', 'Reading your literary DNA'],
      ['당신만의 문장과 닮은 작가를 찾고 있어요.', 'Finding the writer whose words resonate with yours.'],
      ['처음으로', 'Home'],
      ['다른 문학적 동반자들을 만나보세요.', 'Meet other literary companions.'],
      ['작가 결과 보기 →', 'View writer profile →'],
      ['작가 더 보기', 'View more writers'],
      ['문학적 DNA 분석', 'Literary DNA analysis']
    ]);
    const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const coreTextNodes = [];
    while (textWalker.nextNode()) coreTextNodes.push(textWalker.currentNode);
    coreTextNodes.forEach((node) => {
      const trimmed = node.nodeValue.trim();
      const replacement = trimmed.startsWith('대표작:')
        ? `Major works:${trimmed.slice('대표작:'.length)}`
        : coreCopy.get(trimmed);
      if (replacement) node.nodeValue = node.nodeValue.replace(trimmed, replacement);
    });

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

    if (url.pathname.endsWith('/_18/code.html')) {
      const birthTitle = document.querySelector('main h1');
      const birthDescription = birthTitle?.parentElement.querySelector('p');
      if (birthTitle) birthTitle.innerHTML = 'Please enter your<br>birthdate';
      if (birthDescription) birthDescription.textContent = 'We will match your literary companion';
    }

    if (englishAuthorNames[resultId] && url.searchParams.get('from') !== 'library' && matchHeading) {
      matchHeading.replaceChildren(
        document.createTextNode('Match result:'),
        document.createElement('br'),
        document.createTextNode(englishAuthorNames[resultId])
      );
    }
  }

  function applyFixedEnglishProfile() {
    const profile = englishProfiles[resultId];
    const resultView = document.querySelector('[data-view="match-result"]');
    if (!profile || !resultView) return;

    const hero = resultView.children[0];
    const details = resultView.children[1];
    const tags = hero?.querySelector('[aria-label="Tags"]');
    if (tags) {
      tags.innerHTML = profile.tags.map((tag) => `<span class="inline-flex items-center px-3 py-1 bg-tertiary-container/10 text-on-tertiary-fixed-variant font-label-sm text-label-sm rounded-full backdrop-blur-sm">#${tag}</span>`).join('');
    }
    const heroTitle = hero?.querySelector('h1');
    const heroParagraphs = hero?.querySelectorAll('p');
    if (heroTitle) heroTitle.textContent = englishAuthorNames[resultId];
    if (heroParagraphs?.[0]) {
      if (matchingName && url.searchParams.get('from') !== 'library') {
        heroParagraphs[0].replaceChildren(
          document.createTextNode(`The writer who best matches ${matchingName} is`),
          document.createElement('br'),
          document.createTextNode(`${englishAuthorNames[resultId]}.`)
        );
      } else {
        heroParagraphs[0].textContent = profile.role.replace(/^Your /, 'You are the ');
      }
    }
    if (heroParagraphs?.[1]) heroParagraphs[1].textContent = `Major works: ${profile.works.replace(/, and /g, ', ')}`;

    const quoteCard = details?.children[0];
    const quoteParagraphs = quoteCard?.querySelectorAll('p');
    if (quoteParagraphs?.[0]) quoteParagraphs[0].textContent = profile.theme;
    if (quoteParagraphs?.[1]) quoteParagraphs[1].textContent = 'Writer profile';

    const analysisTitle = details?.querySelector('h2');
    if (analysisTitle) {
      const titleText = Array.from(analysisTitle.childNodes).find((node) => node.nodeType === Node.TEXT_NODE && node.nodeValue.trim());
      if (titleText) titleText.nodeValue = ' Literary DNA analysis';
    }
    const dnaCard = analysisTitle?.nextElementSibling;
    Array.from(dnaCard?.children || []).forEach((traitRow, index) => {
      const label = traitRow.querySelector('.flex.justify-between span:first-child');
      if (label && profile.traits[index]) label.textContent = profile.traits[index];
    });
    const profileSummary = dnaCard?.nextElementSibling;
    if (profileSummary?.tagName === 'P') profileSummary.textContent = profile.bio;

    const moreButton = details?.querySelector('button');
    if (moreButton) {
      const buttonText = Array.from(moreButton.childNodes).find((node) => node.nodeType === Node.TEXT_NODE && node.nodeValue.trim());
      if (buttonText) buttonText.nodeValue = ' View more writers ';
    }
  }

  applyEnglishCoreCopy();
  applyFixedEnglishProfile();
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

    if (url.pathname.endsWith('/_18/code.html')) {
      const birthTitle = document.querySelector('main h1');
      const birthDescription = birthTitle?.parentElement.querySelector('p');
      if (birthTitle) birthTitle.innerHTML = 'Please enter your<br>birthdate';
      if (birthDescription) birthDescription.textContent = 'We will match your literary companion';
    }

    if (suhoZhuanWorks) {
      suhoZhuanWorks.textContent = 'Major works: Romance of the Three Kingdoms, Su Ho Zhuan';
    }

    normalizeHashtags();
  }

  translatePage();
})();
