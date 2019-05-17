import Data from './Data';

export default class App {
    constructor() {
        this.state = {
            url: 'http://www.mrsoft.by/data.json',
            proxyurl: 'https://cors-anywhere.herokuapp.com/',
        }
    }

    async start() {
        const data = new Data(this.state);
        const arr = await data.getData();
        arr.forEach(element => {
            console.log(element + "///");
            
        });
    }
}