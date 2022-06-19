// import { useEffect, useRef, useState } from 'react';
// import ReactDOM from 'react-dom';

// const ReactPortal__Overlay = {
//     position: 'fixed',
//     inset: '0',
//     zIndex: '10000',
// };

// const ReactPortal__Body = {
//     position: 'fixed',
//     top: '50%',
//     left: '50%',
//     maxHeight: '200px',
//     width: '400px',
//     backgroundColor: 'rgb(223, 221, 221)',
//     zIndex: '10000',
//     transform: 'translate(-50%, -50%)',
// };

// const ReactPortalModal = ({
//     children,
//     isOpen,
//     onClose,
//     customStyles,
//     isOverlay = true,
// }) => {
//     const bodyRef = useRef();
//     const divRef = useRef();
//     const [divCreated, setDivCreated] = useState(false);

//     useEffect(() => {
//         if (isOpen) {
//             bodyRef.current = document.querySelector('body');
//             divRef.current = document.createElement('div');
//             divRef.current.classList.add('ReactPortal');
//             bodyRef.current?.append(divRef.current);
//             setDivCreated(true);
//         }

//         return () => {
//             divRef.current?.remove();
//             setDivCreated(false);
//         };
//     }, [bodyRef, divRef, isOpen]);

//     const closeHandler = () => {
//         onClose();
//         divRef.current?.remove();
//     };

//     const overlayStyle = {
//         ...ReactPortal__Overlay,
//         backgroundColor: isOverlay ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
//     };

//     const bodyStyle = customStyles || ReactPortal__Body;

//     return divCreated && divRef.current
//         ? ReactDOM.createPortal(
//               <>
//                   <div
//                       style={overlayStyle}
//                       className="ReactPortal__Overlay"
//                       onClick={closeHandler}
//                   />

//                   <div style={bodyStyle} className="ReactPortal__Body">
//                       {children}
//                   </div>
//               </>,
//               divRef.current
//           )
//         : null;
// };

// export default ReactPortalModal;
