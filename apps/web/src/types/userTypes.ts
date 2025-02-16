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

export interface EditUserSlice {
    name?: string,
    phone?: string,
    avatar?: string | null
}

export interface EditModalProps {
    isOpen: boolean;
    isLoading: boolean,
    onClose: () => void,
    handleUpdate: (data: EditUserSlice) => void
}

export interface AllUserType {
    id: string;
    name: string;
    avatar: string;
    phone: string;
}