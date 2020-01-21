fetch('http://localhost:3000/weather?address=beijing').then((response) => {
    console.log(1);
    response.json().then((data) => {
        console.log(1, data);
    });
});