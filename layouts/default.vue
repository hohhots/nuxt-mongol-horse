<template>
  <monBody>
    <nuxt />
  </monBody>
</template>

<style>
*,
*:before,
*:after {
  /* box-sizing: border-box; */
  margin: 0;
}

@font-face {
  font-family: 'chagan';
  src: url('~assets/fonts/chagan/chagan.eot');
  src: url('~assets/fonts/chagan/chagan.eot?#iefix') format('embedded-opentype'),
    url('~assets/fonts/chagan/chagan.woff2') format('woff2'),
    url('~assets/fonts/chagan/chagan.woff') format('woff'),
    url('~assets/fonts/chagan/chagan.ttf') format('truetype'),
    url('~assets/fonts/chagan/chagan.svg#chagan') format('svg');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'garchag';
  src: url('~assets/fonts/garchag/garchag.eot');
  src: url('~assets/fonts/garchag/garchag.eot?#iefix')
      format('embedded-opentype'),
    url('~assets/fonts/garchag/garchag.woff2') format('woff2'),
    url('~assets/fonts/garchag/garchag.woff') format('woff'),
    url('~assets/fonts/garchag/garchag.ttf') format('truetype'),
    url('~assets/fonts/garchag/garchag.svg#garchag') format('svg');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'hawang';
  src: url('~assets/fonts/hawang/hawang.eot');
  src: url('~assets/fonts/hawang/hawang.eot?#iefix') format('embedded-opentype'),
    url('~assets/fonts/hawang/hawang.woff2') format('woff2'),
    url('~assets/fonts/hawang/hawang.woff') format('woff'),
    url('~assets/fonts/hawang/hawang.ttf') format('truetype'),
    url('~assets/fonts/hawang/hawang.svg#hawang') format('svg');
  font-weight: normal;
  font-style: normal;
}

html {
  font-family: 'chagan', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  line-height: 1.5em;
  color: #333;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  margin: 3px;
  border: 2px solid #393;
  padding: 2px;
}

body {
  margin: 3px;
  border: 2px solid #933;
  padding: 2px;
}
</style>
