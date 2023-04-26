export default {
    async getAllCountries(){
        let peticion = await fetch(`https://restcountries.com/v3.1/all`);
        let data = peticion.json();
        return data;
    },
    async getCountryByName(name){
        let peticion = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        let data = peticion.json();
        return data;
    }
}