export interface UserSlice {
    id: number,
    name: string,
    email: string,
    avatar: string | null,
    isVerified: boolean,
    role: Roles | null,
    token: string
}

enum Roles {
    User,
    SuperAdmin,
    AdminHR,
    AdminGudang
}