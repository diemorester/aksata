"use client"
import ButtonSpan from "@/components/buttons/spanButtons"
import PhoneInputEdit from "@/components/input/phoneInput"
import Modal from "@/components/Modal"
import { useAppSelector } from "@/redux/hooks"
import { EditModalProps } from "@/types/userTypes"
import { Form, Formik } from "formik"
import * as yup from 'yup'

const EditPhoneModal: React.FC<EditModalProps> = ({ isOpen, onClose, isLoading, handleUpdate }) => {
    const { phone } = useAppSelector(user => user.user);
    const validation = yup.object().shape({
        phone: yup.string().required("phone number can't be empty").min(10, 'phone numbers must be at least 10').max(17, "phone number can't be more than 13")
    })

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            ristoan
            backgroundClose
        >
            <Formik
                initialValues={{ phone: phone || '' }}
                onSubmit={(value) => {
                    handleUpdate(value)
                }}
                validationSchema={validation}
            >
                {({ errors, dirty, values }) => {
                    return (
                        <Form className="text-neutral-300">
                            <h1 className="text-center mt-1 text-2xl font-bold">Change phone</h1>
                            <p className="text-center mb-8 font-extralight">enter your new phone here</p>
                            <PhoneInputEdit
                                label="PHONE"
                                name="phone"
                                type="text"
                                disabled={isLoading}
                            />
                            {/* {values.phone == phone && (
                                <div className="mx-4 text-sm text-red-500 font-extralight">phone can not be same</div>
                            )} */}
                            <p className="text-center text-xs text-neutral-300 font-extralight">phone must be number, can&apos;t be same, and can&apos;t be empty</p>
                            <div className="flex justify-end gap-6 mt-10">
                                <ButtonSpan type="button" onClick={onClose} ristoan>
                                    cancel
                                </ButtonSpan>
                                <ButtonSpan type="submit" disabled={isLoading || !dirty || !values.phone || values.phone.split(' ').join('').length < 9} fill="bg-neutral-300" ristoan>
                                    confirm
                                </ButtonSpan>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </Modal>
    )
};

export default EditPhoneModal