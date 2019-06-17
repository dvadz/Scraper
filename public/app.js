
$(document).ready(() =>{
    console.log("document is ready!");
    
    $(document).on("click", ".btn-save", event =>{
        const id = event.target.dataset.name;
        console.log("ID: ", id);
       
        // save this listing with the 'id' to the favorites
        $.get(`/api/save/${id}`, response => {
            console.log(response);
        });
    });

});


