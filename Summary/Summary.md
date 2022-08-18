# React로 영화 웹서비스 만들기 - 실습

## 5-1 Tour of CRA(create-react-app)

### CRA로 작업할 때 CSS 2가지 선택지

1. CSS 파일을 만들기
    1. 상당히 편하고 간단!
    2. index.js에 import만 해주면 됨!
    3. global한 css를 원하면 이렇게 쓰는거고
    4. 만약 다 다른 css를 원하면 2번 방식대로 쓰는거임!
2. CSS Module
    1. 하지만 여러개의 button들이 있을수도 있어서 만들지 않고 만들어볼거야!
    2. styles.css를 사용하면 모든 버튼들의 속성이 같아진다!!!
    3. 따라서 css Module을 사용!
    4. Button.module.css라는 파일을 만든다.
    5. 이 파일은 index.js에 import X
    6. Button.js에 import시켜준다!
        1. *`import* styles *from* "./Button.module.css";`
    7. CRA는 이 CSS 코드를 **JS 오브젝트**로 변환해준다!
    8. 
    

### CRA로 작업할때 핵심은 Divide & Conquer이다!

## 6.0 Component의 마지막 개념 - Effect

- State
- Prop
- Effect

- **첫번째 render에서만 코드가 실행되고, 다른 state 변화에는 실행되지 않도록 하기**
    - EX) API를 통해 데이터를 가져올 때 첫번째 Component Render에서 API를 Call하고 
    이후에 State가 변화할 때, 그 API에서 데이터를 또다시 가져오면 안된다!
        
        → 그래서 어떻게 **특정 코드들이 첫번째 Component Render에서만 실행**되게 하는지 배우겠다! 
        

## 6.1 Effect

### useEffect

- 두개의 Argument를 가진다.

**첫번째 Argument** (effect): 딱 한번만 실행하고 싶은 코드

**두번째 Argument** (DependcyList): 
- [] 빈 공간으로 두면 딱 한번만 실행된다.
- [keyword] 안에 state를 써두면 이 state가 변화할때만 코드가 실행된다. 

- 우리는 원하는 코드가 특정 State가 변화할 때만 실행되길 바란다.

```jsx
useEffect(() => {
    if (keyword !== "" && keyword.length > 5) {
      console.log("SEARCH FOR", keyword);
    }
  }, [keyword]);
```

- keyword state가 변화할 때만 이 코드를 실행할 것이다!

## 6.3 Cleanup

### Cleanup Function

- 나의 Component가 Destroy 될 때 뭔가 해주는 것이 Cleanup Function이다!

```jsx
useEffect(() => {
    console.log("created :)"); // 컴포넌트가 생성될때 실행됨
    return () => console.log("destroyed :(") // 컴포넌트가 destroy될때 실행됨.
  }, []);
```

- Cleanup Fn

```jsx
function destroyedFn() {
    console.log("bye :(");
  }
  function createFn() {
    console.log("created :)");
    return destroyedFn;
  }
  useEffect(createFn, []);
```

### JS를 쓸때는 중괄호{} 안에 써주면 된다!

## 6.0 ~ 1 To Do List 만들기

### 기존Array에 새로운 원소 추가

- React에서는 push를 사용못한다.

food = [ 1, 2, 3, 4] 가 있고 6을 추가해주고 싶다면

[6, …food] 이렇게 적어야 새로운 Array가 만들어진다.

### State 설정 함수

1. 직접 값을 보내주기
    - `setToDo(””)`
2. 함수를 보내주기
    
    ```jsx
    setToDos((currentArray) => [toDo, ...currentArray]);
    ```
    
    - 함수를 보낼 때 리액트는 함수의 첫번째 argument(currentArray)로 현재 State를 보낸다.

### preventDefault()

- a 태그를 눌렀을때도 href 링크로 이동하지 않게 할 경우
- form안에 submit 역할을 하는 버튼을 눌렀어도 새로 실행하지 않게 하고 싶을 경우(submit은 적용됨) → 새로고침되어 새로 이동되는것을 막는다!

### toDos.map()

