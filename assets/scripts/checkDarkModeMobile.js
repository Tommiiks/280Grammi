 // Imposta un colore di sfondo personalizzato indipendentemente dalla preferenza del sistema
 function setLightMode() {
    document.documentElement.style.backgroundColor = 'whitesmoke'; // Cambia 'white' con il tuo colore di sfondo desiderato
}

// Controlla se il sistema preferisce la modalità scura
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Il sistema è impostato sulla modalità scura
    // Disabilita la modalità scura e imposta il colore di sfondo personalizzato
    setLightMode();
}

// Aggiungi un ascoltatore per l'evento di cambio preferenze del sistema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (e.matches) {
        // Il sistema è passato alla modalità scura
        // Disabilita la modalità scura e imposta il colore di sfondo personalizzato
        setLightMode();
    }
});
