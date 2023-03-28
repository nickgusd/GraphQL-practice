import { RESTDataSource } from "apollo-datasource-rest";
class CryptoAPI extends RESTDataSource {
    constructor() {
        super();
        // this.baseURL = "https://api.coindesk.com/v1/bpi/";
    }
    async getCurrencyPrices() {
        // const response = await this.get('currentprice.json"');
        const response = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
        const data = await response.json();
        const keys = Object.keys(data["bpi"]);
        return Object.keys(data).length
            ? keys.map(currency => this.currencyReducer(data["bpi"][currency]))
            : [];
    }
    currencyReducer(currency) {
        return {
            code: currency.code,
            symbol: currency.symbol,
            rate: currency.rate,
            description: currency.description
        };
    }
}
export default CryptoAPI;
