import { ReactComponent as Check } from './check-icon.svg'

export const SuccessfulTransaction = ()=> {

    return (
        <div className="animation-successfulTransaction is-open">
            <div className="modal-container"></div>
            <Check />
            transaction exitosa
        </div>
    )
}