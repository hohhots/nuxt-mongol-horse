<template>
  <div class="search">
    <form>
      <div class="container">
        <div class="inputc">
          <div class="input"></div>
        </div>
        <button>
          <div class="siconc">
            <span class="sicon">
              <mon-svg focusable="false" :view-box.camel="'0 0 24 24'">
                <path
                  d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                ></path>
              </mon-svg>
            </span>
          </div>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
form {
  display: block;
  margin-top: 1em;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1em;
  overflow: hidden;
  width: auto;
}
button {
  display: flex;
  border-radius: 0 20px 20px 0;
  padding-left: 8px;
  padding-right: 8px;
  background-color: #3b78e7;
  border: 1px solid #3367d6;
  margin: -1px;
  outline: none;
  flex: 0 0 auto;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
svg {
  -webkit-transform-origin: left top;
  -ms-transform-origin: left top;
  transform-origin: left top;
  -webkit-transform: rotate(-90deg) rotateY(180deg);
  transform: rotate(-90deg) rotateY(180deg);
}
.search {
  width: 80%;
  min-width: 300px;
  max-width: 636px;
  font-size: 20px;
}
.container {
  display: flex;
  flex: 1;
  z-index: 3;
  position: relative;
  border: 1px solid #dfe1e5;
  border-radius: 20px;
  background: #fff;
}
.inputc {
  display: flex;
  flex: 1;
  background: transparent;
  position: relative;
  z-index: 3;
  padding: 7px 0 6px;
  border: none;
}
.input {
  line-height: 25px;
  background-color: transparent;
  border: none;
  margin: 0;
  padding: 0 0 0 16px;
  color: rgba(0, 0, 0, 0.87);
  word-wrap: break-word;
  outline: none;
  display: flex;
  flex: 1;
  -webkit-tap-highlight-color: transparent;
  width: 100%;
  height: 25px;
  cursor: vertical-text;
}
.siconc {
  background: none;
  color: #fff;
  height: 24px;
  width: 24px;
  margin: auto;
}
.sicon {
  display: inline-block;
  fill: currentColor;
  height: 24px;
  line-height: 24px;
  position: relative;
  width: 24px;
}
</style>
