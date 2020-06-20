# XHR
![javascript](https://img.shields.io/badge/Javascript-XMLHttpRequest-blue?logo=javascript)

<br>

#### ☕ About XHR
<div style="background-color: #efefef">
__👉 XMLHttpRequest(XHR)은 AJAX 요청을 생성하는 JavaScript API입니다. XHR의 메서드로 브라우저와 서버간의 네트워크 요청을 전송할 수 있습니다.
</div>

<br>

https://reqres.in/

<details>
<summary> 알게된 것들  (눌러서 내용보기) </summary>
<div markdown="1">

defer, section, font: inherit

##### 🌼 img
![img](./img/.PNG)

</div>
</details>

<details>
<summary> Stack Overflow  (눌러서 내용보기) </summary>
<div markdown="1">

[xmlHttpRequest.onerror handler use case
](https://stackoverflow.com/questions/45067892/xmlhttprequest-onerror-handler-use-case)

```
var xmlhttp = new XMLHttpRequest(),
  method = 'GET',
  url = 'https://developer.mozilla.org/';

xmlhttp.open(method, url, true);
xmlhttp.onerror = function () {
  console.log("** An error occurred during the transaction");
};
xmlhttp.send();
```

__When dealing with any network based IO all kinds of things could happen.__
__Since an XHR call is for a server response, onerror would come into play when there is an error at the server.__

</div>
</details>