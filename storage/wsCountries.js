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

    data.forEach(element => {

       (element.independent) ?
       element.independent = "Independiente":      
       element.independent = "Dependiente"

      if (element.borders == null) {
        element.borders = "No tiene"
      }

      if (element.flags.alt == null) {
        element.flags.alt = ""
      }

      if (element.unMember) {
        element.unMember= "Miembro"        
      }else {
        element.unMember= "No miembro"   
      }     

      html= `
      <h3>${element.flag} ${element.name.common} (${element.name.official})</h3>
      <h6 class="text-muted">${element.translations.spa.official}</h6>

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

              <th scope="row">Gentilicio</th>
              <td>${element.demonyms.eng.m}</td>
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
              <th scope="row">Naciones Unidas</th>
              <td>${element.unMember}</td>
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
                <td>${element.area.toLocaleString('es-MX')} km<sup>2</sup></td>  
              </tr>

              <tr>             
              <th scope="row">Fronteras</th>          
              <td>
                ${element.borders}
              </td> 
              </tr>

              <tr>             
              <th scope="row">Indicativo</th>          
              <td>
                ${element.idd.root} ${element.idd.suffixes}
              </td> 
              </tr>


            </tbody>
          </table>
        </div>

        <div class="col-4 text-center">
          <h4>Bandera</h4>
          <img class="bandera" src="${element.flags.png}" alt="">
          <h6>${element.flags.alt}</h6>
          <h4>Escudo</h4>
          <img class="escudo" src="${element.coatOfArms.png}" alt="">
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
