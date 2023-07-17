<template>
  <div class="container">
    <div class="sidebar">
      <div class="sidebar__logo">
        <img src="logo.svg" width="40" height="20" />
      </div>
      <div class="sidebar__btn-group">
        <button
          class="sidebar__btn"
          @click="$router.push('/inbox')"
          :class="{ 'sidebar__btn--active': $route.path === '/inbox' }"
        >
          <div class="sidebar__btn-title">
            <img src="icons/inbox-icon.svg" width="24" height="24" />
            Inbox
          </div>

          {{ numOfInboxEmails }}
        </button>
        <button
          class="sidebar__btn"
          @click="$router.push('/archive')"
          :class="{ 'sidebar__btn--active': $route.path === '/archive' }"
        >
          <div class="sidebar__btn-title">
            <img src="icons/archive-icon.svg" width="24" height="24" />
            Archive
          </div>

          {{ numOfArchivedEmails }}
        </button>
      </div>

      <button class="sidebar__logout-btn">
        <div class="sidebar_logout-btn-title">
          <img src="icons/logout-icon.svg" width="24" height="24" />
          Logout
        </div>
      </button>
    </div>
    <div class="main">
      <slot />
    </div>
  </div>
</template>

<style>
/* // import a font called PlusJakartaSans from Google Fonts */
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap");

/* reset */
*,
body {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border-width: 0;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-weight: 500;
  font-style: normal;
}

.container {
  display: flex;
  /* width: 100vw; */
  align-items: flex-start;
  gap: -1px;
  background: #fff;
}

/* Sidebar */

.sidebar {
  display: flex;
  width: 20.3%;
  min-height: 100vh;
  padding: 20px 0px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  align-self: stretch;

  border-right: 1px solid #e5e7eb;
  background: #f8fafc;
}

.sidebar__logo {
  display: flex;
  padding: 0px 24px;
  align-items: center;
  gap: 40px;
  align-self: stretch;
  margin-bottom: 32px;
}

.sidebar__logo img {
  width: 40px;
  height: 20px;
}

.sidebar__btn-group {
  display: flex;
  padding: 0px 10px;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  align-self: stretch;
}

.sidebar__btn {
  display: flex;
  padding: 12px 24px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-radius: 54px;
  background: #f8fafc;

  color: #4b5563;

  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  cursor: pointer;
}

.sidebar__btn--active {
  color: #121829;
  color: #121829;
  background: #d6e2fb;
}

.sidebar__btn-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sidebar__logout-btn {
  display: flex;
  padding: 12px 24px;
  align-items: center;
  gap: 12px;
  align-self: stretch;
  margin-top: auto;
  background-color: #f8fafc;
  cursor: pointer;
}

.sidebar_logout-btn-title {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1 0 0;

  color: #4b5563;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

/* Main */

.main {
  display: flex;
  flex-direction: column;
  padding-top: 24px;
  align-items: flex-start;
  gap: 32px;

  width: 79.7%;
}
</style>

<script>
import { useEmailStore } from "@/stores/emailStore";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const { archivedEmails, inboxEmails } = storeToRefs(useEmailStore());

    const numOfArchivedEmails = computed(() => archivedEmails.value.length);
    const numOfInboxEmails = computed(() => inboxEmails.value.length);

    return {
      numOfArchivedEmails,
      numOfInboxEmails,
    };
  },
};
</script>
