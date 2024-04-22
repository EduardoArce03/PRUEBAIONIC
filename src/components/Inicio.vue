<template>
  <div>
    <h1>Usuarios y sus Publicaciones</h1>
    <ul v-if="usersWithPosts.length > 0">
      <li v-for="user in usersWithPosts" :key="user.id">
        <h2>{{ user.username }}</h2>
        <ul>
          <li v-for="post in user.posts" :key="post.id">
            {{ post.title }}
          </li>
        </ul>
      </li>
    </ul>
    <p v-else>No hay usuarios con publicaciones disponibles.</p>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { apolloClient } from '@/apollo-client'; // Ajusta la ruta según tu estructura de archivos
import { gql } from '@apollo/client/core';

export default defineComponent({
  setup() {
    const usersWithPosts = ref([]);

    const ALL_USERS_AND_POSTS = gql`
      query AllUsersAndPosts {
        socials {
          users {
            id
            username
            posts {
              id
              title
            }
          }
        }
      }
    `;

    onMounted(async () => {
      try {
        const { data } = await apolloClient.query({ query: ALL_USERS_AND_POSTS });
        usersWithPosts.value = data.socials.users;
      } catch (error) {
        console.error('Error fetching users and posts:', error);
      }
    });

    return { usersWithPosts };
  },
});
</script>
