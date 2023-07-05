import React from 'react';
import Modal from './Modal';

const Home = () => {

    return (
        <>
            <div className='homeContainer' >
                <h1 className='homeTitle'>
                    Excel sheet Analysis
                </h1>
                <p className='intro'>This application allows you to import Excel sheets, which are then uploaded to the backend server and converted into JSON format. The data is then stored in MongoDB, and you can view and manipulate the data on a web page using a data grid implemented in ReactJS. Additionally, there is a feature to add new rows to the grid, save the data to the server, and perform deletion of records using the action buttons provided. Lastly, the application provides data visualization of the table for better analysis.</p>
                <div className='instructionList'>
                    <h2 style={{ marginBottom: '10px', color: 'black' }}>Instructions:</h2>
                    <ol>
                        <li>
                            Click on the <strong>import button</strong> to select an Excel sheet from your local machine.
                            Once the import is successful, the sheet will be uploaded to the server and converted into JSON format.
                        </li>
                        <li>
                            On successful upload, the data from the Excel sheet will be displayed in a data grid on the web page.You can view, edit, and add new rows to the grid. Changes will be reflected in real-time.
                        </li>
                        <li>
                            To save the modified data, click on the save button. The updated data will be sent to the server and stored in the database.
                            Saved data will be preserved even if you reload the page.
                        </li>
                        <li>
                            Each row in the data grid has an "Actions" column with a <strong>delete button</strong>.To delete a record, click on the delete button corresponding to the row you wish to remove.
                        </li>
                        <li>
                            Below the data grid, you will find a data visualization component that provides visual representations of the table data.Use this visualization to gain insights and analyze the data more effectively.
                        </li>
                    </ol>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Modal />
                </div>
            </div>
        </>
    );

};

export default Home;