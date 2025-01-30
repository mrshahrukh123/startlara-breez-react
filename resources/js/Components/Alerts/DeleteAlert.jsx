import React from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import Icon from '@/Components/MiniComponent/Icon';
import PrimaryButton from '@/Components/PrimaryButton';

const DeleteAlert = ({ url, id, onDelete }) => {
  
  const handleDelete = async () => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
        customClass: {
          confirmButton: 'btn btn-danger me-3',
          cancelButton: 'btn btn-info',
        },
        buttonsStyling: false,
      });
      
      if (result.isConfirmed) {
        const completedUrl = `${url}/${id}`;
        await axios.delete(`${completedUrl}`);
        
        const successResult = await Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'btn btn-success',
          },
          buttonsStyling: false,
        });
        onDelete();
      }
    } catch (error) {
      console.error('Error deleting:', error);
      Swal.fire({
        title: 'Error!',
        text: 'There was a problem deleting the item.',
        icon: 'error',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'btn btn-success ',
        },
      });
    }
  };

  return (
    <PrimaryButton className="btn-danger btn-sm" onClick={handleDelete}>
      <Icon iconClass="bx bx-trash" />
    </PrimaryButton>
  );
};

export default DeleteAlert;
