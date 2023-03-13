export const bDataReq = (callback) => {
    console.log("Invoking BData API")
    const url = "http://127.0.0.1:5000/ServeBData"
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log("Returning data", data)
            return callback(data);
        }, (err) => {
            console.error(err);
        });
}