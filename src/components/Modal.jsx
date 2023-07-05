import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { DropZone } from './DropZone';
import axios from 'axios';
import { EmployeeTable } from './EmployeeTable';
import { Alert } from '@mui/material';


const useStyles = makeStyles((theme) => ({
    closeButton: {
        position: 'absolute',
        top: theme.spacing(1),
        right: theme.spacing(1),
    },
    dialogActions: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    cancelButton: {
        alignSelf: 'flex-start',
    },
    dialogContent: {
        height: '300px',
        maxHeight: '300px'
    },
}));

const Modal = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [importError, setImportError] = useState(false);


    const getSelectedFiles = (files) => {
        setSelectedFiles(files);
    };
    const handleOpen = () => {
        setImportError(false);
        setOpen(true);
    };

    const handleClose = () => {
        setImportError(false);
        setOpen(false);
    };

    const handleErrorOpen = () => {
        setIsError(true);
    };

    const handleErrorClose = () => {
        setIsError(false);
    };

    const handleImport = async () => {
        const formData = new FormData();
        selectedFiles.forEach((file) => {
            formData.append(`csvFile`, file);
        });

        if (selectedFiles.length <= 0) {
            setImportError(true);
        } else {
            try {
                await axios.post('http://localhost:5000/api/upload', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

                setIsLoading(true)
                setImportError(false);
            } catch (error) {
                setIsLoading(false)
                // Show error message
                setAlertMessage('Error importing data. Please try again');
                handleErrorOpen();
            }
            setOpen(false);
            setImportError(false);
        }
    }

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Import File
            </Button>
            <Dialog open={open} onClose={handleClose} PaperProps={{
                style: {
                    width: '700px',
                    maxWidth: '100vw',
                    padding: '10px'
                },
            }} >
                <DialogTitle style={{ paddingBottom: '0px' }}>
                    Import Items
                    <IconButton className={classes.closeButton} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    {isError && (
                        <Alert severity="error" onClose={handleErrorClose}>
                            {alertMessage}
                        </Alert>
                    )}
                    {importError && (
                        <Alert severity="error" onClose={() => setImportError(false)}>
                            Please select a file or Drag and Drop file here.
                        </Alert>
                    )}
                    <DropZone getSelectedFiles={getSelectedFiles} />
                </DialogContent>
                <DialogActions className={classes.dialogActions}>
                    <Button variant="outlined" className={classes.cancelButton} color='primary' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleImport}
                    >
                        Import
                    </Button>
                </DialogActions>
            </Dialog>
            <EmployeeTable loadData={isLoading} />
        </div>
    )
}

export default Modal