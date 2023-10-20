


     import axios from "axios";

     const baseUrl="https://todoappserver-pf1t.onrender.com"
     
     
    //  "https://todoappserver-pf1t.onrender.com"

    // "http://localhost:3001"

  const instans= axios.create({

    baseURL:baseUrl

  })


   export default instans