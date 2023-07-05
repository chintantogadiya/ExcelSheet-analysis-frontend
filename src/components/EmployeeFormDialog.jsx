import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Autocomplete,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormControl,
    FormLabel,
    Chip,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const EmployeeFormDialog = ({ open, handleClose, handleFormSubmit }) => {
    const [formData, setFormData] = useState({
        employeeID: '',
        employeeName: '',
        employeeStatus: 'Active',
        joiningDate: null,
        birthDate: null,
        skills: [],
        salaryDetails: '',
        address: '',
    });
    const [options, setOptions] = useState(['Java', 'JavaScript', 'Python', 'HTML', 'CSS', 'React', 'Node.js']);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDateChange = (date, name) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: date,
        }));
    };

    const handleSkillsChange = (event, value) => {
        // Check if the entered value is not in the options array
        const enteredValue = event.target.value;
        const isInOptions = options.includes(enteredValue);

        if (!isInOptions && enteredValue) {
            // Add the entered value to the formData.skills array
            setOptions([...options, enteredValue]);
            setFormData(prevFormData => ({
                ...prevFormData,
                skills: [...prevFormData.skills, enteredValue]
            }));
        } else {
            // Update the skills value directly from the options
            setFormData(prevFormData => ({
                ...prevFormData,
                skills: value
            }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        formData.salaryDetails = "$"+formData.salaryDetails+"/month";
        handleFormSubmit(formData);
        handleClose();
    };

    const handleKeyPress = (e) => {
        // Prevent input of the minus (-) character
        if (e.key === '-') {
            e.preventDefault();
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Employee</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <FormControl component="fieldset" fullWidth margin='normal'>
                        <FormLabel component="legend">Personal Information</FormLabel>
                        <TextField 
                            name="employeeID" 
                            label="Employee ID"
                            value={formData.employeeID}
                            onChange={handleChange}
                            fullWidth
                            margin="normal" 
                        />
                        <TextField
                            name="employeeName"
                            label="Employee Name"
                            value={formData.employeeName}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <FormLabel>Employee Status</FormLabel>
                        <RadioGroup
                            name="employeeStatus"
                            value={formData.employeeStatus}
                            onChange={handleChange}
                            row
                        >
                            <FormControlLabel
                                value="Active"
                                control={<Radio />}
                                label="Active"
                                
                            />
                            <FormControlLabel
                                value="Inactive"
                                control={<Radio />}
                                label="Inactive"
                            />
                        </RadioGroup>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    name="birthDate"
                                    label="Birth Date"
                                    value={formData.birthDate}
                                    onChange={(date) => handleDateChange(date, 'birthDate')}
                                    renderInput={(params) => (
                                        <TextField {...params} fullWidth margin="normal" />
                                    )}
                                />
                                <DatePicker
                                    name="joiningDate"
                                    label="Joining Date"
                                    value={formData.joiningDate}
                                    onChange={(date) => handleDateChange(date, 'joiningDate')}
                                    renderInput={(params) => (
                                        <TextField {...params} fullWidth margin="normal" />
                                    )}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </FormControl>
                    <FormControl component="fieldset" fullWidth margin='normal'>
                        <FormLabel component="legend">Skills & Salary</FormLabel>
                        <TextField
                            label="Salary"
                            type="number"
                            name='salaryDetails'
                            value={formData.salaryDetails}
                            onChange={handleChange}
                            onKeyDown={handleKeyPress}
                            InputProps={{
                                inputProps: { min: 0 },
                                startAdornment: <span>$</span>,
                                endAdornment: <span>/month</span>,
                            }}
                            style={{ maxWidth: "300px" }}
                            margin="normal"
                        />

                        <Autocomplete
                            multiple
                            options={options.map((option) => option)}
                            defaultValue={[]}
                            freeSolo
                            value={formData.skills} // <-- Set the value prop to formData.skills
                            onChange={handleSkillsChange} // <-- Pass the correct change handler
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                ))
                            }
                            margin="normal"
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Skills"
                                    fullWidth
                                    margin="normal"
                                    placeholder="Enter skills"
                                />
                            )}
                        />

                    </FormControl>
                    <FormControl component="fieldset" fullWidth margin="normal">
                        <FormLabel component="legend">Address</FormLabel>
                    <TextField
                        name="address"
                        label="Address"
                        value={formData.address}
                        onChange={handleChange}
                        multiline
                        rows={3}
                        fullWidth
                        style={{marginTop: '10px'}}
                    />
                    </FormControl>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" onClick={handleSubmit} variant="contained" color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EmployeeFormDialog;