- map()함수
    - callbackFunction을 실행한 결과를 가지고 새로운 배열을 만들때 사용.
    - **모든 배열의 값에 Function을 실행하는 Method**
    - [https://velog.io/@daybreak/Javascript-map함수](https://velog.io/@daybreak/Javascript-map%ED%95%A8%EC%88%98)
    - 하나의 Array에 있는 item을 내가 원하는 무엇이든지로 바꿔주는 역할.
    - 예전 array를 가져와서 그 안에 있는 item들을 변형할 수 있다!
    - callbackFunction
        
        첫번째 argument : value
        
        두번째 argument : index
        
        세번째 argument : array
        

```jsx
{toDos.map((item, index) => (
  <li key={index}>{item}</li>
  ))}
```

map을 사용하면 리액트는 element에 key를 줘야함!

### <ul> <ol> <dl>

- <ul> : unordered list 순서없는 목록 → 지금 옆에 있는 점처럼 출력됨
- <ol> : ordered list 순서있는 목록 → 1, 2, 3, 4, 넘버링이 됨.
- <dl> : definition list 사전처럼 용어를 설명하는 목록.
- 사용법
    - <ul> </ul> 사이에 <li>로 목록을 넣어주면 된다!
    - li에는 key가 들어가야한다! 여기선 index를 넣어준당

### Array filter함수

- JS에서 Array의 함수 중 가장 많이 쓰이는 함수 3대장
1. map : array의 모든 요소들에 함수를 적용시켜서 새로운 array를 return
    1. map을 사용할때는 key를 줘야한다!!
2. filter : 특정 조건을 만족하는 새로운 배열을 필요로 할 때.
3. reduce

< filter함수 사용법 >

```jsx
const result = numbers.filter(number => number > 3);
```

- 3보다 큰 number들만 포함된 새로운 array를 return한다.

> **filter 사용법**
> 

callbackfn을 통해 주어진 3개의 인자

1. value
2. index
3. 순회하는 대상 객체

를 사용해 boolean값을 return하는 함수를 등록한다!

**Case 1**

```jsx
const numbers = [1];

numbers.filter((number, index, source) => {

    // number: 요소값
    // index: source에서 요소의 index
    // source: 순회하는 대상

    console.log(number);
    // 1

    console.log(index);
    // 0

    console.log(source);
    // [1]

    return number > 3;
});
```

**Case 2**

```jsx
const guys = [
    { name: 'YD', money: 500000 },
    { name: 'Bill', money: 400000 },
    { name: 'Andy', money: 300000 },
    { name: 'Roky', money: 200000 }
];

const richNames = guys.filter(man => man.money > 300000)
    .map(man => man.name)

console.log(richNames);
// ["YD", "Bill"]
```

## 7.3 Movie App

### async-await

- then 대신 보편적으로 사용하는 방법!

### 동기와 비동기

**동기**

- 작업(task)들이 순차적으로 이루어지는것. A종료 → B 시작
- 다른 작업들은 Blocking한다.

**비동기**

- 작업(task)들이 순차적으로 이루어지지 않는다.
    - A → B 순서의 작업이 있다면 A를 종료하기 전에 B를 실행할 수 있다.
- 다른 작업들을 Non-Blocking한다.
- JS를 비롯한 비동기 통신방식을 Ajax라고 한다
    - Ajax : Asynchronous JS and XML
- HTTP요청(GET, Post..)
- 이벤트 헨들러(click, over …)
- setTimeout
- setInterval 이 있다.

### 비동기 통신 방식 살펴보기

**Callback**

- 콜백 함수란 인자로 들어오는 함수를 칭한다.
- 콜백은 비동기 통신을 할 수 있는 한 패턴이다.
- 문제점 : 콜백 헬로 인한 에러처리불가, 가독성 안좋음

**Promise**

- ES6에서 나온 비동기 패턴
- 비동기 통신 **결과**와 **상태**를 저장하는 객체
- 후속처리 Method로 then(성공), catch(에러), finally(무조건) 가 있다.

**async-await**

- Promise의 복잡성으로 인해 ES8에서 나온 비동기 패턴
- Promise를 기반으로 하며, 완전히 같지는 않으나 사용하기 편하다.

### Promise 자세히 살펴 보기

- 비동기 통신의 핵심은 Promise를 이해하는 것!
- Promise는 비동기 통신의 상태와 처리 결과를 관리하는 객체이다.
- Pending 상태인 Promise의 비동기 통신이 성공하면 resolve함수가 호출되고, fulfilled 상태가 된다.
- Promise의 비동기 통신이 실패하면 reject 함수가 호출되고, rejected상태가 된다.

### 구성요소

**(1) 상태**

<img width="311" alt="%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-08-07_18 41 48" src="https://user-images.githubusercontent.com/56246060/185305090-a46f9800-d9a2-48c7-95c6-da0fd20ae27f.png">

**(2) 결과**

<img width="309" alt="%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-08-07_18 42 09" src="https://user-images.githubusercontent.com/56246060/185305096-4445b1d9-5386-4d82-bb4e-ea50387ff74c.png">

(3) 후속처리 Method

<img width="319" alt="%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-08-07_18 42 35" src="https://user-images.githubusercontent.com/56246060/185305097-47467525-fd90-4d99-8a42-43b12e245654.png">

**사용법**

이 promise를 더 간단히 이해하기 위해서는, Provider / Consumer 관점에서 봐야한다.

- **Provider** : api를 만들 때 Promise를 이용한다.
- **Consumer** : 특정 행동을 하기 위해 이 api를 이용할 수 있다.

### (1) 선언

content를 수정하기 위해 patchContent api를 만든다.

```jsx
// PATCH /todo/:id
const patchContent = (obj: ContentObj): Promise<UpdateContentResponse> => {
  return new Promise((resolve, reject) => {
    if (obj.url && obj.content)
      return resolve({
        status: 200,
        msg: "포스트가 수정되었습니다.",
        content: obj.content,
        id: obj.id,
      });
    else return reject(new Error("url, content가 있는지 확인해주세요."));
  });
};
```

### (2) 사용

이 api를 사용할 때는, 후속처리 메서드 `then`을 이용하여 데이터를 저장하고, `catch`를 이용해서 에러를 처리한다.

```
patchContent(obj)
  .then(response => setResult(response))
  .catch(err => setError(err));

// 실제 promise의 결과는 보통 data안에 들어온다. (response.data)
```

- 동기식은 코드가 짜여진 순서대로 실행된다.
- 비동기식은 코드가 짜여진 순서대로 실행되지 않는다.

**< Case 1 > then사용하기 (Promise fn)**

```jsx
useEffect(() => {
    fetch(
      `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
    )
      .then((response) => response.json())
      .then((json) => {
        setLoading(false); // loading state를 false로 돌려주기!
        setMovies(json.data.movies);
      });
  }, []);
