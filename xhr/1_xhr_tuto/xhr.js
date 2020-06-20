const getBtn = document.getElementById('get-btn');
const postBtn = document.getElementById('post-btn');

const sendHttpRequest = (method, url) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    /* responseType을 지정해주면 다음과같이
    ** const data = JSON.parse(xhr.response);
    ** 파싱을 할 필요가 없어진다.
    */
    xhr.responseType = 'json';

    xhr.onload = () => {
        const data = xhr.response
        console.log(data);
    }

    xhr.send();
};

const getData = () => {
    sendHttpRequest('GET', 'https://reqres.in/api/users');
}

const sendData = () => {};

getBtn.addEventListener('click', getData);
postBtn.addEventListener('click', sendData);
