function checkWindowSize() {
    if (window.innerWidth > 600) {
        window.location.href = "index.html";
    }
}

// Richiama la funzione quando la finestra viene caricata
checkWindowSize();

// Aggiungi un ascoltatore per l'evento di ridimensionamento della finestra
window.addEventListener('resize', function() {
    // Chiama la funzione quando la finestra viene ridimensionata
    checkWindowSize();
});