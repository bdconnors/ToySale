class ToyBoxControl{
    constructor(toyBox,displayId,formId,formBtnId,createBtnId,likeDislikeId){
        this.toyBox = toyBox;
        this.display = $(displayId);
        this.form = $(formId);
        this.formBtn = $(formBtnId);
        this.formBtn.on('click',this.displayForm.bind(this));
        this.createBtn = $(createBtnId);
        this.createBtn.on('click',this.createToy.bind(this));
        this.likeDislike = likeDislikeId;
    }
    async loadToys(){
        await this.toyBox.load().catch((e)=>{console.log(e)});
        const toys  = this.toyBox.getAllToys();
        for(let i= 0; i < toys.length; i++){
            this.displayToy(toys[i])
        }
        this.likeDislike = $(this.likeDislike);
        this.likeDislike.on('click',this.handleLikeDislike.bind(this));
    }
    async createToy(){
        const id = toyBox.getAllToys().length +1;
        const name = $('#toyName').val();
        const image = $('#toyImage').val();
        const likes = 0;
        const response = await this.toyBox.addToy(id,name,image,likes).catch((e)=>{console.log(e)});
        this.displayToy(response);
        this.hideForm();
    }
    displayToy(toy){
        this.display.append(this.makeToyCard(toy));
    }
    updateLikesDisplay(toyId,likes){

       $('#'+toyId+'-likeCount')[0].innerHTML = likes;


    }
    async likeToy(toy) {
        toy.likes++;
        const response = await this.toyBox.updateToy(toy.id,toy.likes).catch((e)=>{console.log(e)});
        console.log(response);
        this.updateLikesDisplay(response.id,response.likes);
    }
    async dislikeToy(toy){
        toy.likes--;
        const response = await this.toyBox.updateToy(toy.id,toy.likes).catch((e)=>{console.log(e)});
        console.log(response);
        this.updateLikesDisplay(response.id,response.likes);

    }
    async handleLikeDislike(e){
        console.log('hit');
        e.preventDefault();
        const split = e.target.id.split('-');
        const toyId = parseInt(split[0]);
        const action = split[1];
        const toy = this.toyBox.getToyById(toyId);
        console.log(toy);
        if(action === 'like' ){
            await this.likeToy(toy);
        }else if(action === 'dislike'){
            await this.dislikeToy(toy);
        }
    }
    displayForm(){
        this.form.css('display','block');
    }
    hideForm(){
        this.form.css('display','none');
    }
    makeToyCard(toy){
        return `<div id="${toy.id}" class="card">
            <h2>${toy.name}</h2>
            <img src=${toy.image} class="toy-avatar"/>
            <p  style="font-weight:bold; font-size:20px;">Likes: <span id="${toy.id}-likeCount">${toy.likes}</span></p>
            <a  class='like-dislike' href="#"><i id="${toy.id}-like" class="fa fa-thumbs-up"></i></a>
            <a  class='like-dislike' href="#"><i id="${toy.id}-dislike" class="fa fa-thumbs-down"></i></a>
        </div>`
    }
}