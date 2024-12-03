![](https://imgur.com/XWVOBSH.png "")

# Frontend - Kompetanseportalen (KPAS)

This platform is operated by The Norwegian Directorate of Education's Department for Digital Services, which is responsible for managing a number of national digital solutions that support education and skills development.

KPAS provides competency packages across various themes to enhance skills and practices in kindergartens, schools, the Educational Psychological Service (PPT), training companies, and examination boards. The platform is designed to support collaborative and long-term professional development with embedded process and leadership support.

The custom JS and CSS frontend is built on top of Canvas using the mechanism in Canvas for including custom .js and .css files. This frontend changes the Canvas graphical design and user interface by utilizing SCSS and custom HTML injected through JavaScript and Vue components. The custom JS and CSS frontend is compiled and concatenated into a single CSS and JavaScript file using Node and Webpack.

**Services**

| Service | Environment | URL |
|---------|-------------|-----|
| Frontend | Production | https://bibsys.instructure.com/search/all_courses/ |
| Frontend | Stage | https://bibsys.test.instructure.com/search/all_courses/ |

**Related Codebases**

| Name | Description |
|------|-------------|
| [KPAS API](https://github.com/matematikk-mooc/kpas-api/) | Extends Canvas LMS through LTI tools and REST endpoints |
| [Statistics API](https://github.com/matematikk-mooc/statistics-api/) | Collects and serves statistics data for KPAS |

**Quick links**

- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [Development](#development)
- [Deployment](#deployment)
- [Maintenance](#maintenance)

## Dependencies

- [Git](https://git-scm.com/): A free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.
- [Visual Studio Code](https://code.visualstudio.com/): A lightweight but powerful source code editor which runs on your desktop and is available for Windows, macOS and Linux.
- [NVM](https://github.com/nvm-sh/nvm/): A version manager for Node.js that allows you to manage multiple active Node.js versions, simplifying the development and testing process across different versions.

## Configuration

### Initialize codebase

1. Install Node.js: `nvm install`
1. Enable corepack for Node.js: `corepack enable`
1. Install NPM packages: `pnpm install`

### Upload localhost theme to Canvas LMS

1. Build theme: `pnpm build`
1. Create a new theme here: https://bibsys.test.instructure.com/accounts/1/brand_configs/
1. Click on create from default template and under the upload tab, select the build files from the first step that are located in the `dist` folder:
    - CSS-fil: `theme-localhost.css`
    - JavaScript-Fil: `theme-localhost.js`

## Development

1. Use Node.js: `nvm install`
1. Install NPM packages: `pnpm watch`
1. Vist https://bibsys.test.instructure.com/search/all_courses/

## Deployment (WIP)

Compile JS and CSS for the production using

```
pnpm run production
```

* See scripts section in package.json

The resulting JS and CSS file can be found in the **dist** directory. These commands will get the timestamp of the latest commit to the given branch, and append to the filenames.
To test code locally allways use "build" and "watch", as "stage" and "production" will use the file already uploaded to Azure, and will not pick up local changes.


Copy all files from the dist directory to your web server.
Note that addons generate different files that may be destinated to different directories in your production server.

### GitHub Actions

### Rollback

## Maintenance

Maintaining a frontend project involves regular updates to ensure the application remains secure, performant, and up to date with the latest web standards. Here's how updates are carried out for JavaScript libraries, Vue.js framework components, and other dependencies:

### NPM Packages

1. **Update Packages**: Regularly run `yarn update` to fetch the latest versions of dependencies. Use `yarn outdated` to check for available updates.

1. **Security Audits**: Perform security audits using `yarn audit` to identify and resolve potential vulnerabilities.
