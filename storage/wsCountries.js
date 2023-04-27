import API from "../API.js";

let wsCountry = {
  async showCountries(){
    let data = await API.getAllCountries();
    let html = "";  

    data = data.sort((a, b) => a.name.common.localeCompare(b.name.common));

    data.forEach(country => {
      html += `
      <div class="col-3 py-1">
        <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${country.flag} ${country.name.common}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${country.region} (${country.subregion})</h6>
          <p class="card-text"></p>

          <a class="btn btn-secondary details" data-country="${country.cca2}" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button"
          aria-controls="offcanvasExample">
            Details
          </a>
        </div>
      </div>    
      </div>      
        `;   
    });
    return html;
  },

  async showCountry(query){
    let data = await API.getCountryByAbreviature(query);
    console.log(data);
    let html ="";
    let indepencia ="";

    data.forEach(element => {


       (element.independent) ?
       element.independent = "Independiente":      
       element.independent = "Dependiente"

      if (element.borders == null) {
        element.borders = "No tiene"
      }
      

      html= `
      <h3>${element.name.common} (${element.name.official})</h3>

      <div class="row">
        <div class="col-6">
            <table class="table">
              <tbody>
              <tr>
              <th scope="row">Continente/Region</th>
              <td>${element.region}/${element.subregion}</td>
              </tr>

              <th scope="row">Independencia</th>
              <td>${element.independent}</td>
              </tr>

              <tr>
                <th scope="row">Habitantes</th>
                <td>${element.population.toLocaleString('es-MX')}</td>
              </tr>

              <tr>
                <th scope="row">Capital</th>
                <td>${element.capital}</td>
              </tr>


              <tr>
                <th scope="row">Latitud/Longitud</th>
                <td>[${element.latlng}]</td>       
              </tr>

              <tr>
              <th scope="row">Zona Horaria</th>
              <td>${element.timezones}</td>
            </tr>

              <tr>
                <th scope="row">Area</th>          
                <td>${element.area.toLocaleString('es-MX')} km2</td>  
              </tr>

              <tr>
              <th scope="row">Fronteras</th>          
              <td>
                ${element.borders}
              </td>  
              </tr>


            </tbody>
          </table>
        </div>

        <div class="col-4">
          <img src="${element.flags.png}" alt="">
        </div>      
      </div>
    `;      
    });



    return html;   
  }
};


self.addEventListener("message", async (e) => {
  postMessage(await wsCountry[`${e.data.module}`](e.data.data));
});
