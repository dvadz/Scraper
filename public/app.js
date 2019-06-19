
$(document).ready(() =>{
    console.log("document is ready!");
    
    // CLICK TO SAVE
    $(document).on("click", ".btn-save", event =>{
        const id = event.target.dataset.name;
        console.log("ID: ", id);

        //change the color of the button
        $(`#${id}`).addClass("bg-warning");

        // save this listing with the 'id' to the favorites
        $.post(`/api/favourites/${id}`, response => {
            console.log(response);
        });
    });

    // CLICK TO REMOVE FROM FAVORITES
    $(".remove").on("click", event => {
        const id = event.target.dataset.name;
        console.log(`Action: remove from favourites ${id}`);

        // send request to remove this listing with the 'id' from the favorites
        $.ajax({
            url: `/api/favourites/${id}`,
            method: "DELETE"
        })
        .then(response => {
            console.log(response);
            // TODO: optional, check if status is good
            
            // TODO: get the updated list of favourites
            // $.get("/favourites");
            window.location.reload();

        });        
    });

});


