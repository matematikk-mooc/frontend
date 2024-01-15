<template>
  <div>
    <DropdownButton v-if="languageOptions !== null" :options="languageOptions" :preselect="initialLanguage" @selected="handleSelectedLanguage"/>
  </div>
</template>

<script>
import DropdownButton from '../dropdown-button/DropdownButton.vue';
import { getLanguageOptions,  } from './util';
import { getLanguageCode, setLanguageParameter } from '../../utils/lang-utils';

export default {
  name: 'LanguageSelectorContainer',
  components: {
    DropdownButton,
  },
  props: {
    languages: String,
  },
  data() {
    return {
      languageOptions: null,
      initialLanguage: null,
    };
  },
  methods:{
    handleSelectedLanguage(key) {
      setLanguageParameter(key);
    }

  },
  created() {
      this.languageOptions = getLanguageOptions(this.languages);
      this.initialLanguage = getLanguageCode() ?? 'nb';
  },

};
</script>
