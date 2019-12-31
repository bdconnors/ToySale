class ToyBox{
    constructor(database){
        this.database = database;
        this.toys = [];
    }
    async load(){
        const rawData = await this.database.retrieve().catch((e)=>{console.log(e)});
        for(let i =0; i < rawData.length; i++){
            const data = rawData[i];
            const toy = new Toy(data.id,data.name,data.image,data.likes);
            this.toys.push(toy);
        }
    }
    async addToy(id,name,image,likes){
        const toy = new Toy(id,name,image,likes);
        this.toys.push(toy);
        return await this.database.create(toy).catch((e)=>{console.log(e)});

    }
    getAllToys(){
        return this.toys;
    }
    getToyById(id){
        const toyID = parseInt(id);
        return this.toys.find((toy)=>{return toy.id === toyID});
    }
    updateToy(id,likes){
        return this.database.update(id,{likes:likes}).catch((e)=>{console.log(e)});
    }
    filterToys(property,value){
        return this.toys.filter((toy)=>{return toy[property] === value})
    }
}
