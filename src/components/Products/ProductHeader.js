import React from 'react';
import { Row, Col, Container } from 'react-bootstrap'


const ProductsHeader = (props) => {
 
    return (
        <Container style={{border: "0.5px solid #e9f0eb"}}>
        <Row style={{ backgroundColor: "white", height:"60px" ,alignItems: "center"}}>
            <Col><h1 style={{fontSize: "22px" ,fontWeight: "bold", textAlign: "center", fontFamily: "'Khula', sans-serif"
}}>PRODUCTS</h1></Col>
        </Row>
    </Container>
    );
}

export default ProductsHeader;

