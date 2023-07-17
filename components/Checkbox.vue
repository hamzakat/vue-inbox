<template>
  <div class="checkbox--checked" v-if="checked">
    <img
      src="icons/check-icon.svg"
      class="checkbox__icon--checked"
      alt="check"
    />
  </div>
  <div class="checkbox--unchecked" v-else></div>
</template>

<style>
.checkbox--unchecked {
  display: flex;
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border-radius: 5px;
  border: 1px solid #cad6e4;
  background: #fff;
}

.checkbox--checked {
  display: flex;
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border-radius: 5px;
  border: 1px solid #ffffff00;
  background: #0968fe;
}

.checkbox__icon--checked {
  width: 16px;
  height: 16px;
  flex-shrink: 0;

  color: #fff;
  user-select: none;
}
</style>

<script>
export default {
  props: {
    checked: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
