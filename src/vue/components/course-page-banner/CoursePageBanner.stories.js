import CoursePageBanner from "./CoursePageBanner.vue"; // Replace with the path to your component
//👇 This is making sure that the image paths are correct depending on if images are in local environment or published
const server = SERVER;
const images =  [
                  server +"IllustrasjonerKompetansepakker/Barnehage/DigitaldoemmekraftIBarnehagenMedLederstoette/digital-dommekraft-i-barnehagen-med-lederstotte-liten.svg",
                  server+"IllustrasjonerKompetansepakker/DigitalKompetanseISkolen/DigitalUndervisningPaaSkolenOgHjemme/digital-undervisning-på-skolen-og-hjemme-liten.svg",
                  server +"IllustrasjonerKompetansepakker/DigitalKompetanseISkolen/InkluderingOgUniversellUtformingIDigitalPraksis/inkludering-og-universell-utforming-i-digital-praksis-liten.svg",
                  server +"IllustrasjonerKompetansepakker/DigitalKompetanseISkolen/PersonvernILaeringsTeknologiForEiereOgLedere/personvern-i-laeringsteknologi-for-eiere-og-ledere-liten.svg",
                  server +"/IllustrasjonerKompetansepakker/DigitalKompetanseISkolen/TeknologiOgDigitaleFerdigheter/teknologi-og-digitale-ferdigheter-liten.svg",
                  server +"IllustrasjonerKompetansepakker/EksamensOgProvesystemet/eksamens-og-provesystemet-liten.svg",
                  server +"IllustrasjonerKompetansepakker/Inkludering/EleverMedStorLaeringspotensial/elever-med-stor-laeringspotensial-liten.svg",
                  server +"IllustrasjonerKompetansepakker/Inkludering/InkluderendePraksis/inkluderende-praksis-liten.svg",
                  server +"IllustrasjonerKompetansepakker/InnforingAvNyeLaereplanerForLaerebedrifterOgProevenemder/NyeLaereplanerForLaerebedrifter/nye-laereplaner-for-laerebedrifter-liten.svg",
                  server +"IllustrasjonerKompetansepakker/ProgrammeringOgValgfagForUngdomstrinnet/programmering-valgfag-for-laerere-liten.svg",
                  server +"IllustrasjonerKompetansepakker/SFO/TrygtOgGodtMiljoISfo/trygt-og-godt-miljo-i-SFO-liten.svg",
                  server +"IllustrasjonerKompetansepakker/Skolemiljo/TrygtOgGodtSkolemiljo/trygt-og-godt-skolemiljo-liten.svg",
                  server +"IllustrasjonerKompetansepakker/StotteTilArbeidMedLaereplanverket/InnforingAvNyttLaereplanverk/innfoering-av-nytt-laereplanverk(fagfornyelsen)-liten.svg",
                  server +"IllustrasjonerKompetansepakker/StotteTilArbeidMedLaereplanverket/ProgrammeringOgAlgoritmiskTenkning/programmering-og-algoritmisk-tenkning-liten.svg",
                  server +"IllustrasjonerKompetansepakker/StotteTilArbeidMedRegelverket/PersonvernISkolen/personvern-i-skolen-liten.svg",
                  server +"IllustrasjonerKompetansepakker/StotteTilArbeidMedRegelverket/RegelverkIFagOgYrkesopplaering/regelverk-i-fag-og-yrkesopplaering-liten.svg",
                  server +"IllustrasjonerKompetansepakker/StotteTilArbeidMedRegelverket/TospraakligFagopplaering/tospraaaklig-fagopplaering-liten.svg"
                ]
export default {
  title: "Components/CoursePageBanner",
  component: CoursePageBanner,
};

export const CoursePageBannerComponent = {
  render: (args) => ({
    components: { CoursePageBanner },
    setup() {
      return { args };
    },
    template: '<CoursePageBanner v-bind="args"/>',
  }),

  args: {
    theme: "theme_0",
    imageUrl: images[1],
    title: 'Inkludering og universell utforming i praksis.'
  },
  tags: ["autodocs"],
  argTypes: {
    theme: {
      control: {
        type: "select",
      },
      options: [
        "theme_0",
        "theme_1",
        "theme_2",
        "theme_3",
        "theme_4",
        "theme_5",
        "theme_6",
        "theme_7",
        "theme_8",
      ],
    },
    imageUrl: {
      control: {
        type: "select",
      },
      options: images,
    },
  },
};




