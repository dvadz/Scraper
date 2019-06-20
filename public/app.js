let scraper = {
    currentId : '',
    currentListing: {}
};

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

    // CLICK TO ADD A NOTE
    $(".add-note").on("click", event => {
        const id = event.target.dataset.name;
        console.log(`Add a note to ${id}`);
        
        //store the _id for later use with the modal
        scraper.currentId = id;

        //show the modal
        $("#trigger-modal").click();
    });


    //FILL UP THE MODAL
    $(".modal").on("shown.bs.modal", () => {
        console.log("modal is displayed");
        $.get(`/api/favourites/${scraper.currentId}`)
            .then(data => {
                //save a local copy of the listing
                scraper.currentListing = data[0];
                console.log(scraper.currentListing);
                //show any existing notes on the modal
                $("textarea").val(data[0].note);
            });
    });

    // CLEAR THE MODAL WHEN CLOSED
    $(".modal").on("hidden.bs.modal", () => {
        $("textarea").val("");
        console.log("modal is hidden");
    });

    // CLICK TO SAVE NOTE
    $("#save-note").on("click", () => {
        // retrive the note and save it
        const note = $("textarea").val();
        scraper.currentListing.note = note;
        
        console.log("Save note");
        saveNote();
    });

    // CLICK TO DELETE THE NOTE
    $("#delete-note").on("click", () => {
        console.log("Delete note");
        scraper.currentListing.note = "";
        saveNote();
    });
});


function saveNote(){

    $.ajax({
        url: `/api/favourites/${scraper.currentId}`,
        method: "PUT",
        data: scraper.currentListing
    })
    .then(data => {
        console.log(data);
        //close the modal
        $("#close-note").click();
    })
    .catch(error => {
        console.log(error);
    });

}