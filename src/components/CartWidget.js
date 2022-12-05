import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import {useWidgetCartContext} from '../context/WidgetCartContext';

const CounterCart = styled(Box)`
    text-align: center;
    width: 20px;
    height: 20px;
    border-radius: 30px;
    background-color: black;
    color: white;
    z-index: 20;
    margin-left: 18px;
    font-size: 14px;
`

const CartWidget = () => {
    const [WidgetCounter, setWidgetCounter] = useWidgetCartContext(0)
    return (
        <Box>
            <CounterCart>{WidgetCounter}</CounterCart>
            <Link to={'/cart'} style={{textDecoration: 'none', color: 'black'}}><AiOutlineShoppingCart style={{ width: '35px', height: '35px', marginRight: '60px', cursor: 'pointer' }} /></Link>
        </Box>
    )
}

export default CartWidget;