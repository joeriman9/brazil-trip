// Data for your trip destinations with their coordinates, associated itinerary section IDs, and new day labels
const destinations = [
    {
        name: "São Paulo",
        dayLabel: "Day 1",
        lat: -23.5505,
        lng: -46.6333,
        info: "Gateway to Brazil, important transport hub.",
        sectionId: "day-card-saopaulo"
    },
    {
        name: "Bonito",
        dayLabel: "Day 2-5",
        lat: -21.1219,
        lng: -56.4853,
        info: "Known for crystal-clear rivers and ecological tours. Activities: Snorkeling Rio da Prata, Buraco das Araras, Lagoa Misteriosa.",
        sectionId: "day-card-bonito"
    },
    {
        name: "Campo Grande",
        dayLabel: "Day 8-9", // Note: While Day 8 is Pantanal -> Campo Grande, it sets up Day 9's flight from Campo Grande
        lat: -20.4429,
        lng: -54.6468,
        info: "Capital of Mato Grosso do Sul, transition point to Pantanal.",
        sectionId: "day-card-campogrande"
    },
    {
        name: "Pantanal",
        dayLabel: "Day 5-8",
        lat: -19.5, // Approximate center for display
        lng: -56.5, // Approximate center for display
        info: "World's largest tropical wetland, incredible wildlife viewing. Activities: Horseback riding, hiking, photo safaris, boat trips.",
        sectionId: "day-card-pantanal"
    },
    {
        name: "Foz do Iguaçu",
        dayLabel: "Day 9-12",
        lat: -25.5463,
        lng: -54.5828,
        info: "Home to the magnificent Iguaçu Falls (Brazilian and Argentinian sides). Activities: Brazilian side visit, Macuco Safari, Argentinian side visit.",
        sectionId: "day-card-fozdoiguacu"
    },
    {
        name: "Rio de Janeiro",
        dayLabel: "Day 12-16",
        lat: -22.9068,
        lng: -43.1729,
        info: "The 'Marvelous City' with iconic landmarks and beaches. Activities: Corcovado & Sugarloaf, Bike Tour, Carioca nightlife, Santa Teresa.",
        sectionId: "day-card-riodejaneiro"
    }
    // Note: "Departure" (Day 16-17) is not a specific geographical point for a map marker
];

let map; // Declare map variable globally

function initMap() {
    // Initialize the map centered on Brazil
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -14.235, lng: -51.9253 }, // Approximate center of Brazil
        zoom: 4, // Adjust zoom level as needed
        mapTypeId: "roadmap",
    });

    // Add markers for each destination
    destinations.forEach(destination => {
        const marker = new google.maps.Marker({
            position: { lat: destination.lat, lng: destination.lng },
            map: map,
            title: `${destination.dayLabel}: ${destination.name}`, // Marker tooltip shows Day & City
            animation: google.maps.Animation.DROP // Optional: marker drop animation
            // You can also add a custom icon if you want numbers directly on the marker itself
            // icon: {
            //     url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // Example default red dot
            //     labelOrigin: new google.maps.Point(15, 12) // Adjust label position
            // },
            // label: {
            //     text: destination.dayLabel.replace('Day ', ''), // Only show the number if you want
            //     color: "white",
            //     fontWeight: "bold"
            // }
        });

        // Add info window for each marker
        const infoWindow = new google.maps.InfoWindow({
            content: `<h3>${destination.dayLabel}: ${destination.name}</h3><p>${destination.info}</p>`
        });

        marker.addListener("click", () => {
            infoWindow.open(map, marker);

            // Scroll to the corresponding itinerary section
            if (destination.sectionId) {
                const targetElement = document.getElementById(destination.sectionId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

                    // Optional: Automatically open the day-card if it's closed
                    const contentDiv = targetElement.querySelector('.content');
                    if (contentDiv && !contentDiv.classList.contains('active')) {
                        contentDiv.classList.add('active');
                    }
                }
            }
        });
    });
}

// Existing JavaScript for itinerary toggles
document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.toggle-button');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.nextElementSibling; // The div.content right after the button
            content.classList.toggle('active'); // Toggle the 'active' class
        });
    });
});