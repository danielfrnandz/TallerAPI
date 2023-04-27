export default {
  showComponentCountries() {
    const ws = new Worker("storage/wsCountries.js", { type: "module" });
    ws.postMessage({
        module: "showCountries" ,
        data : ""
      });

    ws.addEventListener("message", (e) => {
      document.querySelector("#countryCard").innerHTML = e.data;
      ws.terminate();
    });    
  },
  
  showComponentCountry() {
    let details = document.querySelector("#countryCard");
    details.addEventListener("click", (e) =>{
      if (e.target.classList.contains("details")) {
        const ws = new Worker("storage/wsCountries.js", { type: "module" });
        let query = e.target.dataset.country;
        ws.postMessage({
          module: "showCountry" ,
          data : `${query}`
        });

        ws.addEventListener("message", (e) => {
          document.querySelector("#infoCountry").innerHTML = e.data;
          ws.terminate();
        });    
      }
    })


   
    


  },


};
