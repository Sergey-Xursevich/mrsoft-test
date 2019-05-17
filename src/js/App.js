import Data from './Data';

export default class App {
  constructor() {
    this.state = {
      url: 'http://www.mrsoft.by/data.json',
      proxyurl: 'https://cors-anywhere.herokuapp.com/',
    };
  }

  async start() {
    const searchLength = document.querySelector('#btn-search-length');
    const searchSubstring = document.querySelector('#btn-search-substring');
    // const checkbox = document.querySelector('#checkbox');
    const inputText = document.querySelector('#inputText');
    const textarea = document.querySelector('.textarea');

    const data = new Data(this.state);
    const arr = await data.getData();

    searchLength.addEventListener('click', () => {
      const countWord = document.getElementsByTagName('p');

      if (countWord.length) {
        textarea.innerHTML = ' ';
      }

      const { value } = inputText;

      arr.forEach((element) => {
        if (value.length < element.length) {
          textarea.innerHTML += `<p>${element}</p>`;
        }
      });
    });

    inputText.addEventListener('keyup', () => {
      if (String(inputText.value).length > 1) {
        searchLength.classList.remove('btn__disable');
        searchLength.removeAttribute('disabled');

        searchSubstring.classList.remove('btn__disable');
        searchSubstring.removeAttribute('disabled');
      } else {
        searchLength.classList.add('btn__disable');
        searchSubstring.classList.add('btn__disable');

        searchLength.setAttribute('disabled', 'disabled');
        searchSubstring.setAttribute('disabled', 'disabled');
      }
    });
  }
}
