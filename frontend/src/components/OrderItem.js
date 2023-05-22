
const OrderItem = (props) => {
    const { product } = props;

    return (
        <div className='orderItem'>

            <img className='orderItem__image' src={product.imgUrl} alt={product.title} />

            <p className='orderItem__title'>{product.title}</p>

            <p className='orderItem__price'> {product.price} ש"ח (ליחידה)</p>

            <p>כמות: {product.amount} </p>

            <p className="orderItem__TotalPrice">סה"כ: {product.amount * product.price} ש"ח</p>

            <p>תאריך הזמנה: {product.date}</p>



        </div>
    )
}

export default OrderItem