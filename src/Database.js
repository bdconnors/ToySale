class Database{
    constructor(url){
        this.url = url;
    }
    async create(data){
        console.log(data);
        return await this.execute('POST',data).catch((e)=>{console.log(e)});
    }
    async retrieve(){
        return await this.execute('GET').catch((e)=>{console.log(e)});
    }
    async update(id,data){
        return await this.execute('PATCH',data,id).catch((e)=>{console.log(e)});
    }
    async delete(data){
        return await this.execute('DELETE',data).catch((e)=>{console.log(e)});

    }
    async execute(method,data,ext){
        const request = {
            'method':method,
            'mode':'cors',
            'headers':{
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        };
        let url = this.url;
        if(ext) {url += ext;}
        if(data){request.body = JSON.stringify(data);}
        console.log(request);
        const response = await fetch(url,request).catch((e)=>{console.log(e)});
        return await response.json();
    }
}