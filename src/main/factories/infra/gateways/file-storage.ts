import { FileStorage } from "@/infra/gateways"

export const makeFileStorage = (): FileStorage => {
  return new FileStorage()
}
