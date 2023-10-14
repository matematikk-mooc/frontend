<template>
  <div class="courses">
    <div class="courses__header-section">
      <h3 class="courses__header-section__header">
        <Icon name="format_list_numbered" size="1em" />
        <span class="courses__header-section__header__title">Moduler</span>
      </h3>
    </div>
    <div class="courses__treeview">
      <div class="courses__treeview__item" v-for="(module, index) in treestructure" :key="index">
       <CourseModule
          :type="module.type"
          :label="module.label"
          :nodes="module.nodes"
          :isActive="isActiveModule(module.label)"
          @toggleActiveModule="toggleActiveModule(module.label)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Icon from '../icon/Icon.vue';
import CourseModule from './CourseModule.vue';

const treeData = [
  {
    label: 'Digitalkompetanse i skolen',
    nodes: [
      {
        label: 'Teknologi og digitale ferdigheter',
        type:'module',
        nodes: [
          {
            label: '0. Intro', type: 'module', nodes: [
              { label: '0.1 rollevalg', type: 'page', isCompleted: true, nodes: [] },
              { label: '0.2 Intro til kompetansepakken', type: 'page', isCompleted: true, nodes: [] },
              { label: '0.3 Digital kompetanse i LK20 (video)', type: 'page', isCompleted: true, nodes: [] },
              { label: '0.4 Egenvurdering av digital praksis (aktivitet)', type:'page',  isCompleted: true ,nodes:[] },
          ] },
          { label: '1. Undervisning i digitale omgivelser',type:'module', nodes: [] },
          { label: '2. Digitale ferdigheter',type:'module', nodes: [] },
          { label: '3. Digital teknologi', type: 'module', nodes: [] },
          { label: '4. Programmering og algoritmisk tenkning', type:'module',nodes: [] }
        ]
      },
      {
        label: 'Inkludering og universell utforming i digital praksis',
        type: 'module',
        nodes: [
          {
            label: '0. Intro til modulen', type: 'module', isCompleted: false, nodes: [
               {
            label: '0.0 Rollevalg', type: 'page', isCompleted: true, nodes: []
              },
           {
            label: '0.1 Intro og mål for modulen', type: 'page', isCompleted: false, nodes: []
              },
           {
            label: '0.2 Inkludering og digital praksis', type: 'page', isCompleted: true, nodes: []
              },
          {
            label: '0.3 Hvorfor er universell utforming viktig?', type: 'page', isCompleted: false, nodes: []
          }
            ]
          },
          {
            label: 'Inkludering i digital praksis', type: 'module', isCompleted: false, nodes: []
          },
          {
            label: 'Universelt utformede læringsressurser', type: 'module', isCompleted: false, nodes: [
          {
            label: '2.1 Skjermlesere og alternativ tekst', type: 'page', isCompleted: true, nodes: []
          },
          {
            label: '2.2 Tekst bør være tekst ', type: 'page', isCompleted: true, nodes: []
          },
          {
            label: '2.3 Titler og overskrifter', type: 'page', isCompleted: true, nodes: []
          },{
            label: '2.4 Kontrast', type: 'page', isCompleted: true, nodes: []
          },{
            label: '2.6 Gruppeoppgave: Universell utforming av IKT', type: 'page', isCompleted: true, nodes: []
          },{
            label: '2.5 Farge', type: 'page', isCompleted: true, nodes: []
          },{
            label: '2.7 Teksting av video og lyd', type: 'page', isCompleted: true, nodes: []
          },{
            label: '2.8 Leserekkefølge i PowerPoint', type: 'page', isCompleted: true, nodes: []
          },{
            label: '2.9 Tabeller', type: 'page', isCompleted: true, nodes: []
          },{
            label: '2.10 Responsivt design', type: 'page', isCompleted: true, nodes: []
          },{
            label: '2.11 Navigering med tastatur', type: 'page', isCompleted: true, nodes: []
          },{
            label: '2.12 Andre krav', type: 'page', isCompleted: true, nodes: []
          },{
            label: '2.13 Tilgjengelighetssjekk', type: 'page', isCompleted: true, nodes: []
          },{
            label: '2.14 Individuell oppgave: En universelt utformet læringsressurs', type: 'page', isCompleted: true, nodes: []
          },{
            label: '2.15 Gruppeoppgave: Universell utforming av IKT', type: 'page', isCompleted: true, nodes: []
          },{
            label: '2.16 Plenumsoppgaver', type: 'page', isCompleted: true, nodes: []
          },{
            label: '2.17 Veien videre - og hva kan kunstig intelligens (KI) hjelpe oss med?', type: 'page', isCompleted: true, nodes: []
          },{
            label: '2.18 Spørreundersøkelse til modulen', type: 'page', isCompleted: true, nodes: []
          },{
            label: '2.19 Visning av resultater fra spørreundersøkelse til modulen', type: 'page', isCompleted: true, nodes: []
          }
            ]
          },
        ]
      },
      {
        label: 'Kunstig intelligens i skolen',
        type:'module',
        nodes: [
          {
            label: 'box_1.2.1', type:'page',  isCompleted: true ,nodes: [{
            label: 'box_1.2.2.1',type:'page',isCompleted: true , nodes: []
            }
            
          ] },
          { label: 'box_1.2.2',type:'page', nodes: [] },
          { label: 'box_1.2.3',type:'page', nodes: [] },
          { label: 'box_1.2.4', type:'page',nodes: [] }
        ]
      },
      {
        label: 'Personvern i læringsteknologi for eiere og ledere',
        type:'module',
        nodes: [
          {
            label: 'box_1.2.1', type:'page',  isCompleted: true ,nodes: [{
            label: 'box_1.2.2.1',type:'page',isCompleted: true , nodes: []
            }
            
          ] },
          { label: 'box_1.2.2',type:'page', nodes: [] },
          { label: 'box_1.2.3',type:'page', nodes: [] },
          { label: 'box_1.2.4', type:'page',nodes: [] }
        ]
      },
      {
        label: 'Digital undervisning - på skolen og hjemme',
        type:'module',
        nodes: [
          {
            label: 'box_1.2.1', type:'page',  isCompleted: true ,nodes: [{
            label: 'box_1.2.2.1',type:'page',isCompleted: true , nodes: []
            }
            
          ] },
          { label: 'box_1.2.2',type:'page', nodes: [] },
          { label: 'box_1.2.3',type:'page', nodes: [] },
          { label: 'box_1.2.4', type:'page',nodes: [] }
        ]
      }
    ]
  },
  {
    label: 'box2',
    type:'module',
    nodes: [
      { label: 'box_2.2.1',type:'page', nodes: [] },
      { label: 'box_2.2.2',type:'page', nodes: [] },
      { label: 'box_2.2.3',type:'page', nodes: [] },
      { label: 'box_2.2.4',type:'page', nodes: [] }
    ]
  },
  {
    label: 'box3',
    type:'module',
    nodes: [
      { label: 'box_3.2.1',type:'page', nodes: [] },
      { label: 'box_3.2.2', type:'page',nodes: [] },
      { label: 'box_3.2.3',type:'page', nodes: [] },
      { label: 'box_3.2.4',type:'page', nodes: [] }
    ]
  }
]

const treestructure = ref(treeData);

const selectedNode = ref(null);

const toggleActiveModule = (nodeLabel) => {
  if (selectedNode.value === nodeLabel) {
    selectedNode.value = null; 
  } else {
    selectedNode.value = nodeLabel; 
  }
};


const isActiveModule = (nodeLabel) => {
  return nodeLabel === selectedNode.value;
};

</script>


<style lang="scss">
@import '../../design/box-shadow';
.courses {
  width: 100%;
  max-width: 30rem;
  border-radius: 1.6875rem 0rem 0rem 1.6875rem;
  border: 1px solid #E6E6E6; 
  background: #FFF;
  margin: 0 1rem 0 1rem;
  padding: 0 0 0.75rem 0;
  @include box-shadow(medium); 

  &__header-section {
    color: black;
    word-wrap: break-word;
    border-bottom: 1px solid #E6E6E6; /* Adjusted border thickness */
    padding: 10px 0; /* Added padding for spacing */
    &__header{
      display:flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 1.25rem;
      font-family: Roboto;
      font-weight: 600;
      margin-left: 1rem;
      &__title{
        margin-left:1.5rem;
        margin-top: -0.5rem;
      }
    }
   
  }

  &__treeview {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-bottom:1rem;
  }
}
</style>
