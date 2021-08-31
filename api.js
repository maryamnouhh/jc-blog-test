var axios = require("axios").default;
const express = require('express');
const router = express.Router();

router.get('/get-bio', (req, res) => {
    var options = {
    method: 'GET',
    url: 'https://imdb8.p.rapidapi.com/actors/get-bio',
    params: {nconst: 'nm0000120'},
    headers: {
        'x-rapidapi-host': 'imdb8.p.rapidapi.com',
        'x-rapidapi-key': 'da77188950msh69d289a55f3a792p12c5ddjsnc9a12b720c95'
    }
    };
    axios.request(options).then(function (response) {
        console.log(response.data);
        res.render('bio' , {title : "Bio" , name: response.data.name, dob: response.data.birthDate, 
        bp : response.data.birthPlace, gender: response.data.gender, height: response.data.heightCentimeters});
    }).catch(function (error) {
        console.error(error);
    }); 
})

module.exports = router;
