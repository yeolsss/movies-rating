# Vanilla Javascript 개인과제

### 과제 개요
1. 순수 바닐라 자바스크립트만으로 영화 리스트 조회 및 검색 UI 구현
2. 학습해온 자바스크립트 문법을 최대한 활용
3. 스타일링 작업하며 css 와 친해지기

### 요구사항

- (1) 필수요구사항
    - [1] jQuery 라이브러리 사용없이 **순수 바닐라 자바스크립트** 사용하기
        - JavaScript 문법 종합반에서 학습한 내용과 지난 예제문제를 참조해 보세요
    - [2] TMDB 오픈 API를 이용하여 인기영화 데이터 가져오기

        <aside>
        💡 **[TMDB 오픈 API란?]**
        전 세계에서 가장 많이 사용하는 영화 정보 오픈 API 중 하나입니다. ‘감독’, ‘출연진’, 포스터’ 등 다양한 서비스를 대부분 무료로 제공합니다.

      아래 안내 사항을 따라하며 본인의 API KEY로 인기영화 리스트 데이터를 받아올 준비를 해보세요.

        - TMDB 가입 및 API 요청 방법 안내
            1. 회원가입: https://www.themoviedb.org/signup?language=ko
            2. 이메일 인증: 회원가입 시 입력한 이메일함에 가서 “Activate My Account” 버튼 클릭 후 로그인
            3. 프로필과 설정 버튼 클릭 후 설정 클릭
            4. 좌측 사이드메뉴에서 API 메뉴 클릭 후 API 키 요청 섹션의 ‘click here’ 클릭
            5. “What type of API key do you wish to register?” ********라는 질문에 Developer 클릭 후 동의
            6. API 신청양식 채우고 제출버튼 클릭
            7. API 문서로 이동하기
            8. 영화 API 요청 코드 복사하기 (1~4번 순서대로 진행)
            9. 본인의 js 코드에 8번에서 복사한 코드 적용하기
        </aside>

    - [3] 영화정보 카드 리스트 UI 구현
        - TMDB에서 받아온 데이터를 브라우저 화면에 카드 형태의 데이터로 보여줍니다.
        - 카드에는 title(제목), overview(내용 요약), poster_path(포스터 이미지 경로), vote_average(평점) 이렇게 4가지 정보가 필수로 들어갑니다.
            <aside>
            💡 TMDB 에서 영화 이미지를 가져오려면?
            https://developer.themoviedb.org/docs/image-basics
            위 문서를 참고하여 image url 확인해 보세요.
            image url 은 base url + file size + file path 로 구성됩니다.
            </aside>
        - 카드 클릭 시에는 클릭한 영화 id 를 나타내는 alert 창을 띄웁니다.

    - [4] 영화 검색 UI 구헌
        - API로 받아온 전체 영화들 중 영화 제목에 input 창에 입력한 문자값이 포함되는 영화들만 화면에 보이도록 합니다.
        - 입력 후 검색버튼 클릭 시 실행되도록 합니다.
    - [5] 하기 기재된 Javascript 문법 요소를 이용하여 구현
        - 문법 리스트
        - - const와 let만을 이용한 변수 선언 필수

    ```jsx
    const a = 'test 01';
    let b = 'test 02';
    
    var c = 'no way!'; //쓰지 말 것
    ```

- 화살표 함수 : 하기 예시 중 1개 이상 사용
    - 일반 화살표 함수

        ```jsx
        let add = (x, y) => {
          return x + y;
        }
        
        console.log(add(2, 3));   // 5
        ```

    - 한 줄로 된 화살표 함수

        ```jsx
        let add = (x, y) => x + y;
        
        console.log(add(2, 3));   // 5
        ```

    - 매개변수가 하나인 화살표 함수

        ```jsx
        let square = x => x * x;
        
        console.log(square(3));   // 9
        ```

- 배열 메소드 : 하기 예시 중 2개 이상 사용
    - forEach
    - map
    - filter
    - reduce
    - find
- DOM 제어하기 : 하기 api 목록 중 2개 이상 사용하기

---
## Project Result

### 배포
[배포링크](https://movies-rating-nu.vercel.app/)

---

### 시연 
![시연.gif](%EC%8B%9C%EC%97%B0.gif)

---

### 사용 기술
- HTML
- CSS
- Vanilla Javascript

---

### 주요 기능
- 새로고침 없는 원페이지 페이징 처리
- 검색기능
- 영화 디테일 정보 modal
- div를 사용한 원형 Progress 평점 구현

---

### 주요 기술
- TMDB API를 활용(Popular API, Search API, Detail API)
- TMDB API를 이용한 Pagination 구현
- Javascript Module을 활용하여 코드 분할 및 재사용성을 높임

---

