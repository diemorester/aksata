import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ModalSlice {
    isOpen: boolean
}

const initialState: ModalSlice = {
    isOpen: false
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setIsModalOpen: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload
        },

        toggleModal: (state) => {
            state.isOpen = !state.isOpen
        }
    }
})

export const { setIsModalOpen, toggleModal } = modalSlice.actions;
export default modalSlice.reducer