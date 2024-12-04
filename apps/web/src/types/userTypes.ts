export interface UserSlice {
    id: number,
    name: string,
    email: string,
    phone: string | null
    avatar: string | null,
    isVerified: boolean,
    role: Roles | null
}

enum Roles {
    User,
    SuperAdmin,
    AdminHR,
    AdminGudang
}