<template>
  <slot></slot>
</template>
<script lang="ts">
import { provide, reactive, readonly, toRefs } from 'vue'
import db from '@/services/firebase'
import { collection, getDocs } from 'firebase/firestore'

export const GetUsers = Symbol('GetUsers')
export const Database = Symbol('Database')

export default {
  // provide() {
  //   return {
  //     [Database]: {
  //       users: []
  //       /* data to provide */
  //     }
  //   }
  // }
  setup (): void {
    const state = reactive({
      users: []
    })
    // Using `toRefs()` makes it possible to use
    // spreading in the consuming component.
    // Making the return value `readonly()` prevents
    // users from mutating global state.
    provide(Database, toRefs(readonly(state)))

    const getUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'))
      querySnapshot.forEach((doc) => {
        console.log(doc.data())
      })
    }

    provide(GetUsers, getUsers)
  }
  // render () {
  //   // Our provider component is a renderless component
  //   // it does not render any markup of its own.
  //   return this.$slots.default();
  // },
}
</script>
