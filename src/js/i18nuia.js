this.mmooc=this.mmooc||{};

if(mmooc.api.getLocale() == "nn")
{
    this.mmooc.i18n = {
        'DropCourseDialogText' : 'Trykk OK for å melde deg av modulen ', 
        'JoinCourseDialogText' : 'Du kan melde deg på modulen igjen seinare om du vil ', 
        'DropCourse' : 'Meld deg av modulen', 
        'CreateAccountTitle' : 'Har du ikkje konto?', 
        'CreateAccountSubtitle' : 'Klikk her for å lage ein', 
         'Course' : 'Modul', 
         'CourseDefinite' : 'Modulen', 
         'CoursePlural' : 'Modular', 
         'CourseProgressionTitle' : 'Din progresjon i modulen:', 
         'GoToCourse' : 'Gå til modul', 
         'GoToModule' : 'Gå til emne', 
         'BackToCoursePage' : 'Tilbake til modulforsida', 
         'AddACourse' : 'Legg til ein modul', 
         'Module' : 'Emne', 
         'ModulePlural' : 'Emne', 
         'CourseModules' : 'Emner', 
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
         'NoEnrollments' : 'Velkommen til vår plattform. Du er ikkje påmeldt nokon modular endå. Klikk på knappen nedanfor for å sjå tilgjengelege modular.', 
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
        'DropCourseDialogText' : 'Trykk OK for å melde deg av modulen ',
        'JoinCourseDialogText' : 'Du kan melde deg på modulen igjen senere om du vil ',
        'DropCourse' : 'Meld deg av modulen',
        'CreateAccountTitle' : 'Har du ikke konto?',
        'CreateAccountSubtitle' : 'Klikk her for å lage en',
        'Course' : 'Modul',
        'CourseDefinite' : 'Modulen',
        'CoursePlural' : 'Moduler',
        'CourseProgressionTitle' : 'Din progresjon i modulen:',
        'GoToCourse' : 'Gå til modul',
        'GoToModule' : 'Gå til emne',
        'BackToCoursePage' : 'Tilbake til modulforsiden',
        'AddACourse' : 'Legg til en modul',
        'Module' : 'Emne',
        'ModulePlural' : 'Emner',
        'CourseModules' : 'Emner',
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
        'NoEnrollments' : 'Velkommen til vår plattform. Du er ikke påmeldt noen moduler enda. Klikk på knappen nedenfor for å se tilgjengelige moduler.',
        'OutOf' : 'av',
        'Months' : ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"]
    };
}
