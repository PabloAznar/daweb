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
        <dialog ref={ref} onCancel={closeModal} style={{position: "absolute"}}>
            <h3>{texto}</h3>
            <div style={{marginTop: "2rem", display: "flex"}}>
            <button className="btn btn-primary" style={{cursor: "pointer"}} onClick={closeModal}>
                Close
            </button>
            </div>
        </dialog>
    );
}

export default PopUp;
