export default {
    async getAllCountries(){
        let peticion = await fetch(`https://restcountries.com/v3.1/all`);
        let data = await peticion.json();
        return data;
    },
    
    async getCountryByName(name){
        let peticion = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        let data = await peticion.json();
        return data;
    },

    async getCountryByRegion(region){
        let peticion = await fetch(`https://restcountries.com/v3.1/region/${region}`);
        let data = await peticion.json();
        return data;
    }

}