import Data from './Data';

export default class App {
  constructor() {
    this.state = {
      url: 'http://www.mrsoft.by/data.json',
      proxyurl: 'https://cors-anywhere.herokuapp.com/',
    };
  }

  static isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  async start() {
    const searchLength = document.querySelector('#btn-search-length');
    const searchSubstring = document.querySelector('#btn-search-substring');
    const checkbox = document.querySelector('#checkbox');
    const inputText = document.querySelector('#inputText');
    const textarea = document.querySelector('.textarea');

    const data = new Data(this.state);
    const arr = await data.getData();

    searchLength.addEventListener('click', () => {
      const countWord = document.getElementsByTagName('p');
      const { value } = inputText;

      if (countWord.length) {
        textarea.innerHTML = ' ';
      }

      if (App.isNumeric(value)) {
        arr.forEach((element) => {
          if (value < element.length) {
            textarea.innerHTML += `<p>${element}</p>`;
          }
        });
      } else {
        alert('Измените условия фильтра!');
      }
    });

    searchSubstring.addEventListener('click', () => {
      const countWord = document.getElementsByTagName('p');
      const { value } = inputText;

      if (countWord.length) {
        textarea.innerHTML = ' ';
      }

      if (!App.isNumeric(value)) {
        if (!checkbox.checked) {
          arr.forEach((element) => {
            if (element.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
              textarea.innerHTML += `<p>${element}</p>`;
            }
          });
        } else {
          arr.forEach((element) => {
            if (element.indexOf(value) !== -1) {
              textarea.innerHTML += `<p>${element}</p>`;
            }
          });
        }
      } else {
        alert('Измените условия фильтра!');
      }
    });

    inputText.addEventListener('keyup', () => {
      if (String(inputText.value).length >= 1) {
        searchLength.classList.remove('btn__disable');
        searchLength.removeAttribute('disabled');

        searchSubstring.classList.remove('btn__disable');
        searchSubstring.removeAttribute('disabled');
      } else {
        searchLength.classList.add('btn__disable');
        searchSubstring.classList.add('btn__disable');

        searchLength.setAttribute('disabled', 'disabled');
        searchSubstring.setAttribute('disabled', 'disabled');

        textarea.innerHTML = ' ';
      }
    });
  }
}
