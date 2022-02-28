this.mmooc = this.mmooc || {};

if (typeof this.mmooc.i18n === 'undefined') {
  if (mmooc.api.getLocale() == 'nn') {
    this.mmooc.i18n = {
      AllAvailableCoursesIngress: "Oversikt over alle kompetansepakker du er meldt på og som du kan melde deg på.",
      DropCourseDialogText: 'Trykk OK for å melde deg av kompetansepakken ',
      NoCoursesInfo: 'Det finst ingen kompetansepakker du kan registrere deg på for augeblikket',
      CourseContinue: 'Fortsette',
      CourseRegisterWhenAuthenticated: 'Meld deg på',
      YouAreRegisteredToXCourses: amount => `du er registrert i ${amount} kompetansepakker`,
      CoursesAmount: amount => `${amount} kompetansepakker`,
      OpenCoursesGroup: 'Åpne',
      CloseCoursesGroup: 'Lukk',
      LogIn: 'Logg inn',
      LogInPopup: 'Logg inn på kompetanseportalen',
      LogInCanvas: 'Har ikkje Feide',
      RegisterPopup: 'Registrer deg',
      RegisterWithCanvas: 'Har ikkje Feide',
      JoinCourseDialogText:
        'Du kan melde deg på kompetansepakken igjen seinare om du vil ',
      DropCourse: 'Meld deg av kompetansepakken',
      CreateAccountTitle: 'Har du ikkje konto?',
      CreateAccountSubtitle: 'Klikk her for å lage ein',
      Course: 'Kompetansepakke',
      CourseDefinite: 'Kompetansepakken',
      CoursePlural: 'Kompetansepakker',
      CourseProgressionTitle: 'Din progresjon i kompetansepakken:',
      GoToCourse: 'Gå til kompetansepakken',
      GoToModule: 'Gå til modul',
      BackToCoursePage: 'Tilbake til forsida',
      AddACourse: 'Legg til ein kompetansepakke',
      Module: 'Modul',
      ModulePlural: 'Modular',
      CourseModules: 'Kompetansepakkemodular',
      Assignment: 'Oppgåve',
      Discussion: 'Diskusjon',
      Quiz: 'Prøve',
      Page: 'Innhaldsside',
      ExternalUrl: 'Ekstern lenke',
      ExternalTool: 'Eksternt verktøy',
      File: 'Fil',
      Announcement: 'Kunngjering',
      DiscussionTopic: 'Diskusjon',
      Conversation: 'Innboksmelding',
      Message: 'Oppgåvevarsel',
      Submission: 'Innlevering',
      AssessmentRequest: 'Vurderingsførespurnad',
      Conference: 'Conference',
      Collaboration: 'Collaboration',
      LinkBack: 'Tilbake til førre side',
      Badgesafe: 'Utmerkingar',
      PeerReview: 'Kvarandrevurdering',

      //Teksten nedenfor brukes til å gjenkjenne
      //om man er på en hverandrevurderingsside.
      //http://localhost/courses/1/assignments/1/submissions/3
      //http://localhost/courses/1/assignments/1
      PeerReviewer: 'Fagfellevurdering',

      //Teksten nedenfor brukes til å undersøke om man viser sin egen innlevering
      Delivery: 'Innleveringsdetaljar',

      DetailsAboutYourDelivery: 'Detaljar om innleveringa di',
      DetailsAboutDelivery: 'Detaljar om innlevering',
      SubmissionIsNotAssessed: 'Oppgåva er ikkje vurdert',
      SubmissionIsAssessedByOne: 'Vurderinga er klar',
      SubmissionIsAssessedByAll: 'Alle vurderingar er klare',
      SubmissionAssessmentsAreReady: 'vurderingar er klare',
      GroupGetInTouchSubject: 'ønsker kontakt',
      eventsAndDeadlinesTitle: 'Viktige datoar',
      WeHaveAQuestionToTeacherInTheDiscussion:
        'Vi har eit spørsmål til rettleiar i diskusjonen',
      CallForInstructorHoverOverText:
        'Sender ei melding til rettleiar om at de treng hjelp i denne konkrete gruppediskusjonen. Treng du personleg rettleiing: send melding til din rettleiar i innboks.',
      NoTeacherFeedbackLink:
        'No teacher_feedback link. Does the help menu have a link to send feedback to the teacher?',
      NoEnrollments:
        'Velkommen til vår kompetanseplattform. Du er ikkje påmeldt nokon kompetansepakker endå. Klikk på knappen nedanfor for å sjå tilgjengelege kompetansepakker.',
      OutOf: 'av',
      Months: [
        'januar',
        'februar',
        'mars',
        'april',
        'mai',
        'juni',
        'juli',
        'august',
        'september',
        'oktober',
        'november',
        'desember'
      ]
    };
  } else {
    this.mmooc.i18n = {
      AllAvailableCoursesIngress: "Oversikt over alle kompetansepakker du er meldt på og som du kan melde deg på.",
      DropCourseDialogText: 'Trykk OK for å melde deg av kompetansepakken ',
      NoCoursesInfo: 'Det er ingen kompetansepakker du kan registrere deg på for øyeblikket',
      EnrollButton: 'Join this Course',
      CourseContinue: 'Fortsette',
      CourseRegisterWhenAuthenticated: 'Meld deg på',
      YouAreRegisteredToXCourses: amount => `du er registert i ${amount} kompetansepakker`,
      CoursesAmount: amount => `${amount} kompetansepakker`,
      OpenCoursesGroup: 'Åpne',
      CloseCoursesGroup: 'Lukk',
      LogInPopup: 'Logg inn på kompetanseportalen',
      LogIn: 'Logg inn',
      LogInCanvas: 'Har ikke Feide',
      RegisterPopup: 'Registrer deg',
      RegisterWithCanvas: 'Har ikke Feide',
      JoinCourseDialogText:
        'Du kan melde deg på kompetansepakken igjen senere om du vil ',
      DropCourse: 'Meld deg av kompetansepakken',
      CreateAccountTitle: 'Har du ikke konto?',
      CreateAccountSubtitle: 'Klikk her for å lage en',
      Course: 'Kompetansepakke',
      CourseDefinite: 'Kompetansepakken',
      CoursePlural: 'Kompetansepakker',
      CourseProgressionTitle: 'Din progresjon i kompetansepakken:',
      GoToCourse: 'Gå til kompetansepakken',
      GoToModule: 'Gå til modul',
      BackToCoursePage: 'Tilbake til forsiden',
      AddACourse: 'Legg til en kompetansepakke',
      Module: 'Modul',
      ModulePlural: 'Moduler',
      CourseModules: 'Kompetansepakkemoduler',
      Assignment: 'Oppgave',
      Discussion: 'Diskusjon',
      Quiz: 'Prøve',
      Page: 'Innholdsside',
      ExternalUrl: 'Ekstern lenke',
      ExternalTool: 'Eksternt verktøy',
      File: 'Fil',
      Announcement: 'Kunngjøring',
      DiscussionTopic: 'Diskusjon',
      Conversation: 'Innboksmelding',
      Message: 'Oppgavevarsel',
      Submission: 'Innlevering',
      AssessmentRequest: 'Vurderingsforespørsel',
      Conference: 'Conference',
      Collaboration: 'Collaboration',
      LinkBack: 'Tilbake til forrige side',
      Badgesafe: 'Utmerkelser',
      PeerReview: 'Hverandrevurdering',

      //Teksten nedenfor brukes til å gjenkjenne om man er på en hverandrevurderingsside.
      PeerReviewer: 'Hverandrevurdering',

      //Teksten nedenfor brukes til å undersøke om man viser sin egen innlevering
      Delivery: 'innlevering',

      DetailsAboutYourDelivery: 'Detaljer om din innlevering',
      DetailsAboutDelivery: 'Detaljer om innlevering',
      SubmissionIsNotAssessed: 'Oppgaven er ikke vurdert',
      SubmissionIsAssessedByOne: 'Vurderingen er klar',
      SubmissionIsAssessedByAll: 'Alle vurderinger er klare',
      SubmissionAssessmentsAreReady: 'vurderinger er klare',
      GroupGetInTouchSubject: 'ønsker kontakt',
      eventsAndDeadlinesTitle: 'Viktige datoer',
      WeHaveAQuestionToTeacherInTheDiscussion:
        'Vi har et spørsmål til veileder i diskusjonen',
      CallForInstructorHoverOverText:
        'Sender en melding til veileder om at dere trenger hjelp i denne konkrete gruppediskusjonen. Trenger du personlig veiledning: send melding til din veileder i innboks.',
      NoTeacherFeedbackLink:
        'No teacher_feedback link. Does the help menu have a link to send feedback to the teacher?',
      NoEnrollments:
        'Velkommen til vår kompetanseplattform. Du er ikke påmeldt noen kompetansepakker enda. Klikk på knappen nedenfor for å se tilgjengelige kompetansepakker.',
      OutOf: 'av',
      Months: [
        'januar',
        'februar',
        'mars',
        'april',
        'mai',
        'juni',
        'juli',
        'august',
        'september',
        'oktober',
        'november',
        'desember'
      ]
    };
  }
}
