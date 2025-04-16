// Default card list
let cardList = [
    {
        title: "Kitten 2",
        image: "images/kitten.jpg",
        link: "About Kitten 2",
        description: "Demo description about kitten 2"
    },
    {
        title: "Kitten 3",
        image: "images/kitten.jpg",
        link: "About Kitten 3",
        description: "Demo description about kitten 3"
    }
];

// Fetching the card list from the DB
const fetchCardList = async () => {
    const fetchedCardList = []; // Initialize the array for fetched data
    
    try {
        // Fetch data from the API
        const response = await fetch('/api/projects');
        const data = await response.json();

        // Check if the response is successful
        if (data.statusCode === 200 && data.data.length > 0) {
            // Populate fetchedCardList with the project data
            data.data.forEach(project => {
                fetchedCardList.push({
                    title: project.title,
                    image: project.image,
                    link: project.link,
                    description: project.description
                });
            });
        } else {
            console.error("Failed to fetch projects", data.message);
        }
    } catch (err) {
        console.error("Error fetching projects:", err);
    }
    
    // Return the fetched data or the default card list if no data is fetched
    return fetchedCardList.length > 0 ? fetchedCardList : cardList;
};

// Load the card list and update the UI
const loadCardList = async () => {
    const fetchedCardList = await fetchCardList();
    addCards(fetchedCardList);  // Add cards to the DOM
};

// Function to add cards to the page
const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = `
            <div class="col s4 center-align">
                <div class="card medium">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src="${item.image}">
                    </div>
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">
                            ${item.title}<i class="material-icons right">more_vert</i>
                        </span>
                        <p><a href="#">${item.link}</a></p>
                    </div>
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">
                            ${item.title}<i class="material-icons right">close</i>
                        </span>
                        <p class="card-text">${item.description}</p>
                    </div>
                </div>
            </div>
        `;
        $("#card-section").append(itemToAppend);
    });
};

// Event listeners and initialization
$(document).ready(function() {
    $('.materialboxed').materialbox();
    
    // Load card list when the page loads
    loadCardList();
    
    $('#formSubmit').click(() => {
        submitForm();
    });

    $('.modal').modal();
    $('#clickMeButton').click(() => {
        $('#modal1').modal('open');
    });
});

// Function to handle form submission
const submitForm = () => {
    let formData = {};
    formData.first_name = $('#first_name').val();
    formData.last_name = $('#last_name').val();
    formData.password = $('#password').val();
    formData.email = $('#email').val();
    console.log("Form Data Submitted: ", formData);
};

const clickMe = () => {
    alert("Thanks for clicking me. Hope you have a nice day!");
};
