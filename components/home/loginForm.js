import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table, Col, Row } from "react-bootstrap";

function Apiintrigation() {
    const [todoList, setTodoList] = useState([]);

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [address, setAddress] = useState("");
    const [id, setId] = useState("");

    const [show, setShow] = useState(false);

    useEffect(() => {
        initialLoad();
    }, []);

    const initialLoad = () => {
        fetch("https://fakestoreapi.com/products", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setTodoList(data);
            })
            .catch((error) => {
                console.log("LoginError", error);
            });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const filterValue = {
            fullName: event.target["FullName"].value,
            email: event.target["email"].value,
            age: event.target["age"].value,
            address: event.target["address"].value,
        };
        fetch("https://fakestoreapi.com/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(filterValue),
        })
            .then((res) => res.json())
            .catch((error) => {
                console.log("LoginForm", error);
            });
    };

    const deleteHandler = (id) => {
        fetch(`https://fakestoreapi.com/products/${id}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((response) => {
                initialLoad();
            });
    };

    const updateHandler = (item) => {
        setFullName(item.fullName);
        setEmail(item.email);
        setAge(item.age);
        setAddress(item.address);
        setId(item.id);

        setShow(true);

        window.scroll({
            top: 0,
        });
    };

    const onUpdateSaveHandler = () => {
        fetch(`https://fakestoreapi.com/products/${id}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fullName: fullName,
                email: email,
                age: age,
                address: address,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                initialLoad();
            });
    };

    return (
        <>
            <form onSubmit={show ? onUpdateSaveHandler : submitHandler}>
                <Row className="m-4 p-4 border">
                    <Col md={12} className="text-center">
                        <h1>Api integration</h1>
                    </Col>
                    <Col md={6}>
                        <label>
                            FullName<span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            name="FullName"
                            className="form-control"
                            placeholder="Enter the full name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </Col>
                    <Col md={6}>
                        <label>
                            Email<span className="text-danger">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter the  email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Col>
                    <Col md={6}>
                        <label>
                            age<span className="text-danger">*</span>
                        </label>
                        <input
                            type="number"
                            name="age"
                            className="form-control"
                            placeholder="Enter the age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                        />
                    </Col>
                    <Col md={6}>
                        <label>
                            address<span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            name="address"
                            className="form-control"
                            placeholder="Enter the address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </Col>
                    <Col md={12} className="mb-3">
                        {/* {!show ? <Button type="submit" className='btn btn-primary' >submit</Button>
                         : 
                         <Button type="submit" className='btn btn-primary m-3' onClick={() => onUpdateSaveHandler()}>Update</Button>
                         } */}

                        <Button type="submit" className="btn btn-primary">
                            {show ? "Update" : "Submit"}
                        </Button>
                    </Col>
                </Row>
            </form>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {todoList.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.fullName}</td>
                            <td>{item.email}</td>
                            <td>{item.age}</td>
                            <td>{item.address}</td>
                            <td>
                                <Button
                                    type="submit"
                                    className="btn btn-primary mx-3"
                                    onClick={() => updateHandler(item)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    type="submit"
                                    className="btn btn-danger"
                                    onClick={() => deleteHandler(item.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default Apiintrigation;
