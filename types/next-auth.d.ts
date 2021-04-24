// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type NextAuth from "next-auth";

declare module "next-auth" {
  // sessionのcallbacksでidを埋めるために利用
  interface User {
    id: number;
  }
}
