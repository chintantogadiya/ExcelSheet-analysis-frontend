import React, { useEffect, useState } from 'react';
import EmployeeApiService from '../services/EmployeeApiService';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import EmployeeFormDialog from './EmployeeFormDialog';
import ChartContainer from './ChartContainer';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';

function isOverflown(element) {
    return (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
    );
}

const GridCellExpand = React.memo(function GridCellExpand(props) {
    const { width, value } = props;
    const wrapper = React.useRef(null);
    const cellDiv = React.useRef(null);
    const cellValue = React.useRef(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showFullCell, setShowFullCell] = React.useState(false);
    const [showPopper, setShowPopper] = React.useState(false);

    const handleMouseEnter = () => {
        const isCurrentlyOverflown = isOverflown(cellValue.current);
        setShowPopper(isCurrentlyOverflown);
        setAnchorEl(cellDiv.current);
        setShowFullCell(true);
    };

    const handleMouseLeave = () => {
        setShowFullCell(false);
    };

    React.useEffect(() => {
        if (!showFullCell) {
            return undefined;
        }

        function handleKeyDown(nativeEvent) {
            // IE11, Edge (prior to using Bink?) use 'Esc'
            if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
                setShowFullCell(false);
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [setShowFullCell, showFullCell]);

    return (
        <Box
            ref={wrapper}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
                alignItems: 'center',
                lineHeight: '24px',
                width: '100%',
                height: '100%',
                position: 'relative',
                display: 'flex',
            }}
        >
            <Box
                ref={cellDiv}
                sx={{
                    height: '100%',
                    width,
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                }}
            />
            <Box
                ref={cellValue}
                sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
                {value}
            </Box>
            {showPopper && (
                <Popper
                    open={showFullCell && anchorEl !== null}
                    anchorEl={anchorEl}
                    style={{ width, marginLeft: -17 }}
                >
                    <Paper
                        elevation={1}
                        style={{ minHeight: wrapper.current.offsetHeight - 3 }}
                    >
                        <Typography variant="body2" style={{ padding: 8 }}>
                            {value}
                        </Typography>
                    </Paper>
                </Popper>
            )}
        </Box>
    );
});

function renderCellExpand(params) {
    return (
        <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />
    );
}


export const EmployeeTable = ({loadData}) => {
    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    
    useEffect(() => {
        if (loadData) {
            fetchData();
        }
    }, [loadData]);

    const fetchData = async () => {
        try {
            const employeeData = await EmployeeApiService.getAllEmployees();
            setData(addIdsToRows(employeeData));
        } catch (error) {
            console.error(error);
        }
    };

    const addIdsToRows = (rows) => {
        return rows.map((row, index) => ({ ...row, id: index + 1 }));
    };

    const handleDeleteConfirmationOpen = (row) => {
        setSelectedRow(row);
        setDeleteConfirmationOpen(true);
    };

    const handleDeleteConfirmationClose = () => {
        setSelectedRow(null);
        setDeleteConfirmationOpen(false);
    };

    const handleDeleteRow = async () => {
        if (selectedRow) {
            try {
                const employeeData = await EmployeeApiService.deleteEmployee(selectedRow.employeeID);
                setData(addIdsToRows(employeeData));
            } catch (error) {
                console.error(error);
            }
            handleDeleteConfirmationClose();
        }
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleFormSubmit = async (formData) => {
        try {
            // Make API call to save the employee data
            const employeeData = await EmployeeApiService.addEmployee(formData);
            setData(addIdsToRows(employeeData));
            // Close the dialog
            setOpenDialog(false);
        } catch (error) {
            console.error(error);
        }
    };

    // Define the columns for the DataGrid
    const columns = [
        { field: 'employeeID', headerName: 'Employee ID', width: 92, renderCell: renderCellExpand },
        { field: 'employeeName', headerName: 'Employee Name', width: 150, renderCell: renderCellExpand },
        { field: 'employeeStatus', headerName: 'Employee Status', width: 119, renderCell: renderCellExpand },
        {
            field: 'joiningDate', headerName: 'Joining Date', width: 120, valueFormatter: (params) => {
                const date = new Date(params.value);
                return format(date, 'dd MMM yyyy');
            },
        },
        {
            field: 'birthDate',
            headerName: 'Birth Date',
            width: 120,
            valueFormatter: (params) => {
                const date = new Date(params.value);
                return format(date, 'dd MMM yyyy');
            },
        },
        { field: 'skills', headerName: 'Skills', width: 200, renderCell: renderCellExpand },
        { field: 'salaryDetails', headerName: 'Salary Details', width: 120, renderCell: renderCellExpand },
        { field: 'address', headerName: 'Address', width: 150, renderCell: renderCellExpand },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 80,
            renderCell: (params) => (
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    color="error"
                    onClick={() => handleDeleteConfirmationOpen(params.row)}
                />
            ),
        },
    ];
    return (
        ((data.length && loadData)>  0) && (
            <Box mt={3} mx={2}>
                <div style={{ width: '100%' }}>
                    <div style={{ textAlign: 'left' }}>
                        <Button variant="text" onClick={handleOpenDialog} >
                            Add Data
                        </Button>
                    </div>
                    
                    <Box mt={2}>
                        <DataGrid
                            rows={data}
                            columns={columns}
                            pagination
                            pageSize={10}
                            initialState={{
                                ...data.initialState,
                                pagination: { paginationModel: { pageSize: 5 } },
                            }}
                            pageSizeOptions={[5, 10, 25, 100]}
                            autoHeight
                        />
                    </Box>
                    <EmployeeFormDialog open={openDialog} handleClose={handleCloseDialog} handleFormSubmit={handleFormSubmit} />

                    <Dialog open={deleteConfirmationOpen} onClose={handleDeleteConfirmationClose}>
                        <DialogTitle>Delete Confirmation</DialogTitle>
                        <DialogContent>
                            Are you sure you want to delete the row with ID: {selectedRow?.employeeID}?
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDeleteConfirmationClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleDeleteRow} color="error" autoFocus>
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <div className="">
                    <h2>Data Visualization</h2>
                    <ChartContainer employees={data} />
                </div>
            </Box>
        )
    );
}
