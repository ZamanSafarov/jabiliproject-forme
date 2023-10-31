import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../utils/constants';
import { DataGrid } from '@mui/x-data-grid';
import "./Home.css";


const Home = () => {
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 120
        },
        {
            field: 'title',
            headerName: 'Title',
            width: 350,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 350,
        },
        {
            field:"image",
            headerName:'Image',
            width:80,
            renderCell: (params) => (
                <img
                  src={params.value} // Assuming 'image' field contains the image URL
                  alt={`Image for row ${params.row.id}`}
                  style={{ width: "200px", height: '100px',objectFit:"contain",margin:"10px" }}
                />),
        },
        {
            field: 'category',
            headerName: 'Category',
            type: 'number',
            width: 250,
        },

    ];

    useEffect(() => {
        axios(`${BASE_URL}/products`).then((response) => {
            setData(response.data);
        })
    },[])
    return (
        <div className=' h-screen flex  justify-center items-center	'>

            <Box sx={{ height: 400, width: '80%' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSizeOptions={[4]}

                    onCellClick={(params)=>{
                        navigate(`details/${params.id}`)
                    }}
                />
            </Box>

            {/* <div className="table-content">
                <table >
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th>View</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item,) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.category}</td>
                                <td>
                                    <img className='h-3/5 w-20' src={item.image} alt={item.image} />
                                </td>
                                <td>{item.description.slice(0, 20)}</td>
                                <td className='view' onClick={()=>navigate(`details/${item.id}`)} >Details</td>
                                <td>Delete</td>

                            </tr>

                        ))}
                    </tbody>
                </table>
            </div> */}



        </div>
    )

}

export default Home;
// Life cycle -> heyat dongusu
// Component willmount,didmount