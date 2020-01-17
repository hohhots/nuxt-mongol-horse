<template>
  <footer>
    <span>{{ monText.company }}</span>
    <p />
    <span>{{ monText.contact }}</span>
    <span>
      <div class="rotator">
        <a href="http://beian.miit.gov.cn">蒙ICP备19003602号</a>
      </div>
    </span>
  </footer>
</template>

<script>
import settings from '@/settings.js'
import gv from '@/mixins/common.js'

export default {
  mixins: [gv],
  computed: {
    homeUrl() {
      const admin = '/' + settings.admin
      const path = this.$route.path
      if (path === admin || path.indexOf(admin + '/') === 0) {
        return admin
      }
      return '/'
    }
  }
}
</script>

<style scoped>
footer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 50px;
  padding-top: 20px;
  padding-bottom: 20px;
  border-top: 1px solid rgba(146, 140, 107, 1);
}

footer > span {
  line-height: 3rem;
  cursor: vertical-text;
}

.rotator {
  margin-top: 2rem;
  -webkit-transform-origin: left top;
  -ms-transform-origin: left top;
  transform-origin: left top;
  -webkit-transform: rotate(-180deg) rotateY(180deg);
  transform: rotate(-180deg) rotateY(180deg);
}

.rotator > a {
  font-family: sans-serif, Arial !important;
  font: 16px/18px arial;
}

.rotator > a:link {
  text-decoration: none;
  color: #333;
}

.rotator > a:visited {
  color: #333;
}
</style>
