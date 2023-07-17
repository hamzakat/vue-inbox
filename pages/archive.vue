<template>
  <EmailModal
    v-if="openedEmail"
    :email="openedEmail"
    :show="modalVisible"
    :markAsRead="markOpenedEmailAsRead"
    :archiveEmail="unarchiveOpenedEmail"
    :closeModal="closeModal"
  />
  <div class="title">
    <h1 class="title__text">Archive</h1>
  </div>
  <div class="email-list">
    <div class="email-list__header">
      <div class="email-list__email-selected">
        <Checkbox :checked="allSelected" @click="toggleSelectAll()" />
        <span>Email selected ({{ selectedEmails.size }})</span>
      </div>
      <div class="email-list__options-btn-group">
        <div
          class="email-list__options-btn"
          @click="unarchiveEmails(selectedEmails)"
          v-if="selectedEmails.size > 0"
        >
          <img src="icons/trash-icon.svg" alt="archive" />
          <span>Unarchive (a)</span>
        </div>
        <div
          class="email-list__options-btn"
          @click="markEmailsAsRead(selectedEmails)"
          v-if="selectedEmails.size > 0"
        >
          <img src="icons/email-icon.svg" alt="mark as read" />
          <span>Mark as read (r)</span>
        </div>
      </div>
    </div>
    <!-- </div> -->
    <div class="email-list__emails">
      <div
        class="email-list__item"
        v-for="email in archivedEmails"
        :key="email.id"
        @click="openModal(email)"
      >
        <div
          class="email-list__item-content"
          :class="{ 'email-list__item--read': email.read }"
        >
          <Checkbox
            :checked="isSelected(email)"
            @click="toggleSelected(email)"
            @click.stop
          />

          <div class="email-list__item-text">{{ email.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.title {
  display: flex;
  padding: 0px 24px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-self: stretch;
  color: #121829;
}

.title__text {
  color: #121829;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.email-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  width: 100%;
}

.email-list__header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 0px 24px;
  align-self: stretch;
  flex: 1 0 0;
}

.email-list__email-selected {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  color: #000;
  text-align: right;
  flex-shrink: 1;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.email-list__options-btn-group {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  height: 19px;
}

.email-list__options-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.email-list__emails {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: -1px;
}

.email-list__item {
  display: flex;
  height: 60px;
  padding: 0px 24px;
  align-items: center;
  gap: 50px;
  align-self: stretch;
  border: 1px solid #e5e7eb;
  background: #fff;
  cursor: pointer;
}
.email-list__item:hover {
  border-right: 1px solid #cad6e4;
  border-left: 1px solid #cad6e4;
  background: #d1e2ff;
}

.email-list__item--read {
  opacity: 0.5;
}

.email-list__item-content {
  display: flex;
  align-items: center;
  gap: 20px;
}
.email-list__item-text {
  color: #121829;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
</style>

<script>
import { useEmailStore } from "@/stores/emailStore";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const emailStore = useEmailStore();

    const { archivedEmails } = storeToRefs(useEmailStore());

    const selectedEmails = ref(new Set());

    const isSelected = (email) => selectedEmails.value.has(email.id);

    const toggleSelected = (email) => {
      if (isSelected(email)) {
        selectedEmails.value.delete(email.id);
      } else {
        selectedEmails.value.add(email.id);
      }
    };

    const allSelected = computed(() => {
      return archivedEmails.value.length > 0
        ? archivedEmails.value.length === selectedEmails.value.size
        : false;
    });

    const toggleSelectAll = () => {
      if (allSelected.value) {
        selectedEmails.value.clear();
      } else {
        archivedEmails.value.forEach((email) => {
          selectedEmails.value.add(email.id);
        });
      }
    };

    const unarchiveEmails = () => {
      selectedEmails.value.forEach((emailId) => {
        emailStore.unarchiveEmail(emailId);
      });
      selectedEmails.value.clear();
    };

    const markEmailsAsRead = () => {
      selectedEmails.value.forEach((emailId) => {
        emailStore.markAsRead(emailId);
      });
      selectedEmails.value.clear();
    };

    const openedEmail = ref(null);
    const modalVisible = ref(false);
    const openModal = (email) => {
      openedEmail.value = email;
      modalVisible.value = true;
    };

    const closeModal = () => {
      modalVisible.value = false;
    };
    const unarchiveOpenedEmail = () => {
      emailStore.unarchiveEmail(openedEmail.value.id);
      closeModal();
    };

    const markOpenedEmailAsRead = () => {
      emailStore.markAsRead(openedEmail.value.id);
      closeModal();
    };

    const handleKeyPress = (event) => {
      console.log(event.key);
      if (!modalVisible.value) {
        if (event.key === "a") unarchiveEmails();
        if (event.key === "r") markEmailsAsRead();
      }
    };

    onMounted(() => {
      window.addEventListener("keyup", handleKeyPress);
    });

    onUnmounted(() => {
      window.removeEventListener("keyup", handleKeyPress);
    });
    return {
      archivedEmails,
      isSelected,
      selectedEmails,
      toggleSelected,
      allSelected,
      toggleSelectAll,
      unarchiveEmails,
      markEmailsAsRead,
      openedEmail,
      unarchiveOpenedEmail,
      markOpenedEmailAsRead,
      modalVisible,
      openModal,
      closeModal,
    };
  },
};
</script>
