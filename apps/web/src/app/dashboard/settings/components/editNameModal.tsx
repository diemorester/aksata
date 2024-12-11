"use client"
import ButtonSpan from "@/components/buttons/spanButtons";
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
                        <Form className="text-neutral-300 flex flex-col gap-2">
                            <div>
                                <h1 className="text-center mt-1 text-2xl font-bold">Change name</h1>
                                <p className="text-center text-sm mb-8 font-extralight">enter your new name here</p>
                            </div>
                            <div>
                                <InputEdit
                                    label="NAME"
                                    name="name"
                                    type="text"
                                    nameInput
                                    disabled={isLoading}
                                    error={!!errors.name}
                                />
                                {values.name == name && (
                                    <div className="mx-4 text-xs text-red-500 font-extralight">name can not be same</div>
                                )}
                            </div>
                            <div className="flex justify-end gap-6 mt-10">
                                <ButtonSpan type="button" onClick={onClose}>
                                    cancel
                                </ButtonSpan>
                                <ButtonSpan type="submit" disabled={isLoading || !dirty} fill="bg-neutral-300">
                                    confirm
                                </ButtonSpan>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </Modal>
    )
}

export default EditNameModal