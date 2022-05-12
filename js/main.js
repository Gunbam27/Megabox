window.addEventListener('load', () => {
  /////////미디어쿼리 메뉴 클릭 이벤트////////////
  const img = document.querySelectorAll('.icon-switch img');
  const menu = img[2];
  const gnb = document.querySelector('.gnb');
  menu.addEventListener('click', () => {
    console.log('클릭');
    gnb.classList.toggle('open');
  });

  /////////슬라이드 배너 영역////////////
  // 이벤트 대상: .abtn
  const abtn = document.querySelectorAll('.abtn');
  // 변경 대상: 슬라이드 -> .slide-txt
  // 변경 대상: 슬라이드 -> .slide-img
  const text_slide = document.querySelector('.slide.slide-txt');
  const img_slide = document.querySelector('.slide.slide-img');
  const page = document.querySelectorAll('.page span');
  const page_count = document.querySelector('.page-count');

  // li에 data-id로 순서 주는 함수입니다.
  (() => {
    let txt_order = text_slide.querySelectorAll('li');
    let img_order = img_slide.querySelectorAll('li');
    for (let i = 0; i < txt_order.length; i++) {
      txt_order[i].setAttribute('data-seq', i);
    }
    for (let i = 0; i < img_order.length; i++) {
      img_order[i].setAttribute('data-seq', i);
    }
  })();

  let prot = 0;
  //슬라이드 움직이게 하는 함수
  const goSlide = (dir) => {
    ////// 1.광클금지 ///////
    if (prot) return;
    prot = 1;
    setTimeout(() => (prot = 0), 600);
    let txt_sli = text_slide.querySelectorAll('li');
    let img_sli = img_slide.querySelectorAll('li');
    ////// 2.오른쪽 버튼입니다 //////
    if (dir) {
      // 텍스트 슬라이드
      text_slide.style.left = '-100%';
      text_slide.style.transition = '0.6s ease-in-out';
      // 이미지 슬라이드
      img_slide.style.left = '-100%';
      img_slide.style.transition = 'none';
      setTimeout(() => {
        // 텍스트 슬라이드
        text_slide.appendChild(txt_sli[0]);
        text_slide.style.left = '16px';
        text_slide.style.transition = 'none';
        // 이미지 슬라이드
        img_slide.appendChild(img_sli[0]);
        img_slide.style.left = '0';
        img_slide.style.transition = 'none';
      }, 600);
    }
    ////// 3.왼쪽버튼입니다. //////
    else {
      // 텍스트 슬라이드
      text_slide.insertBefore(txt_sli[txt_sli.length - 1], txt_sli[0]);
      text_slide.style.left = '-100%';
      text_slide.style.transition = 'none';
      // 이미지 슬라이드
      img_slide.insertBefore(img_sli[img_sli.length - 1], img_sli[0]);
      img_slide.style.left = '-100%';
      img_slide.style.transition = 'none';

      setTimeout(() => {
        // 텍스트 슬라이드
        text_slide.style.left = '0';
        text_slide.style.transition = '0.6s ease-in-out';
        // 이미지 슬라이드
        img_slide.style.left = '0';
        img_slide.style.transition = 'none';
      }, 10);
    }
    ////// 4.슬라이드 순번에 맞게 보라색으로 표시됨 //////

    for (let x of page) x.classList.remove('on');
    txt_sli = text_slide.querySelectorAll('li');
    let seq = txt_sli[dir].getAttribute('data-seq');
    page[seq].classList.add('on');
    page_count.innerText = `${Number(seq) + 1}/4`;
    console.log(seq);
  };
  // 오른쪽버튼 클릭시
  abtn[1].onclick = () => goSlide(1);
  // 왼쪽버튼 클릭시
  abtn[0].onclick = () => goSlide(0);

  // 5.슬라이드 자동호출
  const stop = document.querySelector('.stop');
  const start = document.querySelector('.start');
  const autoCall = () => {
    autoI = setInterval(() => goSlide(1), 4000);
  };
  autoCall();
  // 슬라이드 자동호출 멈춤버튼
  stop.addEventListener('click', () => {
    clearInterval(autoI);
    stop.style.display = 'none';
    start.style.display = 'block';
  });
  // 슬라이드 자동호출 시작버튼
  start.addEventListener('click', () => {
    autoCall();
    start.style.display = 'none';
    stop.style.display = 'block';
  });
});
