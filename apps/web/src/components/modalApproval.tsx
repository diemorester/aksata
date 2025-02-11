import ButtonSpan from "@/components/buttons/spanButtons";
import Modal from "@/components/Modal"

interface ModalApprovalProps {
    isOpen: boolean;
    isLoading: boolean;
    onClose: () => void;
    onApprove: () => void;
}

const ModalApproval: React.FC<ModalApprovalProps> = ({ isOpen, onClose, onApprove, isLoading }) => {
    return (
        <Modal
            backgroundClose
            onClose={onClose}
            isOpen={isOpen}
            aksata
        >
            <div className="flex flex-col h-44 justify-between text-black">
                <div>
                    <h2 className="text-2xl font-bold">Menyetujui pengajuan</h2>
                    <p className='text-sm pt-1 px-1 mb-14'>yakin untuk menyetujui pengajuan?</p>
                </div>
                <div className="flex flex-row justify-end px-2 gap-6">
                    <ButtonSpan
                        type="button"
                        onClick={onClose}
                        classname="font-semibold"
                        aksata
                    >
                        cancel
                    </ButtonSpan>
                    <ButtonSpan
                        type="submit"
                        onClick={onApprove}
                        fill="bg-black"
                        disabled={isLoading}
                        classname="font-semibold"
                        aksata
                    >
                        Setuju
                    </ButtonSpan>
                </div>
            </div>
        </Modal>
    )
}

export default ModalApproval