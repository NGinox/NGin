import {Sheet} from "react-modal-sheet";
import {ReactElement} from "react";
import {styled} from "styled-components";
import '../App.css'

const StyledSheet = styled(Sheet)`
  .react-modal-sheet-backdrop {
      touch-action: auto !important;
      pointer-events: all !important;
      z-index: 9999999999;
  }
  .react-modal-sheet-container {
      padding: 0 32px 0 32px;
      background-color: #271732 !important;
      border-radius: 32px 32px 0 0 !important;
  }
  .react-modal-sheet-header {
    /* custom styles */
  }
  .react-modal-sheet-drag-indicator {
      background-color: white !important;
    /* custom styles */
  }
  .react-modal-sheet-content {
    /* custom styles */
  }`

interface BottomSheetProps {
    isOpen: boolean;
    setIsOpen: () => void;
    disableDrag?: boolean;
    children: ReactElement
}
const BottomSheet = (
    {   isOpen,
        setIsOpen,
        disableDrag = false,
        children} : BottomSheetProps) => {

    const modalBackdrops = document.querySelectorAll('.react-modal-sheet-backdrop');

    if (modalBackdrops) {
        modalBackdrops.forEach((modalBackdrop) => {
           modalBackdrop.addEventListener('click', () => {
               //setIsOpen(false)
           })
        })

    }


    return (
            <StyledSheet isOpen={isOpen}
                         disableDrag={disableDrag}
                         onClick={e => e.stopPropagation()}
                         onClose={() => setIsOpen(false)} detent={'content-height'}
                         className={`${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ease-in-out`}>
                <Sheet.Container>
                    <Sheet.Header/>
                    <Sheet.Content>
                        {children}
                    </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop/>
            </StyledSheet>
    );
};

export default BottomSheet;