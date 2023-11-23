<template>
  <div>
    <DropdownButton v-if="languageOptions !== null" :options="languageOptions" :preselect="initialLanguage" @selected="handleSelectedLanguage"/>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
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
  setup(props) {
    const languageOptions = ref(getLanguageOptions(props.languages));
    const initialLanguage = ref(null)
    
    onMounted(() => {
      languageOptions.value = getLanguageOptions(props.languages);
      initialLanguage.value = getLanguageCode() ?? 'nb';

    });

    const handleSelectedLanguage = (key) => {
      setLanguageParameter(key);
    };
    

    return {
      languageOptions,
      initialLanguage, 
      handleSelectedLanguage
    };
  },
};
</script>

