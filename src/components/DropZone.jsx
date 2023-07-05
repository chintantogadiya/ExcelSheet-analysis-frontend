import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from '@material-ui/core/Button';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

export const DropZone = ({ getSelectedFiles }, ref) => {
    const onDrop = (acceptedFiles) => {
        // Handle the dropped files
        getSelectedFiles(acceptedFiles)
    };

    const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, open, acceptedFiles } = useDropzone(
        {
            noClick: true,
            noKeyboard: true,
            onDrop
        })

    const baseStyle = {
        flex: 1,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: 'grey',
        borderStyle: 'dashed',
        backgroundColor: '#fafafa',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out',
        fontSize: '20px',
    };

    const focusedStyle = {
        borderColor: '#2196f3'
    };

    const acceptStyle = {
        borderColor: '#00e676'
    };

    const rejectStyle = {
        borderColor: '#ff1744'
    };
    const buttonStyle = {
        width: 'fit-content',
        marginBottom: '20px'
    };

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {}),
        minHeight: '35vh'
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);

    return (
        <>
            <div {...getRootProps({ style, className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p
                    style={
                        {
                            paddingTop: '20px',
                            paddingBottom: '20px',
                            fontFamily: 'sans-serif'
                        }
                    }>
                    Drag and drop files here <br />
                    <span style={{ display: 'inline-block', paddingTop: '10px' }}>OR</span>
                </p>
                <Button variant="outlined" style={buttonStyle} color="primary" onClick={open}>
                    Select Files
                </Button>
                <div
                    style=
                    {
                        {
                            display: 'flex',
                            alignItems: 'center',
                            color: 'black',
                            fontSize: '15px'
                        }
                    }>
                    <p style={{ marginRight: '10px' }}>Importing require Microsoft Excel .xlsx</p>
                    <a
                        href="/path/to/current/template"
                        download
                        style={
                            {
                                display: 'flex',
                                alignItems: 'center',
                                textDecoration: 'none'
                            }
                        }>
                        <FileDownloadOutlinedIcon style={{ paddingRight: '5px' }} />
                        Download Template
                    </a>
                </div>
            </div>
        </>
    )
};
