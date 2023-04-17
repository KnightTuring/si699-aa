export const bDataReq = (callback) => {
    console.log("Invoking BData API")
    const url = "http://127.0.0.1:9500/get_business_data"
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log("Returning data", data)
            return callback(data);
        }, (err) => {
            console.error(err);
        });
}

export const bTractDataReq = (callback, setGranularView, tractNum) => {
    const url = "http://127.0.0.1:9500/get_business_data/"+tractNum
    console.log("Invoking tract API", url)
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log("Returning data", data)
            if(data.length > 0) {
                setGranularView(true)
            } else {
                console.log("No data for tract "+tractNum)
            }
            return callback(data);
        }, (err) => {
            console.error(err);
        });
}

export const tractDataReq = (callback) => {
    console.log("Invoking tract API")
    const url = "http://127.0.0.1:9500/get_tract_data"
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log("Returning data", data)
            return callback(data);
        }, (err) => {
            console.error(err);
        });
}