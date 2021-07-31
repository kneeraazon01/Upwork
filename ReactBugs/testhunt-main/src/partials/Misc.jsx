import React, { useContext } from 'react'
import PopupModal from '../common/PopupModal';
import { MoralisContext } from '../context/MoralisContext'
export default () => {
    const { loggingIn } = useContext(MoralisContext)
    return (
        <PopupModal
            isActive={loggingIn}>
            Logging in...
        </PopupModal>
    )
}
