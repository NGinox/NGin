import {Sheet} from "react-modal-sheet";
import {ReactElement} from "react";
import {styled} from "styled-components";

const StyledSheet = styled(Sheet)`
  .react-modal-sheet-backdrop {
    /* custom styles */
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
const BottomSheet = ({isOpen, setIsOpen, children} : {isOpen: boolean, setIsOpen: (value: boolean) => void, children: ReactElement}) => {
    return (
        <StyledSheet isOpen={isOpen} onClose={() => setIsOpen(false)} detent={'content-height'}
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