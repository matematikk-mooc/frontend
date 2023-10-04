import Card from "../components/Card.vue";

//👇 This default export determines where your story goes in the story list
export default {
  component: Card,
};

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const CardComponent = {
  render: (args) => ({
    components: { Card },
    setup() {
      return { args };
    },
    template: '<Card v-bind="args"/>',
  }),

  args: {
    theme: "theme_0",
    courseIllustration:"/IllustrasjonerKompetansepakker/Barnehage/DigitaldoemmekraftIBarnehagenMedLederstoette/digital-dommekraft-i-barnehagen-med-lederstotte-liten.svg",
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
    courseIllustration: {
      control: {
        type: "select",
      },
      options: [
        "/IllustrasjonerKompetansepakker/Barnehage/DigitaldoemmekraftIBarnehagenMedLederstoette/digital-dommekraft-i-barnehagen-med-lederstotte-liten.svg",
        "/IllustrasjonerKompetansepakker/DigitalKompetanseISkolen/DigitalUndervisningPaaSkolenOgHjemme/digital-undervisning-på-skolen-og-hjemme-liten.svg",
        "/IllustrasjonerKompetansepakker/DigitalKompetanseISkolen/InkluderingOgUniversellUtformingIDigitalPraksis/inkludering-og-universell-utforming-i-digital-praksis-liten.svg",
        "/IllustrasjonerKompetansepakker/DigitalKompetanseISkolen/PersonvernILaeringsTeknologiForEiereOgLedere/personvern-i-laeringsteknologi-for-eiere-og-ledere-liten.svg",
        "/IllustrasjonerKompetansepakker/DigitalKompetanseISkolen/TeknologiOgDigitaleFerdigheter/teknologi-og-digitale-ferdigheter-liten.svg",
        "/IllustrasjonerKompetansepakker/EksamensOgProvesystemet/eksamens-og-provesystemet-liten.svg",
        "/IllustrasjonerKompetansepakker/Inkludering/EleverMedStorLaeringspotensial/elever-med-stor-laeringspotensial-liten.svg",
        "/IllustrasjonerKompetansepakker/Inkludering/InkluderendePraksis/inkluderende-praksis-liten.svg",
        "/IllustrasjonerKompetansepakker/InnforingAvNyeLaereplanerForLaerebedrifterOgProevenemder/NyeLaereplanerForLaerebedrifter/nye-laereplaner-for-laerebedrifter-liten.svg",
        "/IllustrasjonerKompetansepakker/ProgrammeringOgValgfagForUngdomstrinnet/programmering-valgfag-for-laerere-liten.svg",
        "/IllustrasjonerKompetansepakker/SFO/TrygtOgGodtMiljoISfo/trygt-og-godt-miljo-i-SFO-liten.svg",
        "/IllustrasjonerKompetansepakker/Skolemiljo/TrygtOgGodtSkolemiljo/trygt-og-godt-skolemiljo-liten.svg",
        "/IllustrasjonerKompetansepakker/StotteTilArbeidMedLaereplanverket/InnforingAvNyttLaereplanverk/innfoering-av-nytt-laereplanverk(fagfornyelsen)-liten.svg",
        "/IllustrasjonerKompetansepakker/StotteTilArbeidMedLaereplanverket/ProgrammeringOgAlgoritmiskTenkning/programmering-og-algoritmisk-tenkning-liten.svg",
        "/IllustrasjonerKompetansepakker/StotteTilArbeidMedRegelverket/PersonvernISkolen/personvern-i-skolen-liten.svg",
        "/IllustrasjonerKompetansepakker/StotteTilArbeidMedRegelverket/RegelverkIFagOgYrkesopplaering/regelverk-i-fag-og-yrkesopplaering-liten.svg",
        "/IllustrasjonerKompetansepakker/StotteTilArbeidMedRegelverket/TospraakligFagopplaering/tospraaaklig-fagopplaering-liten.svg"
      ],
    },
  },
};
