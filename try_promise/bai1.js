function fakeApiCall(){
    return new Promise((resolve, reject) => {
        const fakeApi = true;
        if (fakeApi) {
            resolve("Fake api call success");
        } else {
            reject("Fake api call failed");
        }
    })
}
fakeApiCall()
    .then((data)=>{
        console.log(data);
    })
    .catch((err)=>{
        console.log(err);
    })