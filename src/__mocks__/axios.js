const axiosMock = {
    get: jest.fn((url,config) => {
        if(url === "http://localhost:8080/api/health" && config.params.heroOrVillan === "Hero"){
            return Promise.resolve({ data: 100 });
        }else if(url === "http://localhost:8080/api/health" && config.params.heroOrVillan === "Villan"){
            return Promise.resolve({ data:100 });
        }
    }),
    post: jest.fn((url,data,params) => {
        console.log(url)
        console.log(data)
        console.log(params)
        if(url === "http://localhost:8080/api/shoot" && params.params.heroOrVillan === "Hero"){
            return Promise.resolve({ data: 'Success Of Hero' , status: 201 });
        }else if(url === "http://localhost:8080/api/shoot" && params.params.heroOrVillan === "Villan"){
            return Promise.resolve({ data: 'Success Of Villan' , status: 201 });
        }else if(url === "http://localhost:8080/api/armour"){
            return Promise.resolve({ data: 'Success Of Armour',status:201})
        }else if(url === "http://localhost:8080/api/reset"){
            return Promise.resolve({ data : "Success Of Reset",status:201})
        }
    })
};

export default axiosMock;