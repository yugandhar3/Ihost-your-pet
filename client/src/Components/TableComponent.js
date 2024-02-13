import React from 'react'
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBPagination, MDBPaginationItem, MDBPaginationLink, MDBCheckbox } from 'mdb-react-ui-kit';
function TableComponent() {
    return (
        <div>
            <MDBTable align='middle' bordered >
                <MDBTableHead>
                    <tr>
                        <th scope='col'>
                            <MDBCheckbox></MDBCheckbox>
                        </th>
                        <th scope='col'>Pet Name</th>
                        <th scope='col'>Pet Details</th>
                        <th scope='col'>Vaccination</th>
                        <th scope='col'>Age</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    <tr>
                        <th scope='col'>
                            <MDBCheckbox></MDBCheckbox>
                        </th>
                        <td>
                            <div className='d-flex align-items-center'>

                                <div className='ms-3'>
                                    <p className='fw-bold mb-1'>John Doe</p>

                                </div>
                            </div>
                        </td>
                        <td>
                            <p className='fw-normal mb-1'>Dog,Bulldog</p>
                            <p className='text-muted mb-0'>Male,Small</p>


                        </td>
                        <td>
                            <MDBBadge color='success' pill>
                                Yes
                            </MDBBadge>
                        </td>
                        <td>4 Years</td>
                        <td>
                            <MDBBtn color='link' rounded size='sm'>
                                Edit
                            </MDBBtn>
                        </td>
                    </tr>
                   
          
                </MDBTableBody>
            </MDBTable>
            <nav aria-label='Page navigation example'>
                <MDBPagination end className='mb-0'>
                    <MDBPaginationItem disabled>
                        <MDBPaginationLink href='#' tabIndex={-1} aria-disabled='true'>
                            Previous
                        </MDBPaginationLink>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <MDBPaginationLink href='#'>1</MDBPaginationLink>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <MDBPaginationLink href='#'>2</MDBPaginationLink>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <MDBPaginationLink href='#'>3</MDBPaginationLink>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <MDBPaginationLink href='#'>Next</MDBPaginationLink>
                    </MDBPaginationItem>
                </MDBPagination>
            </nav>
        </div>
    )
}

export default TableComponent