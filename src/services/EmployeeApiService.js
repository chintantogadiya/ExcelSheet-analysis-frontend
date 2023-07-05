import axios from 'axios';
const API_URL = 'http://localhost:5000/api/employee';

const EmployeeApiService = {
    getAllEmployees: async () => {
        try {
            const response = await axios.get(`${API_URL}/getAllEmployees`);
            return response.data; // Assuming you want to skip the first row
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch employee data');
        }
    },

    deleteEmployee: async (employeeID) => {
        try {
            await axios.delete(`${API_URL}/deleteEmployee/${employeeID}`);
            const employeeData = await EmployeeApiService.getAllEmployees();
            return employeeData;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to delete employee');
        }
    },

    addEmployee: async (formData) => {
        try {
            await axios.post(`${API_URL}/addEmployee`, formData);
            const employeeData = await EmployeeApiService.getAllEmployees();
            return employeeData;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to add employee');
        }
    }
}

export default EmployeeApiService;