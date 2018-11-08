import { getAccess } from '@/api/getAccess'


export function getRoles() {
    return getAccess()
}