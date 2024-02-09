import React from 'react';
import ReactDOM from 'react-dom';

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  height: '90%',
  width: '90%',
  backgroundColor: 'white', // Change the background color
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', // Add shadow
  padding: '20px', // Add padding
  borderRadius: '8px', // Add border radius
};

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  zIndex: 1000,
};

export default function Modal({ children, onClose }) {
  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <button
          className='btn bg-danger text-light fs-4'
          style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }}
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </>,
    document.getElementById('cart-root')
  );
}
