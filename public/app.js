
$(document).ready(() =>{
    console.log("document is ready!");
    
    $(document).on("click", ".btn-save", event =>{
        console.log("save");
        console.log(event);
        console.log(event.target.attributes[0]);
    });

});


