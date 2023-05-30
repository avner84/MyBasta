import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProducts } from '../redux/productsActions';
import axios from '../api/axios';
import {getCookie} from '../api/CookiesMethodes';

const DELETE_PRODUCT_URL = '/api/products/deleteProduct';

const DeleteProductModal = ({ setShowDeleteProductModal, setProductIdForDelete, productId }) => {   
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDelete = async () => {

        try {
            const loginVerificationToken = getCookie("loginVerification");
            const response = await axios.put(DELETE_PRODUCT_URL,
                JSON.stringify({ productId }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${loginVerificationToken}`
                      },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response))
            
            setProductIdForDelete("");
            dispatch(fetchProducts());
            navigate("/ProductDeletedSuccessfully");
            
        }
        catch (err) {
            if (!err?.response) {
                alert('אין תשובה מהשרת');
            }

            else {
                alert('מחיקת מוצר נכשלה')
            }
        }   
    };


   
    const handleCancel = () => {
        setShowDeleteProductModal(false);
    };


    return (
        <div className="wrapper">
            <div className='form_container'>
                <div className="DeleteAccountModalTitle">האם אתה בטוח שברצונך למחוק את המוצר?</div>
                <div className="DeleteAccountModalBtns">
                    <button onClick={handleDelete}>כן</button>
                    <button onClick={handleCancel}>לא</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteProductModal