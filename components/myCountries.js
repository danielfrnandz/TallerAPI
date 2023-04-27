export default {
  showComponentCountries() {
    const ws = new Worker("storage/wsCountries.js", { type: "module" });
    ws.postMessage({
        module: "showCountries" ,
        data : ""
      });

    ws.addEventListener("message", (e) => {
      document.querySelector("#texto").innerHTML = e.data;
      ws.terminate();
    });
    
  },
};
