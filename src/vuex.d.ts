import type { UsersState } from "./core/types/interfaces/store/users.interface"

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<UsersState>
  }
}