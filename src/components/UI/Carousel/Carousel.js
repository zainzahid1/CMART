import React, {  useState } from 'react';
import a from '../../../assets/CarousalImages/a.jpg';
import b from '../../../assets/CarousalImages/b.jpg';
import c from '../../../assets/CarousalImages/c.jpg';
import d from '../../../assets/CarousalImages/d.jpg';
import e from '../../../assets/CarousalImages/e.jpg';
import f from '../../../assets/CarousalImages/f.jpg';
import g from '../../../assets/CarousalImages/g.jpg';
import h from '../../../assets/CarousalImages/h.jpg';
import i from '../../../assets/CarousalImages/i.jpg';
import j from '../../../assets/CarousalImages/j.jpg';


import {
    Carousel,
} from 'react-bootstrap';

const ControlledCarousel = props => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    
  

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
           <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={d}
                    alt="Carousel Images"
                />
            </Carousel.Item>
           <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={b}
                    alt="Carousel Images"
                />
            </Carousel.Item>
           <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={c}
                    alt="Carousel Images"
                />
            </Carousel.Item>
           <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={j}
                    alt="Carousel Images"
                />
            </Carousel.Item>
           <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={e}
                    alt="Carousel Images"
                />
            </Carousel.Item>
           <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={f}
                    alt="Carousel Images"
                />
            </Carousel.Item>
           <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={g}
                    alt="Carousel Images"
                />
            </Carousel.Item>
           <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={h}
                    alt="Carousel Images"
                />
            </Carousel.Item>
           <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={i}
                    alt="Carousel Images"
                />
            </Carousel.Item>
           <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={a}
                    alt="Carousel Images"
                />
            </Carousel.Item>
        </Carousel>
    );
}



export default ControlledCarousel;


/* import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios-orders';
import * as actions from '../../../store/actions/index';
import Spinner from '../Spinner/Spinner'
import a from '../../../assets/CarousalImages/a.jpg';
import b from '../../../assets/CarousalImages/b.jpg';
import c from '../../../assets/CarousalImages/c.jpg';
import d from '../../../assets/CarousalImages/d.jpg';


import {
    Carousel,
} from 'react-bootstrap';

const ControlledCarousel = props => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const { onFetchOrders, } = props;
    useEffect(() => {
        onFetchOrders();
    }, [onFetchOrders,])

    let products = <Spinner />

    products = props.orders.map((item) => {
        return (
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={`http://localhost/CMart/AdminPortal/uploads/${item.image}`}
                    alt="Carousel Images"
                />
            </Carousel.Item>

        )
    });

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            {products}
        </Carousel>
    );
}


const mapStateToProps = state => {
    return {
        orders: state.order.orders,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ControlledCarousel, axios);
 */