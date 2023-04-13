import React from 'react';
import { useDeleteUserMutation } from '../../../services/authAPI';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay, Button,
} from '@chakra-ui/react';



const AlertDeleteAccount = ({isOpen, cancelRef, onClose, id}) => {
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDeleteAccountClick=(e)=>{
    e.preventDefault();

    deleteUser(id)
      .then(() =>{
        // dispatch(logout());
        navigate('/success-deleting');
      })
      .catch(()=>{onClose();});
  }
  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Account
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' ml={3} onClick={handleDeleteAccountClick}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default AlertDeleteAccount;