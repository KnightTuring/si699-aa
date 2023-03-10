export const bDataReq = () => {
    console.log("Invoking BData API")
    const url = "http://127.0.0.1:5000/ServeBData"
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            return data;
        }, (err) => {
            console.error(err);
        });
}