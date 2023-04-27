import API from "../API.js";

let wsCountry = {
  async showCountries(){
    let data = await API.getAllCountries();
    let html = "";  

    data.forEach(country => {
      html += `
        <p>${country.name.official} - ${country.region} - ${country.subregion} - ${country.capital}  - ${country.population} - ${country.capitalInfo.latlng}</p>
          
        `;   
    });

    return html;
  },

  

};


self.addEventListener("message", async (e) => {
  postMessage(await wsCountry[`${e.data.module}`](e.data.data));
});
