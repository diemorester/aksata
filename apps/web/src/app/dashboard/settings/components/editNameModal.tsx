"use client"
import InputEdit from "@/components/input/inputEdit";
import Modal from "@/components/Modal"
import { useAppSelector } from "@/redux/hooks";
import { EditModalProps, EditUserSlice } from "@/types/userTypes";
import { Form, Formik } from "formik";
import * as yup from 'yup'

const EditNameModal: React.FC<EditModalProps> = ({ isOpen, onClose, isLoading, handleUpdate }) => {
    const { name } = useAppSelector(state => state.user);
    const validation = yup.object().shape({
        name: yup.string().required('name can not be empty')
    })

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            backgroundClose
        >
            <Formik
                initialValues={{ name: name }}
                onSubmit={(value) => {
                    handleUpdate(value)
                }}
                validationSchema={validation}
            >
                {({ errors, dirty, values }) => {
                    return (
                        <Form className="text-neutral-300">
                            <h1 className="text-center mt-1 text-2xl font-bold">Change name</h1>
                            <p className="text-center mb-8 font-extralight">enter your new name here</p>
                            <InputEdit
                                label="NAME"
                                name="name"
                                type="text"
                                disabled={isLoading}
                                error={!!errors.name}
                            />
                            {values.name == name && (
                                <div className="mx-4 text-sm text-red-500 font-extralight">name can not be same</div>
                            )}
                            <div className="flex justify-end mt-10">
                                <button disabled={isLoading || !dirty} className="bg-neutral-300 rounded-3xl disabled:active:scale-100 disabled:opacity-55 active:scale-95 px-3 text-black py-2">
                                    Change Name
                                </button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </Modal>
    )
}

export default EditNameModal