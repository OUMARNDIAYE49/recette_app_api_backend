// import globals from 'globals';
// import pluginJs from '@eslint/js';
// import pluginVue from 'eslint-plugin-vue';

// export default [
//   {
//     files: ['**/*.{js,mjs,cjs,vue}'],
//     languageOptions: {
//       globals: {
//         ...globals.browser,
//         jasmine: 'readonly',
//         describe: 'readonly',
//         beforeAll: 'readonly',
//         afterAll: 'readonly',
//         it: 'readonly',
//         expect: 'readonly',
//         process: 'readonly',
//       },
//     },
//   },
//   pluginJs.configs.recommended,
//   ...pluginVue.configs['flat/essential'],
// ];

import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';

export default [
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        jasmine: 'readonly',
        describe: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly', // Ajout de beforeEach
        spyOn: 'readonly', // Ajout de spyOn
        process: 'readonly',
      },
    },
  },
  pluginJs.configs.recommended,
  ...pluginVue.configs['flat/essential'],
];
