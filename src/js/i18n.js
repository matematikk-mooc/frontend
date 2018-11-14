this.mmooc=this.mmooc||{};

if (typeof this.mmooc.i18n === 'undefined') {
    if(mmooc.api.getLocale() == "nn")
    {
        this.mmooc.i18n = {
            'DropCourseDialogText' : 'Trykk OK for å melde deg av kurset ', 
            'JoinCourseDialogText' : 'Du kan melde deg på kurset igjen seinare om du vil ', 
            'DropCourse' : 'Meld deg av emnet', 
            'CreateAccountTitle' : 'Har du ikkje konto?', 
            'CreateAccountSubtitle' : 'Klikk her for å lage ein', 
             'Course' : 'Emne', 
             'CourseDefinite' : 'Emnet', 
             'CoursePlural' : 'Emne', 
             'CourseProgressionTitle' : 'Din progresjon i emnet:', 
             'GoToCourse' : 'Gå til kursside', 
             'GoToModule' : 'Gå til modul', 
             'BackToCoursePage' : 'Tilbake til emneforsida', 
             'AddACourse' : 'Legg til eit emne', 
             'Module' : 'Modul', 
             'ModulePlural' : 'Modular', 
             'CourseModules' : 'Kursmodular', 
             'Assignment' : 'Oppgåve', 
             'Discussion' : 'Diskusjon', 
             'Quiz' : 'Prøve', 
             'Page' : 'Innhaldsside', 
             'ExternalUrl' : 'Ekstern lenke', 
             'ExternalTool' : 'Eksternt verktøy', 
             'File' : 'Fil', 
             'Announcement' : 'Kunngjering', 
             'DiscussionTopic': 'Diskusjon', 
             'Conversation': 'Innboksmelding', 
             'Message': 'Oppgåvevarsel', 
             'Submission': 'Innlevering', 
             'AssessmentRequest': 'Vurderingsførespurnad', 
             'Conference': 'Conference', 
             'Collaboration': 'Collaboration', 
             'LinkBack': 'Tilbake til førre side', 
             'Badgesafe': 'Utmerkingar', 
             'PeerReview' : 'Kvarandrevurdering', 
             
             //Teksten nedenfor brukes til å gjenkjenne 
             //om man er på en hverandrevurderingsside.
             //http://localhost/courses/1/assignments/1/submissions/3
             //http://localhost/courses/1/assignments/1
             'PeerReviewer' : 'Fagfellevurdering', 

             //Teksten nedenfor brukes til å undersøke om man viser sin egen innlevering
             'Delivery' : 'Innleveringsdetaljar', 

             'DetailsAboutYourDelivery' : 'Detaljar om innleveringa di', 
             'DetailsAboutDelivery' : 'Detaljar om innlevering', 
             'SubmissionIsNotAssessed' : 'Oppgåva er ikkje vurdert', 
             'SubmissionIsAssessedByOne' : 'Vurderinga er klar', 
             'SubmissionIsAssessedByAll' : 'Alle vurderingar er klare', 
             'SubmissionAssessmentsAreReady' : 'vurderingar er klare', 
             'GroupGetInTouchSubject' : 'ønsker kontakt', 
             'eventsAndDeadlinesTitle' : 'Viktige datoar', 
             'WeHaveAQuestionToTeacherInTheDiscussion' : 'Vi har eit spørsmål til rettleiar i diskusjonen', 
             'CallForInstructorHoverOverText' : 'Sender ei melding til rettleiar om at de treng hjelp i denne konkrete gruppediskusjonen. Treng du personleg rettleiing: send melding til din rettleiar i innboks.',
             'NoTeacherFeedbackLink' : 'No teacher_feedback link. Does the help menu have a link to send feedback to the teacher?', 
             'NoEnrollments' : 'Velkommen til vår emneplattform. Du er ikkje påmeldt nokon emne endå. Klikk på knappen nedanfor for å sjå tilgjengelege emne.', 
             'OutOf' : 'av', 
             'Months' : ["januar", 
             "februar", 
             "mars", 
             "april", 
             "mai", 
             "juni", 
             "juli", 
             "august", 
             "september", 
             "oktober", 
             "november", 
             "desember"] 
            }
    }
    else
    {
        this.mmooc.i18n = {
            'DropCourseDialogText' : 'Trykk OK for å melde deg av kurset ',
            'JoinCourseDialogText' : 'Du kan melde deg på kurset igjen senere om du vil ',
            'DropCourse' : 'Meld deg av kurset',
            'CreateAccountTitle' : 'Har du ikke konto?',
            'CreateAccountSubtitle' : 'Klikk her for å lage en',
            'Course' : 'Emne',
            'CourseDefinite' : 'Emnet',
            'CoursePlural' : 'Emner',
            'CourseProgressionTitle' : 'Din progresjon i emnet:',
            'GoToCourse' : 'Gå til emneside',
            'GoToModule' : 'Gå til modul',
            'BackToCoursePage' : 'Tilbake til emneforsiden',
            'AddACourse' : 'Legg til et emne',
            'Module' : 'Modul',
            'ModulePlural' : 'Moduler',
            'CourseModules' : 'Emnemoduler',
            'Assignment' : 'Oppgave',
            'Discussion' : 'Diskusjon',
            'Quiz' : 'Prøve',
            'Page' : 'Innholdsside',
            'ExternalUrl' : 'Ekstern lenke',
            'ExternalTool' : 'Eksternt verktøy',
            'File' : 'Fil',
            'Announcement' : 'Kunngjøring',
            'DiscussionTopic': 'Diskusjon',
            'Conversation': 'Innboksmelding',
            'Message': 'Oppgavevarsel',
            'Submission': 'Innlevering',
            'AssessmentRequest': 'Vurderingsforespørsel',
            'Conference': 'Conference',
            'Collaboration': 'Collaboration',
            'LinkBack': 'Tilbake til forrige side',
            'Badgesafe': 'Utmerkelser',
            'PeerReview' : 'Hverandrevurdering',

             //Teksten nedenfor brukes til å gjenkjenne om man er på en hverandrevurderingsside.
            'PeerReviewer' : 'Hverandrevurdering',

             //Teksten nedenfor brukes til å undersøke om man viser sin egen innlevering
            'Delivery' : 'innlevering',

            'DetailsAboutYourDelivery' : 'Detaljer om din innlevering',
            'DetailsAboutDelivery' : 'Detaljer om innlevering',
            'SubmissionIsNotAssessed' : 'Oppgaven er ikke vurdert',
            'SubmissionIsAssessedByOne' : 'Vurderingen er klar',
            'SubmissionIsAssessedByAll' : 'Alle vurderinger er klare',
            'SubmissionAssessmentsAreReady' : 'vurderinger er klare',
            'GroupGetInTouchSubject' : 'ønsker kontakt',
            'eventsAndDeadlinesTitle' : 'Viktige datoer',
            'WeHaveAQuestionToTeacherInTheDiscussion' : 'Vi har et spørsmål til veileder i diskusjonen',
            'CallForInstructorHoverOverText' : 'Sender en melding til veileder om at dere trenger hjelp i denne konkrete gruppediskusjonen. Trenger du personlig veiledning: send melding til din veileder i innboks.',
            'NoTeacherFeedbackLink' : 'No teacher_feedback link. Does the help menu have a link to send feedback to the teacher?',
            'NoEnrollments' : 'Velkommen til vår emneplattform. Du er ikke påmeldt noen emner enda. Klikk på knappen nedenfor for å se tilgjengelige emner.',
            'OutOf' : 'av',
            'Months' : ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"]
        };
    }
}
