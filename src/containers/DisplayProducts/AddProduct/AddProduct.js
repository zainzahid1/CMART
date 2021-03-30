import React, { Component } from 'react';
import axios from '../../../axios-orders'

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            name: '',
            price: '',
            description: '',
            quantity: '',
            image: null,
            imagePreviewUrl: ''
        }
    }
    onChangeName = e => {
        this.setState({
            name: e.target.value
        })
    }
    onChangePrice = e => {
        this.setState({
            price: e.target.value
        })
    }

    onChangeDescription = e => {
        this.setState({
            description: e.target.value
        })
    }
    onChangeQuantity = e => {
        this.setState({
            quantity: e.target.value
        })
    }


    /*  onSubmit(e) {
           
           e.preventDefault();
         
           
   
           const obj = {
               name: this.state.name,
               price: this.state.price,
               description: this.state.description,
               quantity: this.state.quantity,
               image: this.state.image.name
           };
      
         
           axios.post('/AdminPortal/add_product.php', obj, {
               headers: { 'content-type': 'multipart/form-data' }
               })
               .then(response => console.log(response.data)) 
               console.log(this.state.image)  
       }   */
    async uploadFile(file, name, price, desc, quantity) {


        const formData = new FormData();

        formData.append('name', name)
        formData.append('price', price)
        formData.append('description', desc)
        formData.append('quantity', quantity)
        formData.append('avatar', file)



        return await axios.post('/AdminPortal/add_product.php', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(() => {
                this.setState({
                    name: '',
                    price: '',
                    description: '',
                    quantity: '',
                    image: null,
                    imagePreviewUrl: ''
                })
            })
    }
    async onSubmit(e) {
        e.preventDefault()
        let res = await this.uploadFile(this.state.image,
            this.state.name, this.state.price, this.state.description,
            this.state.quantity);
        console.log(res.data);
    }
    handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let imagee = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                image: imagee,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(imagee)
    }


    render() {
        let { imagePreviewUrl } = this.state;
        let imagePreview = null;
        if (imagePreviewUrl) {
            imagePreview = (<img className="imgPreview" src={imagePreviewUrl} alt="" />);
        } else {
            imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }

        return (
            <div className="container" style={{ marginTop: 10 }}>
                <h3>Add Product</h3><br />
                <form onSubmit={this.onSubmit} >
                    <div className="form-group">
                        <label for="exampleInputname">Product Name</label>
                        <input type="text"
                            className="form-control"
                            name="name"
                            placeholder="Username"
                            value={this.state.name}
                            onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPrice">Price</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Enter Price"
                            name="price"
                            value={this.state.price}
                            onChange={this.onChangePrice}
                        />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputDes">Description</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Enter Description"
                            name="description"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputQuantity">Quantity</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Enter Quantity"
                            name="quantity"
                            value={this.state.quantity}
                            onChange={this.onChangeQuantity}
                        />
                    </div>

                    <div className="form-group ">
                        <label for="exampleInputImage">Image</label>
                        <input
                            className="form-control"
                            type="file"
                            name="file"
                            onChange={this.handleImageChange} />

                    </div>

                    <button type="submit" name="submit" value="submit" class="btn btn-primary" /* onClick={this.onSubmit} */ >Submit</button>
                </form>
                <br /><br /><br />
                <div>
                    {imagePreview}
                </div>
            </div>
        );
    }
}


export default AddProduct;