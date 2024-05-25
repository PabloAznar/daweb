import { useEffect, useRef } from "react";

function PopUp({ openModal, closeModal, texto }) {
    const ref = useRef();

    useEffect(() => {
        if (openModal) {
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
    }, [openModal]);
    return (
        <dialog ref={ref} onCancel={closeModal}>
            {texto}
            <button onClick={closeModal}>
                Close
            </button>
        </dialog>
    );
}

export default PopUp;
