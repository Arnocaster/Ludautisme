const automaticalMail = "Ce mail est un mail automatique, nous vous remercions de ne pas y répondre mais nous restons joignables à l'adresse suivante : ludautisme@gmail.com";

module.exports = {
    /**
     * return the mail and subject for the welcome mail
     * @param name first name of adherent
     * @returns subject and text of the mail
     */
    sendWelcome(name) {
        const subject = "Bienvenue à l'Association Ludautisme !";
        const text = `
        <p>Bonjour ${name},</p>
        <p>Et bienvenue à notre association ! Nous sommes ravis de vous compter parmi nos adhérents et espérons pouvoir répondre à vos attentes. Vous pouvez désormais créer un compte personnel sur notre site internet grâce à la procédure ci-dessous :</p>      
        <ul>
            <li>Accédez à <a href="https://ludautisme.org">https://ludautisme.org</a></li>
            <li>Cliquez sur l'icône en haut à droite de l’écran</li>
            <li>Sur l’écran qui apparaît cliquez sur “mot de passe oublié”</li>
            <li>Sur l’écran suivant entrez votre e-mail</li>
            <li>Vous recevrez un e-mail avec les informations pour créer votre mot de passe.</li>
            <li>Voilà, vous êtes enregistré ! </li>
        </ul>  
        <p>À bientôt !</p>
        <p>L'équipe de Lud'Autisme</p>
        <p>${automaticalMail}</p>
            `;
        return { subject, text };
    },
    /**
     * return the mai for get new password
     * @param name first name of adherent
     * @param passwordLink link for reinitialize password
     * @returns subject and text of the mail
     */
    sendPasswordRecovery(name, passwordLink) {
        const subject = 'Votre nouveau mot de passe';
        const text = `
        <p>Bonjour ${name},</p>
        <p>Vous avez demandé à créer un nouveau mot de passe, pour continuer cliquez sur le lien suivant :</p>
        <p><a href="${passwordLink}">${passwordLink}</a></p>
        <p>Si vous n’êtes pas à l'origine de cette demande, ignorez simplement cet e-mail.</p>
        <p>À bientôt !</p>
        <p>L'équipe de Lud'Autisme</p>
        <p>${automaticalMail}</p>`;

        return { subject, text };
    },
    /**
     * return the mail for late booking
     * @param name first name of adherent
     * @param reservationDate reservation pick-up date
     * @returns subject and text of the mail
     */
    sendLateBooking(name, reservationDate) {
        const subject = `Votre réservation du ${reservationDate}`;
        const text = `
        <p>Bonjour ${name},</p>
        <p>Vous avez emprunté des articles le ${reservationDate} et votre réservation a malheureusement dépassé la date de retour.  Pour que d'autres adhérents puissent également profiter de ce matériel, nous vous remercions de bien vouloir le rapporter lors de la prochaine permanence.</p>
        <p>Nous vous rappelons qu'il est possible de faire une demande de prolongation depuis votre espace personnel.</p>
        <p>Vous pourrez, bien sûr, réemprunter vos articles préférés lors d'une permanence suivante !</p>
        <p>A bientôt !</p>
        <p>L'équipe de Lud'Autisme</p>
        <p>${automaticalMail}</p>`;

        return { subject, text };
    },
    /**
     * return the mail for late contribution
     * @param name first name of adherent
     * @param adhesionDate subscription date
     * @returns subject and text of the mail
     */
    sendLateContribution(name, adhesionDate) {
        const subject = 'Votre adhésion à Ludautisme';
        const text = `
        <p>Bonjour ${name},</p>
        <p>Votre adhésion à l'association Lud'Autisme est arrivée à son terme depuis le ${adhesionDate}. Pour continuer à profiter des avantages de notre association, pensez à réadhérer lors de la prochaine permanence !</p>
        <p>A bientôt !</p>
        <p>L'équipe de Lud'Autisme</p>
        <p>${automaticalMail}</p>`;

        return { subject, text };
    },
    /**
     * return positive response for prolongation demand
     * @param name first name of adherent
     * @param bookingNumber number of booking
     * @param demandDate date of demand
     * @param newDate new finish date of booking
     * @returns subject and text of the mail
     */
    sendProlongationPositiveReply(name, bookingNumber, demandDate, newDate) {
        const subject = 'Votre demande de prolongation';
        const text = `
        <p>Bonjour ${name},</p>
        <p>Le ${demandDate} vous avez demandé à prolonger la réservation n°${bookingNumber}.</p>
        <p>Votre demande a été acceptée, la nouvelle date de fin de réservation est désormais le ${newDate}.</p>
        <p>A bientôt !</p>
        <p>L'équipe de Lud'Autisme</p>
        <p>${automaticalMail}</p>
        `;
        return { subject, text };
    },
    /**
     * return negative response for prolongation demand
     * @param name first name of adherent
     * @param bookingNumber number of booking
     * @param demandDate date of demand
     * @param message message leave by benevl
     * @returns subject and text of the mail
     */
    sendWelcomeProlongationNegativereply(name, bookingNumber, demandDate, message) {
        const subject = 'Votre demande de prolongation';
        const text = `
        <p>Bonjour ${name},</p>
        <p>Le ${demandDate} vous avez demandé à prolonger la réservation n°${bookingNumber}.</p>
        <p>Malheureusement, nous ne pouvons pas accepter votre demande car : </p>
        <p>${message}.</p> 
        <p>Nous vous remercions donc de rapporter le matériel lors de la prochaine permanence.</p>
        <p>A bientôt !</p>
        <p>L'équipe de Lud'Autisme</p>
        <p>${automaticalMail}</p>
        `;

        return { subject, text };
    },
};
