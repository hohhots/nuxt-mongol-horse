<template>
  <div class="input-control">
    <label>
      <slot />
    </label>
    <input
      v-if="controlType === 'input'"
      v-bind="$attrs"
      :placeholder="placeholder"
      :value="value"
      :disabled="disabled === 'true'"
      @input="$emit('input', $event.target.value)"
    />
    <textarea
      v-if="controlType === 'textarea'"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
      rows="10"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: 'MonInputControl',
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    controlType: {
      type: String,
      default: 'input'
    },
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: String,
      default: 'false'
    }
  }
}
</script>

<style scoped>
.input-control {
  display: flex;
  flex-wrap: wrap;
  margin: 30px 0;
  align-items: center;
}

.input-control label {
  width: 15%;
}

.input-control input,
.input-control textarea {
  width: 85%;
  box-sizing: border-box;
  font: inherit;
  border: 1px solid #ccc;
  padding: 5px;
  background-color: #e8e8e8;
  color: #545454;
}

.input-control textarea {
  width: 100%;
}

.input-control input:focus,
.input-control textarea:focus {
  background-color: #eee;
  outline: none;
}
</style>
