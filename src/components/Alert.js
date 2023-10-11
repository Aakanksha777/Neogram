import React from 'react';

  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
 export function Alert () {

    const error = (errorMsg) => toast.error(errorMsg);
    const success = (successMsg) => toast.success(successMsg);
    const info = (infoMsg) => toast.info(infoMsg);
    const warn = (warnMsg) => toast.warn(warnMsg);

    return (
      <div>
       error
       success
       info
       warn
        <ToastContainer />
      </div>
    );
  }
