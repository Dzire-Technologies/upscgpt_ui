

import closeIcon from "./assets/closeIcon.svg"
import style from "./Modal.module.css"

const Modal = ({title = "", show = "", onClose=()=>{}, children})=>{




    return(
        <div className={`${style.Modal} ${show == false ? "": style.ModalShow} `}>
            <div className={style.ModalContainer}>
                <div className={style.ModalHeader}>
                    <div className={style.ModalTitle}>{title}</div>
                    <div className={style.CloseIconContainer} onClick={()=>onClose()}><img src={closeIcon}/></div>
                </div>
                <div className={style.ModalSubTitle}>Enter the required message.</div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal