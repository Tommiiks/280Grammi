function effettuaPrenotazione(event) {
    event.preventDefault(); // Impedisce il comportamento predefinito del form
    
    var input = document.getElementById('data-ora');
    var nomeInput = document.getElementById('nome');
    var telefonoInput = document.getElementById('numero-cellulare');
    var personeInput = document.getElementById('persone');

    // Funzione di validazione della data
    function isValidDate(date) {
        return date >= new Date() && date <= maxDate;
    }

    // Funzione di validazione dell'orario
    function isValidTime(time) {
        var parsedTime = new Date('1970-01-01T' + time);
        var hours = parsedTime.getHours();
        var minutes = parsedTime.getMinutes();
        return (hours >= 16 && (hours < 22 || (hours === 22 && minutes <= 30)));
    }

    // Funzione di validazione del numero di telefono
    function isValidPhoneNumber(phoneNumber) {
        // Usa un'espressione regolare per controllare il formato del numero di telefono
        var phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phoneNumber);
    }

    // Funzione di validazione del nome
    function isValidName(name) {
        // Usa un'espressione regolare per controllare che il nome contenga solo lettere e spazi
        var nameRegex = /^[a-zA-Z\s]+$/;
        return nameRegex.test(name);
    }

    // Imposta il giorno minimo a martedì (2) e il giorno massimo a sabato (6)
    var minDay = 2; // Martedì
    var maxDay = 7; // Domenica
   
    var selectedDate = new Date(input.value);
    var selectedDay = selectedDate.getDay(); // Ottieni il giorno della settimana (0 = Domenica, 1 = Lunedì, ..., 6 = Sabato)
   
   // Funzione di validazione della data
   function isValidDate(date) {
       return date >= new Date() && date <= maxDate && date.getDay() >= minDay && date.getDay() <= maxDay;
   }

    var selectedDate = new Date(input.value);
    var numeroPersone = parseInt(personeInput.value, 10);
    var maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 31);

    // Verifica se la data, l'orario, il numero di telefono, il numero di persone e i giorni d'apertura se sono validi
    if (isValidDate(selectedDate) && isValidTime(selectedDate.toTimeString().substr(0, 5)) &&
        isValidPhoneNumber(telefonoInput.value) && (selectedDay >= minDay && selectedDay <= maxDay) && isValidName(nomeInput.value) && numeroPersone > 0 && numeroPersone <= 60) {
        // Se sono validi, mostra un messaggio di successo

        Swal.fire({
            /* EFFETTUA UNA CHIAMATA AD UNA FUNZIONE CHE INVIA IL FORM LATO BACKEND */

            html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="80" height="80"><path fill="#4CAF50" d="M9,16.17L4.83,12l-1.42,1.41L9,19 21,7l-1.41,-1.41z"/></svg>',
            imageAlt: 'Spunta verde',
            title: 'Prenotazione effettuata con successo!',
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false,
            focusConfirm: false,
            allowOutsideClick: false,
            customClass: {
                popup: 'custom-alert-popup',
                },
            didOpen: () => {
                const swalTitle = document.querySelector('.swal2-title');
                // blocco scroll pagina
                var htmlElement = document.querySelector('html');
                htmlElement.style.overflow = "hidden";
                //
                if (swalTitle) {
                    swalTitle.style.color = '#2e8b57';
                    swalTitle.style.fontSize = '1.875em';
                    swalTitle.style.fontWeight = '600';
                    swalTitle.style.textAlign = 'center';
                    swalTitle.style.wordWrap = 'break-word';
                    swalTitle.style.fontFamily = 'Shadow';
                }
            }
            
            }).then((result) => {
                // Se l'utente chiude l'alert manualmente, riavvia la pagina dopo il caricamento simulato e lo scroll torna utilizzabile
                if (result.dismiss === Swal.DismissReason.close) {
                    window.location.href = window.location.origin + window.location.pathname;
            }})

        

    } else {
        // Se non sono validi, mostra un messaggio di errore dettagliato
        var errorMessage = "";
        if (selectedDate < new Date()) {
            errorMessage = "- Non puoi prenotare per una data già passata. Correggi la data per prenotare!<br><br>";
        }
        else if (!isValidTime(selectedDate.toTimeString().substr(0, 5))) {
            errorMessage = "- L'orario di prenotazione deve essere tra le 16:00 e le 22:30.<br><br>";
        }
        else if (!isValidPhoneNumber(telefonoInput.value)) {
            errorMessage += "- Il numero di telefono deve essere composto da 10 cifre.<br><br>";
        }
        else if (!isValidName(nomeInput.value)) {
            errorMessage += "- Inserisci un nome e cognome validi.<br><br>";
        }
        else if (numeroPersone <= 0) {
            errorMessage += "- Il numero di persone deve essere maggiore di zero!<br><br>";
        }

        else if (!(selectedDay >= minDay && selectedDay <= maxDay)) {
            errorMessage += "- Siamo aperti solo dal Martedi al Sabato, correggi la data per prenotare!<br><br>";

        }

        else if (selectedDate > maxDate) {
            errorMessage += "- Online puoi prenotare al massimo per 31 giorni a partire da oggi.<br><br>";
        }
        
        else if (numeroPersone > 60) {
            errorMessage += "- Per prenotazioni con più di 60 persone, contattarci telefonicamente.<br><br>";
        }

        // Mostra il messaggio di errore
        Swal.fire({
            icon: 'error',
            title: 'Errore nella prenotazione!',
            customClass: {
                popup: 'custom-alert-popup',
                },
            html: errorMessage,
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false,
            focusConfirm: false,
            allowOutsideClick: false,
            didOpen: () => {
                // Calcola la posizione verticale per centrare l'alert

                const swalText = document.querySelector('.swal2-content'); 
                const swalTitle = document.querySelector('.swal2-title');
                if (swalTitle) {
                    swalTitle.style.color = '#a30b10';
                    swalTitle.style.fontSize = '1.875em';
                    swalTitle.style.fontWeight = '600';
                    swalTitle.style.textAlign = 'center';
                    swalTitle.style.fontFamily = 'Shadow';
                }

                if (swalText) {
                    swalText.style.color = 'black';
                    swalText.style.fontSize = '1.2em';
                    swalText.style.fontWeight = '600';
                    swalText.style.textAlign = 'center';
                    swalText.style.fontFamily = 'Poppins-Bold';
                }
            }



})}}
