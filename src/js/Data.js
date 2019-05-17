export default class Data {
    constructor(state) {
        this.state = state;
        this.result = [];
    }

    static extractData(data) {
        return data.data.map(value => value);
    }

    async getData() {
        const { proxyurl, url } = this.state;
       
        const responce = await fetch(proxyurl + url);
        const data = await responce.json();        
            
        return Data.extractData(data);
    }
}