```

**< Case 2 > async-await사용**

```jsx
const getMovies = async () => {
    const response = await fetch(
      `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
    );
    const json = await response.json();
    setLoading(false); // loading state를 false로 돌려주기!
    setMovies(json.data.movies);
  };
```

**< Case 3 > 더 짧게 사용.**

```jsx
const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
      )
    ).json();
    setLoading(false); // loading state를 false로 돌려주기!
    setMovies(json.data.movies);
  };
```

### 다른 Component로 빼기(Movie)

따로 뺀뒤 prop에 필요한 component들을 명시해주고 쓰면 된다!

### React Router

- 페이지를 전환하는 거임.
- Route : 스크린, 페이지, route..등등으로 불림
- home Route를 두고 모든 영화를 보여줌.

### Router

1. BrowserRouter → 우리가 일반적으로 아는 URL
2. HashRouter → #이 붙는다 URL에

### BrowserRouter

**Switch : Route를 찾는 역할. , 한번에 하나의 Route만 렌더링 하기위해 써준다!**

여기서 Route란 URL뒤쪽 부분을 의미하고

Route를 찾으면 컴포넌트를 렌더링한다.

### Link

- 브라우저 새로고침 없이도 다른 페이지로 이동시켜주는 컴포넌트.

<a hre=””> 대신 이걸 사용할 수 있다.

### 다이나믹 URL

- 리액트 Router가 지원.
- 다이나믹하다 : URL에 변수를 넣을 수 있다

```jsx
<Route path="/movie/:id">
```

: 가 겁나 중요해~~

이렇게 쓰면 해당 id의 detail로 넘어간다.

### useParams - react-router-dom에 있음.

- url이 바뀔때 id를 알 수 있게끔한다.
- 해당 Page의 js에
- const { id } = useParams();
- 을 쓰면 바뀔때마다 id에 id가 들어간다!
- 이걸 써서 API에 Request하면됨.

**React Hook useEffect has a missing dependency: 'getMovie'. Either include it or remove the dependency array react-hooks/exhaustive-deps 에러.**

→ useCallback함수 써보기.

### gh-pages : github pages에 업로드 할 수 있게 해주는 나이스한 패키지

### npm run build : 이 script를 실행하면 우리 웹사이트의 production ready code를 생성

**production ready code : 코드가 압축되고 모든게 최적화 된다.**

1. ~~실행하면 build라는 폴더가 생긴다.~~
    - ~~build에는 우리의 코드가 압축되어 들어가 있다.~~
2. 이제 Github Pages에 push해야한다.
    - 하기 전에 package.json 맨 마지막으로 와서
    - "homepage": "[https://hoongding.github.io/react-for-beginners2](https://hoongding.github.io/react-for-beginners2)"를 넣어준다!
    - 그리고 script하나를 만들어줄거다!
    - scripts에 추가해주면 된다.
    - `"deploy": "gh-pages -d build",`
    `"predeploy": "npm run build"`
    - 이렇게 추가해주고 npm run deploy를 실행하면 위의 run build를 안해줘도 알아서 다 된다!
- **gh-pages -d build**
    - gh-pages가 build 폴더를 우리가 적어놓은 웹사이트에 업롣드하도록 하는거임.
- 만약 내가 수정을하고 업데이트 해주고 싶으면 npm run deploy만 치면 알아서 업데이트 된다!

### Breaking Change

- 버전을 업데이트하면서 코드가 깨져서 코드를 수정해야하는 경우.
- 하지만 리액트는 Braking Change 발생안하게 업데이트 됐다.
- 옛날 코드 써도 그대로 작동한다는 말임!
