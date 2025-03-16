// === 🎥 Diaporama automatique ===
let slides = document.querySelectorAll('.slide');
let index = 0;

function showNextSlide() {
    slides[index].style.display = "none";
    index = (index + 1) % slides.length;
    slides[index].style.display = "block";
}

setInterval(showNextSlide, 10000); // Change toutes les 3 secondes

// === 🗺️ Carte Leaflet avec position GPS en temps réel ===
let map = L.map('map').setView([49.4939, 0.1077], 13); // Le Havre par défaut

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Ajout d'un marqueur pour la position du véhicule
let busIcon = L.icon({
    iconUrl: 'images/car-icon.png',  // Ajoute ton icône de bus ici
    iconSize: [50, 50],
    iconAnchor: [16, 32]
});

let marker = L.marker([49.4939, 0.1077], { icon: busIcon }).addTo(map);

// Fonction pour mettre à jour la position en temps réel
function updateLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    marker.setLatLng([lat, lon]);
    map.setView([lat, lon], 15);
}

function errorLocation() {
    alert("Impossible d'obtenir votre position.");
}

// Demande la position en temps réel
if (navigator.geolocation) {
    navigator.geolocation.watchPosition(updateLocation, errorLocation);
} else {
    alert("La géolocalisation n'est pas supportée sur votre appareil.");
}