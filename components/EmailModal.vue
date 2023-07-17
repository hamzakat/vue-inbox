<template>
  <transition name="fade" appear>
    <div
      class="email-modal__modal-overlay"
      v-if="show"
      @click.self="closeModal"
    ></div>
  </transition>
  <transition name="slide-right" appear>
    <div class="email-modal__modal-container" v-if="show" @click.stop>
      <div class="email-modal__header-buttons">
        <div class="email-modal__close-btn" @click="closeModal">
          <img src="icons/x-icon.svg" alt="close" />
          Close (Esc)
        </div>
        <div class="email-modal__options-btn-group">
          <div class="email-modal__options-btn" @click="markAsRead()">
            <img src="icons/email-icon.svg" alt="mark as read" />
            <span>Mark as read (r)</span>
          </div>
          <div class="email-modal__options-btn" @click="unarchiveEmail()">
            <img src="icons/trash-icon.svg" alt="archive" />
            <span v-if="!email.archived">Archive (a)</span>
            <span v-else>Unarchive (a)</span>
          </div>
        </div>
      </div>

      <div class="email-modal__texts">
        <h1 class="email-modal__title">{{ email.title }}</h1>
        <p class="email-modal__body">{{ email.body }}</p>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.email-modal__modal-container {
  position: fixed;
  top: 0;
  right: 0;
  width: 58.75%;
  height: 100%;
  gap: 32px;
  padding: 32px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  border: 1px solid #e5e7eb;
  background: #fff;
  z-index: 999;
  overflow: auto;
  transition: transform 0.3s ease-in-out;
}

.email-modal__header-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
}
.email-modal__options-btn-group {
  display: flex;
  align-items: flex-start;
  gap: 40px;
  color: #4b5563;
}

.email-modal__options-btn {
  display: flex;
  align-items: center;
  vertical-align: middle;
  gap: 12px;
  cursor: pointer;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.email-modal__close-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  color: #4b5563;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.email-modal__close-btn-icon {
  color: #88909b;
  width: 19px;
  height: 19px;
}

.email-modal__texts {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}
.email-modal__title {
  color: #121829;

  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.email-modal__body {
  color: #4b5563;

  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.email-modal__modal-overlay {
  position: fixed;

  left: 0;
  top: 0;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(76, 87, 100, 0.8);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<script>
export default {
  name: "EmailModal",
  props: {
    show: Boolean,
    email: Object,
    markAsRead: Function,
    archiveEmail: Function,
    closeModal: Function,
  },
  setup(props) {
    const handleKeyPress = (event) => {
      if (event.key === "a") props.archiveEmail();
      if (event.key === "r") props.markAsRead();
      if (event.key === "Escape") props.closeModal();
    };

    onMounted(() => {
      window.addEventListener("keyup", handleKeyPress);
    });

    onUnmounted(() => {
      window.removeEventListener("keyup", handleKeyPress);
    });
  },
};
</script>
