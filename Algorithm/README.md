# Javascript Algorithm
![javascript](https://img.shields.io/badge/Nodejs--es5-baekjoon-blue?logo=javascript)

<br>

#### ☕ Algorithm
<div style="background-color: #efefef">
👉 백준 알고리즘을 풀어봅시다!
</div>

<br>

#### 입력 방법  

nodejs를 사용하기 때문에 다음과 같이 input을 받아 주어야 합니다.  
다음은 대문자는 소문자로 소문자는 대문자로 바꾸는 문제입니다.  

```
console.log(require('fs').readFileSync('/dev/stdin').toString().trim().split('')
.map((e)=> { return (e.toUpperCase() === e ? e.toLowerCase() : e.toUpperCase()); }).join(''));
```