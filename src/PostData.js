import axios from './axios-orders';
export function PostData(type, userData) {
        let BaseURL = '/UserPortal/user_register_google.php';

        axios.post(BaseURL+type,userData)
        .then((response) => {
            
        })
        
        return new Promise((resolve, reject) =>{
        fetch(BaseURL+type, {
            method: 'POST',
            body: JSON.stringify(userData)
        })
        .then((response) => response.json())
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
           reject(error);
        });
        
        });
}
