<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useInfoStore } from '@/stores';
import BaseAPI from '@/assets/js/BaseAPI';

const infoStore = useInfoStore();

</script>

<template>
  <div class="container-wrapper">
    <div class="content-container">
      <nav>
        <div class="logo">FlowX</div>
        <input type="checkbox" id="click" />
        <label for="click" class="menu-btn">
          <span class="material-symbols-outlined menu-open"> menu </span>
          <span class="material-symbols-outlined menu-close"> close </span>
        </label>
        <ul>
          <li>
            <RouterLink class="active" to="/">Home</RouterLink>
          </li>
          <li class="dropdown" v-if="infoStore.isManager">
            <a class="" to="/">Management</a>
            <div class="dropdown-content">
              <RouterLink to="/management/users">Users</RouterLink>
              <RouterLink to="/">Projects</RouterLink>
            </div>
          </li>
          <li>
            <RouterLink class="" to="/login" v-if="!infoStore.isLoggedIn">Login</RouterLink>
            <a class="" @click="BaseAPI.logout(true)" v-else>Logout</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@mixin navPhone {
  @media (width < 992px) {
    @content;
  }
}
.container-wrapper {
  background: var(--gray-800);
  box-shadow: 0 .25rem .25rem var(--gray-400);
}

nav {
  display: flex;
  height: 5rem;
  width: 100%;
  background: var(--gray-800);
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  z-index: 999;

  .logo {
    color: var(--gray-100);
    font-size: 1.8rem;
    user-select: none;
  }

  .menu-btn span {
    color: var(--gray-100);
    font-size: 1.8rem;
    border: 0.25rem solid var(--gray-600);
    border-radius: 0.5rem;
    cursor: pointer;
    display: none;
  }

  input[type='checkbox'] {
    display: none;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;

    li {
      margin: 0 0.25rem;

      a {
        position: relative;
        color: var(--gray-100);
        text-decoration: none;
        font-size: 1.125rem;
        font-weight: 500;
        padding: 0.5rem 1rem;
        border-radius: 0.375rem;
        letter-spacing: 1px;
        transition: all 0.25s ease-in-out;
        cursor: pointer;
      }

      a::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 0.125rem;
        top: 100%;
        left: 0;
        max-width: 0;
        background: var(--blue-600);
        transition: all 0.25s ease-in-out;
      }

      a:hover::after {
        max-width: 100%;
      }
    }

    .dropdown {
      position: relative;
      display: inline-block;

      a::after {
        display: none;
      }

      .dropdown-content {
        display: none;
        // display: block;
        position: absolute;
        left: 0;
        top: 100%;
        background: var(--gray-600);
        width: 100%;
        z-index: 1;

        a {
          display: block;
          border-radius: 0;
          padding: .5rem 1rem;
          font-size: 1.1rem;
          font-weight: 500;
        }
      }
    }

    .dropdown:hover .dropdown-content {
      display: block;

      a:hover {
        background: var(--gray-700);
      }
    }
  }

  @include navPhone() {
    .menu-btn {
      display: inline-flex;

      .menu-open {
        display: block;
      }

      .menu-close {
        display: none;
      }
    }

    #click:checked ~ .menu-btn {
      .menu-open {
        display: none;
      }

      .menu-close {
        display: block;
      }

      ~ ul {
        max-height: 20rem;

        .dropdown-content, li a {
          padding-left: 0;
          opacity: 1;
        }
      }
    }

    ul {
      padding: 0 0 0 var(--page-gutter);
      position: absolute;
      top: 5rem;
      left: 0;
      width: 100%;
      height: auto;
      background: var(--gray-700);
      box-shadow: 0 0.5rem 0.25rem var(--gray-400);
      overflow: hidden;
      z-index: 999;
      max-height: 0;
      transition: max-height 0.25s ease-in-out;

      li {
        position: relative;
        display: block;
        width: 100%;
        margin: 0.75rem 0;

        a {
          padding-left: 5rem;
          padding-right: 0;
          opacity: 0;
        }

        a::after {
          background: var(--blue-600);
        }
      }

      .dropdown {
        .dropdown-content {
          display: block;
          max-height: 10rem;
          width: calc(100% - 4rem);
          margin: .5rem 0 0;
          padding-left: 5rem;
          background: var(--gray-700);
          position: static;
          transition: opacity .25s ease-in-out, 
                      padding .25s ease-in-out;
          border: .125rem solid var(--gray-600);
          opacity: 0;

          a {
            padding: .5rem 1rem !important;
          }
        }
      }

      .dropdown:hover .dropdown-content  a:hover {
        background: var(--gray-600);
      }
    }
  }
}
</style>
