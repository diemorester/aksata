'use client'

import ButtonSpan from "@/components/buttons/spanButtons"
import InputEdit from "@/components/input/inputEdit"
import clsx from "clsx"
import { Form, Formik, FormikHelpers } from "formik"
import * as yup from 'yup'

interface ChangeEmailFieldProps {
    isOpen: boolean,
    isLoading: boolean,
    onClose: () => void,
    handleEmail: (email: string, action: FormikHelpers<{ email: string }>) => void
}

const ChangeEmailField: React.FC<ChangeEmailFieldProps> = ({ isOpen, handleEmail, isLoading, onClose }) => {
    return (
        <Formik
            initialValues={{ email: '' }}
            onSubmit={(value, action) => { handleEmail(value.email, action) }}
            validationSchema={yup.object().shape({
                email: yup.string().required("new email can't be empty")
            })}
        >
            <Form className={clsx(`text-neutral-300 flex-col gap-12 justify-between`, isOpen ? 'flex' : 'hidden')}>
                <div>
                    <h1 className="text-center mt-1 text-2xl font-bold">enter new email</h1>
                    <p className="text-center mb-6 font-extralight">please enter your new email below</p>
                </div>
                <div>
                    <InputEdit
                        type="email"
                        name="email"
                        nameInput
                        error
                    />
                </div>
                <div className="flex justify-end gap-6">
                    <ButtonSpan type="button" onClick={onClose} ristoan>
                        cancel
                    </ButtonSpan>
                    <ButtonSpan
                        type="submit"
                        ristoan
                        disabled={isLoading}
                        fill="bg-neutral-300"
                    >
                        confirm
                    </ButtonSpan>
                </div>
            </Form>
        </Formik>
    )
}

export default ChangeEmailField