<template>
  <footer class="footer">
    <div class="container footer__container">
      <div class="footer__left">
        <div class="footer__logo">
          <img
            src="../../src/assets/images/svg/aroma-logo-dark.svg"
            alt="logo"
          />
        </div>
        <div class="footer__links">
          <ul class="footer__links-list">
            <li class="footer__links-list-item">
              <a href="" class="footer__links-list-link">
                Новые&nbsp;Поступления
              </a>
            </li>
            <li class="footer__links-list-item">
              <router-link to="/about-us" class="footer__links-list-link">
                О&nbsp;нас
              </router-link>
            </li>
            <li class="footer__links-list-item">
              <router-link to="/catalog" class="footer__links-list-link">
                Магазин
              </router-link>
            </li>
            <li class="footer__links-list-item">
              <router-link to="/blog" class="footer__links-list-link">
                Блог
              </router-link>
            </li>
            <li class="footer__links-list-item">
              <router-link to="/contacts" class="footer__links-list-link">
                Контакты
              </router-link>
            </li>
          </ul>
        </div>
        <div class="footer__social">
          <ul class="footer__social-list">
            <li class="footer__social-item">
              <a href="" class="footer__social-link"> Facebook </a>
            </li>
            <li class="footer__social-item">
              <a href="" class="footer__social-link"> Instagram </a>
            </li>
            <li class="footer__social-item">
              <a href="" class="footer__social-link"> Threads </a>
            </li>
            <li class="footer__social-item">
              <a href="" class="footer__social-link"> Telegram </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <div class="container footer__bottom-container">
        <div class="footer__bottom-left">
          <h6>© 2022 AromaHomeNN. All right reserved.</h6>
        </div>
        <div class="footer__bottom-right">
          <h6>Design Made By team Agency</h6>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import "src/assets/style/main";

.footer {
  background-color: $dark-text;
  width: 100%;
  color: $white;

  &__container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  &__logo {
    margin-right: 30px;
  }

  &__left {
    display: flex;
    flex-direction: row;
    gap: 40px;
  }

  &__links-list-item,
  &__social-item {
    margin-bottom: 10px;
  }
  &__links-list-link,
  &__social-link {
    position: relative;
  }
  &__links-list-link:after,
  &__social-link:after {
    display: block;
    position: absolute;
    left: 0;
    width: 0;
    height: 2px;
    background-color: $white;
    content: "";
    transition: width 0.3s ease-out;
  }
  &__links-list-link:hover:after,
  &__social-link:hover:after {
    width: 100%;
  }

  &__bottom {
    border-top: 1px solid $white;

    &-container {
      padding: 20px 15px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
}

@media (max-width: 1780px) {
}
@media (max-width: 1366px) {
}

@media (max-width: 1024px) {
}

@media (max-width: 768px) {
  .footer__container {
    flex-direction: column;
    padding-left: 50px;
  }
  .footer__left {
    flex-direction: column;
    width: 100%;
  }
  .footer__logo {
    margin-right: 0;
    width: 200px;
  }
}

@media (max-width: 576px) {
}

@media (max-width: 320px) {
}
</style>
