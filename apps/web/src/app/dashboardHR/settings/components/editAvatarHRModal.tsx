'use client'

import AvatarButton from "@/components/buttons/avatarButton";
import ButtonSpan from "@/components/buttons/spanButtons";
import Modal from "@/components/Modal";
import { editUserFetch } from "@/libs/fetch/auth";
import { useAppDispatch } from "@/redux/hooks";
import { loginAction } from "@/redux/slices/userslice";
import { EditUserSlice } from "@/types/userTypes";
import { AxiosError } from "axios";
import { Form, Formik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";

interface EditAvatarHRModalProps {
    isOpen: boolean;
    onClose: () => void;
    setImage: React.Dispatch<React.SetStateAction<string | null>>;
    cropImage: string | null;
}

interface AvatarHRValue {
    avatar: string | null
}

const EditAvatarHRModal: React.FC<EditAvatarHRModalProps> = ({
    isOpen,
    onClose,
    setImage,
    cropImage
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const initialValue: AvatarHRValue = {
        avatar: null
    };

    const handleImageHRCropper = (
        e: React.ChangeEvent<HTMLInputElement>,
        setFieldValue: any,
    ) => {
        const file = e.target.files?.[0];

        if (file) {
            setFieldValue('avatar', file);
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdate = async (data: EditUserSlice) => {
        setIsLoading(true);
        try {
            if (!data.avatar) {
                toast.error("file can't be empty");
                return;
            }

            const formData = new FormData();

            if (data.avatar) {
                formData.append('avatar', data.avatar)
            }

            const res = await editUserFetch(formData);
            dispatch(loginAction(res.data.user.updatedUser));
            toast.success('avatar has been changed');
            setImage(null);
            onClose();

            window.location.reload();
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error('upload error')
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={() => { }} aksata>
            <Formik
                initialValues={initialValue}
                onSubmit={(value) => {
                    handleUpdate(value);
                }}
            >
                {({ setFieldValue, errors }) => {
                    return (
                        <Form>
                            <div className="text-black">
                                <h1 className="text-center mt-1 text-2xl font-bold">
                                    Choose your image
                                </h1>
                                <div className="w-full h-[150px] mt-8 mb-10 flex place-content-center items-center">
                                    <AvatarButton
                                        image={cropImage}
                                        onChange={(e) => handleImageHRCropper(e, setFieldValue)}
                                    />
                                </div>
                                <div className="flex justify-end gap-6">
                                    <ButtonSpan type="button" onClick={onClose} aksata>
                                        cancel
                                    </ButtonSpan>
                                    <ButtonSpan
                                        type="submit"
                                        disabled={isLoading}
                                        aksata
                                        fill="bg-black"
                                    >
                                        Upload
                                    </ButtonSpan>
                                </div>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </Modal>
    )
}

export default EditAvatarHRModal