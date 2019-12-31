const database = new Database(config.host);
const toyBox = new ToyBox(database);
const toyBoxControl = new ToyBoxControl(toyBox,config.display,config.form,config.formBtn,config.createBtn,config.likeDislike);

$(document).ready(()=>{
  toyBoxControl.loadToys().catch((e)=>{console.log(e)});
  console.log(toyBoxControl);
});


